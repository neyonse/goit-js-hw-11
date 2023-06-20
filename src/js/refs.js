const refs = {
  formEl: document.getElementById('search-form'),
  galleryEl: document.querySelector('.gallery'),
  loadMoreBtnEl: document.querySelector('.load-more'),
  scrollTopBtnEl: document.querySelector('.scroll-top-btn'),
  totalImagesFoundMessageEl: null,
  galleryEndMessageEl: null,
};

refs.galleryEndMessageEl = createGalleryEndMessageEl();
refs.totalImagesFoundMessageEl = createTotalImagesFoundMessageEl();

function createTotalImagesFoundMessageEl() {
  const totalImagesFoundMessage = document.createElement('p');
  totalImagesFoundMessage.classList.add('total-images-message', 'hidden');
  refs.galleryEl.before(totalImagesFoundMessage);
  return document.querySelector('.total-images-message');
}

function createGalleryEndMessageEl() {
  const galleryEndMessage = document.createElement('p');
  galleryEndMessage.classList.add('gallery-end-message', 'hidden');
  galleryEndMessage.textContent = `We're sorry, but you've reached the end of search results.`;
  refs.galleryEl.after(galleryEndMessage);
  return document.querySelector('.gallery-end-message');
}

export { refs };
