const invitation = document.querySelector(".invitation");
const openInviteButton = document.getElementById("openInvite");
const rsvpButtons = document.querySelectorAll(".rsvp-button");
const rsvpFeedback = document.getElementById("rsvpFeedback");

const whatsappNumber = "905350418689";

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
    const response = button.dataset.response;

    rsvpButtons.forEach((item) => item.classList.remove("is-selected"));
    button.classList.add("is-selected");

    rsvpFeedback.textContent = `"${response}" se\u00e7ildi. WhatsApp mesaj\u0131 haz\u0131rlan\u0131yor...`;

    const message = encodeURIComponent(
      `Merhaba, davetiyeniz i\u00e7in yan\u0131t\u0131m: ${response}.`
    );

    window.setTimeout(() => {
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank", "noopener");
    }, 250);
  });
});
