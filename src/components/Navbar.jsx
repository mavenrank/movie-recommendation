import React from "react";
import { BiSolidCameraMovie } from "react-icons/bi";
import { MdHome } from "react-icons/md";
import { Outlet } from "react-router";
function Navbar() {
    return (
        <div>
            <div className="navbar">
                <div className="logo-and-brand">
                    <div className="logo-div">
                        <BiSolidCameraMovie className="logo" />
                    </div>
                    <div className="brand">Cine</div>
                </div>
                <div className="centre-section"></div>
                <div className="right-buttons">
                    <div className="home-button">
                        <a href="/" className="bn3 ">
                            <MdHome />
                        </a>
                    </div>
                    <div className="user-name-login">
                        <a href="/profile" className="bn3">
                            Profile
                        </a>
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    );
}

export default Navbar;
