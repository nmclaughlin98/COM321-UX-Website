async function loadMovieDetail() {
  const params = new URLSearchParams(window.location.search);
  const requestedSlug = params.get('movie') || 'deadpool-2';

  const movie = await fetchMovieData(requestedSlug);
  if (!movie) {
    document.getElementById('movie-title').textContent = 'Movie not found';
    return;
  }

  const movieTitle = document.getElementById('movie-title');
  const movieStill = document.getElementById('movie-still');
  const movieRating = document.getElementById('movie-rating');
  const movieRuntime = document.getElementById('movie-runtime');
  const movieCast = document.getElementById('movie-cast');
  const movieDirector = document.getElementById('movie-director');
  const synopsisContainer = document.getElementById('movie-synopsis');
  const trailerFrame = document.getElementById('movie-trailer');
  const showtimeContainer = document.getElementById('movie-showtimes');
  const bookLink = document.getElementById('movie-book-link');

  document.title = `Blockbuster Theatre - ${movie.title}`;
  movieTitle.textContent = movie.title;
  movieStill.src = `../${movie.still}` || 'assets/Images/logo.png';
  movieStill.alt = movie.title;
  movieRating.src = `../assets/Images/Ratings/${movie.rating}.png`;
  movieRating.alt = movie.rating;
  movieRuntime.textContent = `Run Time: ${movie.runtime} mins`;
  movieCast.innerHTML = `<strong>Starring:</strong> ${movie.starring.join(', ')}`;
  movieDirector.textContent = `Director: ${movie.director}`;

  synopsisContainer.innerHTML = movie.synopsis
    .split('\n')
    .map(paragraph => `<p>${paragraph}</p>`)
    .join('');

  if (movie.trailer) {
    trailerFrame.src = movie.trailer;
  } else {
    trailerFrame.style.display = 'none';
  }

  showtimeContainer.innerHTML = Object.entries(movie.showtimes || {})
    .map(([day, times]) => {
      const list = times.map(time => `<li class="show-time">${time}</li>`).join('');
      return `
        <li class="day-of-week">${day} </li>
        <div class="show-time-list">${list}</div><br>
        <hr>
      `;
    })
    .join('');

  bookLink.href = `../bookNow.html?movie=${encodeURIComponent(movie.title)}`;
}

async function fetchMovieData(slug) {
  try {
    const response = await fetch('../assets/data/movies.json');
    if (!response.ok) throw new Error('Unable to load movie data');

    const movies = await response.json();
    return movies.find(movie => movie.slug === slug);
  } catch (error) {
    if (window.MOVIES_DATA) {
      return window.MOVIES_DATA.find(movie => movie.slug === slug);
    }

    console.error(error);
    return null;
  }
}

document.addEventListener('DOMContentLoaded', loadMovieDetail);
