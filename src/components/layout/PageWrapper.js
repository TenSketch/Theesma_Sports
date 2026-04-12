'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

export default function PageWrapper({ children }) {
  const pathname = usePathname();
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Fade in animation on route change
    gsap.fromTo(wrapperRef.current, 
      { opacity: 0, y: 10 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );
  }, [pathname]);

  return (
    <div ref={wrapperRef}>
      {children}
    </div>
  );
}
