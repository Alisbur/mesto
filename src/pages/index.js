import "./index.css"

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';
import { validationConfig, connectionConfig } from '../utils/constants.js';

//Константы кнопок на главной странице
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avaButton = document.querySelector(".profile__avatar-button");

//Id шаблона вёрстки новой карточки
const newCardTemplate = '#article-id';

//Убираем мелькание попапов при обновлении страницы
setTimeout(() => {
  document.querySelector('.profile-popup').classList.add("popup_transition");
  document.querySelector('.card-popup').classList.add("popup_transition");
  document.querySelector('.image-popup').classList.add("popup_transition");
  document.querySelector('.profile-ava-popup').classList.add("popup_transition");
  document.querySelector('.confirm-popup').classList.add("popup_transition");
  }, 1);

//Создаём экземпляр валидатора формы редактирования данных профиля
const profilePopupFormValidator = new FormValidator(document.forms["profilePopupForm"], validationConfig);
profilePopupFormValidator.enableValidation();

//Создаём экземпляр валидатора формы добавления карточек
const addCardPopupFormValidator = new FormValidator(document.forms["cardPopupForm"], validationConfig);
addCardPopupFormValidator.enableValidation();

//Создаём экземпляр валидатора формы загрузки аватара
const avatarEditPopupFormValidator = new FormValidator(document.forms["profileAvaPopupForm"], validationConfig);
avatarEditPopupFormValidator.enableValidation();

//Создаём экземпляр данных профиля
const userInfo = new UserInfo ({ 
  nameSelector:'.profile__name', 
  profSelector: '.profile__profession',
  avaSelector: '.profile__avatar-button',
  });

//Создаём экземпляр api
const api = new Api(connectionConfig);

//Обработчик постановки лайка и обновления количества лайков
const handlePutLike = (cardId, cardEl) => {
  api.putLike(cardId)
    .then((res) => {
      cardEl.setLikes(res.likes.length, true);
      return true;
    })
    .catch((err) => {
      alert(`Запрос на установку лайка не выполнен! Ошибка: ${err}`);
      console.error(`Запрос на установку лайка не выполнен! Ошибка: ${err}`)
    });
}

//Обработчик удаления лайка и обновления количества лайков
const handleDeleteLike = (cardId, cardEl) => {
  api.deleteLike(cardId)
    .then((res) => {
      cardEl.setLikes(res.likes.length, false);
      return false;
    })
    .catch((err) => {
      alert(`Запрос на удаление лайка не выполнен! Ошибка: ${err}`);
      console.error(`Запрос на удаление лайка не выполнен! Ошибка: ${err}`)
    });
}

//Создаём экземпляр секции для добавления карточек
const section = new Section((cardData, id=cardData.owner._id) => {
  const isMine = id === cardData.owner._id;
  const likes = cardData.likes.length;
  const isLikedByMe = cardData.likes.some((el)=>el._id===id);
  const newCard = new Card(cardData, newCardTemplate, handleCardClick, cardData._id, isMine, likes, isLikedByMe, 
    handlePutLike, handleDeleteLike, (cardId, cardEl)=>confirmPopup.openPopup(cardId, cardEl));
  const cardElement = newCard.createCard();
  return cardElement;
  }, '.elements');

//Получаем данные пользователя и выводим массив карточек
api.getProfileData()
  .then((data) => {
    userInfo.setUserInfo({name:data.name, prof:data.about});
    userInfo.setUserAvatar({link:data.avatar});
    return data._id;
  })
  .then((myId) => {
    api.getInitialCards()
      .then(initialCards => {
        section.renderInitialCards(initialCards, myId);
      })
      .catch((err) => {
        alert(`Не удалось загрузить данные карточек! Ошибка: ${err}`);
        console.error(`Не удалось загрузить данные карточек! Ошибка: ${err}`)
      });
  })
  .catch((err) => {
    alert(`Не удалось загрузить данные профиля пользователя! Ошибка: ${err}`);
    console.error(`Не удалось загрузить данные профиля пользователя! Ошибка: ${err}`)
  });

//-----------------------------ПОПАП С ИЗОБРАЖЕНИЕМ-----------------------------

