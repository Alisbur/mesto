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
const newCardTemplate = document.querySelector('#article-id').content.querySelector('.elements__item');

//Убираем мелькание попапов при обновлении страницы
setTimeout(() => {
  profilePopup.classList.add("popup_transition");
  cardPopup.classList.add("popup_transition");
  imagePopup.classList.add("popup_transition");
}, 1);

//Функция включения popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

//Функция выключения popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

//Выключение соответствующего popup нажатием на крестик
const exitBtns = document.querySelectorAll('.popup__exit-button');
exitBtns.forEach((btn) => btn.addEventListener('click', (evt) => closePopup(evt.target.closest('.popup'))));

//Список мест и ссылок на изображения 6 из задания + 6 из ПР4
const initialCards = [
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

//Функция добавления карточки на страницу
function createCard(name, link) {
  const newCard = newCardTemplate.cloneNode(true);
  const newCardImage = newCard.querySelector('.elements__item-image');

  newCardImage.src = link;
  newCardImage.alt = `Фото ${name}`;
  newCard.querySelector('.elements__item-title').textContent = name;
  newCard.querySelector('.elements__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like-button_active')
  });
  newCard.querySelector('.elements__del-button').addEventListener('click', function () {
    newCard.remove()
  });
  newCardImage.addEventListener('click', function () {
    openPopup(imagePopup);
    popupImageTitle.textContent = name;
    popupImage.src = link;
    popupImage.alt = `Фото ${name}`;
  });
  return(newCard);
}

function addCard(card) {
  elements.prepend(card);
}

//Цикл добавления всех карточек из списка на страницу
initialCards.forEach((el) => addCard(createCard(el.name, el.link)));

//Вызов popup-окна редактирования профиля нажатием на кнопку с карандашом
editButton.addEventListener('click', () => {
  openPopup(profilePopup);
  inputNameField.value = currentNameValue.textContent;
  inputProfField.value = currentProfValue.textContent;
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
});

//Обработка submit в форме popup-окна добавления карточки
function handleCardPopupFormSubmit(evt) {
  evt.preventDefault();
  if ((inputPlaceField.value) && (inputLinkField.value))
    addCard(createCard(inputPlaceField.value, inputLinkField.value));
  evt.target.reset();
  closePopup(cardPopup);
}

//Добавляем listener для submit на форме добавления карточки
document.forms["cardPopupForm"].addEventListener('submit', handleCardPopupFormSubmit);