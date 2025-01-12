import React from "react";
import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";

interface SocialLink {
    href: string; 
    icon: React.ReactNode; 
}

// Array of social media links with their respective icons
const socialLinks: SocialLink[] = [
    { href: "https://discord.com", icon: <FaDiscord /> },
    { href: "https://twitter.com", icon: <FaTwitter /> },
    { href: "https://youtube.com", icon: <FaYoutube /> },
    { href: "https://medium.com", icon: <FaMedium /> },
    ];

    const Footer: React.FC = () => {
    return (
        <footer className="w-screen bg-[#5542ff] py-4 text-black">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
            {/* Copyright text */}
            <p className="text-center text-sm font-light md:text-left">
            ©Nova 2024. All rights reserved
            </p>

            {/* Social media links */}
            <div className="flex justify-center gap-4 md:justify-start">
            {socialLinks.map((link, index) => (
                <a
                key={index} // Unique key for each social link
                href={link.href} // URL of the social media platform
                target="_blank" // Opens the link in a new tab
                rel="noopener noreferrer" // Security attributes for external links
                className="text-black transition-colors duration-500 ease-in-out hover:text-white"
                >
                {link.icon} {/* Render the social media icon */}
                </a>
            ))}
            </div>

            {/* Privacy policy link */}
            <a
            href="#privacy-policy"
            className="text-center text-sm font-light hover:underline md:text-right"
            >
            Privacy Policy
            </a>
        </div>
        </footer>
    );
};

export default Footer;
