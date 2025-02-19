import "./App.css";
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainPage from "./components/MainPage";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Error from "./components/Error";
import IndividualMovie from "./components/IndividualMovie";
import Profile from "./components/Profile";

function App() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navbar/>}>
                        <Route index element = {<MainPage/>}/>
                        <Route path="/about" element={<About />}></Route>
                        {/* <Route path="/contact" element={<Contact />}></Route> */}
                        <Route path="/profile" element={<Profile />}></Route>
                        <Route path="/movie/:id" element={<IndividualMovie />}></Route>
                    </Route>
                    <Route path="*" element={<Error/>}/>
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
