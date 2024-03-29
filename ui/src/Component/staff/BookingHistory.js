import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { startGetStaffBooking } from "../../Actions/bookingAction";
import { startStaffStation } from "../../Actions/stationAction";
import Calender from "../Calender";
import { startGetStationUsers } from "../../Actions/userActions";


const BookingHistrory = () => {
  const dispatch = useDispatch()
  let token = localStorage.getItem('token')
  let tokendata
  if (token) {
    tokendata = jwt_decode(token)
  }

  //staff stations get
  useEffect(() => {
    dispatch(startStaffStation(tokendata.name))
  }, [dispatch, tokendata.name])

  const station = useSelector((state) => {
    return state.station.data
  })

  //staff station booking
  useEffect(() => {
    if (station.length > 0) {
      const stationIds = station.map((ele) => ele._id )
      dispatch(startGetStaffBooking(...stationIds))
    }
  }, [dispatch, station]);

  const staffBooking = useSelector((state) => {
    return state.booking.data
  })

  //useInfo staff releated station
  useEffect(()=>{
    if (staffBooking.length >0) {
      const customerIds=staffBooking.map(ele=>ele.customerId)
     dispatch(startGetStationUsers(...customerIds))
    }
  },[dispatch,staffBooking])
  const customers=useSelector((state)=>{
    return state.user.data
  })
 
  return (
    <div>
      <Calender bookings={staffBooking} user={customers}/>
    </div>
  )
}
export default BookingHistrory

