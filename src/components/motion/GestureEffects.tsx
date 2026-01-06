import { motion, useDragControls, PanInfo } from 'framer-motion';
import { ReactNode, useState, useRef } from 'react';
import { springPresets } from '@/hooks/useMotionAnimations';

// Draggable component
interface DraggableProps {
  children: ReactNode;
  className?: string;
  constraints?: { top?: number; right?: number; bottom?: number; left?: number };
  dragElastic?: number;
  onDragEnd?: (info: PanInfo) => void;
}

export const Draggable = ({
  children,
  className = '',
  constraints,
  dragElastic = 0.2,
  onDragEnd,
}: DraggableProps) => {
  return (
    <motion.div
      drag
      dragConstraints={constraints}
      dragElastic={dragElastic}
      whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
      whileHover={{ cursor: 'grab' }}
      onDragEnd={(_, info) => onDragEnd?.(info)}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Press/tap effect
interface PressableProps {
  children: ReactNode;
  className?: string;
  onPress?: () => void;
  scale?: number;
}

export const Pressable = ({
  children,
  className = '',
  onPress,
  scale = 0.95,
}: PressableProps) => {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale }}
      onTap={onPress}
      style={{ cursor: 'pointer' }}
    >
      {children}
    </motion.div>
  );
};

// Long press effect
interface LongPressProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  onLongPress?: () => void;
}

export const LongPress = ({
  children,
  className = '',
  duration = 500,
  onLongPress,
}: LongPressProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  const handlePressStart = () => {
    setIsPressed(true);
    timerRef.current = setTimeout(() => {
      onLongPress?.();
      setIsPressed(false);
    }, duration);
  };

  const handlePressEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsPressed(false);
  };

  return (
    <motion.div
      className={className}
      animate={{ scale: isPressed ? 0.95 : 1 }}
      transition={springPresets.stiff}
      onPointerDown={handlePressStart}
      onPointerUp={handlePressEnd}
      onPointerLeave={handlePressEnd}
      style={{ cursor: 'pointer' }}
    >
      {children}
      {isPressed && (
        <motion.div
          className="absolute inset-0 border-2 border-foreground/20 rounded-inherit"
          initial={{ scale: 1 }}
          animate={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: duration / 1000 }}
        />
      )}
    </motion.div>
  );
};

// Swipe card stack
interface SwipeCardProps {
  children: ReactNode;
  className?: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

export const SwipeCard = ({
  children,
  className = '',
  onSwipeLeft,
  onSwipeRight,
  threshold = 100,
}: SwipeCardProps) => {
  const [exitX, setExitX] = useState<number | null>(null);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > threshold) {
      setExitX(500);
      onSwipeRight?.();
    } else if (info.offset.x < -threshold) {
      setExitX(-500);
      onSwipeLeft?.();
    }
  };

  return (
    <motion.div
      className={className}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      animate={{ x: exitX ?? 0, opacity: exitX ? 0 : 1 }}
      transition={springPresets.smooth}
      whileDrag={{ scale: 1.02 }}
    >
      {children}
    </motion.div>
  );
};

// Hover card with 3D tilt
interface HoverTiltProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  glare?: boolean;
}

export const HoverTilt = ({
  children,
  className = '',
  tiltAmount = 10,
  glare = true,
}: HoverTiltProps) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setRotateX((y - 0.5) * -tiltAmount);
    setRotateY((x - 0.5) * tiltAmount);
    setGlarePosition({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition({ x: 50, y: 50 });
  };

  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      animate={{ rotateX, rotateY }}
      transition={springPresets.smooth}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {glare && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-inherit"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.15) 0%, transparent 50%)`,
          }}
          animate={{ opacity: rotateX !== 0 || rotateY !== 0 ? 1 : 0 }}
        />
      )}
    </motion.div>
  );
};

// Pull to refresh effect
interface PullToRefreshProps {
  children: ReactNode;
  className?: string;
  onRefresh?: () => Promise<void>;
  threshold?: number;
}

export const PullToRefresh = ({
  children,
  className = '',
  onRefresh,
  threshold = 80,
}: PullToRefreshProps) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleDrag = (_: any, info: PanInfo) => {
    if (info.offset.y > 0) {
      setPullDistance(Math.min(info.offset.y, threshold * 1.5));
    }
  };

  const handleDragEnd = async (_: any, info: PanInfo) => {
    if (info.offset.y >= threshold && onRefresh) {
      setIsRefreshing(true);
      await onRefresh();
      setIsRefreshing(false);
    }
    setPullDistance(0);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
        style={{ top: pullDistance - 40 }}
        animate={{ rotate: isRefreshing ? 360 : 0 }}
        transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0 }}
      >
        <div className="w-6 h-6 border-2 border-foreground border-t-transparent rounded-full" />
      </motion.div>
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.5}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        style={{ y: pullDistance }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Draggable;
