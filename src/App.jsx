import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import Form from "./pages/Form";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <ToastContainer position="top-right" autoClose={2000} />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/add" element={<Form />}></Route>
                <Route path="/update/:id" element={<Form />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;