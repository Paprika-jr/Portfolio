import { useEffect, useState } from 'react';
import { useCursor } from '../../hooks/useCursor';
import './CustomCursor.css';

const CustomCursor = () => {
  const { position, isHovering } = useCursor();
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    // Create trail effect
    if (Math.random() > 0.85) {
      const newTrail = {
        id: Date.now() + Math.random(),
        x: position.x,
        y: position.y,
      };

      setTrails((prev) => [...prev, newTrail]);

      // Remove trail after animation completes
      setTimeout(() => {
        setTrails((prev) => prev.filter((t) => t.id !== newTrail.id));
      }, 600);
    }
  }, [position]);

  return (
    <>
      {/* Main Cursor */}
      <div
        className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <svg
          width="24"
          height="28"
          viewBox="0 0 30 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 0C7 0 0 7 0 15C0 18 1 21 2.5 23.5L15 35L27.5 23.5C29 21 30 18 30 15C30 7 23 0 15 0Z"
            fill="url(#gradient)"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <defs>
            <linearGradient
              id="gradient"
              x1="0"
              y1="0"
              x2="30"
              y2="35"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--accent-primary)" />
              <stop offset="1" stopColor="var(--accent-secondary)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Trail Effects */}
      {trails.map((trail) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: `${trail.x}px`,
            top: `${trail.y}px`,
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
