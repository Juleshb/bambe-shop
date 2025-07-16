import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useMap, Marker, Popup, Polygon } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import axiosInstance from './utils/axios';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import DrawControl from './DrawControl';
import FitBounds from './FitBounds';
import Footer from "./navs/Footer";
import Nav from "./navs/Nav";

// Custom marker icons
const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const highlightedIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Map tile providers
const mapProviders = {
  street: {
    name: 'Street',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  },
  satellite: {
    name: 'Satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  },
  terrain: {
    name: 'Terrain',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
  }
};

const MapSearchPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState([-1.9403, 29.8739]);
  const [polygonPoints, setPolygonPoints] = useState([]);
  const [drawingMode, setDrawingMode] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mapMode, setMapMode] = useState('street');
  const [showInstructions, setShowInstructions] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 8
  });
  const mapRef = useRef();
  const polygonRef = useRef();

  // Initialize map with properties from location state or fetch from API
  useEffect(() => {
    if (location.state && location.state.properties) {
      // Use properties passed from listings page
      const passedProperties = location.state.properties.map((property) => {
        if (typeof property.coordinates === 'string') {
          const [latStr, lngStr] = property.coordinates.split(',').map(s => s.trim());
          property.coordinates = {
            lat: parseFloat(latStr),
            lng: parseFloat(lngStr)
          };
        }
        return property;
      });
      
      setProperties(passedProperties);
      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalItems: passedProperties.length,
        itemsPerPage: passedProperties.length
      });
      setLoading(false);
      setShowInstructions(false);
    } else {
      // Fetch all properties if no data passed
      fetchAllProperties();
    }
  }, [location.state]);

  // Fit bounds to show all properties when loaded or after search
  useEffect(() => {
    if (properties.length > 0 && mapRef.current) {
      fitMapToProperties();
    }
  }, [properties]);

  const fitMapToProperties = () => {
    const bounds = L.latLngBounds(
      properties
        .filter(p => {
          // Handle both string and object coordinate formats
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
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  };

  const fetchAllProperties = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/api/listings/pagination?page=${page}`);
      const { data, pagination: paginationData } = response.data;
      
      // Format the properties
      const formattedData = data.map((property) => {
        if (typeof property.coordinates === 'string') {
          const [latStr, lngStr] = property.coordinates.split(',').map(s => s.trim());
          property.coordinates = {
            lat: parseFloat(latStr),
            lng: parseFloat(lngStr)
          };
        }
        return property;
      });
      
      setProperties(formattedData);
      setPagination({
        currentPage: paginationData.currentPage,
        totalPages: paginationData.totalPages,
        totalItems: paginationData.totalItems,
        itemsPerPage: paginationData.itemsPerPage
      });
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPropertiesInPolygon = async (points = polygonPoints, page = 1) => {
    if (points.length < 3) {
      alert(t('drawValidPolygon'));
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post('/api/listings/polygon', {
        polygonCoordinates: [...points, points[0]],
        page: page
      });

      const { data, pagination: paginationData } = response.data;

      const formattedData = data.map((property) => {
        if (typeof property.coordinates === 'string') {
          const [latStr, lngStr] = property.coordinates.split(',').map(s => s.trim());
          property.coordinates = {
            lat: parseFloat(latStr),
            lng: parseFloat(lngStr)
          };
        }
        return property;
      });

      setProperties(formattedData);
      setPagination({
        currentPage: paginationData.currentPage,
        totalPages: paginationData.totalPages,
        totalItems: paginationData.totalItems,
        itemsPerPage: paginationData.itemsPerPage
      });
      setShowInstructions(false);
      
      // Fit map to the searched properties
      if (formattedData.length > 0) {
        setTimeout(fitMapToProperties, 300);
      }
    } catch (error) {
      console.error('Error fetching properties in polygon:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    
    if (polygonPoints.length > 0) {
      fetchPropertiesInPolygon(polygonPoints, newPage);
    } else {
      fetchAllProperties(newPage);
    }
  };

  const handleMapClick = (e) => {
    if (!drawingMode) return;
    const { lat, lng } = e.latlng;
    setPolygonPoints([...polygonPoints, [lng, lat]]);
  };

  const toggleDrawingMode = () => {
    setDrawingMode(!drawingMode);
    if (!drawingMode) {
      setPolygonPoints([]);
      setShowInstructions(true);
    }
  };

  const clearPolygon = () => {
    setPolygonPoints([]);
    if (polygonRef.current) polygonRef.current.setLatLngs([]);
    setShowInstructions(true);
    fetchAllProperties();
  };

  const handleMarkerClick = useCallback((property) => {
    setSelectedProperty(property);
    mapRef.current?.flyTo(
      [property.coordinates.lat, property.coordinates.lng],
      15
    );
  }, []);

  const PropertyPopup = ({ property }) => {
    let coordinates = property.coordinates;
    if (typeof coordinates === 'string') {
      const [latStr, lngStr] = coordinates.split(',').map(s => s.trim());
      coordinates = {
        lat: parseFloat(latStr),
        lng: parseFloat(lngStr)
      };
    }
    
    return (
      <div className="w-64 bg-white rounded-lg overflow-hidden">
        {property.images.length > 0 && (
          <div className="relative h-40 overflow-hidden">
            <img 
              src={`http://localhost:4800${property.images[0].url}`} 
              alt={property.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-800 mb-1">{property.name}</h3>
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <Icon icon="mdi:map-marker" className="mr-1" />
            <span>{property.location}</span>
          </div>
          <p className="text-[#38B496] font-bold text-xl mb-3">RWF {property.price.toLocaleString()}</p>
          <div className="flex justify-between items-center">
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">
              {t(property.listing_type)}
            </span>
            <Link 
              to={`/listing/${property.id}`}
              className="text-[#38B496] text-sm font-medium hover:underline flex items-center"
            >
              {t('View Details')}
              <Icon icon="mdi:arrow-right" className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Nav />
      <div className="flex flex-col h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm z-0 mt-28 lg:mt-28 mb-10">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#38B496] flex items-center">
             <Icon icon="mingcute:search-ai-fill" width="24" height="24" />
            </h1>
            
            <div className="flex gap-3">
              <div className="relative">
                <select
                  value={mapMode}
                  onChange={(e) => setMapMode(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#38B496]"
                >
                  {Object.entries(mapProviders).map(([key, provider]) => (
                    <option key={key} value={key}>{provider.name}</option>
                  ))}
                </select>
                <Icon 
                  icon="mdi:chevron-down" 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" 
                />
              </div>

              <button
                onClick={toggleDrawingMode}
                className={`px-4 py-2 rounded-lg flex items-center transition-colors ${
                  drawingMode 
                    ? 'bg-[#F15C26] text-white shadow-md' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Icon icon={drawingMode ? "mdi:pencil-off" : "mdi:draw-pen"} className="mr-2 text-lg" />
                {drawingMode ? t('stopDrawing') : t('drawArea')}
              </button>

              {polygonPoints.length > 0 && (
                <>
                  <button
                    onClick={() => fetchPropertiesInPolygon()}
                    className="px-4 py-2 bg-[#38B496] text-white rounded-lg flex items-center hover:bg-[#2e9c81] transition-colors shadow-md"
                  >
                    <Icon icon="mdi:search" className="mr-2" />
                    {t('Search Area')}
                  </button>
                  <button
                    onClick={clearPolygon}
                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg flex items-center hover:bg-gray-50 transition-colors"
                  >
                    <Icon icon="mdi:close" className="mr-2" />
                    {t('Clear')}
                  </button>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <motion.div 
            className={`bg-white shadow-lg z-10 w-80 flex-shrink-0 ${sidebarOpen ? 'block' : 'hidden'}`}
            initial={{ x: -320 }}
            animate={{ x: sidebarOpen ? 0 : -320 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">
                  {polygonPoints.length > 0 
                    ? t('Properties In Area', { count: pagination.totalItems })
                    : t('All Properties', { count: pagination.totalItems })}
                </h3>
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="text-gray-500 text-2xl hover:text-gray-700"
                >
                  <Icon icon="mdi:chevron-left" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {properties.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    <Icon icon="mdi:map-marker-off" className="text-3xl mx-auto mb-2" />
                    <p>{t('noPropertiesFound')}</p>
                  </div>
                ) : (
                  <>
                    <div className="divide-y divide-gray-100">
                      {properties.map(property => (
                        <div 
                          key={property.id} 
                          className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                            selectedProperty?.id === property.id ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => handleMarkerClick(property)}
                        >
                          <div className="flex gap-3">
                            {property.images.length > 0 ? (
                              <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                                <img 
                                  src={`http://localhost:4800${property.images[0].url}`}
                                  alt={property.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded">
                                <Icon icon="ic:outline-home" className="text-gray-400 text-xl" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 truncate">{property.name}</h4>
                              <p className="text-sm text-gray-600 truncate">
                                <Icon icon="mdi:map-marker" className="inline mr-1" />
                                {property.location}
                              </p>
                              <p className="text-[#38B496] font-bold">RWF {property.price.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pagination */}
                    {pagination.totalPages > 1 && (
                      <div className="p-4 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <button
                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                            disabled={pagination.currentPage === 1}
                            className={`px-3 py-1 rounded-md ${pagination.currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                          >
                            <Icon icon="mdi:chevron-left" className="text-lg" />
                          </button>
                          
                          <span className="text-sm text-gray-600">
                            Page {pagination.currentPage} of {pagination.totalPages}
                          </span>
                          
                          <button
                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                            disabled={pagination.currentPage === pagination.totalPages}
                            className={`px-3 py-1 rounded-md ${pagination.currentPage === pagination.totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                          >
                            <Icon icon="mdi:chevron-right" className="text-lg" />
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Map Container */}
          <div className="flex-1 relative">
            {!sidebarOpen && (
              <button 
                onClick={() => setSidebarOpen(true)}
                className="absolute left-2 top-24 z-10 bg-[#F15C26] p-4 text-white rounded-lg text-xl shadow-md hover:text-[#F15C26] hover:bg-gray-50 transition-colors"
              >
                <Icon icon="mdi:chevron-right" />
              </button>
            )}

            {loading && (
              <div className="absolute inset-0 bg-black bg-opacity-30 z-20 flex items-center justify-center">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 rounded-lg shadow-xl flex items-center"
                >
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#38B496] mr-3"></div>
                  <span>{t('loadingProperties')}...</span>
                </motion.div>
              </div>
            )}

            <MapContainer
              center={mapCenter}
              zoom={13}
              className="w-full z-0"
              style={{ height: '100%', width: '100%' }}
              whenCreated={(map) => {
                mapRef.current = map;
              }}
            >
              <TileLayer
                url={mapProviders[mapMode].url}
                attribution={mapProviders[mapMode].attribution}
              />

              <FitBounds properties={properties} animate={true} duration={1} />

              <DrawControl
                onPolygonCreated={(polygonPoints) => {
                  setPolygonPoints(polygonPoints);
                  fetchPropertiesInPolygon(polygonPoints);
                }}
              />

              {polygonPoints.length > 0 && (
                <Polygon
                  positions={polygonPoints.map(([lng, lat]) => [lat, lng])}
                  color="#38B496"
                  fillColor="#38B496"
                  fillOpacity={0.2}
                  weight={2}
                  ref={polygonRef}
                />
              )}

              {properties.map((property) => {
                let coordinates = property.coordinates;
                if (typeof coordinates === 'string') {
                  const [latStr, lngStr] = coordinates.split(',').map(s => s.trim());
                  coordinates = { lat: parseFloat(latStr), lng: parseFloat(lngStr) };
                }

                if (!coordinates?.lat || !coordinates?.lng || isNaN(coordinates.lat) || isNaN(coordinates.lng)) return null;

                return (
                  <Marker
                    key={property.id}
                    position={[coordinates.lat, coordinates.lng]}
                    icon={selectedProperty?.id === property.id ? highlightedIcon : customIcon}
                    eventHandlers={{
                      click: () => handleMarkerClick(property),
                    }}
                  >
                    <Popup className="leaflet-popup">
                      <PropertyPopup property={property} />
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MapSearchPage;