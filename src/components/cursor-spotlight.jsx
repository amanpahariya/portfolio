'use client';
import { useEffect, useRef } from "react";

const CursorSpotlight = () => {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.left = `${e.clientX}px`;
        spotlightRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none fixed z-0 w-[600px] h-[600px] rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, rgba(139,92,246,0.05) 40%, transparent 70%)",
        transform: "translate(-50%, -50%)",
        transition: "left 0.1s ease, top 0.1s ease",
      }}
    />
  );
};

export default CursorSpotlight;
