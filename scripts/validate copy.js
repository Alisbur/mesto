//Выводим сообщение об ошибке и меняем стиль поля ввода на содержащий ошибку
function showInputError (formElement, inputElement, errorMessage, vConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(vConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(vConfig.errorClass);
};

//Скрываем сообщение об ошибке и меняем стиль поля ввода на нормальный
function hideInputError (formElement, inputElement, vConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(vConfig.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(vConfig.errorClass);
};

//Проверяем корректность ввода в поле
function checkInputValidity (formElement, inputElement, vConfig) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, vConfig);
  } else {
    hideInputError(formElement, inputElement, vConfig);
  }
};

//Устанавливаем лисенеры ввода на поля ввода и меняем состояние кнопки
function setEventListeners (formElement, vConfig) {
  const inputList = Array.from(formElement.querySelectorAll(vConfig.inputSelector));
  const buttonElement = formElement.querySelector(vConfig.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, vConfig);
      toggleButtonState(inputList, buttonElement, vConfig);
    });
  });
};

//Функция немедленной однократной валидации данных формы при её влключении
//нужна, чтобы удалить остатки модификаторов от предыдущих обращений к формам
function resetFormErrors(formElement, vConfig) {
  const inputList = Array.from(formElement.querySelectorAll(vConfig.inputSelector));
  const buttonElement = formElement.querySelector(vConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, vConfig);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, vConfig);
  });
};

//Включаем валидацию для всех форм
function enableValidation (vConfig) {
  formList = Array.from(document.querySelectorAll(vConfig.formSelector));
  formList.forEach((formElement) => setEventListeners(formElement, vConfig));
};

//Проверяем есть ли среди полей ввода формы те, которые не проходят валидацию
function hasInvalidInput (inputList) {
  return inputList.some((el) => !el.validity.valid);
}

//Функция смены состояния кнопки с активной на неактивную
function toggleButtonState (inputList, buttonElement, vConfig) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, vConfig);
  } else {
    enableButton(buttonElement, vConfig);
  }
}

function disableButton (buttonElement, vConfig) {
  buttonElement.classList.add(vConfig.inactiveButtonClass);
  buttonElement.setAttribute('disabled', '');
}

function enableButton (buttonElement, vConfig) {
  buttonElement.classList.remove(vConfig.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}

enableValidation(validationConfig);