import React from "react";
import jwt_decode from "jwt-decode"; 
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { startBooking } from "../../Actions/bookingAction";

const Booking = (props) => {
  const { station } = props.location.state;
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [port, setPort] = useState('');
  const [ratePerMinute] = useState(50);
  const [stationId,setStationId]=useState('')
  
  //user info
  let token = localStorage.getItem('token')
    let tokendata
    if (token) {
        tokendata = jwt_decode(token)
    } 
  //station id set to stationId state
  const stationsId=()=>{
    if (station) {
      setStationId(station._id)
    }
  }
  const calculateAmount = () => {
    if (startDateTime && endDateTime) {
      const start = new Date(startDateTime);
      const end = new Date(endDateTime);
      const duration = (end - start) / 60000;
      const amount = duration * ratePerMinute;
      setAmount(amount);
    } else {
      setAmount("");
    }
  };

  useEffect(() => {
    calculateAmount();
    stationsId()
  }, [port, startDateTime, endDateTime,calculateAmount]);

  const handleBooking = (e) => {
    e.preventDefault();

    const formData = {
      amount: amount,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      chargingOptionId: port,
      stationId:stationId,
      stationName:station.name
    };

    const reset = () => {
      setEndDateTime('')
      setStartDateTime('')
      setPort('')
      setAmount(0)
    }

    dispatch(startBooking(props,formData, reset,tokendata));
  };

  return (
    <div>
      <div>
        <h2>Station Details</h2>
        <p>Name: {station.name}</p>
        <p>Address: {station.address}</p>
        <p>Landmark: {station.landmark}</p>
        <p>Staff: {station.staff}</p>
      </div>
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <h1>Book your slot</h1>
              <div className="card shadow">
                <div className="card-body"></div>
                <form onSubmit={handleBooking}>
                  <div className="mb-3">
                    <label className="form-label">Choose your Port type</label>
                    <br />
                    <select value={port} onChange={(e) => setPort(e.target.value)}>
                      <option >Select Port</option>
                      {station.chargingOptions.map((chargingOption) => (
                        <option key={chargingOption._id}
                          value={chargingOption._id}>
                          {chargingOption.portType}
                        </option>
                      ))}
                    </select>
                    <br />
                  </div>
                  <div className="mb-3 form-check">
                    <label htmlFor="startDateTime">Start Date and Time:</label>
                    <input
                      type="datetime-local"
                      id="startDateTime"
                      name="startDateTime"
                      value={startDateTime}
                      onChange={(e) => {
                        setStartDateTime(e.target.value);
                        calculateAmount();
                      }}
                    />
                    <br />
                  </div>
                  <div>
                    <label htmlFor="endDateTime">End Date and Time:</label>
                    <input
                      type="datetime-local"
                      id="endDateTime"
                      name="endDateTime"
                      value={endDateTime}
                      onChange={(e) => {
                        setEndDateTime(e.target.value);
                        calculateAmount();
                      }}
                    />
                  </div>
                  {startDateTime && endDateTime && (
                    <div className="mb-3">
                      <label className="form-label">Amount</label>
                      <input
                        type="text"
                        className="form-control"
                        value={amount}
                        readOnly
                      />
                    </div>
                  )}
                  <input type="submit" className="btn btn-primary" />

                </form>
              </div>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </div>

  );
};
export default Booking;