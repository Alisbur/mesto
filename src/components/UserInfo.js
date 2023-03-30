export default class UserInfo {
  constructor ({nameSelector, profSelector, avaSelector, idSelector }) {
    this._nameField = document.querySelector(nameSelector);
    this._profField = document.querySelector(profSelector);
    this._avatar = document.querySelector(avaSelector);
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

  setUserAvatar({ link }) {
    this._avatar.style['background-image'] = `url(${link})`;
  }
}