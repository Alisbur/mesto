import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards, validationConfig } from './constants.js';

//Элементы .popup
const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.card-popup');
const imagePopup = document.querySelector('.image-popup');

//Элементы .profilePopup
const inputNameField = profilePopup.querySelector('.popup__input_type_name');
const inputProfField = profilePopup.querySelector('.popup__input_type_prof');

//Элементы .cardPopup
const inputPlaceField = cardPopup.querySelector('.popup__input_type_place');
const inputLinkField = cardPopup.querySelector('.popup__input_type_link');

//Элементы .imagePopup
const popupImage = imagePopup.querySelector('.popup__image');
const popupImageTitle = imagePopup.querySelector('.popup__image-subtitle');

//Элементы на главной странице
const currentNameValue = document.querySelector('.profile__name');
const currentProfValue = document.querySelector('.profile__profession');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

//Блок Elements для добавления карточек>
const elements = document.querySelector('.elements');

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

//Функция включения popup
const openPopup = function (popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("mousedown", handlerPopupCloseOnClick);
  window.addEventListener("keydown", handlerPopupCloseOnEscKeyDown);
}

function handlerPopupCloseOnClick(evt) {
  if(Array.from(evt.target.classList).includes('popup_opened')) {
    closePopup(evt.target);
  }
}

function handlerPopupCloseOnEscKeyDown(e) {
  if (e.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

//Функция выключения popup
const closePopup = function (popup) {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("mousedown", handlerPopupCloseOnClick);
  window.removeEventListener("keydown", handlerPopupCloseOnEscKeyDown);
}

const handleCardClick = (name, link) => {
  popupImageTitle.textContent = name;
  popupImage.src = link;
  popupImage.alt = `Фото ${name}`;
  openPopup(imagePopup);
}

//Выключение соответствующего popup нажатием на крестик
const exitBtns = document.querySelectorAll('.popup__exit-button');
exitBtns.forEach((btn) => btn.addEventListener('click', (evt) => closePopup(evt.target.closest('.popup'))));

//Функция добавления карточки на страницу
function addCard(card) {
  elements.prepend(card);
}

//Функция создания вёрстки новой карточки
function createNewCard(name, link) {
  const newCard = new Card(name, link, newCardTemplate, handleCardClick);
  const cardElement = newCard.createCard();
  return cardElement;
}

//Цикл добавления всех карточек из списка на страницу
initialCards.forEach((el) => {
  const newCard = createNewCard(el.name, el.link);
  addCard(newCard);
});

//Вызов popup-окна редактирования профиля нажатием на кнопку с карандашом
editButton.addEventListener('click', () => {
  openPopup(profilePopup);
  inputNameField.value = currentNameValue.textContent;
  inputProfField.value = currentProfValue.textContent;
  profilePopupFormValidator.resetFormErrors();
});

//Обработка submit в форме popup-окна редактирования профиля
function handleProfilePopupFormSubmit(evt) {
  evt.preventDefault();
  currentNameValue.textContent = inputNameField.value;
  currentProfValue.textContent = inputProfField.value;
  closePopup(profilePopup);
}

//Добавляем listener для submit на форме изменения данных профиля
document.forms["profilePopupForm"].addEventListener('submit', handleProfilePopupFormSubmit);

//Вызов popup-окна добавления карточки нажатием на кнопку с крестиком
addButton.addEventListener('click', function () {
  openPopup(cardPopup);
  addCardPopupFormValidator.resetFormErrors();
});

//Обработка submit в форме popup-окна добавления карточки
function handleCardPopupFormSubmit(evt) {
  evt.preventDefault();
  const newCard = createNewCard(inputPlaceField.value, inputLinkField.value);
  addCard(newCard);
  evt.target.reset();
  closePopup(cardPopup);
}

//Добавляем listener для submit на форме добавления карточки
document.forms["cardPopupForm"].addEventListener('submit', handleCardPopupFormSubmit);