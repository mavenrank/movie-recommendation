import React, {useState} from "react";
import MovieCarousel from "./MovieCarousel";

const Profile = () => {
    const [name, setName] = useState("Placeholder");
    return (
        <div>
            <div className="profile-photo-and-name">
                <img className="profile-photo" ></img>
                <div><h1>Hi, {name}</h1></div>
            </div>
            <div className="recently-rated-movies">
                <h2>Your Recently Rated Movies</h2>
                <MovieCarousel />
            </div>
        </div>
    );
};

export default Profile;
