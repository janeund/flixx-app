const global = {
  currentPage: window.location.pathname,
};

// Display popular movies cards om movies page
async function displayPopularMovies() {
  const { results } = await fetchAPIData('/movie/popular');
  const cardsContainer = document.querySelector('#popular-movies');
  results.forEach(movie => {
    const movieEl = document.createElement('div');
    movieEl.classList.add('card');
    movieEl.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
            ${ 
              movie.poster_path 
              ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />` 
            : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release date: ${movie.release_date}</small>
            </p>
          </div>
    `;
    cardsContainer.appendChild(movieEl);
  })
}

// Display popular tv shows cards om tv shows page
async function displayPopularShows() {
  const { results } = await fetchAPIData('/tv/popular');
  const cardsContainer = document.querySelector('#popular-shows');
  results.forEach(show => {
    const showEl = document.createElement('div');
    showEl.classList.add('card');
    showEl.innerHTML = `
          <a href="movie-details.html?id=${show.id}">
            ${ 
              show.poster_path 
              ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />` 
            : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air date: ${show.first_air_date}</small>
            </p>
          </div>
    `;
    cardsContainer.appendChild(showEl);
  })
}

// Fetch data from API
async function fetchAPIData(endpoint) {
  const API_KEY = '005504cfb7e5160f459c7987f1017218';
  const API_URL = 'https://api.themoviedb.org/3/';

  showSpinner();

  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
  const data = await response.json();

  hideSpinner();

  return data; 
}

// Show spinner
function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

// Hide spinner
function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show')
}

// Highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active')
    }
  })
}

// Init App
function init() {
  switch(global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/movie-details.html':
      console.log('Movie Details');
      break;
    case '/tv-details.html':
      console.log('TV Details');
      break;
    case '/search.html':
      console.log('Search');
      break;
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init)