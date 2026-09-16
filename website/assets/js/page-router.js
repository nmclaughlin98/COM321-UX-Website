// router.js - Centralized Client-Side Routing & Path Cleanup

// Step A: Restore original path if redirected from 404.html
(function restorePathFromRedirect() {
  const l = window.location;
  if (l.search[1] === 'p') {
    const decoded = l.search.slice(1).split('&').map(s => s.replace(/~and~/g, '&'))
      .filter(s => s.slice(0, 2) === 'p=')[0].split('=')[1];

    window.history.replaceState(null, null, l.pathname.slice(0, -1) + decoded + l.hash);
  }
})();

// Step B: Route Helper Utilities
function getRouteInfo() {
  const pathSegments = window.location.pathname.split('/').filter(Boolean);
  
  return {
    path: window.location.pathname,
    segments: pathSegments,
    // E.g. /movie/the-odyssey -> slug = "the-odyssey"
    slug: (pathSegments[0] === 'movie' && pathSegments[1]) ? pathSegments[1] : null 
  };
}

// Step C: Route Handler (Call on DOM ready)
document.addEventListener('DOMContentLoaded', async () => {
  const route = getRouteInfo();

  // Route 1: Dynamic Movie Detail Page
  if (route.slug) {
    loadMovieDetails(route.slug);
  } 
  // Route 2: Now Showing Page
  else if (route.segments.includes('nowShowing')) {
    initNowShowingPage();
  } 
  // Route 3: Index / Home Page
  else {
    initHomePage();
  }
});
