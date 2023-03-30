import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, formSelector }, submitCallBack) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelector);
    this._submitCallBack = submitCallBack;
  }

  //Обработчик сабмита формы
  _handlerSubmitForm = (evt) => {
    evt.preventDefault();
    this._submitCallBack(this._cardId, this._cardEl)
      .then(() => {console.log(this._cardEl);this._cardEl.remove()})
      .finally(() => this.closePopup());
  }

  //Метод установки слушателей событий на попап и форму
  setEventListeners () {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handlerSubmitForm);
  }

  //Метод открытия Popup
  openPopup (cardId, cardEl) {
    super.openPopup();
    this._cardId = cardId;
    this._cardEl = cardEl;
  }

  //Метод закрытия попапа
  closePopup () {
    super.closePopup();
    setTimeout(() => this._form.reset(), 400); //пауза перед сбросом, чтобы значения не менялись пока попап гаснет
  }
}