const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchResultsContainer = document.getElementById('searchResults');
const yearSortSelect = document.getElementById('year-sort'); // Get the sort dropdown

const API_KEY = '325af89f';
const BASE_URL = 'https://www.omdbapi.com/';

let currentSearchResults = []; // Store the current search results

async function searchMovies(query) {
  const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === 'True' && data.Search) {
      currentSearchResults = data.Search; // Store the fetched results
      displayResults(currentSearchResults);
    } else {
      searchResultsContainer.innerHTML = `<p>${data.Error || 'No results found.'}</p>`;
      currentSearchResults = [];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    searchResultsContainer.innerHTML = '<p>Failed to search for movies/shows.</p>';
    currentSearchResults = [];
  }
}

function displayResults(results) {
  searchResultsContainer.innerHTML = '';
  results.forEach(item => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    const poster = item.Poster === 'N/A' ? 'placeholder.png' : item.Poster;

    movieCard.innerHTML = `
      <img src="${poster}" alt="${item.Title}">
      <h3>${item.Title}</h3>
      <p>Year: ${item.Year}</p>
      <p>Type: ${item.Type}</p>
    `;
    searchResultsContainer.appendChild(movieCard);
  });
}

searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    searchMovies(query);
  } else {
    searchResultsContainer.innerHTML = '<p>Please enter a title to search.</p>';
  }
});

searchInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    searchButton.click();
  }
});

// Event listener for the year sort dropdown
yearSortSelect.addEventListener('change', function() {
  const selectedOption = this.value;

  if (selectedOption === 'newest') {
    currentSearchResults.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
  } else if (selectedOption === 'oldest') {
    currentSearchResults.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
  }

  displayResults(currentSearchResults); // Re-render the sorted results
});
