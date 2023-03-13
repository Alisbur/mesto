export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  //Установка обработчиков попапа
  _setEventListeners () {
    this._popup.addEventListener("mousedown", this._handlerPopupCloseOnClick);
    this._popup.querySelector('.popup__exit-button').addEventListener("click", this._handlerPopupCloseOnExitClick);
    window.addEventListener("keydown", this._handlerPopupCloseOnEscKeyDown);
  }

  //Обработчик закрытия поклику на крестик или оверлей
  _handlerPopupCloseOnExitClick = () => {
    this.closePopup();
    }

  //Обработчик закрытия поклику на крестик или оверлей
  _handlerPopupCloseOnClick = (evt) => {
    if(evt.target.classList.contains('popup_opened')) {
      this.closePopup();
    }
  }

  //Обработчик нажатия Esc
  _handlerPopupCloseOnEscKeyDown = (e) => {
    if (e.key === 'Escape') {
      this.closePopup();
    }
  }

  //Метод открытия popup  
  openPopup () {
    this._popup.classList.add("popup_opened");
    this._setEventListeners();
  }

  //Метод закрытия popup
  closePopup () {
    this._popup.classList.remove("popup_opened");
    this._popup.removeEventListener("mousedown", this._handlerPopupCloseOnClick);
    this._popup.querySelector('.popup__exit-button').removeEventListener("click", this._handlerPopupCloseOnExitClick);
    window.removeEventListener("keydown", this._handlerPopupCloseOnEscKeyDown);
  }
}