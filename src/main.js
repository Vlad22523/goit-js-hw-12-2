import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getPictures } from './js/pixabay-api';
import {
  createMarkup,
  showLoader,
  hideLoader,
  gallery,
  lightbox,
} from './js/render-function';

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();

  gallery.innerHTML = '';

  const inputValue = e.target.elements.searchQuery.value;

  if (!inputValue.length) {
    iziToast.error({
      title: 'Error',
      message: '"Sorry, input is empty"',
      position: 'topRight',
    });
    return;
  }

  showLoader();

  getPictures(inputValue)
    .then(data => {
      if (!data.hits.length) {
        iziToast.error({
          title: 'Error',
          message:
            '"Sorry, there are no images matching your search query. Please try again!"',
          position: 'topRight',
        });
        hideLoader();
        return;
      }
      const markup = createMarkup(data.hits);
      gallery.innerHTML = markup;
      lightbox.refresh();
      hideLoader();
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message:
          'An error occurred while fetching images. Please try again later.',
        position: 'topRight',
      });
      hideLoader();
      console.error('Error fetching pictures:', error);
    });
});
