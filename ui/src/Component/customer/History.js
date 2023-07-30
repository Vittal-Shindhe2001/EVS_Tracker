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

  return (
    <div>
      <h3>Booking list</h3>
      <div className="card-deck">
        {reversedBookings.map((booking) => (
          <div key={booking._id} className="card" id="histroy">
            <div className="card-body">
              <h4 className="card-title">Name: {booking.stationName}</h4>
              <p className="card-text">Amount: {booking.amount}</p>
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
