export default class Api {
  constructor({ server, profileDataPath, cardsDataPath, token, group }) {
    this._server = server;
    this._profileDataPath = profileDataPath;
    this._cardsDataPath = cardsDataPath;
    this._token = token;
    this._group = group;
  }

  _requestServer(path, message = {headers: {authorization: this._token}}) {
    return fetch(path, message)
      .then((res) => {
        if (res.ok) 
          return res.json();
        return Promise.reject(res.status);
      })
      .catch((err) => console.error(`Запрос не выполнен! Ошибка: ${err}`));
  }

  getProfileData() {
    const path = `${this._server}/${this._group}/${this._profileDataPath}`;
    return this._requestServer(path);
  }

  modifyProfileData( {name, prof} ) {
    const path = `${this._server}/${this._group}/${this._profileDataPath}`;
    const message = { 
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: prof
      })
    }
    return this._requestServer(path, message);
  }

  setUserAvatar( {link} ) {
    const path = `${this._server}/${this._group}/${this._profileDataPath}/avatar `;
    const message = { 
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    }
    console.log(message);
    return this._requestServer(path, message);
  }

  getInitialCards() {
    const path = `${this._server}/${this._group}/${this._cardsDataPath}`;
    return this._requestServer(path);
  }

  addNewCard({ name, link }) {
    const path = `${this._server}/${this._group}/${this._cardsDataPath}`;
    const message = { 
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    }
    return this._requestServer(path, message);
  }

  putLike(cardId) {
    const path = `${this._server}/${this._group}/${this._cardsDataPath}/${cardId}/likes`;
    const message = { 
      method: 'PUT',
      headers: {
        authorization: this._token,
      }}
    return this._requestServer(path, message);
  }

  deleteLike(cardId) {
    const path = `${this._server}/${this._group}/${this._cardsDataPath}/${cardId}/likes`;
    const message = { 
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }}
    return this._requestServer(path, message);
  }

  deleteCard(cardId) {
    const path = `${this._server}/${this._group}/${this._cardsDataPath}/${cardId}`;
    const message = { 
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }}
    return this._requestServer(path, message);
  }
}