async function loadTopPicks() {
  const container = document.getElementById('top-picks-list');
  if (!container) return;

  try {
    const response = await fetch('assets/data/movies.json');
    if (!response.ok) throw new Error('Unable to load movies data');

    const movies = await response.json();

    // Filter out hidden movies AND check for topPicks / top_picks flag
    const topPicks = movies.filter(movie =>
        movie.visible !== false && (movie.topPick === true || movie.top_pick === true)
    );

    renderTopPicks(container, topPicks);
  } catch (error) {
    console.error(error);
    container.innerHTML = '<p>Top picks are temporarily unavailable.</p>';
  }
}

function renderTopPicks(container, movies) {
  container.innerHTML = movies.map(movie => {
    const safeTitle = encodeURIComponent(movie.title);
    const detailSlug = encodeURIComponent(movie.slug || movie.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
    const ratingImage = movie.ratingImage || 'assets/Images/Ratings/tbc.png';

    return `
      <div class="poster-column">
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
}

document.addEventListener('DOMContentLoaded', loadTopPicks);