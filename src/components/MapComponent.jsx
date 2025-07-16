import React from "react";
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from "react-leaflet";
import { Icon } from "@iconify/react";
import { FormattedNumber } from "react-intl";
import "leaflet/dist/leaflet.css"; // ✅ Ensure Leaflet styles are loaded

const MapComponent = ({ coordinates, image, price, beds, propertyAddress }) => {
  const { BaseLayer } = LayersControl;

  // ✅ Prevent errors with default values
  const validCoordinates = Array.isArray(coordinates) && coordinates.length === 2
    ? coordinates
    : [40.7128, -74.006]; // Default New York coordinates

  const imageUrl = Array.isArray(image) && image.length > 0
    ? `http://localhost:4800${image[0].image_url}`
    : "https://via.placeholder.com/150"; // Default image

  const addressText = Array.isArray(propertyAddress)
    ? propertyAddress.map(item => item.value).join(", ")
    : "No Address Available";

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer center={validCoordinates} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <LayersControl position="topright">
          <BaseLayer checked name="Street View">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
          </BaseLayer>
          <BaseLayer name="Satellite View">
            <TileLayer url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" subdomains={["mt0", "mt1", "mt2", "mt3"]} attribution="Map data &copy; 2023 Google" />
          </BaseLayer>
          <BaseLayer name="Terrain View">
            <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" attribution="&copy; OpenTopoMap contributors" />
          </BaseLayer>
        </LayersControl>

        {/* Marker with Popup */}
        <Marker position={validCoordinates}>
          <Popup>
            <div className="w-full">
              <div className="h-[10rem]">
                <img className="w-full object-cover" src={imageUrl} alt="Property" />
              </div>
              <div className="mt-8 border-b border-b-slate-100 py-4">
                <div className="flex items-center gap-4 text-lg text-red-500">
                  <span className="px-4 py-1 bg-red-500 bg-opacity-30 rounded-full">Price</span>
                  <span>
                    <FormattedNumber value={price} style="currency" currency="USD" />
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm font-bold text-[#616e96]">
                  <span className="flex items-center gap-1">
                    <Icon className="bg-gray-100 p-1 rounded-full" icon="icon-park-outline:direction-adjustment-two" width="24" height="24" />
                    <p>m<sup>2</sup></p>
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon className="bg-gray-100 p-1 rounded-full" icon="ic:baseline-bed" width="24" height="24" />
                    <p>{beds} bed</p>
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 py-2">
                <Icon icon="basil:location-outline" width="24" height="24" />
                <span>{addressText}</span>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
