 export  const PER_PAGE = 12;

 export async function fetchImages(page, image) {
  const API_KEY = '35701892-d36a96061146ba0658239b01c';
  const BASE_URL = `https://pixabay.com/api/?q=${image}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`;
  const response = await fetch(BASE_URL);
 
  return response.ok
    ? response.json()
    : Promise.reject(new Error('Something went wrong, please try again'));
}

