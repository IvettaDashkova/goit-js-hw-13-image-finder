import axios from 'axios'

const apiKey = '19891525-b410a0a37a9fe6964038d322b';
export default {
  searchQuery: '',
  page: 1,
  async fetchImages() {
    const BASE_URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${apiKey}`;
      return await axios.get(BASE_URL)
          .then(({ data: { hits } }) =>  {
        this.page += 1;
        return hits;
      })
      .catch(error => console.log(error)); 
  },
  resetPage() {
    this.page = 1;
  },
  get query() {
    return this.searchQuery;
  },
  set query(value) {
    this.searchQuery = value;
  },
};
