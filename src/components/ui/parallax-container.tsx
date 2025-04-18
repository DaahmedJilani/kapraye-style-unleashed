
import React, { useState, useEffect, useRef } from "react";

interface ParallaxContainerProps {
  children: React.ReactNode;
  sensitivity?: number;
  className?: string;
}

export const ParallaxContainer = ({
  children,
  sensitivity = 0.05,
  className = "",
}: ParallaxContainerProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center
    const x = (e.clientX - centerX) * sensitivity;
    const y = (e.clientY - centerY) * sensitivity;
    
    setPosition({ x, y });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`parallax-container relative ${className}`}
      style={{ 
        transform: `perspective(1000px)`
      }}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            style: {
              ...(child.props.style || {}),
              transform: `translateX(${position.x}px) translateY(${position.y}px) ${child.props.style?.transform || ''}`,
            },
          });
        }
        return child;
      })}
    </div>
  );
};
