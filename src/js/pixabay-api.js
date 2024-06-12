export { getPictures };
import axios from 'axios';

const API_KEY = '44262674-4191f931eb8b9eeb7747e3c1c';

async function getPictures(value, page = 1) {
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';

  const response = await axios(`${BASE_URL}${END_POINT}`, {
    params: {
      key: API_KEY,
      q: value,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 15,
      page,
    },
  });

  return response.data;
}
