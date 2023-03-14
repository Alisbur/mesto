export default class UserInfo {
  constructor ({nameSelector, profSelector }) {
    this._nameField = document.querySelector(nameSelector);
    this._profField = document.querySelector(profSelector);
  }

  getUserInfo () {
    return { 
      name : this._nameField.textContent, 
      prof : this._profField.textContent 
    };
  }

  setUserInfo ({ name, prof }) {
    this._nameField.textContent = name;
    this._profField.textContent = prof;
  }
}