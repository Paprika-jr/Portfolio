import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './ScrollProgress.css';

const ScrollProgress = () => {
  const { scrollProgress } = useScrollAnimation();

  return (
    <div
      className="scroll-progress"
      style={{ width: `${scrollProgress}%` }}
      role="progressbar"
      aria-valuenow={scrollProgress}
      aria-valuemin="0"
      aria-valuemax="100"
    />
  );
};

export default ScrollProgress;
