import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useDispatch, useSelector } from "react-redux";

import { startGetAllStations } from "../../Actions/stationAction";

const Map = (props) => {

  const [currentLocation, setCurrentLocation] = useState(null);
  const [station,setStation]=useState('')
  const dispatch = useDispatch();
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    }
    dispatch(startGetAllStations());
  }, [dispatch]);

  const chargingStations = useSelector((state) => {
    return state.station.data;
  });

  const containerStyle = {
    height: "100vh",
    width: "100%",
  };

  const currentMarkerIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/8013/8013394.png",
    iconSize: [40, 40],
  });

  const stationMarkerIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/9357/9357947.png",
    iconSize: [30, 30],
  });
  const handleBooking = (station) => {
    setStation(station)
    if (window.confirm("You want to book the slot")) {
      props.history.push({
        pathname: "/booking",
        state: { station: station }
        // location={{ state: { station: stationData } }}
      });
    }
  };

  return (
    <div>
      {currentLocation && (
        <MapContainer
          style={containerStyle}
          center={currentLocation}
          zoom={15}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> '
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={currentLocation} icon={currentMarkerIcon}>
            <Popup>My current Location</Popup>
          </Marker>

          {chargingStations.map((station) => (
            <Marker
              position={[station.geo.latitude, station.geo.longitude]}
              icon={stationMarkerIcon}
            >
              <Popup>
                Name - {station.name} <br />
                Address - {station.address}
                {" - "}
                {station.landmark} <br />
                Staff-{station.staff}
                <br />
                Charging ports -{" "}
                {station.chargingOptions.map((ports) => {
                  return <b><li>{ports.portType}</li></b>;
                })}
                <br />
                  <button
                    type="button"
                    className=" bookingButtonclr"
                    onClick={() => handleBooking(station)}
                  >
                    Book Now
                  </button>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  )
}

export default Map;
