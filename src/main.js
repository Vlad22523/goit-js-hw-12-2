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
const loadBtn = document.querySelector('.load-more');

let inputValue = '';
let page = 1;

loadBtn.addEventListener('click', clickBtnLoad);

form.addEventListener('submit', e => {
  e.preventDefault();

  inputValue = e.target.elements.searchQuery.value.trim();

  loadBtn.classList.add('hidden');

  if (!inputValue.length) {
    iziToast.error({
      title: 'Error',
      message: '"Sorry, input is empty"',
      position: 'topRight',
    });
    loadBtn.classList.add('hidden');
    return;
  }
  page = 1;

  gallery.innerHTML = '';

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
        loadBtn.classList.add('hidden');
        hideLoader();
        return;
      }
      loadBtn.classList.remove('hidden');
      checkBtn(data);
      createMarkup(data.hits);
      // gallery.innerHTML = markup;
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
      console.error('Error fetching pictures:', error);
      hideLoader();
    });
});

async function clickBtnLoad() {
  page++;
  loadBtn.disabled = true;
  loadBtn.classList.add('hidden');
  showLoader();
  try {
    const data = await getPictures(inputValue, page);
    checkBtn(data);
    createMarkup(data.hits);
    createScrollFunction();
  } catch (err) {
    console.log(err);
  } finally {
    loadBtn.disabled = false;
    hideLoader();
    loadBtn.classList.remove('hidden');
  }
}

function checkBtn(data) {
  if (page >= Math.ceil(data.totalHits / 15)) {
    loadBtn.classList.add('hidden');
    iziToast.error({
      title: 'Error',
      message:
        'An error occurred while fetching images. Please try again later.',
      position: 'topRight',
    });
  }
}

function createScrollFunction() {
  let elem = document.querySelector('.gallery-item');
  let rect = elem.getBoundingClientRect();
  console.log(rect);
  if (elem) {
    window.scrollBy({
      top: rect.height + 300,
      left: 0,
      behavior: 'smooth',
    });
  }
}
