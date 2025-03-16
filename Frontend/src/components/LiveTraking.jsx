import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issue in Leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Default Blue Marker Icon
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Green Marker for Pickup Location
const greenIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const LiveTracking = ({ ride }) => {
  const [location, setLocation] = useState(null);
  const [location2, setLocation2] = useState(null);
  const [userlocation,setUserlocation]=useState(null)
  const [mapCenter, setMapCenter] = useState([20, 78]); // Default location (India)

  useEffect(() => {
    let watchId;

    if (ride?.pickUpCoordination && ride?.destinationCoordination) {
      // Set pickup and destination locations
      const pickup = {
        lat: ride.pickUpCoordination.ltd, // FIXED: Used correct 'lat'
        lng: ride.pickUpCoordination.lng,
      };
      const destination = {
        lat: ride.destinationCoordination.ltd, // FIXED: Used correct 'lat'
        lng: ride.destinationCoordination.lng,
      };

      setLocation(pickup);
      setLocation2(destination);
      setMapCenter(pickup); // Center map on pickup location
    } else {
      // Get user's live location if no ride coordinates exist
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(userLocation);
          setMapCenter(userLocation); // Set initial map center
        },
        (error) => {
          console.error("Error getting initial location:", error);
        },
        { enableHighAccuracy: true, maximumAge: 0 }
      );

      watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        { enableHighAccuracy: true, maximumAge: 0 }
      );
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [ride]);

  return (
   <div className="relative w-full h-[calc(75vh-150px)]">
  {location || location2 ? ( // Show the map if AT LEAST one location is available
    <MapContainer 
      key={`${location?.lat || location2?.lat}-${location?.lng || location2?.lng}`} // Prevent stale rendering
      center={location || location2} // Center on the available location
      zoom={15} 
      className="w-full h-full rounded-lg overflow-hidden z-0"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Pickup Marker (Only show if available) */}
      {location && (
        <Marker position={location}>
          <Popup>Pickup Location 🚖</Popup>
        </Marker>
      )}

      {/* Destination Marker (Only show if available) */}
      {location2 && (
        <Marker position={location2} icon={greenIcon}>
          <Popup>Destination 📍</Popup>
        </Marker>
      )}

      {/* Polyline (Only if BOTH locations exist) */}
      {location && location2 && (
        <Polyline 
          positions={[location, location2]} 
          pathOptions={{ color: "green", weight: 5, opacity: 0.7, dashArray: "10, 10" }} 
        />
      )}
    </MapContainer>
  ) : (
    <p className="text-center">Loading your location...</p>
  )}
</div>
  );
};

export default LiveTracking;
