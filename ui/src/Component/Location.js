import React, { useRef, useEffect} from 'react';
import L from 'leaflet';

const Location = (props) => {
  const { geo } = props;
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  let map = null;

  useEffect(() => {
    // Initialize the map when the component mounts
    map = L.map(mapRef.current, {
      center: [20.5937, 78.9629],
      zoom: 10,
    });

    // Add a tile layer (you need to specify the URL of the tile layer)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Fetch the station current location using the Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Create a marker for the Station's current location
        markerRef.current = L.marker([latitude, longitude], { icon: createCustomIcon(), draggable: true }).addTo(map);
        // Set the view of the map to the Station's current location
        map.setView([latitude, longitude], 13);
        // Call the geo function with the initial latitude and longitude
        geo(latitude, longitude);

        // Update the marker's position when it is dragged
        markerRef.current.on('dragend', () => {
          const latLng = markerRef.current.getLatLng();
          const latitude = latLng.lat;
          const longitude = latLng.lng;
          geo(latitude, longitude);
        });

        // Add a click event listener to the map
        map.on('click', handleMapClick);

        // Clean up the map and marker when the component unmounts
        return () => {
          map.off('click', handleMapClick);
          map.remove();
          markerRef.current.remove();
        };
      },
      (error) => {
        // Handle error in fetching Station's location
        console.error('Error getting Station location:', error);
      },
    );
  }, []);

  const createCustomIcon = () => {
    return L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/128/5549/5549173.png',
      iconSize: [32, 32], // Set the size of the icon
      iconAnchor: [16, 32], // Set the anchor point of the icon (bottom center)
    });
  };

  const handleMapClick = (event) => {
    // Remove the previous marker if it exists
    if (markerRef.current) {
      map.removeLayer(markerRef.current);
    }

    // Create a new marker at the clicked location and add it to the map
    markerRef.current = L.marker([event.latlng.lat, event.latlng.lng], {
      icon: createCustomIcon(),
      draggable: true, // Make the marker draggable
    }).addTo(map);

    // // Update the marker's position when it is dragged
    // markerRef.current.on('dragend', () => {
    //   const latLng = markerRef.current.getLatLng();
    //   const latitude = latLng.lat;
    //   const longitude = latLng.lng;
    //   geo(latitude, longitude);
    // });
    // const latitude = event.latlng.lat;
    // const longitude = event.latlng.lng;
    // geo(latitude, longitude);
  };

  return <div id="map" style={{ width: '100%', height: '200px' }} ref={mapRef} />;
};

export default Location;