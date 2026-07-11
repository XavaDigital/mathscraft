const { google } = require("googleapis");

const SHEET_ID = process.env.SHEET_ID;

let sheetsApi;
let tabName = process.env.SHEET_TAB;

// Uses Application Default Credentials: the attached service account on
// Cloud Run, or `gcloud auth application-default login` locally.
const getSheetsApi = () => {
  if (!sheetsApi) {
    const auth = new google.auth.GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    sheetsApi = google.sheets({ version: "v4", auth });
  }
  return sheetsApi;
};

// SHEET_TAB overrides; otherwise use the spreadsheet's first tab
const getTabName = async () => {
  if (!tabName) {
    const meta = await getSheetsApi().spreadsheets.get({
      spreadsheetId: SHEET_ID,
      fields: "sheets.properties.title",
    });
    tabName = meta.data.sheets[0].properties.title;
  }
  return tabName;
};

// Column order must match the header row of the sheet tab
const toRow = (values) => [
  values.firstName,
  values.lastName,
  values.email,
  values.phone,
  values.discover,
  values.school,
  values.schoolName,
  values.addressCorrect,
  values.address1,
  values.address2,
  values.townCity,
  values.postcode,
  values.comments,
  values.date,
];

module.exports.appendSubmission = async (values) => {
  if (!SHEET_ID) {
    throw new Error("SHEET_ID env var is not set");
  }
  const tab = await getTabName();
  // valueInputOption RAW so user input is never interpreted as formulas
  return getSheetsApi().spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `'${tab}'!A1`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [toRow(values)] },
  });
};
