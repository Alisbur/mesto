//Элементы .imagePopup
export const imagePopup = document.querySelector('.image-popup');
export const popupImage = imagePopup.querySelector('.popup__image');
export const popupImageTitle = imagePopup.querySelector('.popup__image-subtitle');

export class Card {
  constructor(name, link, newCardTemplate, openPopup) {
    this._name = name;
    this._link = link;
    this._newCardTemplate = newCardTemplate;
    this._openPopup = openPopup;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._newCardTemplate).content.firstElementChild;
    return cardTemplate;
  }

  //Функция создания новой карточки
  createCard() {
    const newCard = this._getTemplate().cloneNode(true);
    const newCardImage = newCard.querySelector('.elements__item-image');

    newCardImage.src = this._link;
    newCardImage.alt = `Фото ${this._name}`;
    newCard.querySelector('.elements__item-title').textContent = this._name;
    newCard.querySelector('.elements__like-button').addEventListener('click', (evt) => {
      evt.target.classList.toggle('elements__like-button_active')
    });
    newCard.querySelector('.elements__del-button').addEventListener('click', () => {
      newCard.remove()
    });
    newCardImage.addEventListener('click', () => {
      this._openPopup(imagePopup);
      popupImageTitle.textContent = this._name;
      popupImage.src = this._link;
      popupImage.alt = `Фото ${this._name}`;
    });
    return newCard;
  }
}