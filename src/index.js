import './styles.css';
import inputSearchTpl from './templates/inputSearch.hbs';
import imageTpl from './templates/imageTpl.hbs';
import apiService from './js/apiService';

const input = inputSearchTpl();
document.body.insertAdjacentHTML('afterbegin', input);

const body = document.body;
const searchForm = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('[data-action="load-more"]');

const listImages = document.createElement('ul');
listImages.classList.add('gallery');
body.append(listImages);

function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  apiService.query = form.elements.query.value;

    listImages.innerHTML = '';
  

  apiService.resetPage();
  apiService.fetchImages().then(dataImages => {
    updateListImages(dataImages);
  });
}

function updateListImages(dataImages) {
  const contentImages = imageTpl(dataImages);
  listImages.insertAdjacentHTML('beforeend', contentImages);
}

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', () => {
  apiService.fetchImages().then(dataImages => {
    updateListImages(dataImages);
    window.scrollTo({
        top: document.documentElement.offsetHeight,
        behavior: 'smooth'
    });
  });
});
