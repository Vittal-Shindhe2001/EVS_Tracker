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
  }, [dispatch,tokendata.name])
  const staffBooking = useSelector((state) => {
    return state.booking.data
  })
  useEffect(() => {
    if (station.length > 0) {
      const stationId = station.map((ele) => ele._id);
      dispatch(startGetStaffBooking(...stationId));
    }
  }, [dispatch, station]);
  return (
    <div>
      {staffBooking.length > 0 ? (
        <div>
          <h3>Staff Booking List</h3>
          {staffBooking.map((booking) => (
            <div key={booking._id}>
              <p>Booking ID: {booking._id}</p>
              <p>Amount: {booking.amount}</p>
              <p>Start Date and Time: {booking.startDateTime}</p>
              <p>End Date and Time: {booking.endDateTime}</p>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <h1>No bookings found.</h1>
      )}

    </div>
  )
}
export default BookingHistrory

