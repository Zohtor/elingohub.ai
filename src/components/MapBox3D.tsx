import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    mapboxgl: any;
    MapboxGeocoder: any;
  }
}

export function MapBox3D() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [speed, setSpeed] = useState(0.004);
  const animationRef = useRef<number>();
  const tRef = useRef(0);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const loadMapboxResources = async () => {
      if (!document.getElementById('mapbox-css')) {
        const cssLink = document.createElement('link');
        cssLink.id = 'mapbox-css';
        cssLink.rel = 'stylesheet';
        cssLink.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
        document.head.appendChild(cssLink);
      }

      if (!document.getElementById('geocoder-css')) {
        const geocoderCss = document.createElement('link');
        geocoderCss.id = 'geocoder-css';
        geocoderCss.rel = 'stylesheet';
        geocoderCss.href = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css';
        document.head.appendChild(geocoderCss);
      }

      if (!window.mapboxgl) {
        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
          script.onload = resolve;
          document.head.appendChild(script);
        });
      }

      if (!window.MapboxGeocoder) {
        await new Promise((resolve) => {
          const geocoderScript = document.createElement('script');
          geocoderScript.src = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.min.js';
          geocoderScript.onload = resolve;
          document.head.appendChild(geocoderScript);
        });
      }

      initializeMap();
    };

    const initializeMap = () => {
      window.mapboxgl.accessToken = 'pk.eyJ1Ijoiem9oZWlyMDEiLCJhIjoiY21obDdvcHZ2MGRkNjJqcWtqaGtoNGxkbyJ9.bN85xtETfIJCPqt-iT4j2A';

      const mapInstance = new window.mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [24.7536, 59.4370],
        zoom: 12,
        pitch: 55,
        bearing: 30,
        antialias: true
      });

      mapInstance.on('load', () => {
        const geocoder = new window.MapboxGeocoder({
          accessToken: window.mapboxgl.accessToken,
          mapboxgl: window.mapboxgl,
          placeholder: 'Search for a place...',
          marker: true
        });
        mapInstance.addControl(geocoder, 'top-left');

        addTerrainAndBuildings(mapInstance);
        setMapLoaded(true);
        startAnimation(mapInstance);
      });

      mapInstance.on('click', (e: any) => {
        mapInstance.flyTo({
          center: e.lngLat,
          zoom: 16,
          pitch: 65,
          duration: 2000
        });
      });

      map.current = mapInstance;
    };

    loadMapboxResources();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  const addTerrainAndBuildings = (mapInstance: any) => {
    if (!mapInstance.getSource('mapbox-dem')) {
      mapInstance.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14
      });
      mapInstance.setTerrain({ source: 'mapbox-dem', exaggeration: 1.8 });
    }

    if (!mapInstance.getLayer('3d-buildings')) {
      mapInstance.addLayer({
        id: '3d-buildings',
        source: 'composite',
        'source-layer': 'building',
        filter: ['==', 'extrude', 'true'],
        type: 'fill-extrusion',
        minzoom: 15,
        paint: {
          'fill-extrusion-color': '#b3b3b3',
          'fill-extrusion-height': ['get', 'height'],
          'fill-extrusion-base': ['get', 'min_height'],
          'fill-extrusion-opacity': 0.6
        }
      });
    }
  };

  const startAnimation = (mapInstance: any) => {
    const animate = () => {
      tRef.current += speed;
      const zoom = 12 + Math.sin(tRef.current) * 0.8;
      const pitch = 45 + Math.cos(tRef.current * 2) * 20;
      const bearing = 60 + tRef.current * 30;

      mapInstance.easeTo({
        center: [24.7536, 59.4370],
        zoom: zoom,
        pitch: pitch,
        bearing: bearing,
        duration: 1000,
        easing: (n: number) => n
      });

      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
  };

  const setStyle = (styleURL: string) => {
    if (!map.current) return;
    map.current.setStyle(styleURL);
    map.current.once('styledata', () => {
      addTerrainAndBuildings(map.current);
    });
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl shadow-lg">
        <button
          onClick={() => setStyle('mapbox://styles/mapbox/satellite-streets-v12')}
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-xl hover:from-green-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
        >
          Satellite
        </button>
        <button
          onClick={() => setStyle('mapbox://styles/mapbox/dark-v11')}
          className="px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-900 text-white font-bold rounded-xl hover:from-slate-800 hover:to-black transition-all shadow-md hover:shadow-lg transform hover:scale-105"
        >
          Night
        </button>
        <button
          onClick={() => setStyle('mapbox://styles/mapbox/outdoors-v12')}
          className="px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
        >
          Outdoors
        </button>
        <div className="flex items-center gap-3 ml-auto">
          <label className="text-sm font-bold text-gray-700">Movement Speed:</label>
          <input
            type="range"
            min="0.001"
            max="0.02"
            step="0.001"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-32 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <span className="text-sm font-semibold text-gray-600 min-w-[60px]">
            {(speed * 1000).toFixed(1)}x
          </span>
        </div>
      </div>

      <div
        ref={mapContainer}
        className="w-full h-[560px] rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-100"
      />
    </div>
  );
}
