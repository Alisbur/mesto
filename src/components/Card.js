export default class Card {
  //Конструктор класса Card
  constructor({ name, link }, newCardTemplate, handleCardClick) {
    this._name = name;
    this._link = link;
    this._newCardTemplate = newCardTemplate;
    this._handleCardClick = handleCardClick;
  }

  //Метод создания темплейта новой карточки
  _getTemplate() {
    const cardTemplate = document.querySelector(this._newCardTemplate).content.firstElementChild.cloneNode(true);;
    return cardTemplate;
  }

  //Хендлер удаления карточки нажатием на корзину
  _handleRemoveClick = () => {
    this._newCard.remove()
    this._newCard = null;
  }

  //Хендлер нажатия на сердечко
  _handleLikeClick = (evt) => {
    evt.target.classList.toggle('elements__like-button_active');
  }
  
  //Метод установки слушателей событий на карточку
  _setEventListeners = (isMine=false) => {
    this._newCard.querySelector('.elements__like-button').addEventListener('click', this._handleLikeClick);
    const delBtn = this._newCard.querySelector('.elements__del-button');
    isMine
      ? delBtn.addEventListener('click', this._handleRemoveClick)
      : delBtn.style.display = 'none';
    this._newCardImage.addEventListener('click', () => {this._handleCardClick({name:this._name, link:this._link})});
  }

  //Метод добавления контента и поведения новой карточки
  createCard(isMine=false) {
    this._newCard = this._getTemplate();
    this._newCardImage = this._newCard.querySelector('.elements__item-image');
    this._newCardImage.src = this._link;
    this._newCardImage.alt = `Фото ${this._name}`;
    this._newCard.querySelector('.elements__item-title').textContent = this._name;
    this._setEventListeners(isMine);
    return this._newCard;
  }
}