import { fetchImages } from './js/fetch-api';

const formEl = document.querySelector('#search-form');
const inputEl = formEl.querySelector('input[name="searchQuery"]');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const inputData = getInputData();
  fetchImages(inputData);
  //   showSearchResults();
}

function getInputData() {
  const inputData = inputEl.value;
  return inputData;
}
