import React from "react";
import { BiSolidCameraMovie } from "react-icons/bi";
function Navbar() {
    return (
        <div className="navbar">
            <div className="logo-and-brand">
                <div className="logo-div">
                    <BiSolidCameraMovie className="logo"/>
                </div>
                <div className="brand">Solaris</div>
            </div>
            <div className="centre-section"></div>
            <div className="user-name-login"></div>
        </div>
    );
}

export default Navbar;
