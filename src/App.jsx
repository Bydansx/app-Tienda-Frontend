import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Si la ruta es "/" muestra Home */}
                <Route path="/" element={<Home />} />

                {/* Si la ruta es "/admin" muestra Login */}
                <Route path="/admin" element={<Login />} />

                <Route path="/Dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}



export default App;