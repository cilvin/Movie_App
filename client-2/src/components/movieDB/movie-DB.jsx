import axios from 'axios';


const apiKey = process.env.e23e5607a1801b5693cf7ee99ff11da0;

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error);
    throw error;
  }
};

const theMovieDBSearch = title =>
  axios.get(
    `https://api.themoviedb.org/3/movie/550?api_key=${apiKey}&language=en-US&query=${title}&page=1&include_adult=false`
  );

const poster = {
  loadSize: (size = 'w300', posterPath = '') => {
    return `http://image.tmdb.org/t/p/${size}${posterPath}`;
  },
  loadOriginalSize: (posterPath = '') => {
    return `http://image.tmdb.org/t/p/original${posterPath}`;
  }
};

export { theMovieDBSearch, poster, checkStatus };