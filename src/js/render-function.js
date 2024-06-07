export { createMarkup, showLoader, hideLoader, loader, gallery, lightbox };

import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.div-loader');

loader.style.display = 'none';

let lightbox = new SimpleLightbox('.gallery a', {
  caption: true,
  captionsData: 'alt',
  captionDelay: 250,
});

function createMarkup(images) {
  return images
    .map(
      ({
        largeImageURL,
        tags,
        webformatURL,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
              <a href="${largeImageURL}" class="gallery-item">
                <img src="${webformatURL}" alt="${tags}" loading="lazy">
                <div class="info">
                  <p><b>Likes:</b> ${likes}</p>
                  <p><b>Views:</b> ${views}</p>
                  <p><b>Comments:</b> ${comments}</p>
                  <p><b>Downloads:</b> ${downloads}</p>
                </div>
              </a>
          `;
      }
    )
    .join('');
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  setTimeout(() => {
    loader.style.display = 'none';
  }, 2000);
}
