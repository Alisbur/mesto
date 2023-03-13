export default class Section {
  constructor ({ data, renderer }, containerSelector) {
    this._rendereditems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderCard (name, link) {
    const cardElement = this._renderer(name, link);
    this.addItem(cardElement);
  }

  renderInitialCards () {
    this._rendereditems.forEach((item) => this.renderCard(item.name, item.link));
  }

  addItem (element) {
    this._container.prepend(element);
  }
}
