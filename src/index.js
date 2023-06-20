import { refs } from './js/refs';
import { fetchImages } from './js/fetch-api';
import { showSearchResults } from './js/gallery-markup';
import {
  addSmoothScroll,
  scrollTop,
  togglescrollTopBtnEl,
  showEl,
  hideEl,
} from './js/utils';
import {
  emptySearchBarMessage,
  noSearchResultsMessage,
  errorMessage,
} from './js/notiflix';

refs.formEl.addEventListener('submit', onFormSubmit);
refs.loadMoreBtnEl.addEventListener('click', onLoadMore);
refs.scrollTopBtnEl.addEventListener('click', scrollTop);
window.addEventListener('scroll', togglescrollTopBtnEl);

let inputData = '';
let page = 1;
refs.formEl.focus();

async function onFormSubmit(e) {
  e.preventDefault();
  hideEl(refs.totalImagesFoundMessageEl);
  hideEl(refs.galleryEndMessageEl);
  hideEl(refs.loadMoreBtnEl);
  inputData = refs.formEl.searchQuery.value.trim();
  refs.formEl.searchQuery.value = inputData;
  refs.galleryEl.innerHTML = '';
  page = 1;

  if (inputData === '') {
    refs.formEl.reset();
    emptySearchBarMessage();
    refs.formEl.searchQuery.focus();
    return;
  }

  try {
    const response = await fetchImages(inputData, page);

    if (response.totalHits === 0) {
      noSearchResultsMessage();
      return;
    }

    refs.totalImagesFoundMessageEl.textContent = `Hooray! We found ${response.totalHits} images.`;
    showEl(refs.totalImagesFoundMessageEl);
    showSearchResults(response);

    if (refs.galleryEl.children.length >= response.totalHits) {
      showEl(refs.totalImagesFoundMessageEl);
      hideEl(refs.loadMoreBtnEl);
      showEl(refs.galleryEndMessageEl);
      return;
    }

    page += 1;
    showEl(refs.loadMoreBtnEl);
  } catch (error) {
    errorMessage();
    console.error(error);
  }
}

async function onLoadMore(e) {
  e.preventDefault();

  try {
    const response = await fetchImages(inputData, page);

    showSearchResults(response);
    addSmoothScroll();

    if (refs.galleryEl.children.length >= response.totalHits) {
      hideEl(refs.loadMoreBtnEl);
      showEl(refs.galleryEndMessageEl);
      return;
    }

    page += 1;
  } catch (error) {
    errorMessage();
    console.error(error);
  }
}
