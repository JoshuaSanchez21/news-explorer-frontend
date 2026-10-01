const BASE_URL = "https://news-explorer-api-joshua21.mooo.com";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return res.json().then((data) => {
    const error = new Error(
      data.message || "Ha ocurrido un error en la solicitud",
    );

    error.status = res.status;

    return Promise.reject(error);
  });
}

export function register(email, password, name) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  }).then(checkResponse);
}

export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then(checkResponse);
}

export function getUserInfo(token) {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export function getSavedArticles(token) {
  return fetch(`${BASE_URL}/articles`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export function saveArticle(article, token) {
  return fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(article),
  }).then(checkResponse);
}

export function deleteArticle(articleId, token) {
  return fetch(`${BASE_URL}/articles/${articleId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}
