'use client';

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Dinamically load Leaflet CSS only when this component is used
if (typeof window !== 'undefined') {
  // Load Leaflet CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
  link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
  link.crossOrigin = '';
  
  // Only add if not already present
  if (!document.querySelector('link[href*="leaflet.css"]')) {
    document.head.appendChild(link);
  }
}

// Fix for default markers in React-Leaflet
interface IconDefaultPrototype {
  _getIconUrl?: string;
}

delete (L.Icon.Default.prototype as IconDefaultPrototype)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons
const createCustomIcon = (color: string) => {
  return new L.Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 0C5.596 0 0 5.596 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.596 19.404 0 12.5 0z" fill="${color}" stroke="#fff" stroke-width="1"/>
        <circle cx="12.5" cy="12.5" r="6" fill="#fff"/>
      </svg>
    `)}`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [20, 33],
    iconAnchor: [10, 33],
    popupAnchor: [1, -28],
    shadowSize: [33, 33]
  });
};

// Service Area Map Component for Footer
export const ServiceAreaMap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [shouldLoadMap, setShouldLoadMap] = useState(false);

  useEffect(() => {
    // Lazy load map when it becomes visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoadMap) {
            setShouldLoadMap(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '200px', // Start loading 200px before it's visible
        threshold: 0.1
      }
    );

    if (mapContainerRef.current) {
      observer.observe(mapContainerRef.current);
    }

    return () => observer.disconnect();
  }, [shouldLoadMap]);

  // Coordinates for the three cities
  const serviceMarkers = [
    {
      id: 'bh',
      position: [-19.9191, -43.9386] as [number, number],
      icon: createCustomIcon('#B8906A'),
      popup: {
        title: 'Belo Horizonte',
        content: 'Sede da Homsi Engenharia. Atendemos toda a região metropolitana.'
      }
    },
    {
      id: 'nova-lima',
      position: [-19.9858, -43.8472] as [number, number],
      icon: createCustomIcon('#B8906A'),
      popup: {
        title: 'Nova Lima',
        content: 'Atendemos Nova Lima com expertise em construções de luxo.'
      }
    },
    {
      id: 'lagoa-santa',
      position: [-19.6375, -43.8895] as [number, number],
      icon: createCustomIcon('#B8906A'),
      popup: {
        title: 'Lagoa Santa',
        content: 'Prestamos serviços em Lagoa Santa com foco em qualidade.'
      }
    }
  ];

  // Center point between the three cities
  const mapCenter: [number, number] = [-19.8, -43.9];

  return (
    <div 
      ref={mapContainerRef}
      className="relative overflow-hidden rounded-lg border border-gray-700 bg-gray-800"
      style={{ minHeight: '400px' }}
    >
      {!shouldLoadMap && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
          <div className="text-center text-gray-400">
            <svg className="animate-spin h-8 w-8 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-sm">Carregando mapa...</p>
          </div>
        </div>
      )}
      
      {shouldLoadMap && (
        <MapContainer
          center={mapCenter}
          zoom={10}
          style={{ height: '400px', width: '100%' }}
          scrollWheelZoom={true}
          zoomControl={true}
          doubleClickZoom={true}
          dragging={true}
          attributionControl={false}
          className="filter grayscale hover:grayscale-0 transition-all duration-300"
        >
          <TileLayer
            attribution=''
            url="/api/map-tiles/{z}/{x}/{y}"
            maxZoom={18}
            keepBuffer={2}
          />

          {/* City markers */}
          {serviceMarkers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              icon={marker.icon}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-800">{marker.popup.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{marker.popup.content}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};