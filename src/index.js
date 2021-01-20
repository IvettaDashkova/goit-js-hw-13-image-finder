import './styles.css';
import './main.scss';
import inputSearchTpl from './templates/inputSearch.hbs';
import imageTpl from './templates/imageTpl.hbs';
import apiService from './js/apiService';
import errorRequest from './js/notifyError';
import contentObserver from './js/contentObserver';
import downloadObserver from './js/downloadObserver';
import openModal from './js/modal';

const body = document.body;
const input = inputSearchTpl();
body.insertAdjacentHTML('afterbegin', input);
const searchForm = document.querySelector('.search-form');


const listContent = document.createElement('ul');
listContent.classList.add('gallery');
body.append(listContent);
const listImages = document.querySelector('.gallery');

searchForm.addEventListener('submit', onSearch);
listImages.addEventListener('click', openModal);


function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  apiService.query = form.elements.query.value;

  listImages.innerHTML = '';
  apiService.resetPage();
  if (form.elements.query.value === '') {
    errorRequest();
    return;
  };
  addContent();
  form.elements.query.value = '';
}

function addContent() {
  apiService
    .fetchImages()
    .then(dataImages => {
      if (dataImages.length === 0) {
          errorRequest();
          return;
      }
      updateListImages(dataImages);
    })
    .catch(error => console.log(error));
}

function updateListImages(dataImages) {
  const contentImages = imageTpl(dataImages);
  listImages.insertAdjacentHTML('beforeend', contentImages);
  contentObserver(addContent);
  downloadObserver();
}


