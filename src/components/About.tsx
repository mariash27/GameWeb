import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
    React.useEffect(() => {
        // Set up a GSAP timeline with ScrollTrigger for animation
        const clipAnimation = gsap.timeline({
        scrollTrigger: {
            trigger: "#clip", // Element to trigger the animation
            start: "center center", // Start animation when the element is centered
            end: "+=800 center", // End animation after scrolling 800px
            scrub: 0.5, // Smooth scrubbing effect
            pin: true, // Pin the element while scrolling
            pinSpacing: true, // Keep space for pinned content
        },
        });

        // Animate the element with class .mask-clip-path
        clipAnimation.to(".mask-clip-path", {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        });

        // Clean up ScrollTrigger on component unmount to avoid memory leaks
        return () => {
        clipAnimation.scrollTrigger?.kill();
        };
    }, []);

    return (
        <div id="about" className="min-h-screen w-screen">
        {/* Intro section with a title and description */}
        <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
            <p className="font-general text-sm uppercase md:text-[10px]">
            Welcome to Zentry
            </p>

            <AnimatedTitle
            title="Disc<b>o</b>ver the world's<br />largest shared <b>a</b>dventure"
            containerClass="mt-5 !text-black text-center"
            />

            <div className="about-subtext">
            <p>The Game of Games begins—your life, now an epic MMORPG</p>
            <p className="text-gray-500">
                Zentry unites every player from countless games and platforms, both
                digital and physical, into a unified Play Economy
            </p>
            </div>
        </div>

        {/* Animated clip section */}
        <div className="h-dvh w-screen" id="clip">
            <div className="mask-clip-path about-image">
            <img
                src="img/about.webp"
                alt="Background"
                className="absolute left-0 top-0 size-full object-cover"
            />
            </div>
        </div>
        </div>
    );
};

export default About;
