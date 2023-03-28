import Address from "../models/adress.js";
import * as addressService from "../services/address-service.js";
import * as listController from "./list-controller.js";

class State {
  constructor() {
    this.Address = new Address();

    this.inputCep = null;
    this.inputStreet = null;
    this.inputNumber = null;
    this.inputCity = null;

    this.errorCep = null;
    this.errorNumber = null;

    this.saveBtn = null;
    this.clearBtn = null;
  }
}

const state = new State();

export function init() {
  state.inputCep = document.querySelector('[data-input="cep"]');
  state.inputStreet = document.querySelector('[data-input="street"]');
  state.inputNumber = document.querySelector('[data-input="number"]');
  state.inputCity = document.querySelector('[data-input="city"]');

  state.errorCep = document.querySelector('[data-error="cep"]');
  state.errorNumber = document.querySelector('[data-error="number"]');

  state.saveBtn = document.querySelector('[data-btn="save" ]');
  state.clearBtn = document.querySelector('[data-btn="clear"]');

  state.inputNumber.addEventListener("change", handleInputNumberChange);
  state.inputNumber.addEventListener("keyup", handleInputNumberKeyup);
  state.clearBtn.addEventListener("click", handleBtnClearClick);
  state.saveBtn.addEventListener("click", handleBtnSaveClick);
  state.inputCep.addEventListener("change", handleInputCepChange);
}

function handleInputNumberKeyup(e) {
  state.address.number = e.target.value;
}

async function handleInputCepChange(e) {
  const cep = e.target.value;

  try {
    const address = await addressService.findCep(cep);

    state.inputStreet.value = address.street;
    state.inputCity.value = address.city;
    state.address = address;

    setFormError("cep", "");

    state.inputNumber.focus();
  } catch (e) {
    state.inputStreet.value = "";
    state.inputCity.value = "";
    state.inputNumber.value = "";

    setFormError("cep", "Informe um CEP válido");
  }
}

function handleBtnSaveClick(e) {
  e.preventDefault();

  const errors = addressService.getErrors(state.address);

  const keys = Object.keys(errors);

  if (keys.length > 0) {
    keys.forEach((key) => {
      setFormError(key, errors[key]);
    });
  } else {
    listController.addCard(state.address);
    handleBtnClearClick();
  }
}

function handleInputNumberChange(e) {
  e.target.value === ""
    ? setFormError("number", "Campo Requerido")
    : setFormError("number", "");
}

function handleBtnClearClick(e) {
  state.inputCep.value = "";
  state.inputStreet.value = "";
  state.inputNumber.value = "";
  state.inputCity.value = "";

  setFormError("cep", "");
  setFormError("number", "");

  state.address = new Address();

  state.inputCep.focus();
}

function setFormError(key, value) {
  const element = document.querySelector(`[data-error="${key}"]`);
  element.innerHTML = value;
}
