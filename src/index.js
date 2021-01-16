import './styles.css';
import './main.scss';
import inputSearchTpl from './templates/inputSearch.hbs';
import list from './templates/listContent.hbs';
import imageTpl from './templates/imageTpl.hbs';
import apiService from './js/apiService';
import { defaults, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import * as basicLightbox from 'basiclightbox';

const input = inputSearchTpl();
document.body.insertAdjacentHTML('afterbegin', input);

const body = document.body;
const searchForm = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('[data-action="load-more"]');

const listContent = list();
body.insertAdjacentHTML('beforeend', listContent);
const listImages = document.querySelector('.gallery');

function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  apiService.query = form.elements.query.value;

  listImages.innerHTML = '';

  apiService.resetPage();
  apiService.fetchImages().then(dataImages => {
    if (dataImages.length === 0) {
      defaults.styling = 'material';
      defaults.icons = 'material';
      defaults.width = '300px';
      return error({
        text:
          'Unfortunately, your search returned no results! Please enter a more correct request!',
      });
    }
    updateListImages(dataImages);
  });
}
function addContent() {
  apiService.fetchImages().then(dataImages => {
    updateListImages(dataImages);
  });
}
function updateListImages(dataImages) {
  const contentImages = imageTpl(dataImages);
    listImages.insertAdjacentHTML('beforeend', contentImages);
    
  const targetObserver = document.querySelector(
    '.gallery .photo-card:last-child',
  );
  const ioContent = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        addContent();
        observer.unobserve(targetObserver);
        console.log(entry.target);
      }
    });
  });
    ioContent.observe(targetObserver);
    
    const images = document.querySelectorAll('.gallery img');
    const options = {
        rootMargin: '100px',
    }
  const ioImages = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const image = entry.target;
        const src = image.dataset.sourceprew;
        image.src = src;
        observer.unobserve(image);
      }
    });
  }, options);

  images.forEach(image => ioImages.observe(image));
}

function openModal(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const modalWindow = basicLightbox
    .create(
      `<img class="lightbox__image" src=${event.target.dataset.source} alt="" />`,
      {
        closable: true,
      },
    )
    .show();
}

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', addContent);

listImages.addEventListener('click', openModal);
