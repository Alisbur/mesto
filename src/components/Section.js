export default class Section {
  constructor (renderer , containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  //Метод создания одиночной карточки и добавления её в DOM
  addItem (cardData, id = '') {
    const cardElement = this._renderer(cardData, id);
    this._container.prepend(cardElement);
  }

  //Метод создания карточек исходного массива 
  renderInitialCards (items, id) {
    items.forEach((item) => this.addItem(item, id));
  }
}
