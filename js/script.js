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

// Display popular tv shows cards on tv shows page
async function displayPopularShows() {
  const { results } = await fetchAPIData('/tv/popular');
  const cardsContainer = document.querySelector('#popular-shows');
  results.forEach(show => {
    const showEl = document.createElement('div');
    showEl.classList.add('card');
    showEl.innerHTML = `
          <a href="tv-details.html?id=${show.id}">
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

// Display movies details on movie details page
async function displayMovieDetails() {
  const movieID = window.location.search.split('=')[1];
  const moviesContainer = document.querySelector('#movie-details')
  const movie = await fetchAPIData(`/movie/${movieID}`);

  // Overlay for background image
  displayBackgroundImage('movie', movie.backdrop_path);

  const movieInner = document.createElement('div');
  movieInner.innerHTML = `
  <div class="details-top">
          <div>
          ${ movie.poster_path
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
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
               ${Math.round(movie.vote_average)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
             ${
                movie.genres.map(genre => `<li>${genre.name}</li>`).join('')
              }
            </ul>
            <a href="${movie.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies.map(company => `<span>${company.name}</span>`).join(', ')}</div>
        </div>
      </div>
  `;
  moviesContainer.appendChild(movieInner);
}

// Display  tv shows details on tv show details page
async function displayShowDetails() {
  const showID = window.location.search.split('=')[1];
  const showsContainer = document.querySelector('#show-details')
  const show = await fetchAPIData(`/tv/${showID}`);

  // Overlay for background image
  displayBackgroundImage('tv', show.backdrop_path);

  const showInner = document.createElement('div');
 showInner.innerHTML = `
  <div class="details-top">
          <div>
          ${ show.poster_path
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
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
               ${show.vote_average.toFixed(2)} / 10
            </p>
            <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
            <p>
              ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
             ${
              show.genres.map(genre => `<li>${genre.name}</li>`).join('')
              }
            </ul>
            <a href="${show.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number of Episodes:</span> ${show.number_of_episodes}</li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies.map(company => `<span>${company.name}</span>`).join(', ')}</div>
        </div>
      </div>
  `;
  showsContainer.appendChild(showInner);
}

// Display slider
async function displaySlider() {
  const { results } = await fetchAPIData('movie/now_playing');
  results.forEach(movie => {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    swiperSlide.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt=${movie.title}  />
    </a>
    <h4 class="swiper-rating">
    <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
    </h4>
    `
    swiperWrapper.appendChild(swiperSlide);

  })
  initSwiper();
}

// Swiper initialization
function initSwiper(){
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      }
    }
  });
}

// Display bakhdrop on details pages 
function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
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

// Add commas to number
function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
}

// Init App
function init() {
  switch(global.currentPage) {
    case '/':
    case '/index.html':
      displaySlider();
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      displayShowDetails();
      break;
    case '/search.html':
      console.log('Search');
      break;
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init)