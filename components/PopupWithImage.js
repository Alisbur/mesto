import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  openPopup (name, link) {
    this._popup.querySelector('.popup__image').src = link;
    this._popup.querySelector('.popup__image').alt = `Фото ${name}`;
    this._popup.querySelector('.popup__image-subtitle').textContent = name;
    super.openPopup();
  }
}