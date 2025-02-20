import React from "react";
import { useLocation, useParams } from "react-router";

function IndividualMovie() {
    const location = useLocation();
    const { id } = useParams();
    const {title, rating, posterUrl, year } = location.state;
    return (
        <div className="individual-movie-page">
            <div className="individual-movie-title-and-poster">
                <div className="individual-movie-poster">
                    <img src="/assets/image.png" alt="Poster" className="individual-movie-poster-img"/>
                </div>
                <div className="individual-movie-title">
                    <h1>{title}</h1>
                </div>
            </div>
            <div className="individual-movie-details">
                <div className="">
                    {rating}
                    {year}
                </div>
            </div>

        </div>
    );
}

export default IndividualMovie;
