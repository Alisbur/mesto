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

//Id шаблона вёрстки новой карточки
const newCardTemplate = '#article-id';

//Убираем мелькание попапов при обновлении страницы
setTimeout(() => {
  document.querySelector('.profile-popup').classList.add("popup_transition");
  document.querySelector('.card-popup').classList.add("popup_transition");
  document.querySelector('.image-popup').classList.add("popup_transition");
  }, 1);


//Создаём экземпляр данных профиля
const userInfo = new UserInfo ({ 
  nameSelector:'.profile__name', 
  profSelector: '.profile__profession',
  avaSelector: '.profile__avatar-button'
  });

//Создаём экземпляр api и запрашиваем данные на сервере
const api = new Api(connectionConfig);
const profileDataPromise = api.getProfileData();
const initialCardsPromise = api.getInitialCards();

console.log(profileDataPromise);

profileDataPromise.then((data) => {
  userInfo.setUserInfo({name:data.name, prof:data.about});
  userInfo.setUserAvatar({link:data.avatar});
});

initialCardsPromise.then((initialCards) => {
  const section = new Section({ data : initialCards, renderer: (cardData) => {
    const newCard = new Card(cardData, newCardTemplate, handleCardClick);
    const cardElement = newCard.createCard();
    return cardElement;
    }}, '.elements');
    section.renderInitialCards();
});

//Создаём экземпляр валидатора формы редактирования данных профиля
const profilePopupFormValidator = new FormValidator(document.forms["profilePopupForm"], validationConfig);
profilePopupFormValidator.enableValidation();

//Создаём экземпляр валидатора формы добавления карточек
const addCardPopupFormValidator = new FormValidator(document.forms["cardPopupForm"], validationConfig);
addCardPopupFormValidator.enableValidation();

//Создаём экземпляр валидатора формы загрузки аватара
const avatarEditPopupFormValidator = new FormValidator(document.forms["profileAvaPopupForm"], validationConfig);
avatarEditPopupFormValidator.enableValidation();

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
    api.modifyProfileData(values)
      .then((data)=>userInfo.setUserInfo({name:data.name, prof:data.about}))
      .catch((err)=>console.error('ХРЕНЬ', err));
    /*userInfo.setUserInfo(values);*/
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
    api.addNewCard(cardData).then((res) => console.log(res));
    /*section.renderCard(cardData);*/
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
(link) => {
  console.log('TEST',link);
  api.setUserAvatar(link)/*.then((data) => console.log(data))*/;
  userInfo.setUserAvatar(link);
});

avatarPopup.setEventListeners();

document.querySelector(".profile__avatar-button").addEventListener("click", () => {
  avatarPopup.openPopup();
  avatarEditPopupFormValidator.resetFormErrors();
  
  //confirmPopup.openPopup();
});


//-----------------------------ПОПАП ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ КАРТОЧКИ-----------------------------

//Создаём экземпляр попапа с формой подтверждения
const confirmPopup = new PopupWithConfirmation({
  popupSelector : '.confirm-popup', 
  formSelector : '.popup__form',
  inputSelector : '.popup__input',
},
(values) => {});
