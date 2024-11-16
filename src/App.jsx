import "remixicon/fonts/remixicon.css";
import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import Footer from "./components/Footer";
// import AsideMenu from "./components/AsideMenu";

const App = () => {
    return (
        <main className="relative overflow-x-hidden bg-bg-dark text-gray-300 h-screen">
            <Navbar />
            <Form />
            <Footer />
        </main>
    );
};

export default App;
