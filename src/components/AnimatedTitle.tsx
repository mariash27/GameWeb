import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTitleProps {
    title: string; 
    containerClass?: string; 
    className?: string; 
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
    title,
    containerClass = "",
    }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Set up GSAP animation within the container's context
        const ctx = gsap.context(() => {
        const titleAnimation = gsap.timeline({
            scrollTrigger: {
            trigger: containerRef.current, // Element that triggers the animation
            start: "100 bottom", // Start animation when 100px from the bottom
            end: "center bottom", // End animation when the element reaches the center
            toggleActions: "play none none reverse", // Play on enter, reverse on leave
            },
        });

        // Animate each word in the title
        titleAnimation.to(
            ".animated-word", // Target words with this class
            {
            opacity: 1, // Make words visible
            transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)", // Reset transformations
            ease: "power2.inOut", // Smooth easing effect
            stagger: 0.02, // Delay between word animations
            },
            0
        );
        }, containerRef);

        // Clean up GSAP context on component unmount
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className={`animated-title ${containerClass}`}>
        {/* Split title into lines and words for animation */}
        {title.split("<br />").map((line, index) => (
            <div
            key={index}
            className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
            >
            {line.split(" ").map((word, idx) => (
                <span
                key={idx}
                className="animated-word"
                dangerouslySetInnerHTML={{ __html: word }}
                />
            ))}
            </div>
        ))}
        </div>
    );
};

export default AnimatedTitle;
