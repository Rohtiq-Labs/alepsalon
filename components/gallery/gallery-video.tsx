"use client";

import { useEffect, useRef } from "react";

type GalleryVideoProps = {
  src: string;
  alt: string;
};

export const GalleryVideo = ({ src, alt }: GalleryVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncPlayback = () => {
      if (motionQuery.matches) {
        video.pause();
        return;
      }

      void video.play().catch(() => {
        video.pause();
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          syncPlayback();
        } else {
          video.pause();
        }
      },
      { threshold: 0.15, rootMargin: "80px" },
    );

    const handleMotionChange = () => {
      if (motionQuery.matches) {
        video.pause();
      } else if (video.getBoundingClientRect().top < window.innerHeight) {
        syncPlayback();
      }
    };

    observer.observe(video);
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      observer.disconnect();
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop
      playsInline
      preload="auto"
      aria-label={alt}
    />
  );
};
