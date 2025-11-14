import { useState, useEffect } from 'react';
import './Loader.css';

const Loader = ({ onComplete }) => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHidden(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 500); // Wait for fade out animation
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`loader ${isHidden ? 'hidden' : ''}`}>
      <div className="vinyl-loader">
        <div className="vinyl-center"></div>
        <div className="vinyl-hole"></div>
      </div>
      <p className="loader-text">Loading...</p>
    </div>
  );
};

export default Loader;
