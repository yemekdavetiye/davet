const invitation = document.querySelector(".invitation");
const openInviteButton = document.getElementById("openInvite");
const rsvpButtons = document.querySelectorAll(".rsvp-button");
const rsvpFeedback = document.getElementById("rsvpFeedback");
const rsvpForm = document.getElementById("rsvpForm");
const guestNameInput = document.getElementById("guestName");
const guestCountInput = document.getElementById("guestCount");

const whatsappNumber = "905350418689";
const sheetEndpoint =
  "https://script.google.com/macros/s/AKfycbwyIkLRNPJg5RTkT9bwZkdS1jEajdxKUq0UNlWthhVwM8Z9cBX6TjZSrF47ieVw1eb0AQ/exec";

let selectedResponse = "";

openInviteButton?.addEventListener("click", () => {
  if (!invitation || invitation.classList.contains("is-open")) {
    return;
  }

  invitation.classList.add("is-opening");
  openInviteButton.setAttribute("aria-expanded", "true");

  window.setTimeout(() => {
    invitation.classList.remove("is-opening");
    invitation.classList.add("is-open");
  }, 420);
});

rsvpButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedResponse = button.dataset.response || "";

    rsvpButtons.forEach((item) => item.classList.remove("is-selected"));
    button.classList.add("is-selected");

    const isAttending = selectedResponse === "Evet, geliyorum";

    guestCountInput.disabled = !isAttending;
    guestCountInput.min = isAttending ? "1" : "0";
    guestCountInput.value = isAttending ? guestCountInput.value || "1" : "0";

    rsvpFeedback.textContent = isAttending
      ? "\"Evet\" se\u00e7ildi. L\u00fctfen isim ve ki\u015fi say\u0131s\u0131n\u0131 girin."
      : "\"Hay\u0131r\" se\u00e7ildi. Dilerseniz yine isminizi g\u00f6nderin.";
  });
});

rsvpForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const guestName = guestNameInput?.value.trim() || "";
  const guestCountValue = Number(guestCountInput?.value || "0");
  const isAttending = selectedResponse === "Evet, geliyorum";
  const guestCount = isAttending ? Math.max(1, guestCountValue) : 0;

  if (!selectedResponse) {
    rsvpFeedback.textContent = "L\u00fctfen \u00f6nce Evet veya Hay\u0131r se\u00e7in.";
    return;
  }

  if (!guestName) {
    rsvpFeedback.textContent = "L\u00fctfen ad soyad bilgisini girin.";
    guestNameInput?.focus();
    return;
  }

  if (isAttending && !Number.isFinite(guestCountValue)) {
    rsvpFeedback.textContent = "L\u00fctfen ka\u00e7 ki\u015fi gelece\u011finizi yaz\u0131n.";
    guestCountInput?.focus();
    return;
  }

  const payload = {
    timestamp: new Date().toISOString(),
    guestName,
    response: selectedResponse,
    guestCount,
  };

  rsvpFeedback.textContent = "Bilgiler kaydediliyor...";

  if (sheetEndpoint) {
    try {
      const formBody = new URLSearchParams(payload).toString();

      await fetch(sheetEndpoint, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: formBody,
      });
    } catch (error) {
      rsvpFeedback.textContent =
        "Kayit dosyasina gonderirken bir sorun oldu. WhatsApp mesaji yine hazirlaniyor.";
    }
  }

  const countLine = isAttending
    ? `Toplam kisi sayisi: ${guestCount}.`
    : "Katilim saglayamayacagim.";
  const message = encodeURIComponent(
    `Merhaba, davetiyeniz icin yanitim:\nAd Soyad: ${guestName}\nDurum: ${selectedResponse}\n${countLine}`
  );

  rsvpFeedback.textContent =
    "Bilgiler hazir. WhatsApp mesaji aciliyor. Kayit dosyasi baglandiysa oraya da kaydedildi.";

  window.setTimeout(() => {
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank", "noopener");
  }, 250);
});
