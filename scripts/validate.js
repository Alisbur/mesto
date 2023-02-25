const selectorTypes = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};


//Выводим сообщение об ошибке и меняем стиль поля ввода на содержащий ошибку
function showInputError (formElement, inputElement, errorMessage, selectors) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.errorClass);
};

//Скрываем сообщение об ошибке и меняем стиль поля ввода на нормальный
function hideInputError (formElement, inputElement, selectors) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(selectors.errorClass);
};

//Проверяем корректность ввода в поле
function checkInputValidity (formElement, inputElement, selectors) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, selectors);
  } else {
    hideInputError(formElement, inputElement, selectors);
  }
};

//Устанавливаем лисенеры ввода на поля ввода и меняем состояние кнопки
function setEventListeners (formElement, selectors) {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, selectors);
      toggleButtonState(inputList, buttonElement, selectors);
    });
  });
};

//Функция немедленной однократной валидации данных формы при её влключении
//нужна, чтобы удалить остатки модификаторов от предыдущих обращений к формам
function validateFormNow(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(selectorTypes.inputSelector));
  const buttonElement = formElement.querySelector(selectorTypes.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, selectorTypes);
  inputList.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement, selectorTypes);
  });
};

//Включаем валидацию для всех форм
function enableValidation (selectors) {
  formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((formElement) => setEventListeners(formElement, selectors));
};

//Проверяем есть ли среди полей ввода формы те, которые не проходят валидацию
function hasInvalidInput (inputList) {
  return inputList.some((el) => !el.validity.valid);
}

//Функция смены состояния кнопки с активной на неактивную
function toggleButtonState (inputList, buttonElement, selectors) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(selectors.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(selectors.inactiveButtonClass);
  }
}

enableValidation(selectorTypes);