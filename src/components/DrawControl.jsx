import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-draw';

const DrawControl = ({ onPolygonCreated }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || typeof window === "undefined") return;

   
    const drawnItems = new L.FeatureGroup().addTo(map);

    const drawControl = new L.Control.Draw({
      position: "topright",
      draw: {
        polygon: true,
        rectangle: false,
        circle: false,
        marker: false,
        polyline: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: drawnItems,
        remove: true,
      },
    });

    map.addControl(drawControl);

    const handleCreated = (e) => {
      const layer = e.layer;
      drawnItems.addLayer(layer);

      // Get coordinates in [lng, lat] format
      const latlngs = layer.getLatLngs()[0]; // assuming 1 polygon
      const polygonPoints = latlngs.map(ll => [ll.lng, ll.lat]);

      // Fit bounds
      const bounds = L.latLngBounds(latlngs);
      map.fitBounds(bounds, { padding: [20, 20] });

      // Trigger parent handler
      onPolygonCreated(polygonPoints);
    };

    map.on(L.Draw.Event.CREATED, handleCreated);

    return () => {
      map.off(L.Draw.Event.CREATED, handleCreated);
      map.removeControl(drawControl);
      map.removeLayer(drawnItems);
    };
  }, [map, onPolygonCreated]);

  return null;
};


export default DrawControl;
