const createMovieSection = (movie) => {
    const card = document.createElement("div");
    card.classList.add("movie-section");

    const infoMovie = document.createElement("div");
    infoMovie.classList.add("movie-info");

    const name = document.createElement("h2");
    name.classList.add("movie-name");
    name.textContent = movie.name;

    const typesMovie = document.createElement("div");
    typesMovie.classList.add("movie-types");

    if (movie.genres && movie.genres.length > 0) {
        movie.genres.forEach((genre) => {
            const genreSpan = document.createElement("span");
            genreSpan.classList.add("movie-type");
            genreSpan.textContent = genre;
            typesMovie.appendChild(genreSpan);
        });
    }

    infoMovie.appendChild(name);
    infoMovie.appendChild(typesMovie);

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("movie-image-container");

    const image = document.createElement("img");
    image.classList.add("movie-image");
    image.src = movie.image ? movie.image.medium : "default-image.jpg";
    image.alt = movie.name;

    imageContainer.appendChild(image);

    card.appendChild(infoMovie);
    card.appendChild(imageContainer);

    return card;
};

const loadMovie = async () => {
    const movieGrid = document.getElementById("movie-grid");
    try {
        const response = await axios.get("https://api.tvmaze.com/shows/1/episodes");
        const movies = response.data;
        movieGrid.innerHTML = '';

        for (const movie of movies) {
            const movieCard = createMovieSection(movie);
            movieGrid.appendChild(movieCard);
        }
    } catch (error) {
        console.log("No jalo: ", error);
    }
}

document.addEventListener("DOMContentLoaded", loadMovie);

const searchMovie = async () => {
    const movieName = document.getElementById('search-movies').value.toLowerCase();
    if (movieName) {
        try {
            const response = await axios.get (`https://api.tvmaze.com/singlesearch/shows?q=${movieName}`);
            const movieGrid = document.getElementById ("movie-grid");
            movieGrid.innerHTML = '';
            const movieCard = createMovieSection(response.data);
            movieGrid.appendChild(movieCard);
        } catch (error) {
            console.log("No jalo otra vez: ", error);
        }
    }
};
