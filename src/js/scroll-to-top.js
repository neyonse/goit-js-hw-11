export function createScrollToTopEl() {
  const scrollToTopBtn = document.createElement('a');
  scrollToTopBtn.classList.add('scroll-top-btn');
  // scrollToTopBtn.innerHTML =
  //   '<svg><use href="/images/icons.svg#scroll"></use></svg>';
  // scrollToTopBtn.innerHTML =
  //   '<img src="../images/scroll-top-icon.jpg" alt="up">';
  scrollToTopBtn.innerHTML = '<span>UP</span>';
  scrollToTopBtn.addEventListener('click', scrollToTop);

  document.body.appendChild(scrollToTopBtn);
}

function scrollToTop() {
  window.scroll({
    top: 0,
    behavior: 'smooth',
  });
}
