const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Error: ${res.status}`);
}

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

export function getNews(keyword) {
  const today = new Date();

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  const from = formatDate(sevenDaysAgo);
  const to = formatDate(today);

  const url =
    `${BASE_URL}/everything?` +
    `q=${encodeURIComponent(keyword)}` +
    `&from=${from}` +
    `&to=${to}` +
    `&pageSize=100` +
    `&apiKey=${API_KEY}`;

  return fetch(url).then(checkResponse);
}

// Prueba temporal
// getNews("technology").then(console.log).catch(console.error);
