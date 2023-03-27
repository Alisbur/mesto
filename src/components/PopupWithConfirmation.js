import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, formSelector }, submitCallback) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelector);
    this._submitCallback = submitCallback;
  }

  //Обработчик сабмита формы
  _handlerSubmitForm = (evt) => {
    evt.preventDefault();
    this._submitCallback();
    this.closePopup();
  }

  //Метод установки слушателей событий на попап и форму
  setEventListeners () {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handlerSubmitForm);
  }

  //Метод закрытия попапа
  closePopup () {
    super.closePopup();
    setTimeout(() => this._form.reset(), 400); //пауза перед сбросом, чтобы значения не менялись пока попап гаснет
  }
}