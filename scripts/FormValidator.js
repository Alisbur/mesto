export class FormValidator {
  constructor(formElement, vConfig) {
    this._vConfig = vConfig;
    this._formElement = formElement;
  }

//Выводим сообщение об ошибке и меняем стиль поля ввода на содержащий ошибку
  _showInputError (formElement, inputElement, errorMessage, vConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(vConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(vConfig.errorClass);
  };

//Скрываем сообщение об ошибке и меняем стиль поля ввода на нормальный
  _hideInputError (formElement, inputElement, vConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(vConfig.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(vConfig.errorClass);
  };

  //Проверяем корректность ввода в поле
  _checkInputValidity (formElement, inputElement, vConfig) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, vConfig);
    } else {
      hideInputError(formElement, inputElement, vConfig);
    }
  };  

  //Устанавливаем лисенеры ввода на поля ввода и меняем состояние кнопки
  _setEventListeners () {
    const inputList = Array.from(this._formElement.querySelectorAll(this._vConfig.inputSelector));
    const buttonElement = this._formElement.querySelector(this._vConfig.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };


  //Проверяем есть ли среди полей ввода формы те, которые не проходят валидацию
  _hasInvalidInput (inputList) {
    return inputList.some((el) => !el.validity.valid);
  }

  //Функция смены состояния кнопки с активной на неактивную
  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._disableButton(buttonElement);
    } else {
      this._enableButton(buttonElement);
    }
  }

  _disableButton (buttonElement) {
    buttonElement.classList.add(this._vConfig.inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  }

  _enableButton (buttonElement) {
    buttonElement.classList.remove(this._vConfig.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }

  //Включаем валидацию для всех форм
  enableValidation () {
    this._setEventListeners();
  };

}








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

enableValidation(validationConfig);