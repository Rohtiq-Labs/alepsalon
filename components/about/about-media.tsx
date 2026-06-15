"use client";

import { useOptimizedVideo } from "@/hooks/use-optimized-video";

const ABOUT_VIDEO_SRC = "/assets/videos/gallery/gal-03.mp4";

type AboutMediaProps = {
  alt: string;
};

export const AboutMedia = ({ alt }: AboutMediaProps) => {
  const { videoRef, videoSrc, preload, isReady, onCanPlay, onLoadedData } =
    useOptimizedVideo({
      src: ABOUT_VIDEO_SRC,
      priority: "low",
      rootMargin: "200px",
      threshold: 0.2,
    });

  return (
    <div className={`video-shell${isReady ? " video-shell--ready" : ""}`}>
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        loop
        playsInline
        preload={preload}
        aria-label={alt}
        onCanPlay={onCanPlay}
        onLoadedData={onLoadedData}
      />
    </div>
  );
};
