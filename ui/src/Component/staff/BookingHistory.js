import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { startGetStaffBooking } from "../../Actions/bookingAction";
import { startStaffStation } from "../../Actions/stationAction";

const BookingHistrory = () => {
  const dispatch = useDispatch()
  let token = localStorage.getItem('token')
  let tokendata
  if (token) {
    tokendata = jwt_decode(token)
  }
  const station = useSelector((state) => {
    return state.station.data
  })
  useEffect(() => {
    dispatch(startStaffStation(tokendata.name))
  }, [dispatch, tokendata.name])
  const staffBooking = useSelector((state) => {
    return state.booking.data
  })
  useEffect(() => {
    if (station.length > 0) {
      const stationId = station.map((ele) => ele._id);
      dispatch(startGetStaffBooking(...stationId));
    }
  }, [dispatch, station]);
  const stylishCardStyle = {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "10px",
    margin: "10px",
    backgroundColor: "#f8f8f8",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };
  return (
    <div className="container mt-4" >
      {staffBooking.length > 0 ? (
        <div style={stylishCardStyle}>
          <h3 className="mb-4">Staff Booking List</h3>
          <hr />
          {staffBooking.map((booking) => (
            <div key={booking._id} className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Booking ID: {booking._id}</h5>
                <p className="card-text">Amount: {booking.amount}</p>
                <p className="card-text">Start Date and Time: {booking.startDateTime}</p>
                <p className="card-text">End Date and Time: {booking.endDateTime}</p>
                <h5 className="card-title">Car Details</h5>
                <p className="card-text">Car Name: {booking.carName}</p>
                <p className="card-text">Car Model: {booking.model}</p>
                <p className="card-text">
                  Status: {booking.isStationBooked ? "Booked" : "Your booking Slot Expired"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1>No bookings found.</h1>
      )}
    </div>
  )
}
export default BookingHistrory;
