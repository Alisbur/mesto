export default class Section {
  constructor (renderer , containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  //Метод создания одиночной карточки и добавления её в DOM
  renderCard (cardData) {
    const cardElement = this._renderer(cardData);
    this.addItem(cardElement);
  }

  //Метод создания карточек исходного массива 
  renderInitialCards (items) {
    items.forEach((item) => this.renderCard({ name : item.name, link : item.link }));
  }

  //Метод добавления вёрстки карточки в DOM
  addItem (element) {
    this._container.prepend(element);
  }
}
