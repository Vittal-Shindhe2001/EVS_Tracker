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
  const [errors, setErrors] = useState({});

  // user info
  let token = localStorage.getItem('token')
  let tokendata
  if (token) {
    tokendata = jwt_decode(token)
  }

  // station id set to stationId state
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
      setAmount(0);
    }
  };

  useEffect(() => {
    calculateAmount();
    stationsId()
  }, [port, startDateTime, endDateTime]);

  const formValidation = () => {
    const errors = {};

    if (!port) {
      errors.port = "Please choose a Port type.";
    }

    if (!startDateTime) {
      errors.startDateTime = "Please select the Start Date and Time.";
    }

    if (!endDateTime) {
      errors.endDateTime = "Please select the End Date and Time.";
    } else if (new Date(endDateTime) <= new Date(startDateTime)) {
      errors.endDateTime = "End Date and Time must be greater than Start Date and Time.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleBooking = (e) => {
    e.preventDefault();

    if(formValidation()){
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

      dispatch(startBooking(props, formData, reset, tokendata));
    }
  };

  return (
    <div className="container">
      <h2>Station Details</h2>
      <p>Name: {station.name}</p>
      <p>Address: {station.address}</p>
      <p>Landmark: {station.landmark}</p>
      <p>Staff: {station.staff}</p>

      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Book Your Slot</h1>
              <form onSubmit={handleBooking}>
                <div className="mb-3">
                  <label className="form-label">Choose your Port type</label>
                  <select
                    className={`form-select ${errors.port ? 'is-invalid' : ''}`}
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                  >
                    <option value="">Select Port</option>
                    {station.chargingOptions.map((chargingOption) => (
                      <option key={chargingOption._id} value={chargingOption._id}>
                        {chargingOption.portType}
                      </option>
                    ))}
                  </select>
                  {errors.port && <div className="invalid-feedback">{errors.port}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Start Date and Time:</label>
                  <input
                    type="datetime-local"
                    className={`form-control ${errors.startDateTime ? 'is-invalid' : ''}`}
                    value={startDateTime}
                    onChange={(e) => {
                      setStartDateTime(e.target.value);
                      calculateAmount();
                    }}
                  />
                  {errors.startDateTime && <div className="invalid-feedback">{errors.startDateTime}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">End Date and Time:</label>
                  <input
                    type="datetime-local"
                    className={`form-control ${errors.endDateTime ? 'is-invalid' : ''}`}
                    value={endDateTime}
                    onChange={(e) => {
                      setEndDateTime(e.target.value);
                      calculateAmount();
                    }}
                  />
                  {errors.endDateTime && <div className="invalid-feedback">{errors.endDateTime}</div>}
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
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Book Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
