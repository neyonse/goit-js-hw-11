import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const MY_API_KEY = '37383891-385c0c3fa5b4b213da48ba87c';

export async function fetchImages(inputData) {
  const url = getFetchImagesUrl(inputData);

  const response = await axios.get(url);
  return response.data;
}

function getFetchImagesUrl(inputData) {
  const q = inputData.replace(' ', '+');

  const params = {
    key: MY_API_KEY,
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  const paramString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return `${BASE_URL}?${paramString}`;
}
