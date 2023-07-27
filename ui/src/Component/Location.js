import React, { useRef, useEffect } from 'react';
import L from 'leaflet';


const Location = (props) => {
   const {geo}=props
  const mapRef = useRef(null);
  let map = null;
  let marker = null;

  useEffect(() => {
    // Initialize the map when the component mounts
    map = L.map(mapRef.current, {
      center: [16.821448145792235,16.821448145792235],
      zoom: 10,
    });

    // Add a tile layer (you need to specify the URL of the tile layer)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Add a click event listener to the map
    map.on('click', handleMapClick);

    // Clean up the map when the component unmounts
    return () => {
      map.off('click', handleMapClick);
      map.remove();
    };
  }, []);

  const handleMapClick = (event) => {
    // Remove the previous marker if it exists
    if (marker !== null) {
      map.removeLayer(marker);
    }
    //location icon
    const customIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/128/5549/5549173.png', 
      iconSize: [32, 32], // Set the size of the icon
      iconAnchor: [16, 32], // Set the anchor point of the icon (bottom center)
    })
    // Create a new marker at the clicked location and add it to the map
    marker = L.marker([event.latlng.lat, event.latlng.lng],{icon:customIcon}).addTo(map);
    const latitude=event.latlng.lat
    const longitude=event.latlng.lng
   geo(latitude, longitude)
  };

  return <div id="map" style={{ width: '100%', height: '200px' }} ref={mapRef} />
};

export default Location
