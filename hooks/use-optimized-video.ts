"use client";

import { useEffect, useRef, useState } from "react";

import { getVideoPreload, type VideoPreload } from "@/lib/video-loading";

type UseOptimizedVideoOptions = {
  src: string;
  priority: "high" | "low";
  eager?: boolean;
  threshold?: number;
  rootMargin?: string;
};

export const useOptimizedVideo = ({
  src,
  priority,
  eager = false,
  threshold = 0.15,
  rootMargin = "160px",
}: UseOptimizedVideoOptions) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(eager);
  const [isReady, setIsReady] = useState(false);
  const [preload, setPreload] = useState<VideoPreload>(
    eager ? "metadata" : "none",
  );

  useEffect(() => {
    setPreload(getVideoPreload(priority));
  }, [priority]);

  useEffect(() => {
    if (eager) {
      setShouldLoad(true);
      return;
    }

    const element = videoRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [eager, threshold, rootMargin]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

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

    let visibilityObserver: IntersectionObserver | undefined;

    if (eager) {
      syncPlayback();
    } else {
      visibilityObserver = new IntersectionObserver(
        ([entry]) => {
          if (motionQuery.matches) {
            video.pause();
            return;
          }

          if (entry.isIntersecting) {
            syncPlayback();
          } else {
            video.pause();
          }
        },
        { threshold: 0.12 },
      );

      visibilityObserver.observe(video);
    }

    const handleMotionChange = () => {
      if (motionQuery.matches) {
        video.pause();
        return;
      }

      if (eager || video.getBoundingClientRect().top < window.innerHeight) {
        syncPlayback();
      }
    };

    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      visibilityObserver?.disconnect();
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, [shouldLoad, eager]);

  const markReady = () => {
    setIsReady(true);
  };

  return {
    videoRef,
    videoSrc: shouldLoad ? src : undefined,
    preload,
    isReady,
    onCanPlay: markReady,
    onLoadedData: markReady,
  };
};
