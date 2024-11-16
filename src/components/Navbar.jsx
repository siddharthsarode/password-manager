import React, { useEffect } from "react";
import { gsap } from "gsap";

const Navbar = () => {
    useEffect(() => {
        const tl = gsap.timeline();

        // Animate logo
        tl.fromTo(
            ".logo",
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );

        // Animate GitHub button
        tl.fromTo(
            ".github-btn",
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
            "<" // Start at the same time as the previous animation
        );
    }, []);

    return (
        <nav className="flex items-center justify-between px-6 py-4 text-white md:px-16">
            {/* Logo */}
            <div className="logo">
                <h1 className="text-3xl md:text-4xl">
                    Pass<span className="text-primary">M</span>
                </h1>
            </div>

            {/* Menu Icon */}
            <a
                href="https://github.com/siddharthsarode"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-4 flex items-center gap-3 bg-primary text-white text-lg rounded-xl github-btn"
            >
                <i className="ri-github-fill text-2xl"></i>
                <span>Github</span>
            </a>
        </nav>
    );
};

export default Navbar;
