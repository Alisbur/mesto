import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitCallback = submitCallback;
  }

  _handlerSubmitForm = (evt) => {
    const values = this._getInputValues();
    evt.preventDefault();
    this._submitCallback(values);
    this.closePopup();
  }

  _setEventListeners () {
    super._setEventListeners();
    this._popup.addEventListener('submit', this._handlerSubmitForm);
  }

  _getInputValues() {
    const inputList = this._popup.querySelectorAll('.popup__input');
    const res = {};
    Array.from(inputList).map((el, ind) => res[`input${ind+1}`] = el.value);
    return res;
  }

  setInputValues({values}) {
    const inputList = this._popup.querySelectorAll('.popup__input');
    const res = {};
    Array.from(inputList).map((el, ind) => res[`input${ind+1}`] = el.value);
    return res;
  }

  closePopup () {
    super.closePopup();
    this._form.reset();
  }
}