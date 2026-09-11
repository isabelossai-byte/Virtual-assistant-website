import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface MagneticButtonProps {
  id: string;
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  id,
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for button body
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics: slow-eased, refined, not snappy or bouncy
  const springConfig = { damping: 16, stiffness: 140, mass: 0.2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Secondary motion for inner text for subtle layered parallax
  const textX = useSpring(mouseX, { damping: 20, stiffness: 120, mass: 0.1 });
  const textY = useSpring(mouseY, { damping: 20, stiffness: 120, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || disabled) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Pull toward cursor by a subtle fraction (max ~10px)
    const pullFactor = 0.28;
    mouseX.set(distanceX * pullFactor);
    mouseY.set(distanceY * pullFactor);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const baseStyles =
    'relative inline-flex items-center justify-center font-sans-clean text-sm font-medium tracking-wide transition-colors duration-300 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2';

  const variantStyles =
    variant === 'primary'
      ? 'bg-[#151515] text-[#faf8f5] hover:bg-[#262626] border border-[#151515] px-8 py-3.5 rounded-none shadow-sm'
      : 'bg-transparent text-[#151515] border border-[#cfcbc2] hover:border-[#151515] hover:bg-neutral-900/[0.03] px-8 py-3.5 rounded-none';

  return (
    <motion.button
      ref={buttonRef}
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        x: smoothX,
        y: smoothY,
      }}
      className={`${baseStyles} ${variantStyles} ${className}`}
      whileTap={{ scale: 0.98, transition: { duration: 0.15 } }}
    >
      <motion.span
        style={{
          x: textX,
          y: textY,
        }}
        className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap"
      >
        {children}
      </motion.span>
    </motion.button>
  );
};
