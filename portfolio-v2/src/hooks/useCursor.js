import { useState, useEffect, useCallback } from 'react';

export const useCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
    };
  }, []);

  useEffect(() => {
    // Add hover listeners to interactive elements
    const hoverElements = document.querySelectorAll(
      'a, button, [data-cursor-hover], .cursor-hover'
    );

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      hoverElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  const createTrail = useCallback(() => {
    // This will be used by the cursor component to decide when to create trails
    return Math.random() > 0.8;
  }, []);

  return { position, isHovering, createTrail };
};
