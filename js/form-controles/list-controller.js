class State {
  constructor() {
    this.listSection = null;
  }
}

const state = new State();

export function init() {
  state.listSection = document.querySelector("#list-section");
}

export function addCard(address) {
  const card = createCard(address);
  state.listSection.appendChild(card);
}

function createCard(address) {
  const div = document.createElement("div");
  div.classList.add("list-item");

  const h3 = document.createElement("h3");
  h3.innerHTML = address.city;

  const pStreet = document.createElement("p");
  pStreet.classList.add("list-item-p-street");
  pStreet.innerHTML = `${address.street}, ${address.number}`;

  const pCep = document.createElement("p");
  pCep.classList.add("list-item-p-cep");
  pCep.innerHTML = address.cep;

  div.appendChild(h3);
  div.appendChild(pStreet);
  div.appendChild(pCep);

  return div;
}
