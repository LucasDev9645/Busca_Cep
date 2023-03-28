class State {
  constructor() {
    this.container = null;
    this.btnClose = null;
  }
}

const state = new State();

export function init() {
  state.container = document.querySelector("#modal-contact");
  state.btnClose = document.querySelector('[data-btn="close-modal"]');

  state.btnClose.addEventListener("click", handleBtnClose);
  state.container.addEventListener("click", handleContainerClick);
}

export function showModal() {
  state.container.classList.add("active");
}

export function closeModal() {
  state.container.classList.remove("active");
}

function handleBtnClose(e) {
  e.preventDefault();
  closeModal();
}

function handleContainerClick(e) {
  e.preventDefault();

  if (e.target === this) closeModal();
}
