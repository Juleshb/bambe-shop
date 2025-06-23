import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { Icon } from '@iconify/react';


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons
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

const LocationPicker = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(value ? value.split(",").map(Number) : null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchCenter, setSearchCenter] = useState([-1.9579, 30.1127]); // Default to Rwanda center
  const [geoError, setGeoError] = useState(null);
  const [isGeoLoading, setIsGeoLoading] = useState(false);
  const [mapStyle, setMapStyle] = useState('satellite'); // 'street', 'satellite', 'topo'
  const mapRef = useRef();

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser");
      return;
    }

    setIsGeoLoading(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCurrentLocation([latitude, longitude]);
        setPosition([latitude, longitude]);
        setSearchCenter([latitude, longitude]);
        if (mapRef.current) {
          mapRef.current.flyTo([latitude, longitude], 15);
        }
        setIsGeoLoading(false);
      },
      (err) => {
        let errorMessage = "Could not get your location";
        
        switch(err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = "Location access was denied. Please enable permissions in your browser settings.";
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable. Please check your network/GPS connection.";
            break;
          case err.TIMEOUT:
            errorMessage = "The request to get location timed out. Please try again.";
            break;
          default:
            errorMessage = "An unknown error occurred while getting your location.";
        }

        setGeoError(errorMessage);
        setIsGeoLoading(false);
        
        // Fallback to default position if no position is set
        if (!position) {
          setPosition(searchCenter);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000, // Increased timeout
        maximumAge: 0
      }
    );
  };

  useEffect(() => {
    if (isOpen && !position) {
      getCurrentLocation();
    }
  }, [isOpen]);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setPosition([lat, lng]);
  };

  const handleSearchResult = (coords) => {
    setSearchCenter(coords);
    setPosition(coords);
    if (mapRef.current) {
      mapRef.current.flyTo(coords, 15);
    }
  };

  const handleConfirm = () => {
    if (position) {
      onChange(position.join(","));
      setIsOpen(false);
    }
  };

  const getTileLayer = () => {
    switch(mapStyle) {
      case 'satellite':
        return (
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        );
      case 'topo':
        return (
          <TileLayer
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          />
        );
      default: // street
        return (
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        );
    }
  };

  return (
    <>
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location Coordinates
        </label>
        <div className="flex gap-2 mt-1">
          <input
            id="location"
            name="location"
            value={value || ""}
            placeholder="Click to select location"
            readOnly
            className="block w-full border border-green-500 p-2 pl-3 rounded cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all"
          >
            <Icon icon="mdi:map-marker" width="20" height="20" />
            Select
          </button>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setIsOpen(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Select Location
                </h3>
                
                {geoError && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <Icon icon="mdi:alert-circle" className="h-5 w-5 text-red-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{geoError}</p>
                      </div>
                    </div>
                  </div>
                )}

                <LocationSearch onSearch={handleSearchResult} />

                <div className="flex justify-between items-center mb-4">
                  <button
                    onClick={getCurrentLocation}
                    disabled={isGeoLoading}
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded transition-all"
                  >
                    {isGeoLoading ? (
                      <>
                        <Icon icon="line-md:loading-loop" width="20" height="20" />
                        Locating...
                      </>
                    ) : (
                      <>
                        <Icon icon="mdi:crosshairs-gps" width="20" height="20" />
                        Use Current Location
                      </>
                    )}
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setMapStyle('street')}
                      className={`px-3 py-1 rounded ${mapStyle === 'street' ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                    >
                      Street
                    </button>
                    <button
                      onClick={() => setMapStyle('satellite')}
                      className={`px-3 py-1 rounded ${mapStyle === 'satellite' ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                    >
                      Satellite
                    </button>
                    <button
                      onClick={() => setMapStyle('topo')}
                      className={`px-3 py-1 rounded ${mapStyle === 'topo' ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                    >
                      Topo
                    </button>
                  </div>
                </div>

                <div className="h-96 w-full rounded-md overflow-hidden border border-gray-300">
                  <MapContainer
                    center={searchCenter}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                    whenCreated={(map) => (mapRef.current = map)}
                  >
                    {getTileLayer()}
                    <MapController center={searchCenter} zoom={15} />
                    {currentLocation && (
                      <Marker position={currentLocation}
                      icon={customIcon}>
                        <Popup>Your current location</Popup>
                      </Marker>
                    )}
                    {position && (
                      <Marker position={position}
                      icon={highlightedIcon}>
                        <Popup>Selected location</Popup>
                      </Marker>
                    )}
                    <MapClickHandler onClick={handleMapClick} />
                  </MapContainer>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <span className="font-medium text-gray-700">Selected Coordinates:</span>
                  {position ? (
                    <span className="text-gray-900 font-mono">{position.join(", ")}</span>
                  ) : (
                    <span className="text-gray-500">Click on the map to select</span>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={!position}
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm ${
                    !position ? 'bg-green-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  Confirm Location
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const LocationSearch = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const handleSearch = async (e) => {
    // Prevent default form submission behavior
    if (e) e.preventDefault();
    
    if (!query.trim()) {
      setSearchError("Please enter a search term");
      return;
    }

    setLoading(true);
    setSearchError(null);
    setResults([]);

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
        {
          headers: {
            'Accept-Language': 'en',
          }
        }
      );
      
      if (response.data && response.data.length > 0) {
        setResults(response.data);
      } else {
        setSearchError("No results found. Try a different search term.");
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchError("Failed to search. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Optional: Add debounce to prevent rapid API calls
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex gap-2"> {/* Changed from form to div to prevent submission */}
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSearchError(null);
          }}
          onKeyPress={handleKeyPress} // Allow Enter key to trigger search
          
          placeholder="Search for a location (e.g., Rubavu, Gisenyi)"
          className="block w-full border border-green-500 p-2 pl-3 rounded"
        />
        <button
          type="button" // Changed from submit to button
          onClick={handleSearch} // Use onClick instead of form submission
          disabled={loading}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all disabled:bg-green-300"
        >
          {loading ? (
            <>
              <Icon icon="line-md:loading-loop" width="20" height="20" />
              Searching...
            </>
          ) : (
            <>
              <Icon icon="mdi:magnify" width="20" height="20" />
              Search
            </>
          )}
        </button>
      </div>

      {searchError && (
        <div className="mt-2 text-red-500 text-sm">{searchError}</div>
      )}

      {results.length > 0 && (
        <div className="mt-2 max-h-40 overflow-y-auto border border-gray-300 rounded">
          {results.slice(0, 5).map((result) => (
            <div
              key={result.place_id}
              className="p-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
              onClick={() => onSearch([parseFloat(result.lat), parseFloat(result.lon)])}
            >
              <div className="font-medium">{result.display_name.split(',')[0]}</div>
              <div className="text-xs text-gray-500">
                {result.display_name.split(',').slice(1).join(',').trim()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
const MapController = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const MapClickHandler = ({ onClick }) => {
  useMapEvents({
    click: onClick,
  });
  return null;
};

export default LocationPicker;