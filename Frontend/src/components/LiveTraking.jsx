import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const LiveTracking = ({ ride }) => {
  const [location, setLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 20, lng: 78 });
  const [directions, setDirections] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
  });

  useEffect(() => {
    let watchId;

    if (ride?.pickUpCoordination && ride?.destinationCoordination) {
      const pickup = {
        lat: ride.pickUpCoordination.ltd,
        lng: ride.pickUpCoordination.lng,
      };
      const dest = {
        lat: ride.destinationCoordination.ltd,
        lng: ride.destinationCoordination.lng,
      };

      setLocation(pickup);
      setDestination(dest);
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
        (error) => console.error("Geolocation error:", error),
        { enableHighAccuracy: true, maximumAge: 0 }
      );

      watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error("Live location error:", error),
        { enableHighAccuracy: true, maximumAge: 0 }
      );
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [ride]);

  useEffect(() => {
    if (location && destination) {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: location,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error("Directions request failed due to:", status);
          }
        }
      );
    }
  }, [location, destination]);

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
        zoom={14}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        }}
      >
        {location && <Marker position={location} label="🚖" />}
        {destination && <Marker position={destination} label="📍" />}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
};

export default LiveTracking;
