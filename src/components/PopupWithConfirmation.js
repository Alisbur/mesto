import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, formSelector, btnSelector }, submitCallback) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelector);
    this._btn = this._popup.querySelectorAll(btnSelector);
    this._submitCallback = submitCallback;
  }
  
  //Обработчик сабмита формы
  _handlerSubmitForm = (evt) => {
    evt.preventDefault();
    const values = this._getInputValues();
    this._submitCallback(values);
    this.closePopup();
  }

  //Метод установки слушателей событий на попап и форму
  setEventListeners () {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handlerSubmitForm);
  }

  renderSaving(isSaving) {
    if (isSaving) {
      this.btn.textContent = 'Сохранение...';
    } else {
      this.btn.textContent = 'Сохранить';
    }
  }

  //Метод закрытия попапа
  closePopup () {
    super.closePopup();
    setTimeout(() => this._form.reset(), 400); //пауза перед сбросом, чтобы значения не менялись пока попап гаснет
  }
}