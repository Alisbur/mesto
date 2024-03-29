export default class Card {
  //Конструктор класса Card
  constructor({ name, link }, newCardTemplate, handleCardClick, 
                cardId = '', isMine = true, likes = 0, isLikedByMe = false, 
                putLike, deleteLike, deleteCard) 
  {
  //Обязательные параметры и методы карточек
    this._name = name;
    this._link = link;
    this._newCardTemplate = newCardTemplate;
    this._handleCardClick = handleCardClick;
    
  //Параметры карточек, загржаемых с сервера
    this._cardId = cardId;
    this._isMine = isMine;
    this._likes = likes;
    this._isLikedByMe = isLikedByMe;

  //Методы карточек
    this._putLike = putLike;
    this._deleteLike = deleteLike;
    this._deleteCard = deleteCard;
  }

  //Метод создания темплейта новой карточки
  _getTemplate() {
    const cardTemplate = document.querySelector(this._newCardTemplate).content.firstElementChild.cloneNode(true);;
    return cardTemplate;
  }

  //Хендлер удаления карточки нажатием на корзину
  _handleRemoveClick = () => {
    console.log(this._newCard);
    this._deleteCard(this._cardId, this._newCard);
  }

  //Хендлер нажатия на иконку сердечка
  _handleLikeClick = () => {
    if (this._isLikedByMe) 
      this._deleteLike(this._cardId, this);
    else 
      this._putLike(this._cardId, this);
  }
  
  //Метод установки слушателей событий на карточку
  _setEventListeners = () => {
    this._likeBtn.addEventListener('click', this._handleLikeClick);
    this._isMine
      ? this._delBtn.addEventListener('click', this._handleRemoveClick)
      : this._delBtn.style.display = 'none';
    this._newCardImage.addEventListener('click', () => {this._handleCardClick({name:this._name, link:this._link})});
  }

  //Метод добавления количества лайков и установки актуального состояния иконки сердечка
  setLikes(likes = this._likes, isLiked = this._isLikedByMe) {
    this._likesCounter.textContent = likes;
    if (isLiked)
      this._likeBtn.classList.add('elements__like-button_active');
    else 
      this._likeBtn.classList.remove('elements__like-button_active');
    this._isLikedByMe = isLiked;
  }

  //Метод добавления контента и поведения новой карточки
  createCard() {
    this._newCard = this._getTemplate();
    this._newCardImage = this._newCard.querySelector('.elements__item-image');
    this._newCardImage.src = this._link;
    this._newCardImage.alt = `Фото ${this._name}`;
    this._newCard.querySelector('.elements__item-title').textContent = this._name;
    this._likesCounter = this._newCard.querySelector('.elements__likes');
    this._delBtn = this._newCard.querySelector('.elements__del-button');
    this._likeBtn = this._newCard.querySelector('.elements__like-button');
    this.setLikes();
    this._setEventListeners();
    return this._newCard;
  }
}