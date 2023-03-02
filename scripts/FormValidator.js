export class FormValidator {
//Конструктор класса FormValidator
  constructor(formElement, vConfig) {
    this._vConfig = vConfig;
    this._formElement = formElement;
  }

//Метод включения индикации и сообщения об ошибке
  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(this._vConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._vConfig.errorClass);
  };

//Метод выключения индикации и сообщение об ошибке
  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(this._vConfig.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._vConfig.errorClass);
  };

  //Метод валидации данных в поле ввода
  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };  

  //Метод установки лисенеров ввода на поля формы и актуализация состояния кнопки
  _setEventListeners () {
    console.log('SetEventListeners() - ON');
    const inputList = Array.from(this._formElement.querySelectorAll(this._vConfig.inputSelector));
    const buttonElement = this._formElement.querySelector(this._vConfig.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  //Метод проверки полей ввода формы на предмет прохождения валидации
  _hasInvalidInput (inputList) {
    return inputList.some((el) => !el.validity.valid);
  }

  //Метод смены состояния кнопки с активной на неактивную
  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._disableButton(buttonElement);
    } else {
      this._enableButton(buttonElement);
    }
  }

  //Метод деактивации кнопки submit
  _disableButton (buttonElement) {
    buttonElement.classList.add(this._vConfig.inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  }

  //Метод активации кнопки submit
  _enableButton (buttonElement) {
    buttonElement.classList.remove(this._vConfig.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }

  //Метод немедленной однократной валидации данных формы при её влключении
  //нужна, чтобы удалить остатки модификаторов от предыдущих обращений к форме
  resetFormErrors() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._vConfig.inputSelector));
    const buttonElement = this._formElement.querySelector(this._vConfig.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  //Метод включения валидации экземпляра
  enableValidation () {
    this._setEventListeners();
    console.log('EnableValidation() - ON');
  };
}