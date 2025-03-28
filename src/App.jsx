import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import MainPage from "./components/MainPage";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import IndividualMovie from "./components/IndividualMovie";
import Error from "./components/Error";
import FreshSetup from "./components/FreshSetup";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Landing Page (No Navbar) */}
                <Route path="/" element={<LandingPage />} />

                {/* Other Pages (With Navbar) */}
                <Route path="/" element={<Navbar />}>
                    <Route path="/mainpage" element={<MainPage />} />
                    <Route path="/about" element={<About />} />

                    <Route path="/profile" element={<Profile />} />
                    <Route path="/movie/:id" element={<IndividualMovie />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* FreshSetup is Protected */}
                <Route
                    path="/FreshSetup"
                    element={
                        <ProtectedRoute>
                            <FreshSetup />
                        </ProtectedRoute>
                    }
                />

                {/* Error Page */}
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
