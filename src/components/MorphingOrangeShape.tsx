import React from 'react';
import { motion, MotionValue } from 'motion/react';

interface MorphingOrangeShapeProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

export const MorphingOrangeShape: React.FC<MorphingOrangeShapeProps> = ({ mouseX, mouseY }) => {
  return (
    <motion.div
      style={{
        x: mouseX,
        y: mouseY,
      }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 will-change-transform"
    >
      {/* Soft warm ambient radial diffusion aura (static GPU cached) */}
      <div
        className="absolute w-[340px] sm:w-[440px] md:w-[500px] h-[300px] sm:h-[370px] md:h-[420px] rounded-t-full blur-2xl opacity-25 bg-gradient-to-t from-[#f16738] via-[#ff8352] to-[#fca582] pointer-events-none"
      />

      {/* Main Terracotta Arch Dome */}
      <div
        id="orange-arch-dome"
        className="relative w-[295px] sm:w-[395px] md:w-[455px] h-[225px] sm:h-[285px] md:h-[325px] shadow-[0_24px_50px_rgba(241,103,56,0.25)] overflow-hidden pointer-events-auto"
        style={{
          borderTopLeftRadius: '250px',
          borderTopRightRadius: '250px',
          borderBottomLeftRadius: '0px',
          borderBottomRightRadius: '0px',
          background: 'linear-gradient(180deg, #f77d4c 0%, #ee6332 55%, #dc4e1c 100%)',
        }}
      >
        {/* Soft top-rim lighting highlight */}
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-white/35 to-transparent rounded-t-[250px] pointer-events-none" />

        {/* Subtle diagonal specular sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.07] to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
};
