import Card from '../components/Card.js';
import Section from '../components/Section.js';
/*import Popup from '../components/Popup.js';*/
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards, validationConfig } from '../utils/constants.js';

//Элементы .popup
const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.card-popup');
const imagePopup = document.querySelector('.image-popup');

const iPopup = new PopupWithImage({
  popupSelector : '.image-popup',
  imageSelector : '.popup__image',
  subtitleSelector: '.popup__image-subtitle'
  });

/*//Элементы .profilePopup
const inputNameField = profilePopup.querySelector('.popup__input_type_name');
const inputProfField = profilePopup.querySelector('.popup__input_type_prof');

//Элементы .cardPopup
const inputPlaceField = cardPopup.querySelector('.popup__input_type_place');
const inputLinkField = cardPopup.querySelector('.popup__input_type_link');

//Элементы .imagePopup
const popupImage = imagePopup.querySelector('.popup__image');
const popupImageTitle = imagePopup.querySelector('.popup__image-subtitle');*/

//Элементы на главной странице
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

//Id шаблона вёрстки новой карточки
const newCardTemplate = '#article-id';

//Убираем мелькание попапов при обновлении страницы
setTimeout(() => {
  profilePopup.classList.add("popup_transition");
  cardPopup.classList.add("popup_transition");
  imagePopup.classList.add("popup_transition");
}, 1);

//Создаём экземпляр валидатора формы редактирования данных профиля
const profilePopupFormValidator = new FormValidator(document.forms["profilePopupForm"], validationConfig);
profilePopupFormValidator.enableValidation();

//Создаём экземпляр валидатора формы добавления карточек
const addCardPopupFormValidator = new FormValidator(document.forms["cardPopupForm"], validationConfig);
addCardPopupFormValidator.enableValidation();

//Обработчик открытия попапа с карточкой по клику на изображении
const handleCardClick = (name, link) => {
  iPopup.openPopup(name, link);
}

//Создаём экземпляр класса Section
const section = new Section({ data : initialCards, renderer: (name, link) => {
  const newCard = new Card(name, link, newCardTemplate, handleCardClick);
  const cardElement = newCard.createCard();
  return cardElement;
}}, '.elements');

//Отрисовываем карточки из initialCards
section.renderInitialCards();

const userInfo = new UserInfo ({ 
  nameSelector:'.profile__name', 
  profSelector: '.profile__profession' 
});

const pPopup = new PopupWithForm({
    popupSelector : '.profile-popup', 
    formSelector : '.popup__form',
    inputSelector : '.popup__input'
  },
  (values) => {
    userInfo.setUserInfo(values);
  });

const cPopup = new PopupWithForm({
    popupSelector : '.card-popup', 
    formSelector : '.popup__form',
    inputSelector : '.popup__input'
  }, 
  ({ place, link }) => {
    section.renderCard(place, link);
  });

editButton.addEventListener('click', () => {
  const values = userInfo.getUserInfo();
  pPopup.setInputValues(values);
  pPopup.openPopup();
  profilePopupFormValidator.resetFormErrors();
});

//Обработка submit в форме popup-окна редактирования профиля
/*function handleProfilePopupFormSubmit(evt) {
  evt.preventDefault();
  currentNameValue.textContent = inputNameField.value;
  currentProfValue.textContent = inputProfField.value;
  pPopup.closePopup();
}

//Добавляем listener для submit на форме изменения данных профиля
document.forms["profilePopupForm"].addEventListener('submit', handleProfilePopupFormSubmit);*/

//Вызов popup-окна добавления карточки нажатием на кнопку с крестиком
addButton.addEventListener('click', function () {
  cPopup.openPopup();
  addCardPopupFormValidator.resetFormErrors();
});

/*//Обработка submit в форме popup-окна добавления карточки
function handleCardPopupFormSubmit(evt) {
  evt.preventDefault();
  section.renderCard(inputPlaceField.value, inputLinkField.value);
  evt.target.reset();
  cPopup.closePopup();
}

//Добавляем listener для submit на форме добавления карточки
document.forms["cardPopupForm"].addEventListener('submit', handleCardPopupFormSubmit);*/