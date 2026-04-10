
// location search script

const searchInput = document.querySelector('.search__input')
const searchBtn = document.querySelector('.search__btn')
const clearBtn = document.querySelector('.clear__btn')
const resultsTitle = document.querySelector('.response__title')
const resultsContainer = document.querySelector('.response__container')


// default cards

const popularDestinations = [
  {
    "name": "Sydney, Australia",
    "imageUrl": "assets/images/sidney.jpg",
    "description": "A vibrant city known for its iconic landmarks like the Sydney Opera House and Sydney Harbour Bridge."
  },
  {
    "name": "São Paulo, Brazil",
    "imageUrl": "assets/images/sao-paulo.jpg",
    "description": "The financial hub with diverse culture, arts, and a vibrant nightlife."
  },
  {
    "name": "Taj Mahal, India",
    "imageUrl": "assets/images/taj-mahal.jpg",
    "description": "An iconic symbol of love and a masterpiece of Mughal architecture."
  }
]

// function for search input in data

async function searchLocation() {
  const inputData = searchInput.value.toLowerCase().trim()
  let results = []
  const data = await getData()

  const match = data.countries.find(place => place.name.toLowerCase() === inputData)
  if (match) {
    results = match.cities
  } else if (inputData === 'country' || inputData === 'countries') {
    results = [...data.countries[0].cities, ...data.countries[1].cities]
  } else if (data[inputData] || data[inputData + 's'] || data[inputData + 'es']) {
    results = data[inputData] || data[inputData + 's'] || data[inputData + 'es']
  }

  renderResults(results, inputData)
}

// function for get data from json file

async function getData() {
  try {
    const response = await fetch('assets/data/travel_recommendation_api.json')
    const data = await response.json()
    return data

  } catch (error) {
    console.error(error)
  }
}

// function for render results from query

function renderResults(results, search = null) {
  resultsContainer.innerHTML = ""
  if (search === null) {
    resultsTitle.textContent = 'Popular Destinations'
  } else if (results.length > 0) {
    resultsTitle.textContent = `Results for = '${searchInput.value.toLowerCase()}'`
  } else {
    resultsTitle.textContent = 'No results found'
  }

  if (results.length === 0) {
    const notFound = document.createElement('p')
    notFound.innerHTML = `<p class="no__results">No results found. Please try another query</p>`
    resultsContainer.appendChild(notFound)
    return
  }
  results.map(({ name, imageUrl, description }) => {
    const article = document.createElement('article')
    article.innerHTML =
      `
    <article class="response__card">
        <h3 class="response__card__title">${name}</h3>
        <p class="response__card__text">${description}</p>
        <img src=${imageUrl} alt="Melbourne" class="response__card__image">
      </article>
        `
    resultsContainer.appendChild(article)
  })

}

// function for reset results and render default

function resetToDefault() {
  resultsTitle.textContent = 'Popular Destinations'
  renderResults(popularDestinations)
}
resetToDefault()

// buttons evenListeners

searchBtn.addEventListener('click', (eve) => {
  eve.preventDefault()
  searchLocation()
  resultsContainer.scrollIntoView({ behavior: 'smooth' })
})

clearBtn.addEventListener('click', resetToDefault)