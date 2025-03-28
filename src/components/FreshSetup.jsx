import React, { useState, useEffect } from "react";
// Importing the JSON
import { useNavigate } from "react-router-dom";
import Movie from "./Movie";
import { auth, db } from "../firebase";
import { getAuth } from "firebase/auth";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
const topMoviesByGenre = {
    Action: {
        tt0468569: "The Dark Knight",
        tt1375666: "Inception",
        tt0133093: "The Matrix",
        tt0167260: "The Lord of the Rings: The Return of the King",
        tt0120737: "The Lord of the Rings: The Fellowship of the Ring",
        tt0167261: "The Lord of the Rings: The Two Towers",
        tt0080684: "The Empire Strikes Back",
        tt0234215: "The Matrix Reloaded",
        tt0242653: "The Matrix Revolutions",
        tt0172495: "Gladiator",
    },
    Drama: {
        tt0111161: "The Shawshank Redemption",
        tt0068646: "The Godfather",
        tt0071562: "The Godfather Part II",
        tt0050083: "12 Angry Men",
        tt0108052: "Schindler's List",
        tt0110912: "Pulp Fiction",
        tt0137523: "Fight Club",
        tt0109830: "Forrest Gump",
        tt0167260: "The Lord of the Rings: The Return of the King",
        tt0120737: "The Lord of the Rings: The Fellowship of the Ring",
    },
    Comedy: {
        tt0118799: "Life Is Beautiful",
        tt0088763: "Back to the Future",
        tt0027977: "Modern Times",
        tt0021749: "City Lights",
        tt1675434: "The Intouchables",
        tt0032553: "The Great Dictator",
        tt0053604: "The Apartment",
        tt0053291: "Some Like It Hot",
        tt0211915: "Amélie",
        tt0435761: "Toy Story 3",
    },
    Thriller: {
        tt0102926: "The Silence of the Lambs",
        tt0114369: "Se7en",
        tt6751668: "Parasite",
        tt0482571: "The Prestige",
        tt0209144: "Memento",
        tt0407887: "The Departed",
        tt0054215: "Psycho",
        tt0110413: "Léon: The Professional",
        tt0114814: "The Usual Suspects",
        tt0120586: "American History X",
    },
    SciFi: {
        tt1375666: "Inception",
        tt0133093: "The Matrix",
        tt0816692: "Interstellar",
        tt0080684: "The Empire Strikes Back",
        tt0076759: "Star Wars",
        tt0234215: "The Matrix Reloaded",
        tt0242653: "The Matrix Revolutions",
        tt1856101: "Blade Runner 2049",
        tt0482571: "The Prestige",
        tt0088763: "Back to the Future",
    },
};


