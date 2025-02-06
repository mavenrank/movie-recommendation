import React from "react";
import Movie from "./Movie";

const movies = [
    {
        id: 1,
        title: "Inception",
        rating: 4.8,
        posterUrl: "/path/to/inception.jpg",
        year: 2010,
    },
    {
        id: 2,
        title: "Interstellar",
        rating: 4.6,
        posterUrl: "/path/to/interstellar.jpg",
        year: 2014,
    },
    {
        id: 3,
        title: "The Dark Knight",
        rating: 4.9,
        posterUrl: "/path/to/dark-knight.jpg",
        year: 2008,
    },
    {
        id: 4,
        title: "The Matrix",
        rating: 4.7,
        posterUrl: "/path/to/matrix.jpg",
        year: 1999,
    },
    {
        id: 5,
        title: "The Shawshank Redemption",
        rating: 5.0,
        posterUrl: "/path/to/shawshank.jpg",
        year: 1994,
    },
    {
        id: 6,
        title: "The Godfather",
        rating: 4.9,
        posterUrl: "/path/to/godfather.jpg",
        year: 1972,
    },
    {
        id: 7,
        title: "Pulp Fiction",
        rating: 4.8,
        posterUrl: "/path/to/pulp-fiction.jpg",
        year: 1994,
    },
    {
        id: 8,
        title: "Fight Club",
        rating: 4.8,
        posterUrl: "/path/to/fight-club.jpg",
        year: 1999,
    },
    {
        id: 9,
        title: "Forrest Gump",
        rating: 4.8,
        posterUrl: "/path/to/forrest-gump.jpg",
        year: 1994,
    },
    {
        id: 10,
        title: "The Lion King",
        rating: 4.7,
        posterUrl: "/path/to/lion-king.jpg",
        year: 1994,
    },
    {
        id: 11,
        title: "Gladiator",
        rating: 4.8,
        posterUrl: "/path/to/gladiator.jpg",
        year: 2000,
    },
    {
        id: 12,
        title: "The Avengers",
        rating: 4.7,
        posterUrl: "/path/to/avengers.jpg",
        year: 2012,
    },
    {
        id: 13,
        title: "The Prestige",
        rating: 4.8,
        posterUrl: "/path/to/prestige.jpg",
        year: 2006,
    },
    {
        id: 14,
        title: "Mad Max: Fury Road",
        rating: 4.6,
        posterUrl: "/path/to/mad-max.jpg",
        year: 2015,
    },
    {
        id: 15,
        title: "Blade Runner 2049",
        rating: 4.7,
        posterUrl: "/path/to/blade-runner.jpg",
        year: 2017,
    }
];


const MovieCarousel = () => {
    return (
        <div className="movie-carousel">
            
            {movies.map((movie, index) => {
                return (
                    <Movie key={index} title={movie.title} rating={movie.rating} year={movie.year} />
                )
            })}
        </div>
    );
}

export default MovieCarousel;
