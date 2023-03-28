import * as modal from "./modal.js";

export function init() {
  const linkContact = document.querySelector('[data-contact="contact-link"]');

  linkContact.addEventListener("click", handleContactLinkClick);
}

function handleContactLinkClick(e) {
  e.preventDefault();
  modal.showModal();
}