const FreshSetup = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [ratings, setRatings] = useState({});
    const [ratedMovies, setRatedMovies] = useState([]);
    const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    useEffect(() => {
        const fetchMovies = async () => {
            const moviePromises = Object.entries(topMoviesByGenre).flatMap(
                ([genre, movies]) =>
                    Object.entries(movies).map(async ([title, imdbId]) => {
                        try {
                            const response = await fetch(
                                `https://api.themoviedb.org/3/find/${imdbId}?external_source=imdb_id&language=en`,
                                {
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
                                    title,
                                    posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                                    year: movie.release_date
                                        ? movie.release_date.split("-")[0]
                                        : "N/A",
                                    genre,
                                };
                            }
                        } catch (error) {
                            console.error("Error fetching movie:", error);
                        }
                        return null;
                    })
            );

            const fetchedMovies = (await Promise.all(moviePromises)).filter(
                Boolean
            );
            setMovies(fetchedMovies);
        };

        fetchMovies();
    }, []);

    // Handle rating change
    const handleRatingChange = (movieId, rating) => {
        console.log(
            `Updating rating: Movie ID = ${movieId}, Rating = ${rating}`
        );

        setRatings((prevRatings) => ({
            ...prevRatings,
            [movieId]: rating,
        }));

        setRatedMovies((prevRatedMovies) => {
            const existingMovieIndex = prevRatedMovies.findIndex(
                (m) => m.imdbID === movieId
            );

            if (existingMovieIndex !== -1) {
                // Update the existing movie rating
                const updatedMovies = [...prevRatedMovies];
                updatedMovies[existingMovieIndex] = {
                    ...updatedMovies[existingMovieIndex],
                    rating: rating,
                };
                return updatedMovies;
            } else {
                // Add a new movie entry
                const movie = movies.find((m) => m.imdbID === movieId);
                if (movie) {
                    console.log(
                        `Adding new rated movie: ${movie.title} (IMDb ID: ${movie.imdbID})`
                    );
                    return [...prevRatedMovies, { ...movie, rating }];
                } else {
                    console.warn(`Movie not found for ID: ${movieId}`);
                    return prevRatedMovies;
                }
            }
        });
    };


    useEffect(() => {
        const user = auth.currentUser;
        const needsSetup = localStorage.getItem("needsSetup") === "true";

        if (!user) {
            navigate("/login");
            return;
        }

        if (!needsSetup) {
            navigate("/MainPage");
            return;
        }
    }, [navigate]);

    // const handleSubmit = async () => {
    //     try {
    //         const ratingsRef = collection(db, "ratings");

    //         for (const movie of ratedMovies) {
    //             const movieDoc = doc(ratingsRef, movie.imdbID); // Use IMDb ID as document ID
    //             await setDoc(movieDoc, {
    //                 movieID: movie.imdbID,
    //                 rating: movie.rating,
    //                 timestamp: new Date(),
    //             });
    //         }

    //         console.log("Ratings submitted successfully!");
    //         localStorage.setItem("needsSetup", "false");
    //         navigate("/MainPage");
    //     } catch (error) {
    //         console.error("Error submitting ratings:", error);
    //     }
    // };


    const handleSubmit = async () => {
        try {
            if (!ratedMovies || ratedMovies.length === 0) {
                console.error("No movies have been rated!");
                return;
            }

            // Reference to the 'user-data' collection
            const userCollection = collection(db, "user-data");

            // Fetch existing users to determine the next available user ID
            const snapshot = await getDocs(userCollection);
            const userCount = snapshot.size; // Number of existing users

            // Generate user ID starting from 1300000
            const userId = 1300000 + userCount;

            // Prepare ratings object
            const ratings = {};
            ratedMovies.forEach((movie) => {
                if (movie?.imdbID && movie?.rating !== undefined) {
                    ratings[movie.imdbID] = movie.rating; // Store IMDb ID as key
                } else {
                    console.warn(
                        "Skipping movie with missing IMDb ID or rating:",
                        movie
                    );
                }
            });

            // Check if ratings object is still empty
            if (Object.keys(ratings).length === 0) {
                console.error(
                    "No valid ratings found. Ratings object is empty."
                );
                return;
            }

            // Create a new document in Firestore with user ID
            const userDoc = doc(db, "user-data", userId.toString());
            await setDoc(userDoc, {
                user_id: userId,
                ratings: ratings,
            });

            console.log("Ratings submitted successfully for user:", userId);
            console.log("Stored Ratings:", ratings); // Debugging output
            localStorage.setItem("needsSetup", "false");
            navigate("/MainPage");
        } catch (error) {
            console.error("Error submitting ratings:", error);
        }
    };


    

    return (
        <div className="freshsetup">
            <h2>Rate Movies to Get Better Recommendations!</h2>

            <div className="freshsetup-carousel-section">
                {Object.keys(topMoviesByGenre).map((genre, index) => (
                    <div key={index} className="freshsetup-genre">
                        <h3>{genre}</h3>
                        <div className="movie-carousel">
                            {movies
                                .filter((movie) => movie.genre === genre)
                                .map((movie) => (
                                    <Movie
                                        key={movie.id}
                                        id={movie.id}
                                        title={movie.title}
                                        rating={ratings[movie.id] || 0}
                                        posterUrl={movie.posterUrl}
                                        year={movie.year}
                                        onRate={handleRatingChange}
                                    />
                                ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="rated-movies">
                <h3 className="rated-movies-title">Movies You Have Rated:</h3>
                {ratedMovies.length > 0 ? (
                    <ul className="rated-movies-list">
                        {ratedMovies.map((movie) => (
                            <li key={movie.imdbID} className="rated-movie-item">
                                <span className="rated-movie-title">
                                    {movie.title}
                                </span>
                                <span className="rated-movie-rating">
                                    {movie.rating}★
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-rated-movies">
                        You haven't rated any movies yet.
                    </p>
                )}
            </div>

            <button className="submit-button" onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
};

export default FreshSetup;
