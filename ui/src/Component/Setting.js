import React, { useEffect } from "react"
import { startGetAllBooking } from "../Actions/bookingAction"
import { useDispatch, useSelector } from "react-redux"

const Setting = (props) => {
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(startGetAllBooking())
       
    },[dispatch])
   
    //booking history
    const bookings=useSelector((state)=>{
        return state.booking.data
    })
    const stylishCardStyle = {
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "10px",
        margin: "10px",
        backgroundColor: "#f8f8f8",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      };

    return(
         <div className="container-fluid">
          
            {bookings.length >0 ?
            <div>
            <h2>All Bookings</h2>
            <div className="card-deck">
        {bookings.map((booking) => (
          <div key={booking.id} className="card" style={stylishCardStyle}>
            <div className="card-body">
              <h4 className="card-title" >Name: {booking.stationName}</h4>
              <p className="card-text" >Amount: {booking.amount}</p>
              <p className="card-text">Start: {booking.startDateTime}</p>
              <p className="card-text">End: {booking.endDateTime}</p>
            </div>
          </div>
        ))}
      </div>
      </div> : <h1>BookingHistory Not Found</h1>}
        </div>  
    )
}
export default Setting