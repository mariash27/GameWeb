import { useState, useRef, MouseEvent } from "react";
import { TiLocationArrow } from "react-icons/ti";

interface BentoCardProps {
    src: string; 
    title: React.ReactNode; 
    description?: string; 
    isComingSoon?: boolean;
}

const BentoCard: React.FC<BentoCardProps> = ({
    src,
    title,
    description,
    isComingSoon,
    }) => {
    // Track cursor position for hover effects
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [hoverOpacity, setHoverOpacity] = useState(0); 
    const hoverButtonRef = useRef<HTMLDivElement | null>(null); 

    // Handle mouse movement to update cursor position
    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        if (!hoverButtonRef.current) return;
        const rect = hoverButtonRef.current.getBoundingClientRect();

        setCursorPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        });
    };

    // Show hover effect on mouse enter
    const handleMouseEnter = () => setHoverOpacity(1);

    // Hide hover effect on mouse leave
    const handleMouseLeave = () => setHoverOpacity(0);

    return (
        <div className="relative size-full">
        {/* Background video */}
        <video
            src={src}
            loop
            muted
            autoPlay
            className="absolute left-0 top-0 size-full object-cover object-center"
        />

        {/* Foreground content */}
        <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
            <div>
            {/* Card title */}
            <h1 className="bento-title special-font">{title}</h1>

            {/* Optional description */}
            {description && (
                <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
            )}
            </div>

            {/* "Coming Soon" badge with hover effect */}
            {isComingSoon && (
            <div
                ref={hoverButtonRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
            >
                {/* Radial gradient hover effect */}
                <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity: hoverOpacity,
                    background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
                }}
                />
                <TiLocationArrow className="relative z-20" />
                <p className="relative z-20">coming soon</p>
            </div>
            )}
        </div>
        </div>
    );
};

export default BentoCard;
