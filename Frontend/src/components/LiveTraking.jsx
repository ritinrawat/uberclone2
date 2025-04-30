import React, { useEffect, useState, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const LiveTracking = ({ ride }) => {
  const [location, setLocation] = useState(null);
  const [location2, setLocation2] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 20, lng: 78 });

  // Load Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // Replace this with your actual key
  });

  useEffect(() => {
    let watchId;

    if (ride?.pickUpCoordination && ride?.destinationCoordination) {
      const pickup = {
        lat: ride.pickUpCoordination.ltd,
        lng: ride.pickUpCoordination.lng,
      };
      const destination = {
        lat: ride.destinationCoordination.ltd,
        lng: ride.destinationCoordination.lng,
      };

      setLocation(pickup);
      setLocation2(destination);
      setMapCenter(pickup);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(userLocation);
          setMapCenter(userLocation);
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
          console.error("Error getting live location:", error);
        },
        { enableHighAccuracy: true, maximumAge: 0 }
      );
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [ride]);

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-center p-3">Loading Google Maps...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[calc(75vh-150px)]">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={15}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        }}
      >
        {location && <Marker position={location} label="🚖" />}
        {location2 && <Marker position={location2} label="📍" />}
        {location && location2 && (
          <Polyline
            path={[location, location2]}
            options={{
              strokeColor: "#00FF00",
              strokeOpacity: 0.8,
              strokeWeight: 5,
              icons: [
                {
                  icon: {
                    path: "M 0,-1 0,1",
                    strokeOpacity: 1,
                    scale: 4,
                  },
                  offset: "0",
                  repeat: "10px",
                },
              ],
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default LiveTracking;
