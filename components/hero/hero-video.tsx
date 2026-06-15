"use client";

import { useEffect, useRef } from "react";

const HERO_VIDEO_SRC = "/assets/videos/hero.mp4";

type HeroVideoProps = {
  alt: string;
};

export const HeroVideo = ({ alt }: HeroVideoProps) => {
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

    syncPlayback();
    motionQuery.addEventListener("change", syncPlayback);

    return () => {
      motionQuery.removeEventListener("change", syncPlayback);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={HERO_VIDEO_SRC}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      aria-label={alt}
    />
  );
};
