//Список мест и ссылок на изображения 6 из задания + 6 из ПР4
import capetown from '../images/cape-town.jpg';
import macau from '../images/macau.jpg';
import havaii from '../images/havaii.jpg';
import florianopolis from '../images/florianopolis.jpg';
import tenerife from '../images/tenerife.jpg';
import saintPetersburg from '../images/saint-petersburg.jpg';


export const initialCards = [
  {
    name: 'Кейптаун, ЮАР',
    link: capetown
  },
  {
    name: 'Макао, Китай',
    link: macau
  },
  {
    name: 'Гавайи, США',
    link: havaii
  },
  {
    name: 'Флорианополис, Бразилия',
    link: florianopolis
  },
  {
    name: 'Тенерифе, Канарские острова',
    link: tenerife
  },
  {
    name: 'Санкт-Петербург, Россия',
    link: saintPetersburg
  },
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Типы селекторов для валидации
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};