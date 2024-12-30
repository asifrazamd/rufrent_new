import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const API_KEY = "YOUR_GOOGLE_API_KEY";

const NearbySearch = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [places, setPlaces] = useState([]);

  const mapContainerStyle = {
    height: "400px",
    width: "100%",
  };

  const defaultCenter = {
    lat: 37.7749, // Default to San Francisco
    lng: -122.4194,
  };

  const handleSearch = (type) => {
    if (!currentLocation) {
      alert("Please allow location access or select a location on the map!");
      return;
    }

    const { lat, lng } = currentLocation;

    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    const request = {
      location: new window.google.maps.LatLng(lat, lng),
      radius: 5000, // Search radius in meters
      type: type, // Type of place, e.g., "restaurant", "entertainment"
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaces(results);
      } else {
        console.error("Nearby Search failed:", status);
      }
    });
  };

  const handleMapClick = (event) => {
    setCurrentLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  return (
    <LoadScript googleMapsApiKey={API_KEY} libraries={["places"]}>
      <div>
        <h1>Google Nearby Search</h1>
        <button onClick={() => handleSearch("entertainment")}>Entertainment</button>
        <button onClick={() => handleSearch("utilities")}>Utilities</button>
        <button onClick={() => handleSearch("restaurant")}>Restaurants</button>
      </div>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={currentLocation || defaultCenter}
        zoom={12}
        onClick={handleMapClick}
      >
        {currentLocation && <Marker position={currentLocation} />}
        {places.map((place) => (
          <Marker
            key={place.place_id}
            position={{
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            }}
            title={place.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default NearbySearch;
