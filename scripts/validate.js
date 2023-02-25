//Выводим сообщение об ошибке и меняем стиль поля ввода на содержащий ошибку
function showInputError (formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_visible');
};

//Скрываем сообщение об ошибке и меняем стиль поля ввода на нормальный
function hideInputError (formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
  errorElement.classList.remove('popup__input-error_visible');
};

//Проверяем корректность ввода в поле
function checkInputValidity (formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//Устанавливаем лисенеры ввода на поля ввода и меняем состояние кнопки
function setEventListeners (formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__save-button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//Включаем валидацию для всех форм
function enableValidation () {
  formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => setEventListeners(formElement));
};

//Проверяем есть ли среди полей ввода формы те, которые не проходят валидацию
function hasInvalidInput (inputList) {
  return inputList.some((el) => !el.validity.valid);
}

//Функция смены состояния кнопки с активной на неактивную
function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save-button_inactive');
  } else {
    buttonElement.classList.remove('popup__save-button_inactive');
  }
}

enableValidation();

({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
});