import { fetchImages } from './js/fetch-api';
import {
  emptySearchBarMessage,
  noSearchResultsMessage,
  errorMessage,
} from './js/notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.getElementById('search-form');
const inputEl = formEl.querySelector('input[name="searchQuery"]');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');
const galleryEndMessageEl = createGalleryEndMessageEl();
const totalImagesFoundMessageEl = createTotalImagesFoundMessageEl();
const scrollTopBtn = document.querySelector('.scroll-top-btn');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  animationSpeed: 200,
  fadeSpeed: 250,
});

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMore);
scrollTopBtn.addEventListener('click', scrollTop);
window.addEventListener('scroll', toggleScrollTopBtn);

let inputData = '';
let page = 1;
inputEl.focus();

async function onFormSubmit(e) {
  e.preventDefault();
  hideElement(totalImagesFoundMessageEl);
  hideElement(galleryEndMessageEl);
  hideElement(loadMoreBtnEl);
  inputData = inputEl.value;
  galleryEl.innerHTML = '';
  page = 1;

  if (inputData === '') {
    emptySearchBarMessage();
    inputEl.focus();
    return;
  }

  try {
    const response = await fetchImages(inputData);

    if (response.totalHits === 0) {
      noSearchResultsMessage();
      return;
    }

    constructTotalImagesFoundMessage(response.totalHits);
    showElement(totalImagesFoundMessageEl);
    showSearchResults(response);

    if (galleryEl.children.length >= response.totalHits) {
      showElement(totalImagesFoundMessageEl);
      hideElement(loadMoreBtnEl);
      showElement(galleryEndMessageEl);
      return;
    }

    page += 1;
    showElement(loadMoreBtnEl);
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

    if (galleryEl.children.length >= response.totalHits) {
      hideElement(loadMoreBtnEl);
      showElement(galleryEndMessageEl);
      return;
    }

    page += 1;
  } catch (error) {
    errorMessage();
    console.error(error);
  }
}

function getDataToShow(data) {
  const { likes, views, comments, downloads } = data;
  const dataToShow = {
    url: data.webformatURL,
    largeImg: data.largeImageURL,
    alt: data.tags,
    likes,
    views,
    comments,
    downloads,
  };
  return dataToShow;
}

function createGalleryMarkup(dataToShow) {
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

function showSearchResults(response) {
  response.hits.forEach(data => {
    const dataToShow = getDataToShow(data);
    createGalleryMarkup(dataToShow);
  });
  lightbox.refresh();
}

function createTotalImagesFoundMessageEl() {
  const totalImagesFoundMessage = document.createElement('p');
  totalImagesFoundMessage.classList.add('total-images-message', 'hidden');
  galleryEl.before(totalImagesFoundMessage);
  return document.querySelector('.total-images-message');
}

function constructTotalImagesFoundMessage(totalHits) {
  totalImagesFoundMessageEl.textContent = `Hooray! We found ${totalHits} images.`;
}

function createGalleryEndMessageEl() {
  const galleryEndMessage = document.createElement('p');
  galleryEndMessage.classList.add('gallery-end-message', 'hidden');
  galleryEndMessage.textContent = `We're sorry, but you've reached the end of search results.`;
  galleryEl.after(galleryEndMessage);
  return document.querySelector('.gallery-end-message');
}

function addSmoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: window.innerHeight - cardHeight,
    behavior: 'smooth',
  });
}

function showElement(el) {
  el.classList.remove('hidden');
}

function hideElement(el) {
  el.classList.add('hidden');
}

function scrollTop() {
  window.scroll({
    top: 0,
    behavior: 'smooth',
  });
}

function toggleScrollTopBtn() {
  if (window.scrollY > window.innerHeight) {
    scrollTopBtn.classList.add('active');
  } else {
    scrollTopBtn.classList.remove('active');
  }
}
