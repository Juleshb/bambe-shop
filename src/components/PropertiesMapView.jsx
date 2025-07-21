import React from "react";
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from "react-leaflet";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";

const PropertiesMapView = ({ properties }) => {
  const { BaseLayer } = LayersControl;

  // Default coordinates (Rwanda center)
  const defaultCenter = [-1.9441, 30.0619];
  
  // Calculate center from properties or use default
  const calculateCenter = () => {
    if (!properties || properties.length === 0) return defaultCenter;
    
    const validProperties = properties.filter(p => p.coordinates);
    if (validProperties.length === 0) return defaultCenter;
    
    const coords = validProperties.map(p => {
      const coord = p.coordinates;
      if (typeof coord === 'string') {
        const [lat, lng] = coord.split(',').map(c => parseFloat(c.trim()));
        return [lat, lng];
      }
      return coord;
    }).filter(c => Array.isArray(c) && c.length === 2);
    
    if (coords.length === 0) return defaultCenter;
    
    const avgLat = coords.reduce((sum, [lat]) => sum + lat, 0) / coords.length;
    const avgLng = coords.reduce((sum, [, lng]) => sum + lng, 0) / coords.length;
    
    return [avgLat, avgLng];
  };

  const center = calculateCenter();

  const formatPrice = (price) => {
    if (!price) return 'Price on request';
    return `RWF ${parseInt(price).toLocaleString()}`;
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'new': return 'bg-[#38B496] text-white';
      case 'sold': return 'bg-red-500 text-white';
      case 'pending': return 'bg-yellow-500 text-white';
      case 'rented': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  // Generate fallback coordinates for properties without coordinates
  const generateFallbackCoordinates = (index) => {
    // Spread properties around Rwanda with some variation
    const baseLat = -1.9441;
    const baseLng = 30.0619;
    const latVariation = 0.01; // ~1km
    const lngVariation = 0.01; // ~1km
    
    return [
      baseLat + (Math.sin(index * 0.5) * latVariation),
      baseLng + (Math.cos(index * 0.5) * lngVariation)
    ];
  };

  return (
    <div style={{ height: "600px", width: "100%" }} className="rounded-2xl overflow-hidden shadow-lg">
      <MapContainer 
        center={center} 
        zoom={properties && properties.length > 0 ? 12 : 8} 
        scrollWheelZoom={true} 
        style={{ height: "100%", width: "100%" }}
        className="rounded-2xl"
      >
        <LayersControl position="topright">
          <BaseLayer checked name="Street View">
            <TileLayer 
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
              attribution="&copy; OpenStreetMap contributors" 
            />
          </BaseLayer>
          <BaseLayer name="Satellite View">
            <TileLayer 
              url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" 
              subdomains={["mt0", "mt1", "mt2", "mt3"]} 
              attribution="Map data &copy; 2023 Google" 
            />
          </BaseLayer>
          <BaseLayer name="Terrain View">
            <TileLayer 
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" 
              attribution="&copy; OpenTopoMap contributors" 
            />
          </BaseLayer>
        </LayersControl>

        {/* Render markers for each property */}
        {properties && properties.map((property, index) => {
          let coordinates;
          
          // Parse coordinates
          if (property.coordinates) {
            if (typeof property.coordinates === 'string') {
              const [lat, lng] = property.coordinates.split(',').map(c => parseFloat(c.trim()));
              coordinates = [lat, lng];
            } else if (Array.isArray(property.coordinates)) {
              coordinates = property.coordinates;
            }
          }
          
          // Use fallback coordinates if no valid coordinates found
          if (!coordinates || coordinates.length !== 2) {
            coordinates = generateFallbackCoordinates(index);
          }
          
          const imageUrl = property.images && property.images.length > 0 
            ? `https://bambe.shop${property.images[0].image_url}` 
            : "https://via.placeholder.com/150";

          return (
            <Marker key={property.listing_id || index} position={coordinates}>
              <Popup className="property-popup">
                <div className="w-80 max-w-sm">
                  <div className="h-48 mb-3 rounded-lg overflow-hidden">
                    <img 
                      className="w-full h-full object-cover" 
                      src={imageUrl} 
                      alt={property.name || property.title} 
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                        {property.name || property.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(property.status)}`}>
                        {property.status || "New"}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 text-sm">
                      <Icon icon="mdi:map-marker" className="mr-1 text-[#38B496]" />
                      <span>{property.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Icon icon="mdi:bed" className="mr-1 text-[#38B496]" />
                          {property.bedrooms || 0}
                        </span>
                        <span className="flex items-center">
                          <Icon icon="mdi:shower" className="mr-1 text-[#38B496]" />
                          {property.bathrooms || 0}
                        </span>
                        <span className="flex items-center">
                          <Icon icon="mdi:ruler-square" className="mr-1 text-[#38B496]" />
                          {property.area || 0}m²
                        </span>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-[#38B496]">
                          {formatPrice(property.price)}
                        </span>
                        <Link 
                          to={`/listing/${property.listing_id}`}
                          className="bg-[#38B496] hover:bg-[#2e9c81] text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default PropertiesMapView; 