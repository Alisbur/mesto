//Элементы на главной странице
const currentNameValue = document.querySelector('.profile__name');
const currentProfValue = document.querySelector('.profile__profession');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

//Элементы .popup
const popup = document.querySelector('.popup');
const popupForm = document.querySelector('[name="dataForm"]');

//Элементы .image-popup
const imagePopup = document.querySelector('.image-popup');

//Убираем мелькание формы при обновлении страницы
setTimeout(() => {
  popup.classList.add("popup_transition");
  imagePopup.classList.add("image-popup_transition");
}, 1);

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

const elementsContainer = document.querySelector('.elements');

function addArticle(name, link) {
  const articleTemplate = document.querySelector('#article-id').content;
  const article = articleTemplate.querySelector('.elements__item').cloneNode(true);
  article.querySelector('.elements__item-image').src = link;
  article.querySelector('.elements__item-image').alt = `Фото ${name}`;
  article.querySelector('.elements__item-title').textContent = name;
  article.querySelector('.elements__like-button').addEventListener('click', function (evt) {evt.target.classList.toggle('elements__like-button_active')});
  article.querySelector('.elements__del-button').addEventListener('click', function () {article.remove()});
  article.querySelector('.elements__item-image').addEventListener('click', function () {
    console.log('ПРивет');
    document.querySelector('.image-popup').classList.add('image-popup_opened');
    document.querySelector('.image-popup__title').textContent = name;
    document.querySelector('.image-popup__image').src = link;
    document.querySelector('.image-popup__image').alt = `Фото ${link}`;
    document.querySelector('.image-popup__exit-button').addEventListener('click', function () {
      document.querySelector('.image-popup').classList.remove('image-popup_opened');
    });
  });
  elementsContainer.prepend(article);
}

initialCards.forEach((el) => addArticle(el.name, el.link));

/*Вызов popup-окна редактирования профиля и копирование в него данных*/
editButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
  popupForm.querySelector('.popup__title').textContent="Редактировать профиль";
  popupForm.firstInput.value = currentNameValue.textContent;
  popupForm.secondInput.value = currentProfValue.textContent;
  popupForm.submitBtn.textContent = "Сохранить";
  popupForm.addEventListener('submit', handleFormSubmitEditProfile);
});

/*Вызов popup-окна добавления изображений*/
addButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
  popupForm.querySelector('.popup__title').textContent="Новое место";
  popupForm.firstInput.value = "";
  popupForm.secondInput.value = "";
  popupForm.firstInput.placeholder="Название";
  popupForm.secondInput.placeholder="Ссылка на картинку";
  popupForm.submitBtn.textContent = "Создать";
  popupForm.addEventListener('submit', handleFormSubmitAddPicture);
});

/*Закрытие popup-окна без сохранения данных*/
popupForm.closeBtn.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
  popupForm.removeEventListener('submit', handleFormSubmitEditProfile, false);
});

/*Функция-обработчик события submit на форме popup-окна изменения профиля*/
function handleFormSubmitEditProfile(evt) {
  evt.preventDefault();
  currentNameValue.textContent = popupForm.firstInput.value;
  currentProfValue.textContent = popupForm.secondInput.value;
  popup.classList.remove('popup_opened');
  popupForm.removeEventListener('submit', handleFormSubmitEditProfile, false);
}

/*Функция-обработчик события submit на форме popup-окна добавления изображения*/
function handleFormSubmitAddPicture(evt) {
  evt.preventDefault();
  if ((popupForm.firstInput.value)&&(popupForm.secondInput.value)) {
    addArticle(popupForm.firstInput.value, popupForm.secondInput.value)
  }
  popup.classList.remove('popup_opened');
  popupForm.removeEventListener('submit', handleFormSubmitAddPicture, false);
}
