# RSVP Kayit Kurulumu

Bu proje GitHub Pages ustunde statik calistigi icin misafir cevaplarini dogrudan repo icindeki bir dosyaya yazamaz.
Bu yüzden en pratik cozum, cevaplari ayri bir Google Sheet dosyasina yazmaktir.

Kurulum:

1. Google Drive'da yeni bir Google Sheet olustur.
2. Dosya adini istedigin gibi koy. Icinde bir sayfa olsun.
3. Sheet icinde `Extensions > Apps Script` ac.
4. Bu projedeki [apps-script.gs](./apps-script.gs) dosyasinin icerigini Apps Script editorune yapistir.
5. `Deploy > New deployment` sec.
6. Deployment tipi olarak `Web app` sec.
7. `Execute as` kismini kendi hesabin olarak birak.
8. `Who has access` kismini herkes erisebilir olacak sekilde ayarla.
9. Deploy et ve verilen web app URL'sini kopyala.
10. [script.js](./script.js) dosyasindaki `const sheetEndpoint = "";` satirina bu URL'yi yapistir.
11. Sonra tekrar:

```powershell
git add .
git commit -m "rsvp kayit sistemi eklendi"
git push
```

Kayitlar nereye duser:

- Google Sheet icinde `Katilimlar` adli bir sayfa olusur.
- Sutunlar:
  - `Timestamp`
  - `Ad Soyad`
  - `Durum`
  - `Kisi Sayisi`

Not:

- Misafir davetiyede `Evet/Hayir`, `Ad Soyad` ve `Kac kisi geleceksiniz` alanini doldurur.
- Form gonderilince hem WhatsApp mesaji acilir hem de `sheetEndpoint` tanimliysa Google Sheet'e kayit dusur.
