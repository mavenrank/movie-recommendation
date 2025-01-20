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
        id:2,
        title: "Interstellar",
        rating: 4.6,
        posterUrl: "/path/to/interstellar.jpg",
        year: 2014,
    },
    {
        id:3,
        title: "The Dark Knight",
        rating: 4.9,
        posterUrl: "/path/to/dark-knight.jpg",
        year: 2008,
    },
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
