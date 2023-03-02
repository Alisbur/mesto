//Элементы .imagePopup (по заданию разрешено?)
export const imagePopup = document.querySelector('.image-popup');
export const popupImage = imagePopup.querySelector('.popup__image');
export const popupImageTitle = imagePopup.querySelector('.popup__image-subtitle');

export class Card {
  //Конструктор класса Card
  constructor(name, link, newCardTemplate, openPopup) {
    this._name = name;
    this._link = link;
    this._newCardTemplate = newCardTemplate;
    this._openPopup = openPopup;
  }

  //Метод создания темплейта новой карточки
  _getTemplate() {
    const cardTemplate = document.querySelector(this._newCardTemplate).content.firstElementChild.cloneNode(true);;
    return cardTemplate;
  }

  _handleRemoveClick = () => {
    this._newCard.remove()
    this._newCard = null;
  }

  _handleLikeClick = (evt) => {
    evt.target.classList.toggle('elements__like-button_active');
  }

  _handleImageClick = () => {
    this._openPopup(imagePopup);
    popupImageTitle.textContent = this._name;
    popupImage.src = this._link;
    popupImage.alt = `Фото ${this._name}`;
  }

  //Метод добавления контента и поведения новой карточки
  createCard() {
    this._newCard = this._getTemplate();
    const newCardImage = this._newCard.querySelector('.elements__item-image');
    newCardImage.src = this._link;
    newCardImage.alt = `Фото ${this._name}`;
    this._newCard.querySelector('.elements__item-title').textContent = this._name;
    this._newCard.querySelector('.elements__like-button').addEventListener('click', this._handleLikeClick);
    this._newCard.querySelector('.elements__del-button').addEventListener('click', this._handleRemoveClick);
    newCardImage.addEventListener('click', this._handleImageClick);
    return this._newCard;
  }
}