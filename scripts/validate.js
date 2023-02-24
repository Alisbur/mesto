/*
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

//Шаблон вёрстки новой карточки
const newCardTemplate = document.querySelector('#article-id').content.querySelector('.elements__item');*/

document.forms["profilePopupForm"].elements.submitBtn.classList.add('popup__save-button_inactive');