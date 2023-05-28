class Api {
  constructor(options) {
    this._credentials = options.credentials;
    this._url = options.url;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      `Ошибка: ${res.status}. ${res.message}.`
    );
  }

  getUserInfo() {
    return fetch(this._url + "/users/me", {
      credentials: this._credentials,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(this._checkStatus);
  }

  getCards() {
    return fetch(this._url + "/cards", {
      credentials: this._credentials,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(this._checkStatus);
  }

  updateUserInfo(name, about) {
    return fetch(this._url + "/users/me", {
      method: "PATCH",
      credentials: this._credentials,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkStatus);
  }

  addNewCard(heading, source) {
    return fetch(this._url + "/cards", {
      method: "POST",
      credentials: this._credentials,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: heading,
        link: source,
      }),
    }).then(this._checkStatus);
  }

  deleteCard(id) {
    return fetch(this._url + "/cards/" + id, {
      method: "DELETE",
      credentials: this._credentials,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(this._checkStatus);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(this._url + "/cards/" + id + "/likes", {
      method: `${isLiked ? "PUT" :  "DELETE"}`,
      credentials: this._credentials,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(this._checkStatus);
  }

  updateUserImage(imageSource) {
    return fetch(this._url + "/users/me/avatar", {
      method: "PATCH",
      credentials: this._credentials,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: imageSource,
      }),
    }).then(this._checkStatus);
  }
}

const api = new Api({
  credentials: 'include',
  url: 'https://api.mesto.students.nomoredomains.rocks'
});

export default api;
