import { fetchImages } from './js/fetch-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('#search-form');
const inputEl = formEl.querySelector('input[name="searchQuery"]');
const galleryEl = document.querySelector('.gallery');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  animationSpeed: 200,
  fadeSpeed: 250,
});

function refreshSimpleLightbox() {
  lightbox.refresh();
}

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const inputData = getInputData();

  if (inputData === '') {
    return;
  }

  if (galleryEl.hasChildNodes) {
    galleryEl.innerHTML = '';
  }

  fetchImages(inputData)
    .then(response => {
      if (response.hits.length === 0) {
        noSearchResults();
        return;
      }
      showSearchResults(response);
    })
    .catch(error => {
      console.error(error);
    });
}

function getInputData() {
  return inputEl.value;
}

function noSearchResults() {
  const message =
    'Sorry, there are no images matching your search query. Please try again.';
  Notify.failure(message, {
    clickToClose: true,
  });
}

function showSearchResults(response) {
  response.hits.forEach(data => {
    const dataToShow = getDataToShow(data);
    createSearchResultsMarkup(dataToShow);
  });
  refreshSimpleLightbox();
}

function getDataToShow(data) {
  const dataToShow = {
    url: data.webformatURL,
    largeImg: data.largeImageURL,
    alt: data.tags,
    likes: data.likes,
    views: data.views,
    comments: data.comments,
    downloads: data.downloads,
  };
  console.log(dataToShow);
  return dataToShow;
}

function createSearchResultsMarkup(dataToShow) {
  const { url, largeImg, alt, likes, views, comments, downloads } = dataToShow;
  const innerHTML = `
  <div class="photo-card">
    <a class="gallery__link" href="${largeImg}">
      <img class="gallery__image" src="${url}" alt="${alt}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes: ${likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${views}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads: ${downloads}</b>
        </p>
      </div>
    </a>
  </div>`;
  galleryEl.insertAdjacentHTML('beforeend', innerHTML);
}
