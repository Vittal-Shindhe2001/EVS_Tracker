import { useEffect } from "react"
import { startGetUserBooking } from "../../Actions/bookingAction"
import { useDispatch, useSelector } from "react-redux"

const History = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startGetUserBooking())
  }, [dispatch])

  const bookings = useSelector((state) => {
    return state.booking.data
  })
  const reversedBookings = Array.isArray(bookings) ? [...bookings].reverse() : []

  const stylishCardStyle = {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "10px",
    margin: "10px",
    backgroundColor: "#f8f8f8",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div>
      <h3>Booking list</h3>
      <div className="card-deck">
        {reversedBookings.map((booking) => (
          <div key={booking._id} className="card" id="histroy"  style={stylishCardStyle}>
            <div className="card-body">
              <h4 className="card-title">Station Name: {booking.stationName}</h4>
              <p className="card-text">Amount to be paid: {booking.amount}</p>
              <p className="card-text">Start: {booking.startDateTime}</p>
              <p className="card-text">End: {booking.endDateTime}</p>
              <p className="card-text">
                Status: {booking.isStationBooked ? "booked" : "Your booking Slot Expired"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default History
