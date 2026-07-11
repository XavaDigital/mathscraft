# Deployment — Google Cloud (Cloud Run + Firebase Hosting)

## Current state (deployed 2026-07-12)

| Piece | Where |
|---|---|
| GCP project | `crbf-286109` ("Client APIs") — a dedicated project was blocked by the billing account's project-link quota |
| API | Cloud Run service `mathscraft-api`, region `australia-southeast1` — https://mathscraft-api-312662345901.australia-southeast1.run.app |
| Frontend | Firebase Hosting site `mathscraft-box` — https://mathscraft-box.web.app |
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

### Frontend (after client/ changes)

The client needs Node 16 (node-sass); with nvm4w the build can be run without
switching the global version:

```sh
cd client
PATH="/c/Users/cirni/AppData/Roaming/nvm/v16.14.0:$PATH" npm run build   # Git Bash
cd .. && firebase deploy --only hosting --project crbf-286109
```

## Remaining manual steps

1. **Share the spreadsheet** (Editor) with
   `mathscraft-api@crbf-286109.iam.gserviceaccount.com` — without this, Sheets
   writes fail (submissions still reach MongoDB and email).
2. **Test end-to-end**: submit a registration on https://mathscraft-box.web.app,
   check the sheet row, MongoDB document, and both emails.
3. **Custom domain**: Firebase console → Hosting → add `box.mathscraftnz.org`,
   then update the DNS A records it prescribes. SSL is automatic.
4. **Decommission AWS** (after verifying):
   - Terminate the Elastic Beanstalk environment `mathscraft-server` (us-east-1)
     and delete old application versions.
   - Delete/empty the S3 website bucket + CloudFront distribution.
   - Remove the `boxapi.mathscraftnz.org` DNS record.
5. **Turn off the Make.com scenario** — the API writes to the sheet directly now.
6. **Rotate the MongoDB + Mailgun credentials** (they appear in screenshots in
   `AWS server settings/`), then update the Cloud Run env vars.

## Local development

```sh
# One-time: lets the googleapis client use your Google account locally
# (your account owns the sheet, so no extra sharing needed).
gcloud auth application-default login

# server/.env needs: DB_PASS, SMTP_USER, SMTP_PASS, ADMIN_EMAIL, SHEET_ID, PORT=5100
npm run dev   # from repo root: server (5100) + client (3000)
```
