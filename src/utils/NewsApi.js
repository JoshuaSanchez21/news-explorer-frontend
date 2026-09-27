import { NEWS_API_BASE_URL, NEWS_API_KEY } from "./constants.js";

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
    `${NEWS_API_BASE_URL}/everything?` +
    `q=${encodeURIComponent(keyword)}` +
    `&from=${from}` +
    `&to=${to}` +
    `&pageSize=100` +
    `&apiKey=${NEWS_API_KEY}`;

  return fetch(url).then(checkResponse);
}
