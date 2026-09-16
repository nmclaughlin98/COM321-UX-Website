async function loadNowShowingMovies() {
  const container = document.getElementById('now-showing-list');
  if (!container) return;

  try {
    const response = await fetch('assets/data/movies.json');
    if (!response.ok) throw new Error('Unable to load now showing data');

    const movies = await response.json();
    renderNowShowingMovies(container, movies);
  } catch (error) {
    console.error(error);
    container.innerHTML = '<p>Movie listings are temporarily unavailable.</p>';
  }
}

function inferGenreKey(movie) {
  const genre = (movie.genre || '').toLowerCase();

  if (genre.includes('action')) return 'action';
  if (genre.includes('comedy')) return 'comedy';
  if (genre.includes('horror')) return 'horror';
  if (genre.includes('biographical')) return 'biographical';
  if (genre.includes('family') || genre.includes('kids')) return 'kids';
  if (genre.includes('classic')) return 'classics';

  return 'all';
}

function renderNowShowingMovies(container, movies) {
  container.innerHTML = movies.map(movie => {
    const genreKey = inferGenreKey(movie);
    const safeTitle = encodeURIComponent(movie.title);
    const detailSlug = encodeURIComponent(movie.slug || movie.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
    const ratingImage = movie.ratingImage || 'assets/Images/Ratings/tbc.png';

    return `
      <div class="poster-column" data-genre="${genreKey}">
        <img class="poster" src="${movie.poster || 'assets/Images/logo.png'}" alt="${movie.title}">
        <div class="overlay">
          <div class="overlay-text">${movie.title}</div>
          <div class="runtime">${movie.runtime || 0} mins</div>
          <img class="rating" src="${ratingImage}" alt="${movie.rating || 'Rating'}">
          <a class="button" href="bookNow.html?movie=${safeTitle}&time=19:00">Book Now</a>
          <a class="button" href="templates/movie-detail.html?movie=${detailSlug}">More Info</a>
        </div>
      </div>
    `;
  }).join('');

  if (typeof window.initGenreFilterAndSearch === 'function') {
    window.initGenreFilterAndSearch();
  }
}

document.addEventListener('DOMContentLoaded', loadNowShowingMovies);
