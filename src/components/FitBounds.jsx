import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

const FitBounds = ({ 
  properties, 
  padding = [50, 50], 
  fitOnLoad = true, 
  animate = false, 
  duration = 1 
}) => {
  const map = useMap();

  useEffect(() => {
    if (!fitOnLoad && !properties) return;
    if (!map || !properties?.length) return;

    const bounds = L.latLngBounds(
      properties
        .filter(p => {
          if (typeof p.coordinates === 'string') {
            const [latStr, lngStr] = p.coordinates.split(',').map(s => s.trim());
            return !isNaN(parseFloat(latStr)) && !isNaN(parseFloat(lngStr));
          } else if (p.coordinates?.lat && p.coordinates?.lng) {
            return true;
          }
          return false;
        })
        .map(p => {
          if (typeof p.coordinates === 'string') {
            const [latStr, lngStr] = p.coordinates.split(',').map(s => s.trim());
            return [parseFloat(latStr), parseFloat(lngStr)];
          }
          return [p.coordinates.lat, p.coordinates.lng];
        })
    );
    
    if (bounds.isValid()) {
      if (animate) {
        map.flyToBounds(bounds, { 
          padding, 
          duration 
        });
      } else {
        map.fitBounds(bounds, { padding });
      }
    }
  }, [properties, map, fitOnLoad, padding, animate, duration]);

  return null;
};

export default FitBounds;