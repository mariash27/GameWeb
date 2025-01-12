import React from 'react';

interface ButtonProps {
    title?: string; 
    id?: string; 
    rightIcon?: React.ReactNode; 
    leftIcon?: React.ReactNode; 
    containerClass?: string; 
}

const Button: React.FC<ButtonProps> = ({
  title = 'Click Me', // Default text for the button
  id = '', // Default ID is an empty string
  rightIcon = null, // No right icon by default
  leftIcon = null, // No left icon by default
  containerClass = '', // No additional styling by default
}) => {
    return (
        <button
        id={id} // Apply the optional ID
        className={`group relative z-10 w-fit cursor-pointer overflow-hidden 
                rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`} // Combine base styles with optional container classes
        >
        {/* Render the left icon if provided */}
        {leftIcon}

        {/* Display the button's title */}
        <span className="relative incline-flex overflow-hidden font-general text-xs uppercase">
            <div>{title}</div>
        </span>

        {/* Render the right icon if provided */}
        {rightIcon}
        </button>
    );
};

export default Button;
