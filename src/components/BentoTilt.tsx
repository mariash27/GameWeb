import { useState, useRef, MouseEvent, ReactNode } from "react";

interface BentoTiltProps {
    children: ReactNode; 
    className?: string; 
}

export const BentoTilt: React.FC<BentoTiltProps> = ({
    children,
    className = "",
    }) => {
    // State to store the current transform style for the tilt effect
    const [transformStyle, setTransformStyle] = useState<string>("");
    
    // Reference to the container element to calculate mouse position
    const itemRef = useRef<HTMLDivElement | null>(null);

    // Handle mouse movement to calculate tilt effect
    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        if (!itemRef.current) return;

        // Get the element's dimensions and position
        const { left, top, width, height } = itemRef.current.getBoundingClientRect();

        // Calculate the relative position of the mouse within the element
        const relativeX = (event.clientX - left) / width;
        const relativeY = (event.clientY - top) / height;

        // Determine the tilt effect based on the mouse position
        const tiltX = (relativeY - 0.5) * 5; // Tilt along the X-axis
        const tiltY = (relativeX - 0.5) * -5; // Tilt along the Y-axis

        // Create the transform style for the tilt effect
        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
        setTransformStyle(newTransform);
    };

    // Reset the transform style when the mouse leaves the element
    const handleMouseLeave = () => {
        setTransformStyle("");
    };

    return (
        <div
        ref={itemRef}
        className={className} // Add custom classes if provided
        onMouseMove={handleMouseMove} // Apply tilt effect on mouse move
        onMouseLeave={handleMouseLeave} // Reset effect on mouse leave
        style={{ transform: transformStyle }} // Apply calculated transform style
        >
        {children} {/* Render children inside the tilt container */}
        </div>
    );
};

export default BentoTilt;
