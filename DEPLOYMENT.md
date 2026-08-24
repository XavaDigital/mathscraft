# Deployment — Google Cloud (Cloud Run + Firebase Hosting)

## Current state (updated 2026-08-24)

| Piece | Where |
|---|---|
| GCP project | `crbf-286109` ("Client APIs") — a dedicated project was blocked by the billing account's project-link quota |
| API | Cloud Run service `mathscraft-api`, region `australia-southeast1` — https://mathscraft-api-312662345901.australia-southeast1.run.app |
| **Live frontend** | `box.mathscraftnz.org` → AWS CloudFront `E3MNLY5LQZL7EE` → S3 website bucket `box.mathscraftnz.org` (us-east-1, account 843229760456). Built with `REACT_APP_WS_BASE_URL` = the Cloud Run URL above, so it calls Cloud Run directly (API CORS is `*`). |
| Frontend (GCP copy) | Firebase Hosting site `mathscraft-box` — https://mathscraft-box.web.app — same-origin `/api/` rewrite to Cloud Run |
| DNS | `mathscraftnz.org` is managed in Squarespace and nobody has access, so `box.mathscraftnz.org` cannot be repointed. The old `boxapi.mathscraftnz.org` API distribution (`E1XR30KMQU45HG`) is disabled and Elastic Beanstalk is terminated. |
| Service account | `mathscraft-api@crbf-286109.iam.gserviceaccount.com` (no IAM roles; Sheets access comes from sheet sharing) |
| Submissions sheet | "2025 - MCIAB registration", ID `1yYiEgNU_UEnZeeYR1eiB70lOMG7MFclAW6bh_6LImu8` |
| Data / email | MongoDB Atlas + Mailgun SMTP (unchanged from the Beanstalk setup) |

Firebase Hosting rewrites `/api/**` to the Cloud Run service ([firebase.json](firebase.json)),
so frontend and API share one origin and no CORS or `boxapi` subdomain is needed.

Cloud Run env vars: `ADMIN_EMAIL`, `SMTP_USER`, `SMTP_PASS`, `DB_PASS`, `SHEET_ID`.
`SHEET_TAB` is optional — when unset, the API writes to the spreadsheet's first tab.
The sheet's header order must match `toRow()` in
[server/services/sheetsService.js](server/services/sheetsService.js):
firstName, lastName, email, phone, discover, school, schoolName, addressCorrect,
address1, address2, townCity, postcode, comments, date.

## Redeploying

### API (after server/ changes)

```sh
gcloud run deploy mathscraft-api \
  --source server \
  --project=crbf-286109 \
  --region=australia-southeast1 \
  --service-account=mathscraft-api@crbf-286109.iam.gserviceaccount.com \
  --max-instances=2 --memory=512Mi --quiet
```

Existing env vars are preserved. To change one:
`gcloud run services update mathscraft-api --project=crbf-286109 --region=australia-southeast1 --update-env-vars KEY=VALUE`

### Frontend (after client/ changes) — deploy to BOTH targets

The client needs Node 16 (node-sass); with nvm4w the build can be run without
switching the global version. The API base URL is baked in at build time
([client/src/config.js](client/src/config.js)): default `/api/` (same-origin,
for Firebase), or `REACT_APP_WS_BASE_URL` for the S3 copy.

**1. Live site (S3 + CloudFront, `box.mathscraftnz.org`)** — Git Bash:

```sh
cd client
PATH="/c/Users/cirni/AppData/Roaming/nvm/v16.14.0:$PATH" \
REACT_APP_WS_BASE_URL="https://mathscraft-api-312662345901.australia-southeast1.run.app/api/" \
CI=false npm run build
aws s3 sync build s3://box.mathscraftnz.org
aws cloudfront create-invalidation --distribution-id E3MNLY5LQZL7EE --paths "/*"
```

**2. GCP copy (Firebase Hosting, `mathscraft-box.web.app`)**:

```sh
cd client
PATH="/c/Users/cirni/AppData/Roaming/nvm/v16.14.0:$PATH" CI=false npm run build
cd .. && firebase deploy --only hosting --project crbf-286109
```

## Remaining manual steps

1. **Turn off the Make.com scenario** — the API writes to the sheet directly now.
   (The sheet is currently "anyone with the link can edit", which is why the
   service account can write without explicit sharing; tightening that means
   sharing it with `mathscraft-api@crbf-286109.iam.gserviceaccount.com` as
   Editor first.)
2. **Rotate the MongoDB + Mailgun credentials** (they appear in screenshots in
   `AWS server settings/`), then update the Cloud Run env vars.
3. **If DNS access is ever recovered**: add `box.mathscraftnz.org` as a custom
   domain in Firebase Hosting, repoint DNS, then delete the S3 bucket and both
   CloudFront distributions (`E3MNLY5LQZL7EE`, `E1XR30KMQU45HG`).

## Local development

```sh
# One-time: lets the googleapis client use your Google account locally
# (your account owns the sheet, so no extra sharing needed).
gcloud auth application-default login

# server/.env needs: DB_PASS, SMTP_USER, SMTP_PASS, ADMIN_EMAIL, SHEET_ID, PORT=5100
npm run dev   # from repo root: server (5100) + client (3000)
```
