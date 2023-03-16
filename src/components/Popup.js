export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  //Установка обработчиков попапа
  setEventListeners () {
    this._popup.addEventListener("mousedown", this._handlerPopupCloseOnClick);
    this._popup.querySelector('.popup__exit-button').addEventListener("click", this._handlerPopupCloseOnExitClick);
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
    window.addEventListener("keydown", this._handlerPopupCloseOnEscKeyDown);
  }

  //Метод закрытия popup
  closePopup () {
    window.removeEventListener("keydown", this._handlerPopupCloseOnEscKeyDown);
    this._popup.classList.remove("popup_opened");
  }
}