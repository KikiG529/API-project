// omdb_script.js
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchResultsContainer = document.getElementById('searchResults');

// Replace 'YOUR_OMDB_API_KEY' with your actual OMDb API key
const API_KEY = '325af89f';
const BASE_URL = 'https://www.omdbapi.com/';

async function searchMovies(query) {
  const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`; // You can change type to 'series' or 'episode'

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === 'True' && data.Search) {
      displayResults(data.Search);
    } else {
      searchResultsContainer.innerHTML = `<p>${data.Error || 'No results found.'}</p>`;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    searchResultsContainer.innerHTML = '<p>Failed to search for movies/shows.</p>';
  }
}

function displayResults(results) {
  searchResultsContainer.innerHTML = ''; // Clear previous results

  results.forEach(item => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    const poster = item.Poster === 'N/A' ? 'placeholder.png' : item.Poster; // Use a placeholder if no poster

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