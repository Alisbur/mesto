import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor ({ popupSelector, imageSelector, subtitleSelector }) {
    super(popupSelector);
    this._image = this._popup.querySelector(imageSelector);
    this._imageSubtitle = this._popup.querySelector(subtitleSelector);
  }

  //Метод открытия попапа с изображением
  openPopup ( {name, link} ) {
    this._image.src = link;
    this._image.alt = `Фото ${name}`;
    this._imageSubtitle.textContent = name;
    super.openPopup();
  }
}