import React, { useState } from 'react';
import { motion, MotionValue } from 'motion/react';

interface InteractivePhotoProps {
  photoX: MotionValue<number>;
  photoY: MotionValue<number>;
  tiltX: MotionValue<number>;
  tiltY: MotionValue<number>;
}

export const InteractivePhoto: React.FC<InteractivePhotoProps> = ({
  photoX,
  photoY,
  tiltX,
  tiltY,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      id="interactive-photo"
      style={{
        x: photoX,
        y: photoY,
        rotateX: tiltX,
        rotateY: tiltY,
        transformPerspective: 1000,
      }}
      className="relative z-10 select-none cursor-default flex items-end justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative w-[300px] h-[340px] sm:w-[380px] sm:h-[400px] md:w-[440px] md:h-[450px] flex items-end justify-center"
      >
        {/* Portrait of Makkie with foreground parallax & 3D tilt */}
        <img
          src="/makkie_photo.jpeg"
          alt="Chiamaka 'Makkie' Ossai — Operations Specialist"
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain object-bottom pointer-events-none drop-shadow-[0_18px_38px_rgba(20,20,20,0.22)]"
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
};

