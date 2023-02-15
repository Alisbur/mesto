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

//Элементы на главной странице
const currentNameValue = document.querySelector('.profile__name');
const currentProfValue = document.querySelector('.profile__profession');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

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
function addArticle(name, link) {
  const articleTemplate = document.querySelector('#article-id').content;
  const article = articleTemplate.querySelector('.elements__item').cloneNode(true);
  article.querySelector('.elements__item-image').src = link;
  article.querySelector('.elements__item-image').alt = `Фото ${name}`;
  article.querySelector('.elements__item-title').textContent = name;
  article.querySelector('.elements__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like-button_active')
  });
  article.querySelector('.elements__del-button').addEventListener('click', function () {
    article.remove()
  });
  article.querySelector('.elements__item-image').addEventListener('click', function () {
    openPopup(imagePopup);
    imagePopup.querySelector('.popup__image-subtitle').textContent = name;
    imagePopup.querySelector('.popup__image').src = link;
    imagePopup.querySelector('.popup__image').alt = `Фото ${name}`;
  });
  document.querySelector('.elements').prepend(article);
}

//Цикл добавления всех карточек из списка на страницу
initialCards.forEach((el) => addArticle(el.name, el.link));

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

profilePopup.querySelector('.popup__form').addEventListener('submit', handleProfilePopupFormSubmit);

//Вызов popup-окна добавления карточки нажатием на кнопку с крестиком
addButton.addEventListener('click', function () {
  openPopup(cardPopup);
  inputPlaceField.value = "";
  inputLinkField.value = "";
});

//Обработка submit в форме popup-окна добавления карточки
function handleCardPopupFormSubmit(evt) {
  evt.preventDefault();
  if ((inputPlaceField.value) && (inputLinkField.value))
    addArticle(inputPlaceField.value, inputLinkField.value);
  closePopup(cardPopup);
}

cardPopup.querySelector('.popup__form').addEventListener('submit', handleCardPopupFormSubmit);