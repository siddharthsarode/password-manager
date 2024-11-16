import React from "react";

const Footer = () => {
    return (
        <footer className="bg-secondary text-gray-400 py-6 text-center">
            <p className="text-sm">
                © {new Date().getFullYear()} Design and Develop by
                <span className="text-primary"> Siddharth Sarode. </span>
            </p>
        </footer>
    );
};

export default Footer;
