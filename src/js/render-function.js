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
  const ref = images
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

  gallery.insertAdjacentHTML('beforeend', ref);

  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery a', {
      captions: true,
      captionDelay: 250,
      captionsData: 'alt',
      scrollZoom: false,
    });
    lightbox.on('error.simplelightbox', function (e) {
      console.log(e);
    });
  }
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}
