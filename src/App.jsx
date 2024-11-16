import "remixicon/fonts/remixicon.css";
import React, { useRef } from "react";
import Navbar from "./components/Navbar";
import gsap from "gsap";
import Form from "./components/Form";
import Footer from "./components/Footer";
// import AsideMenu from "./components/AsideMenu";

const App = () => {
    const asideMenuRef = useRef();

    // const handleMenuClick = () => {
    //     // Create a fresh timeline each time
    //     const tl = gsap.timeline();

    //     // Animate the aside menu into view
    //     tl.to(asideMenuRef.current, {
    //         right: 0,
    //         duration: 0.4,
    //         ease: "power2.out",
    //     });

    //     // Animate the links with staggered effect
    //     tl.from(".asideLink", {
    //         opacity: 0,
    //         x: 100,
    //         stagger: 0.4,
    //         ease: "power2.out",
    //     });

    //     // Animate the close button
    //     tl.from(
    //         "#sidebar #close-btn",
    //         {
    //             opacity: 0,
    //             duration: 0.3,
    //         },
    //         "-=1"
    //     );
    // };

    // const handleCloseMenuClick = () => {
    //     gsap.to(asideMenuRef.current, {
    //         right: "-100%",
    //         duration: 0.4,
    //         ease: "power2.in",
    //     });
    // };

    return (
        <main className="relative overflow-x-hidden bg-bg-dark text-gray-300 h-screen">
            {/* Aside Menu */}
            {/* <AsideMenu
                asideMenuRef={asideMenuRef}
                handleCloseMenuClick={handleCloseMenuClick}
            /> */}
            <Navbar />
            <Form />
            <Footer />
        </main>
    );
};

export default App;
