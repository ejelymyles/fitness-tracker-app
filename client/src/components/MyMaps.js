import React, { useState, useEffect} from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker, InfoWindow } from '@react-google-maps/api';

const libraries = ['places'];

const mapContainerStyle = {
  width: '99vw',
  height: '81vh',
};

const center = {
  lat: 40.782864,
  lng: -73.965355,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const MyComponent = () => {
  

  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(center);
  const [autocomplete, setAutocomplete] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      },
      () => null,
      { enableHighAccuracy: true }
    );
  }, []);

  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        setCurrentLocation({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
        setMarkers([
          {
            position: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            },
            name: place.name,
            address: place.formatted_address,
            rating: place.rating,
            opening_hours: place.opening_hours?.weekday_text,
          },
        ]);
      } else {
        const service = new window.google.maps.places.PlacesService(map);
        service.nearbySearch(
          {
            location: currentLocation,
            radius: 5000,
            keyword: autocomplete.getPlace().name,
          },
          (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              setMarkers(
                results.map((place) => ({
                  position: {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                  },
                  name: place.name,
                  address: place.vicinity,
                  rating: place.rating,
                  opening_hours: place.opening_hours?.weekday_text,
                }))
              );
            } else {
              console.log('No places found');
            }
          }
        );
      }
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  return (
    <LoadScript googleMapsApiKey="" libraries={libraries}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={currentLocation}
        options={options}
        onLoad={(map) => setMap(map)}
      >
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Search for places..."
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
              top: "10px",
              marginLeft: "-120px",
            }}
          />
        </Autocomplete>

        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            onClick={() => setSelectedMarker(marker)}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <h2>{selectedMarker.name}</h2>
              <p>{selectedMarker.address}</p>
              {selectedMarker.rating && <p>Rating: {selectedMarker.rating}</p>}
              {selectedMarker.opening_hours && (
                <div>
                  <h3>Opening Hours:</h3>
                  <ul>
                    {selectedMarker.opening_hours.map((hours, index) => (
                      <li key={index}>{hours}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};
export default MyComponent;




