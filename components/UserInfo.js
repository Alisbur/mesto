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

  setUserInfo ({ input1, input2 }) {
    this._nameField.textContent = input1;
    this._profField.textContent = input2;
  }
}