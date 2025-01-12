import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import { gsap } from "gsap";

// Navigation menu items
const navItems: string[] = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const Navbar: React.FC = () => {

    const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false); // Whether audio is playing
    const [isIndicatorActive, setIsIndicatorActive] = useState<boolean>(false); // Whether the audio indicator is active
    const [lastScrollY, setLastScrollY] = useState<number>(0); // Last recorded Y scroll position
    const [isNavVisible, setIsNavVisible] = useState<boolean>(true); // Visibility of the navbar

    // References for the navbar and audio elements
    const navContainerRef = useRef<HTMLDivElement | null>(null);
    const audioElementRef = useRef<HTMLAudioElement | null>(null);

    // Current scroll position
    const { y: currentScrollY } = useWindowScroll();

    // Control navbar visibility based on scroll behavior
    useEffect(() => {
        if (currentScrollY === 0) {
        setIsNavVisible(true); // Show navbar when at the top
        navContainerRef.current?.classList.remove("floating-nav");
        } else if (currentScrollY > lastScrollY) {
        setIsNavVisible(false); // Hide navbar on scroll down
        navContainerRef.current?.classList.add("floating-nav");
        } else if (currentScrollY < lastScrollY) {
        setIsNavVisible(true); // Show navbar on scroll up
        navContainerRef.current?.classList.add("floating-nav");
        }

        setLastScrollY(currentScrollY); // Update last scroll position
    }, [currentScrollY, lastScrollY]);

    // Animate navbar visibility with GSAP
    useEffect(() => {
        if (navContainerRef.current) {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100, // Move navbar up or down
            opacity: isNavVisible ? 1 : 0, // Fade in/out navbar
            duration: 0.2,
        });
        }
    }, [isNavVisible]);

    // Toggle audio and indicator state
    const toggleAudioIndicator = () => {
        setIsAudioPlaying((prev) => !prev);
        setIsIndicatorActive((prev) => !prev);
    };

    // Play or pause audio when the state changes
    useEffect(() => {
        if (isAudioPlaying) {
        audioElementRef.current?.play();
        } else {
        audioElementRef.current?.pause();
        }
    }, [isAudioPlaying]);

    return (
        <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
        >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
            <nav className="flex size-full items-center justify-between p-4">
            {/* Logo and products button */}
            <div className="flex items-center gap-7">
                <img src="/img/logo.png" alt="logo" className="w-10" />
                <Button
                id="product-button"
                title="Products"
                rightIcon={<TiLocationArrow />}
                containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                />
            </div>

            {/* Navigation links and audio button */}
            <div className="flex h-full items-center">
                {/* Navigation links (visible on larger screens) */}
                <div className="hidden md:block">
                {navItems.map((item) => (
                    <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="nav-hover-btn"
                    >
                    {item}
                    </a>
                ))}
                </div>
                {/* Audio toggle button with animation */}
                <button
                onClick={toggleAudioIndicator}
                className="ml-10 flex items-center space-x-0.5"
                >
                <audio
                    ref={audioElementRef}
                    className="hidden"
                    src="/audio/loop.mp3"
                    loop
                />
                {[1, 2, 3, 4].map((bar) => (
                    <div
                    key={bar}
                    className={`indicator-line ${
                        isIndicatorActive ? "active" : ""
                    }`}
                    style={{
                        animationDelay: `${bar * 0.1}s`,
                    }}
                    />
                ))}
                </button>
            </div>
            </nav>
        </header>
        </div>
    );
};

export default Navbar;
