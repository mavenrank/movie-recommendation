
const topMoviesByGenre = {
    Action: {
        "The Dark Knight": "tt0468569",
        Inception: "tt1375666",
        "The Matrix": "tt0133093",
        "The Lord of the Rings: The Return of the King": "tt0167260",
        "The Lord of the Rings: The Fellowship of the Ring": "tt0120737",
        "The Lord of the Rings: The Two Towers": "tt0167261",
        "The Empire Strikes Back": "tt0080684",
        "The Matrix Reloaded": "tt0234215",
        "The Matrix Revolutions": "tt0242653",
        Gladiator: "tt0172495",
    },
    Drama: {
        "The Shawshank Redemption": "tt0111161",
        "The Godfather": "tt0068646",
        "The Godfather Part II": "tt0071562",
        "12 Angry Men": "tt0050083",
        "Schindler's List": "tt0108052",
        "Pulp Fiction": "tt0110912",
        "Fight Club": "tt0137523",
        "Forrest Gump": "tt0109830",
        "The Lord of the Rings: The Return of the King": "tt0167260",
        "The Lord of the Rings: The Fellowship of the Ring": "tt0120737",
    },
    Comedy: {
        "Life Is Beautiful": "tt0118799",
        "Back to the Future": "tt0088763",
        "Modern Times": "tt0027977",
        "City Lights": "tt0021749",
        "The Intouchables": "tt1675434",
        "The Great Dictator": "tt0032553",
        "The Apartment": "tt0053604",
        "Some Like It Hot": "tt0053291",
        Amélie: "tt0211915",
        "Toy Story 3": "tt0435761",
    },
    Thriller: {
        "The Silence of the Lambs": "tt0102926",
        Se7en: "tt0114369",
        Parasite: "tt6751668",
        "The Prestige": "tt0482571",
        Memento: "tt0209144",
        "The Departed": "tt0407887",
        Psycho: "tt0054215",
        "Léon: The Professional": "tt0110413",
        "The Usual Suspects": "tt0114814",
        "American History X": "tt0120586",
    },
    SciFi: {
        Inception: "tt1375666",
        "The Matrix": "tt0133093",
        Interstellar: "tt0816692",
        "The Empire Strikes Back": "tt0080684",
        "Star Wars": "tt0076759",
        "The Matrix Reloaded": "tt0234215",
        "The Matrix Revolutions": "tt0242653",
        "Blade Runner 2049": "tt1856101",
        "The Prestige": "tt0482571",
        "Back to the Future": "tt0088763",
    },
};

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// const MovieCarousel = () => {
//     return (
//         <div className="movie-carousel">
            
//             {movies.map((movie, index) => {
//                 return (
//                     <Movie key={index} id={movie.id} title={movie.title} rating={movie.rating} year={movie.year} />
//                 )
//             })}
//         </div>
//     );
// }

import { useState, useEffect } from "react";
import Movie from "./Movie";
const MovieCarousel = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const moviePromises = Object.values(topMoviesByGenre)
                .flatMap(Object.values)
                .map(async (imdbId) => {
                    try {
                        const response = await fetch(
                            `https://api.themoviedb.org/3/find/${imdbId}?external_source=imdb_id&language=en`,
                            {
                                method: "GET",
                                headers: {
                                    accept: "application/json",
                                    Authorization: `Bearer ${TMDB_API_KEY}`,
                                },
                            }
                        );
                        const data = await response.json();
                        if (data.movie_results.length > 0) {
                            const movie = data.movie_results[0];
                            return {
                                id: movie.id,
                                title: movie.title,
                                posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                                year: movie.release_date ? movie.release_date.split("-")[0] : "N/A",
                            };
                        }
                    } catch (error) {
                        console.error("Error fetching movie:", error);
                    }
                    return null;
                });

            const fetchedMovies = (await Promise.all(moviePromises)).filter(Boolean);
            setMovies(fetchedMovies);
        };

        fetchMovies();
    }, []);

    return (
        <div className="movie-carousel">
            {movies.length > 0 ? (
                movies.map((movie) => (
                    <Movie key={movie.id} id={movie.id} title={movie.title} year={movie.year} posterUrl={movie.posterUrl} />
                ))
            ) : (
                <p>Loading movies...</p>
            )}
        </div>
    );
};

export default MovieCarousel;
