import React from "react";
import MovieCarousel from "./MovieCarousel";

function MainPage() {
    return (
        <div className="mainpage">
            <div className="mainpage-title">
                Get recommendations based on your ratings!
            </div>
            <div className="top-picks">
                <h3>Top Picks</h3>
                <MovieCarousel />
            </div>
            <div className="recently-released">
                <h3>Recently Released</h3>
                <MovieCarousel />
            </div>
            <div className="also-watch">
                <h3>Recommended Movies</h3>
                <MovieCarousel />
            </div>
            <div className="">
                <MovieCarousel />
            </div>
            <div className="">
                <MovieCarousel />
            </div>
        </div>
    );
}

export default MainPage;
