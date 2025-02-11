import React from "react";
import { BiSolidCameraMovie } from "react-icons/bi";
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
                <div className="user-name-login">
                    <a href="/login" className="bn3">Login</a>
                </div>
            </div>
            <Outlet />
        </div>
    );
}

export default Navbar;
