import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


const userIcon = L.divIcon({
  className: "user-location-icon",
  html: '<div style="width:16px;height:16px;background:#2563eb;border:3px solid white;border-radius:50%;box-shadow:0 0 6px rgba(0,0,0,0.4);"></div>',
  iconSize: [16, 16],
});

function UserLocationMarker() {
  const map = useMap();

  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        L.marker([latitude, longitude], { icon: userIcon })
          .addTo(map)
          .bindPopup("You are here");
      },
      (err) => {
        console.warn("Geolocation error:", err.message);
        alert("Location permission denied. Please allow location to see your position.");
      }
    );
  }, [map]);

  return null;
}

function HotelMap({ latitude, longitude, title }) {
  const position = [latitude, longitude];

  return (
    <div className="hotel-map-wrapper rounded overflow-hidden border position-relative">
      <MapContainer
        center={position}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>
            <strong>{title}</strong>
            <br />
            Lat: {latitude}, Lng: {longitude}
          </Popup>
        </Marker>

        <UserLocationMarker />
      </MapContainer>
    </div>
  );
}

export default HotelMap;