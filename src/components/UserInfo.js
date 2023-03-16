export default class UserInfo {
  constructor ({nameSelector, profSelector }) {
    this._nameField = document.querySelector(nameSelector);
    this._profField = document.querySelector(profSelector);
  }

  //Метод получения данных пользователя из соответствующих полей на странице
  getUserInfo () {
    return { 
      name : this._nameField.textContent, 
      prof : this._profField.textContent 
    };
  }

  //Метод установки данных профиля в соответствующие поля на странице
  setUserInfo ({ name, prof }) {
    this._nameField.textContent = name;
    this._profField.textContent = prof;
  }
}