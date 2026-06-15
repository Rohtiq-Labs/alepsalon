"use client";

import { useEffect, useRef } from "react";

const ABOUT_VIDEO_SRC = "/assets/videos/gallery/gal-03.mp4";

type AboutMediaProps = {
  alt: string;
};

export const AboutMedia = ({ alt }: AboutMediaProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (motionQuery.matches) {
          video.pause();
          return;
        }

        if (entry.isIntersecting) {
          void video.play().catch(() => video.pause());
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={ABOUT_VIDEO_SRC}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={alt}
    />
  );
};
