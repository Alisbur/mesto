import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, formSelector, inputSelector }, submitCallback) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelector);
    this._inputList = this._popup.querySelectorAll(inputSelector);
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

  //Метод получения данных полей ввода
  _getInputValues() {
    const values = {};
    Array.from(this._inputList).forEach((el) => values[el.name] = el.value);
    return values;
  }
  
  //Метод установки данных полей ввода (для полей формы редактирования данных профиля)
  setInputValues(values) {
    this._inputList.forEach(el => el.value = values[el.name]);
  }

  //Метод закрытия попапа
  closePopup () {
    super.closePopup();
    setTimeout(() => this._form.reset(), 400); //пауза перед сбросом, чтобы значения не менялись пока попап гаснет
  }
}