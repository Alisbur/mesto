import "./index.css"

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards, validationConfig } from '../utils/constants.js';

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

//Создаём экземпляр валидатора формы редактирования данных профиля
const profilePopupFormValidator = new FormValidator(document.forms["profilePopupForm"], validationConfig);
profilePopupFormValidator.enableValidation();

//Создаём экземпляр валидатора формы добавления карточек
const addCardPopupFormValidator = new FormValidator(document.forms["cardPopupForm"], validationConfig);
addCardPopupFormValidator.enableValidation();

//Создаём экземпляр попапа с изображением
const iPopup = new PopupWithImage({
  popupSelector : '.image-popup',
  imageSelector : '.popup__image',
  subtitleSelector: '.popup__image-subtitle'
  });
iPopup.setEventListeners();

//Обработчик открытия попапа с изображением по клику на изображении карточки
const handleCardClick = (cardData) => {
  iPopup.openPopup(cardData);
}

//Создаём экземпляр класса Section
const section = new Section({ data : initialCards, renderer: (cardData) => {
  const newCard = new Card(cardData, newCardTemplate, handleCardClick);
  const cardElement = newCard.createCard();
  return cardElement;
  }}, '.elements');

//Отрисовываем карточки из initialCards
section.renderInitialCards();

//Создаём экземпляр данных профиля
const userInfo = new UserInfo ({ 
  nameSelector:'.profile__name', 
  profSelector: '.profile__profession' 
  });

//Создаём экземпляр попапа с формой редактирования данных профиля
const pPopup = new PopupWithForm({
    popupSelector : '.profile-popup', 
    formSelector : '.popup__form',
    inputSelector : '.popup__input'
  },
  (values) => {
    userInfo.setUserInfo(values);
  });
pPopup.setEventListeners();

//Создаём экземпляр попапа с формой добавления карточки места
const cPopup = new PopupWithForm({
    popupSelector : '.card-popup', 
    formSelector : '.popup__form',
    inputSelector : '.popup__input'
  }, 
  (cardData) => {
    section.renderCard(cardData);
  });
cPopup.setEventListeners();

//Вызов popup с формой редактирования данных профиля нажатием на кнопку с ручкой
editButton.addEventListener('click', () => {
  const values = userInfo.getUserInfo();
  pPopup.setInputValues(values);
  pPopup.openPopup();
  profilePopupFormValidator.resetFormErrors();
  });

//Вызов popup-окна с формой добавления карточки нажатием на кнопку с крестиком
addButton.addEventListener('click', function () {
  cPopup.openPopup();
  addCardPopupFormValidator.resetFormErrors();
  });