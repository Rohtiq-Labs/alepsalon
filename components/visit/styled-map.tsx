"use client";

import { useEffect, useRef, useState } from "react";

import { useLocale } from "@/context/locale-context";
import { brand } from "@/data/brand";
import { contactInfo } from "@/data/contact";
import { getMapEmbedUrl } from "@/lib/map-locale";
import { mapStyles } from "@/lib/map-styles";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const PIN_PATH =
  "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z";

type GoogleMapsApi = {
  maps: {
    Map: new (
      element: HTMLElement,
      options: Record<string, unknown>,
    ) => unknown;
    Marker: new (options: Record<string, unknown>) => unknown;
    Point: new (x: number, y: number) => unknown;
  };
};

export const StyledMap = () => {
  const { locale, t } = useLocale();
  const mapEmbedUrl = getMapEmbedUrl(contactInfo.mapEmbedUrl, locale);
  const mapRef = useRef<HTMLDivElement>(null);
  const [useFallback, setUseFallback] = useState(!API_KEY);

  useEffect(() => {
    if (!API_KEY || !mapRef.current) return;

    const initMap = () => {
      const google = (window as Window & { google?: GoogleMapsApi }).google;
      if (!google?.maps || !mapRef.current) return;

      const { lat, lng } = contactInfo.coordinates;

      const map = new google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 16,
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        gestureHandling: "cooperative",
        clickableIcons: false,
      });

      new google.maps.Marker({
        position: { lat, lng },
        map,
        title: brand.name,
        icon: {
          path: PIN_PATH,
          fillColor: "#C9B18A",
          fillOpacity: 1,
          strokeColor: "#111111",
          strokeWeight: 1.5,
          scale: 1.5,
          anchor: new google.maps.Point(12, 22),
        },
      });

      setUseFallback(false);
    };

    const windowWithCallback = window as Window & {
      google?: GoogleMapsApi;
      initAlepMap?: () => void;
    };

    if (windowWithCallback.google?.maps) {
      initMap();
      return;
    }

    const scriptId = "google-maps-script";
    const existing = document.getElementById(scriptId);

    if (existing) {
      windowWithCallback.initAlepMap = initMap;
      return;
    }

    windowWithCallback.initAlepMap = initMap;

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initAlepMap`;
    script.async = true;
    script.defer = true;
    script.onerror = () => setUseFallback(true);
    document.head.appendChild(script);

    return () => {
      delete windowWithCallback.initAlepMap;
    };
  }, []);

  return (
    <div className="visit-map">
      <div className="map-card">
        <p className="map-card-name">{brand.name}</p>
        <p className="map-card-address">
          {contactInfo.address.street}
          <br />
          {contactInfo.address.city}
          <br />
          {t.visit.country}
        </p>
        <a
          className="map-card-link"
          href={contactInfo.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.map.directions}
        </a>
      </div>
      {useFallback ? (
        <iframe
          title={t.map.iframeTitle}
          className="map-embed"
          src={mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div
          ref={mapRef}
          className="map-canvas"
          role="img"
          aria-label={t.map.ariaLabel}
        />
      )}
    </div>
  );
};
