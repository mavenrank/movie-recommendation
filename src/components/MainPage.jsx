import React from "react";
import MovieCarousel from "./MovieCarousel";

function MainPage() {
    
    return (
        <div className="mainpage">
            <div className="mainpage-title">
                Get recommendations based on your ratings!
            </div>
            <div className="carousel-section">
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
                    <h3>lorem ipsum</h3>
                    <MovieCarousel />
                </div>
                <div className="">
                    <h3>looreem</h3>
                    <MovieCarousel />
                </div>
            </div>
        </div>
    );
}

export default MainPage;
