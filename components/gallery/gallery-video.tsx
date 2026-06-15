"use client";

import { useOptimizedVideo } from "@/hooks/use-optimized-video";

type GalleryVideoProps = {
  src: string;
  alt: string;
};

export const GalleryVideo = ({ src, alt }: GalleryVideoProps) => {
  const { videoRef, videoSrc, preload, isReady, onCanPlay, onLoadedData } =
    useOptimizedVideo({
      src,
      priority: "low",
      rootMargin: "240px",
      threshold: 0.08,
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
