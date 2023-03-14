import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, formSelector, inputSelector }, submitCallback) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelector);
    this._inputList = this._popup.querySelectorAll(inputSelector);
    this._submitCallback = submitCallback;
  }

  _handlerSubmitForm = (evt) => {
    evt.preventDefault();
    const values = this._getInputValues();
    console.log(values);
    this._submitCallback(values);
    this.closePopup();
  }

  _setEventListeners () {
    super._setEventListeners();
    this._form.addEventListener('submit', this._handlerSubmitForm);
  }

  _getInputValues() {
    const values = {};
    Array.from(this._inputList).forEach((el) => values[el.name] = el.value);
    console.log(values);
    return values;
  }

  setInputValues(values) {
    this._inputList.forEach(el => el.value = values[el.name]);
  }

  closePopup () {
    super.closePopup();
    /*this._form.reset();*/
  }
}