import React, { useState } from "react";
import { Link } from "react-router";

const Movie = ({ id, title, rating, posterUrl, year }) => {

    const [userRating, setUserRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [posterHover, setPosterHover] = useState(0);
    return (
        <div className="movie" >
            <div className="movie-poster" onMouseEnter={() => setPosterHover(1)} onMouseLeave={() => setPosterHover(0)}>
                <img src={posterUrl} ></img>
            </div>
            {posterHover ?  <div className="ratings-overlay" onMouseEnter={() => setPosterHover(1)} onMouseLeave={() => setPosterHover(0)}>
                <div className="ratings">
                    <div className="star-rating">
                        <div style={{fontSize:24}}>{rating}★</div>
                        <div className="stars" style={{ display: "flex", flexDirection: "row" }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    style={{
                                        fontSize: "2rem",
                                        color:
                                            star <= (hover || userRating)
                                                ? "#ffc107"
                                                : "#e4e5e9",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setUserRating(star)}
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(0)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <div className="rating">
                            Your Rating : {userRating ? userRating : 0}★
                        </div>
                        <button onClick={() => setUserRating(0)} style={{ height: 20, width: 50 }}>
                            Reset
                        </button>
                    </div>
                </div>
            </div> : <></>}
            <Link to={`/movie/${id}`} style={{textDecoration:'none', color:'inherit'}}>
                <div className="movie-details">
                    <div className="movie-title">{title}</div>
                    <div>{year}</div>
                </div>
            </Link>
        </div>
    );
}

export default Movie;
