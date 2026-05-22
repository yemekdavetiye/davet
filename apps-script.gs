function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Katilimlar");

  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Katilimlar");
    sheet.appendRow(["Timestamp", "Ad Soyad", "Durum", "Kisi Sayisi"]);
  }

  var payload = JSON.parse(e.postData.contents);

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
