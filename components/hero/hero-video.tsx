"use client";

import { useOptimizedVideo } from "@/hooks/use-optimized-video";

const HERO_VIDEO_SRC = "/assets/videos/hero.mp4";

type HeroVideoProps = {
  alt: string;
};

export const HeroVideo = ({ alt }: HeroVideoProps) => {
  const { videoRef, videoSrc, preload, isReady, onCanPlay, onLoadedData } =
    useOptimizedVideo({
      src: HERO_VIDEO_SRC,
      priority: "high",
      eager: true,
    });

  return (
    <div className={`video-shell${isReady ? " video-shell--ready" : ""}`}>
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        loop
        playsInline
        autoPlay
        preload={preload}
        aria-label={alt}
        onCanPlay={onCanPlay}
        onLoadedData={onLoadedData}
      />
    </div>
  );
};
