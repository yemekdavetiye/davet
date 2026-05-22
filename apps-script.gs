function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Katilimlar");

  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Katilimlar");
    sheet.appendRow(["Timestamp", "Ad Soyad", "Durum", "Kisi Sayisi"]);
  }

  var payload = {};

  if (e && e.parameter && Object.keys(e.parameter).length > 0) {
    payload = {
      timestamp: e.parameter.timestamp,
      guestName: e.parameter.guestName,
      response: e.parameter.response,
      guestCount: e.parameter.guestCount,
    };
  } else if (e && e.postData && e.postData.contents) {
    payload = JSON.parse(e.postData.contents);
  }

  sheet.appendRow([
    payload.timestamp || new Date().toISOString(),
    payload.guestName || "",
    payload.response || "",
    payload.guestCount || 0,
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
