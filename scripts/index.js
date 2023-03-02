import { imagePopup, popupImage, popupImageTitle, Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards, validationConfig } from './constants.js';

//Элементы .popup
const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.card-popup');

//Элементы .profilePopup
const inputNameField = profilePopup.querySelector('.popup__input_type_name');
const inputProfField = profilePopup.querySelector('.popup__input_type_prof');

//Элементы .cardPopup
const inputPlaceField = cardPopup.querySelector('.popup__input_type_place');
const inputLinkField = cardPopup.querySelector('.popup__input_type_link');

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
  popup.removeEventListener("click", handlerPopupCloseOnClick);
  window.removeEventListener("keydown", handlerPopupCloseOnEscKeyDown);
}

//Выключение соответствующего popup нажатием на крестик
const exitBtns = document.querySelectorAll('.popup__exit-button');
exitBtns.forEach((btn) => btn.addEventListener('click', (evt) => closePopup(evt.target.closest('.popup'))));

//Функция добавления карточки на страницу
function addCard(card) {
  elements.prepend(card);
}

//Цикл добавления всех карточек из списка на страницу
initialCards.forEach((el) => {
  const newCard = new Card(el.name, el.link, newCardTemplate, openPopup);
  addCard(newCard.createCard());
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
  const newCard = new Card(inputPlaceField.value, inputLinkField.value, newCardTemplate, openPopup);
  addCard(newCard.createCard());
  evt.target.reset();
  closePopup(cardPopup);
}

//Добавляем listener для submit на форме добавления карточки
document.forms["cardPopupForm"].addEventListener('submit', handleCardPopupFormSubmit);