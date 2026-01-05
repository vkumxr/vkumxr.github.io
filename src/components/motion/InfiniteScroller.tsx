import { motion, useAnimationControls, useMotionValue, animate } from 'framer-motion';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface InfiniteScrollerProps {
  children: ReactNode;
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
  gap?: number;
}

export const InfiniteScroller = ({
  children,
  speed = 30,
  direction = 'left',
  pauseOnHover = true,
  className = '',
  gap = 24,
}: InfiniteScrollerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const x = useMotionValue(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const content = containerRef.current.firstElementChild as HTMLElement;
    if (content) {
      setContentWidth(content.offsetWidth + gap);
    }
  }, [children, gap]);

  useEffect(() => {
    if (contentWidth === 0 || isPaused) return;

    const startPosition = direction === 'left' ? 0 : -contentWidth;
    const endPosition = direction === 'left' ? -contentWidth : 0;

    const duration = contentWidth / speed;

    const controls = animate(x, [startPosition, endPosition], {
      duration,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop',
    });

    return () => controls.stop();
  }, [contentWidth, speed, direction, isPaused, x]);

  return (
    <div
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <motion.div
        ref={containerRef}
        className="flex"
        style={{ x, gap }}
      >
        <div className="flex shrink-0" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0" style={{ gap }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

// Vertical infinite scroller
interface VerticalScrollerProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down';
  pauseOnHover?: boolean;
  className?: string;
  gap?: number;
}

export const VerticalScroller = ({
  children,
  speed = 30,
  direction = 'up',
  pauseOnHover = true,
  className = '',
  gap = 24,
}: VerticalScrollerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const y = useMotionValue(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const content = containerRef.current.firstElementChild as HTMLElement;
    if (content) {
      setContentHeight(content.offsetHeight + gap);
    }
  }, [children, gap]);

  useEffect(() => {
    if (contentHeight === 0 || isPaused) return;

    const startPosition = direction === 'up' ? 0 : -contentHeight;
    const endPosition = direction === 'up' ? -contentHeight : 0;

    const duration = contentHeight / speed;

    const controls = animate(y, [startPosition, endPosition], {
      duration,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop',
    });

    return () => controls.stop();
  }, [contentHeight, speed, direction, isPaused, y]);

  return (
    <div
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <motion.div
        ref={containerRef}
        className="flex flex-col"
        style={{ y, gap }}
      >
        <div className="flex flex-col shrink-0" style={{ gap }}>
          {children}
        </div>
        <div className="flex flex-col shrink-0" style={{ gap }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

// Text ticker
interface TextTickerProps {
  text: string;
  speed?: number;
  className?: string;
  separator?: string;
}

export const TextTicker = ({
  text,
  speed = 50,
  className = '',
  separator = ' • ',
}: TextTickerProps) => {
  return (
    <InfiniteScroller speed={speed} gap={0} className={className}>
      <span className="whitespace-nowrap">
        {text}
        {separator}
      </span>
    </InfiniteScroller>
  );
};

export default InfiniteScroller;
