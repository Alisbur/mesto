const popup = document.querySelector('.popup');

//Убираем мелькание формы при обновлении страницы
setTimeout(() => {
  popup.classList.add("popup_transition");
}, 1);

const currentNameValue = document.querySelector('.profile__name');
const currentProfValue = document.querySelector('.profile__profession');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupForm = document.querySelector('[name="dataForm"]');

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
  if ((popupForm.secondInput.value) && (popupForm.firstInput.value)) {
    console.log('операция 1');
    console.log('операция 2');
  } else console.log('неправильные значения');
  popupForm.removeEventListener('submit', handleFormSubmitAddPicture, false);
}
