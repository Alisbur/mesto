export default class Section {
  constructor (renderer , containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  //Метод создания одиночной карточки и добавления её в DOM
  renderCard (cardData, id = '') {
    const cardElement = this._renderer(cardData, id);
    this.addItem(cardElement);
  }

  //Метод создания карточек исходного массива 
  renderInitialCards (items, id) {
    items.forEach((item) => this.renderCard(item, id));
  }

  //Метод добавления вёрстки карточки в DOM
  addItem (element) {
    this._container.prepend(element);
  }
}
