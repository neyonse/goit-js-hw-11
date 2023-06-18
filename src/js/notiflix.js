import { Notify } from 'notiflix/build/notiflix-notify-aio';

function noSearchQueryMessage() {
  const message = 'Please enter your search query in the input field.';
  Notify.info(message, {
    clickToClose: true,
    fontSize: '20px',
    width: '400px',
  });
}

function noSearchResultsMessage() {
  const message =
    'Sorry, there are no images matching your search query. Please try again.';
  Notify.failure(message, {
    clickToClose: true,
    fontSize: '20px',
    width: '400px',
  });
}

function onErrorMessage() {
  const message = 'Sorry, something went wrong. Please try reload a page.';
  Notify.failure(message, {
    clickToClose: true,
    fontSize: '20px',
    width: '400px',
  });
}

export { noSearchQueryMessage, noSearchResultsMessage, onErrorMessage };
