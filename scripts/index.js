const currentNameValue = document.querySelector('.profile__name');
const currentProfValue = document.querySelector('.profile__profession');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const popupForm = document.querySelector('#popup-form');
const popupInputName = document.querySelector('#input-name');
const popupInputProf = document.querySelector('#input-prof');
const popupExitButton = document.querySelector('.popup__exit-button');
const popupSaveButton = document.querySelector('.popup__save-button');

/*Вызов popup-окна и копирование в него данных*/
editButton.addEventListener('click', function () {
  popup.classList.remove('hidden');
  popupInputName.value = currentNameValue.textContent;
  popupInputProf.value = currentProfValue.textContent;
});

/*Закрытие popup-окна без сохранения данных*/
popupExitButton.addEventListener('click', function () {
  popup.classList.add('hidden');
});

/*Функция-обработчик события submit на форме popup-окна*/
function handleFormSubmit(evt) {
  evt.preventDefault();
  currentNameValue.textContent = popupInputName.value;
  currentProfValue.textContent = popupInputProf.value;
  popup.classList.add('hidden');
}

/*Обработчик события submit на форме popup-окна*/
popupForm.addEventListener('submit', handleFormSubmit);