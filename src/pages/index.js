import "./index.css"

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';
import { validationConfig, connectionConfig } from '../utils/constants.js';

//Константы кнопок на главной странице
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avaButton = document.querySelector(".profile__avatar-button");

//Id шаблона вёрстки новой карточки
const newCardTemplate = '#article-id';

//Убираем мелькание попапов при обновлении страницы
setTimeout(() => {
  document.querySelector('.profile-popup').classList.add("popup_transition");
  document.querySelector('.card-popup').classList.add("popup_transition");
  document.querySelector('.image-popup').classList.add("popup_transition");
  document.querySelector('.profile-ava-popup').classList.add("popup_transition");
  document.querySelector('.confirm-popup').classList.add("popup_transition");
  }, 1);

//Создаём экземпляр данных профиля
const userInfo = new UserInfo ({ 
  nameSelector:'.profile__name', 
  profSelector: '.profile__profession',
  avaSelector: '.profile__avatar-button',
  });


//Создаём экземпляр api
const api = new Api(connectionConfig);

//Создаём экземпляр секции для добавления карточек
const section = new Section((cardData, id='') => {
  const isMine = id === cardData.owner._id;
  const likes = cardData.likes.length;
  const isLikedByMe = cardData.likes.some((el)=>el._id===id);
  console.log(isLikedByMe);

  const newCard = new Card(cardData, newCardTemplate, handleCardClick, cardData._id, isMine, likes, isLikedByMe, 
    (cardId)=>{return api.putLike(cardId)}, 
    (cardId)=>{return api.deleteLike(cardId)}  
  );
  const cardElement = newCard.createCard();
  return cardElement;
  }, '.elements');

//Запрашиваем данные пользователя
/*const getProfileDataRequest = api.getProfileData();
getProfileDataRequest.then((data) => {
  userInfo.setUserId({ id:data._id });
  userInfo.setUserInfo({name:data.name, prof:data.about});
  userInfo.setUserAvatar({link:data.avatar});
});

const getInitialCardsRequest = api.getInitialCards();
  getInitialCardsRequest
    .then((initialCards) => {section.renderInitialCards(initialCards);
    getProfileDataRequest.then(data=>temp=data._id).then(()=>console.log(temp));
  });*/

api.getProfileData()
  .then((data) => {
    userInfo.setUserInfo({name:data.name, prof:data.about});
    userInfo.setUserAvatar({link:data.avatar});
    return data._id;
  })
  .then((myId) => {
    api.getInitialCards()
      .then(initialCards => {
        section.renderInitialCards(initialCards, myId);
        console.log(initialCards);
      });
  });

/*  console.log(getInitialCardsRequest);*/

//Создаём экземпляр валидатора формы редактирования данных профиля
const profilePopupFormValidator = new FormValidator(document.forms["profilePopupForm"], validationConfig);
profilePopupFormValidator.enableValidation();

//Создаём экземпляр валидатора формы добавления карточек
const addCardPopupFormValidator = new FormValidator(document.forms["cardPopupForm"], validationConfig);
addCardPopupFormValidator.enableValidation();

//Создаём экземпляр валидатора формы загрузки аватара
const avatarEditPopupFormValidator = new FormValidator(document.forms["profileAvaPopupForm"], validationConfig);
avatarEditPopupFormValidator.enableValidation();

//-----------------------------ПОПАП С ИЗОБРАЖЕНИЕМ-----------------------------

//Создаём экземпляр попапа с изображением
const imagePopup = new PopupWithImage({
  popupSelector : '.image-popup',
  imageSelector : '.popup__image',
  subtitleSelector: '.popup__image-subtitle'
  });
imagePopup.setEventListeners();

//Обработчик открытия попапа с изображением по клику на изображении карточки
const handleCardClick = (cardData) => {
  imagePopup.openPopup(cardData);
}

//-----------------------------ПОПАП ДАННЫХ ПРОФИЛЯ-----------------------------

//Создаём экземпляр попапа с формой редактирования данных профиля
const profilePopup = new PopupWithForm({
    popupSelector : '.profile-popup', 
    formSelector : '.popup__form',
    inputSelector : '.popup__input',
    sbmtBtnSelector : '.popup__save-button'
  },
  (values) => {
    const modifyProfileDataRequest = api.modifyProfileData(values);
    modifyProfileDataRequest
      .then((data)=>userInfo.setUserInfo({name:data.name, prof:data.about}))
      .catch((err)=>console.error('ОШИБКА', err));
      return modifyProfileDataRequest;
  });
  profilePopup.setEventListeners();

//Вызов popup с формой редактирования данных профиля нажатием на кнопку с ручкой
editButton.addEventListener('click', () => {
  const values = userInfo.getUserInfo();
  profilePopup.setInputValues(values);
  profilePopup.openPopup();
  profilePopupFormValidator.resetFormErrors();
  });
  

//-----------------------------ПОПАП КАРТОЧКИ МЕСТА-----------------------------

//Создаём экземпляр попапа с формой добавления карточки места
const cardPopup = new PopupWithForm({
    popupSelector : '.card-popup', 
    formSelector : '.popup__form',
    inputSelector : '.popup__input',
    sbmtBtnSelector : '.popup__save-button'
  }, 
  (cardData) => {
    const addNewCardRequest = api.addNewCard(cardData).then((initialCards)=>section.renderInitialCards(initialCards));
    return addNewCardRequest;
  }); 
  cardPopup.setEventListeners();

//Вызов popup-окна с формой добавления карточки нажатием на кнопку с крестиком
addButton.addEventListener('click', function () {
  cardPopup.openPopup();
  addCardPopupFormValidator.resetFormErrors();
  });

//-----------------------------ПОПАП ЗАГРУЗКИ АВАТАРА-----------------------------

//Создаём экземпляр попапа с формой редактирования аватара профиля
const avatarPopup = new PopupWithForm({
  popupSelector : '.profile-ava-popup', 
  formSelector : '.popup__form',
  inputSelector : '.popup__input',
  sbmtBtnSelector : '.popup__save-button'
},
(lnk) => {
  const avatarSetupRequest = api.setUserAvatar(lnk);
  avatarSetupRequest.then((data) => userInfo.setUserAvatar({ link:data.avatar}));
  return avatarSetupRequest;
});
avatarPopup.setEventListeners();

avaButton.addEventListener("click", () => {
  avatarPopup.openPopup();
  avatarEditPopupFormValidator.resetFormErrors();
});


//-----------------------------ПОПАП ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ КАРТОЧКИ-----------------------------

//Создаём экземпляр попапа с формой подтверждения
const confirmPopup = new PopupWithConfirmation({
  popupSelector : '.confirm-popup', 
  formSelector : '.popup__form',
  inputSelector : '.popup__input',
},
(values) => {});
