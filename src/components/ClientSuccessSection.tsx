import React, { useRef, useState } from 'react';
import { Star, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  review: string;
  avatar: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'henry-arthur',
    name: 'Henry Arthur',
    role: 'CEO',
    company: 'Trace Logistics',
    rating: 5.0,
    review:
      'Makkie stepped in and completely organized our executive operations. Within two weeks, our inbox was down to zero daily, meetings were handled without any overlaps, and I reclaimed nearly 15 hours every week to focus on growing the company.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'joshua-arthur',
    name: 'Joshua Arthur',
    role: 'CTO',
    company: 'EV Charger Systems',
    rating: 5.0,
    review:
      'Coordinating team deliverables and contractor handoffs used to take half my week. Makkie built clean project boards and kept everyone accountable. Our sprint delivery speed noticeably improved within the first month.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'sarah-lin',
    name: 'Sarah Lin',
    role: 'Managing Partner',
    company: 'Northpoint Studio',
    rating: 5.0,
    review:
      'Coordinating partner schedules across London, New York, and Singapore used to be a constant struggle. Makkie manages every single time zone adjustment flawlessly with zero scheduling conflicts over an entire year.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'alex-chen',
    name: 'Alex Chen',
    role: 'Founder & CEO',
    company: 'Kova Health',
    rating: 5.0,
    review:
      'The best investment in bandwidth I have made. Makkie filters incoming requests, drafts clear replies, and sends me an evening brief with only the items requiring my personal sign-off. Truly indispensable support.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'Director of Operations',
    company: 'Vanguard Media',
    rating: 5.0,
    review:
      'Makkie anticipates needs before they become urgent problems. From board meeting preparation to tracking project milestones, her attention to detail and calm consistency make our entire executive team operate better.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    role: 'Principal',
    company: 'Apex Capital',
    rating: 5.0,
    review:
      'Reliable, detail-oriented, and exceptionally fast. Makkie organized our internal documentation, streamlined vendor invoicing, and took complete ownership of our calendar logistics without missing a single beat.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  },
];

export const ClientSuccessSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Manual nudge with bottom arrows
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 420;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Duplicate items for continuous seamless loop
  const loopTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      id="testimonials-section"
      className="relative w-full bg-[#14161a] text-white py-24 sm:py-32 overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#f16738]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Container matching screenshot */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center mb-16 sm:mb-20">
        {/* Title with decorative sketches */}
        <div className="relative inline-block">
          {/* Hand-drawn sparkle star icon on the left */}
          <div className="absolute -left-8 sm:-left-12 top-2 text-neutral-400">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-300 stroke-[1.5]" />
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-white tracking-tight leading-[1.18]">
            Testimonials that
            {/* Hand-drawn tick marks above 'that' */}
            <span className="relative inline-block ml-2">
              <svg
                className="absolute -top-5 sm:-top-7 right-0 w-8 sm:w-11 h-6 text-neutral-300"
                viewBox="0 0 40 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 20L4 4M24 21L24 2M34 22L38 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <br />
            Speak to{' '}
            <span className="text-[#f16738] relative inline-block">
              My Results
            </span>
          </h2>
        </div>

        {/* Subtitle */}
        <p className="mt-5 text-neutral-400 font-body text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Real feedback and measurable outcomes from founders and teams I support daily.
        </p>
      </div>

      {/* Non-stop Carousel Track Container */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Soft edge gradient fades for seamless edge bleeding */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#14161a] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#14161a] to-transparent z-20 pointer-events-none" />

        {/* Continuous Looping Track */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-hidden py-4 px-6 sm:px-12"
        >
          {/* Animated inner track for non-stop infinite translation */}
          <div
            className="animate-infinite-scroll flex gap-5 sm:gap-6 shrink-0"
            style={{
              animationPlayState: isHovered ? 'paused' : 'running',
            }}
          >
            {loopTestimonials.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="relative w-[320px] sm:w-[380px] md:w-[420px] shrink-0 rounded-2xl bg-[#1e2025]/90 border border-neutral-800/80 p-6 sm:p-7 flex flex-col justify-between shadow-[0_12px_32px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-neutral-700 hover:bg-[#22252b]"
              >
                {/* Big watermark quote in bottom-right corner */}
                <div
                  className="absolute right-5 bottom-4 font-serif text-6xl text-neutral-700/25 pointer-events-none select-none leading-none"
                  aria-hidden="true"
                >
                  “
                </div>

                <div>
                  {/* Rating Stars + 5.0 */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1 text-[#f16738]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-[#f16738] stroke-[#f16738]"
                        />
                      ))}
                    </div>
                    <span className="font-mono text-sm text-neutral-300 font-bold ml-1">
                      {item.rating.toFixed(1)}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-neutral-300 font-body text-xs sm:text-[13.5px] leading-relaxed relative z-10">
                    "{item.review}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center gap-3 relative z-10">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    width={40}
                    height={40}
                    loading="lazy"
                    decoding="async"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-neutral-700/60 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="truncate">
                    <h3 className="font-heading font-bold text-sm text-white truncate">
                      {item.name}
                    </h3>
                    <p className="text-neutral-400 font-body text-xs truncate">
                      {item.role}, <span className="text-neutral-300">{item.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Centered Carousel Controls (as shown in screenshot) */}
      <div className="mt-10 sm:mt-12 flex items-center justify-center gap-3 relative z-10">
        <button
          onClick={() => handleScroll('left')}
          aria-label="Previous testimonial"
          className="w-10 h-10 rounded-full bg-[#26282d] hover:bg-[#31343a] text-neutral-300 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2]" />
        </button>

        <button
          onClick={() => handleScroll('right')}
          aria-label="Next testimonial"
          className="w-10 h-10 rounded-full bg-[#f16738] hover:bg-[#ff7847] text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-[0_4px_16px_rgba(241,103,56,0.35)]"
        >
          <ArrowRight className="w-4 h-4 stroke-[2]" />
        </button>
      </div>

      {/* Embedded CSS for smooth infinite non-stop loop */}
      <style>{`
        @keyframes infiniteScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};
