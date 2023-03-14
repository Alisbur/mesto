export default class FormValidator {
//Конструктор класса FormValidator
  constructor(formElement, vConfig) {
    this._vConfig = vConfig;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._vConfig.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._vConfig.submitButtonSelector);
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
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  //Метод проверки полей ввода формы на предмет прохождения валидации
  _hasInvalidInput () {
    return this._inputList.some((el) => !el.validity.valid);
  }

  //Метод смены состояния кнопки с активной на неактивную
  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  //Метод деактивации кнопки submit
  _disableButton () {
    this._buttonElement.classList.add(this._vConfig.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', '');
  }

  //Метод активации кнопки submit
  _enableButton () {
    this._buttonElement.classList.remove(this._vConfig.inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }

  //Метод немедленной однократной валидации данных формы при её влключении
  //нужна, чтобы удалить остатки модификаторов от предыдущих обращений к форме
  resetFormErrors() {
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  //Метод включения валидации экземпляра
  enableValidation () {
    this._setEventListeners();
  };
}