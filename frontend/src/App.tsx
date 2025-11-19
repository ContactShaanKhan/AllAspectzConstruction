import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Navbar } from './components/organisms';
import './App.css';

const Home = React.lazy(() => import("./routes/home/Home"));
const Projects = React.lazy(() => import("./routes/projects/Projects"));

function App() {
    return (
        <div className="App">
            <Navbar />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
