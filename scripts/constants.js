//Список мест и ссылок на изображения 6 из задания + 6 из ПР4
export const initialCards = [
  {
    name: 'Кейптаун, ЮАР',
    link: './images/cape-town.jpg'
  },
  {
    name: 'Макао, Китай',
    link: './images/macau.jpg'
  },
  {
    name: 'Гавайи, США',
    link: './images/havaii.jpg'
  },
  {
    name: 'Флорианополис, Бразилия',
    link: './images/florianopolis.jpg'
  },
  {
    name: 'Тенерифе, Канарские острова',
    link: './images/tenerife.jpg'
  },
  {
    name: 'Санкт-Петербург, Россия',
    link: './images/saint-petersburg.jpg'
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