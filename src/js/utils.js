import { refs } from './refs';

function addSmoothScroll() {
  const { height: cardHeight } =
    refs.galleryEl.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: window.innerHeight - cardHeight,
    behavior: 'smooth',
  });
}

function scrollTop() {
  window.scroll({
    top: 0,
    behavior: 'smooth',
  });
}

function togglescrollTopBtnEl() {
  if (window.scrollY > window.innerHeight) {
    refs.scrollTopBtnEl.classList.add('active');
  } else {
    refs.scrollTopBtnEl.classList.remove('active');
  }
}

function showEl(el) {
  el.classList.remove('hidden');
}

function hideEl(el) {
  el.classList.add('hidden');
}

export { addSmoothScroll, scrollTop, togglescrollTopBtnEl, showEl, hideEl };