//Создаём экземпляр попапа с изображением
const imagePopup = new PopupWithImage({
  popupSelector : '.image-popup',
  imageSelector : '.popup__image',
  subtitleSelector: '.popup__image-subtitle'
  });
imagePopup.setEventListeners();

//Обработчик открытия попапа с изображением по клику на изображении карточки
const handleCardClick = (cardData) => {
  imagePopup.openPopup(cardData);
}

//-----------------------------ПОПАП ДАННЫХ ПРОФИЛЯ-----------------------------

//Создаём экземпляр попапа с формой редактирования данных профиля
const profilePopup = new PopupWithForm({
    popupSelector : '.profile-popup', 
    formSelector : '.popup__form',
    inputSelector : '.popup__input',
    sbmtBtnSelector : '.popup__save-button'
  },
  (values) => {
    return api.modifyProfileData(values)
    .then((data) => {
      userInfo.setUserInfo({name:data.name, prof:data.about});
      profilePopup.closePopup();      
    })
    .catch((err) => {
      alert(`Запрос на изменение данных профиля не выполнен! Ошибка: ${err}`);
      console.error(`Запрос на изменение данных профиля не выполнен! Ошибка: ${err}`);
    });
  });
  profilePopup.setEventListeners();

//Вызов popup с формой редактирования данных профиля нажатием на кнопку с ручкой
editButton.addEventListener('click', () => {
  const values = userInfo.getUserInfo();
  profilePopup.setInputValues(values);
  profilePopup.openPopup();
  profilePopupFormValidator.resetFormErrors();
  });

//-----------------------------ПОПАП КАРТОЧКИ МЕСТА-----------------------------

//Создаём экземпляр попапа с формой добавления карточки места
const cardPopup = new PopupWithForm({
    popupSelector : '.card-popup', 
    formSelector : '.popup__form',
    inputSelector : '.popup__input',
    sbmtBtnSelector : '.popup__save-button'
  }, 
  (cardData) => {
    api.addNewCard(cardData)
      .then((res)=>{
        section.addItem(res,res.owner._id);
        cardPopup.closePopup();
      })
      .catch((err) => {
        alert(`Запрос на добавление карточки не выполнен! Ошибка: ${err}`);
        console.error(`Запрос на добавление карточки не выполнен! Ошибка: ${err}`)
      });
  }); 
  cardPopup.setEventListeners();

//Вызов popup-окна с формой добавления карточки нажатием на кнопку с крестиком
addButton.addEventListener('click', function () {
  cardPopup.openPopup();
  addCardPopupFormValidator.resetFormErrors();
  });

//-----------------------------ПОПАП ЗАГРУЗКИ АВАТАРА-----------------------------

//Создаём экземпляр попапа с формой редактирования аватара профиля
const avatarPopup = new PopupWithForm({
  popupSelector : '.profile-ava-popup', 
  formSelector : '.popup__form',
  inputSelector : '.popup__input',
  sbmtBtnSelector : '.popup__save-button'
},
(lnk) => {
  api.setUserAvatar(lnk)
    .then((data) => {
      userInfo.setUserAvatar({ link:data.avatar});
      avatarPopup.closePopup();      
    })
    .catch((err) => {
      alert(`Запрос на изменение аватара не выполнен! Ошибка: ${err}`);
      console.error(`Запрос на изменение аватара не выполнен! Ошибка: ${err}`);
    });
});
avatarPopup.setEventListeners();

avaButton.addEventListener("click", () => {
  avatarPopup.openPopup();
  avatarEditPopupFormValidator.resetFormErrors();
});

//-----------------------------ПОПАП ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ КАРТОЧКИ-----------------------------

//Создаём экземпляр попапа с формой подтверждения
const confirmPopup = new PopupWithConfirmation({
  popupSelector : '.confirm-popup', 
  formSelector : '.popup__form',
  inputSelector : '.popup__input',
}, 
(cardId, cardEl) => {
  api.deleteCard(cardId)
    .then(() => {
      cardEl.remove();
      confirmPopup.closePopup()
    })
    .catch((err) => {
      alert(`Запрос на удаление карточки не выполнен! Ошибка: ${err}`);
      console.error(`Запрос на удаление карточки не выполнен! Ошибка: ${err}`);
    });
});
confirmPopup.setEventListeners();