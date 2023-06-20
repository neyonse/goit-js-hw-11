import { refs } from './refs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  animationSpeed: 200,
  fadeSpeed: 250,
});

export function showSearchResults(response) {
  const galleryMarkup = response.hits
    .map(data => createGalleryMarkup(data))
    .join('');

  refs.galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);
  lightbox.refresh();
}

function createGalleryMarkup(data) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = data;

  return `
    <div class="photo-card">
      <a class="gallery__link" href="${largeImageURL}">
        <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item"><b>Likes: ${likes}</b></p>
          <p class="info-item"><b>Views: ${views}</b></p>
          <p class="info-item"><b>Comments: ${comments}</b></p>
          <p class="info-item"><b>Downloads: ${downloads}</b></p>
        </div>
      </a>
    </div>`;
}
