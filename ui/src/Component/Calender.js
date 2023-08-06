import React, { useState, useEffect, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import * as bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const Calender = (props) => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    // Format the data to FullCalendar's event structure
    const formattedEvents = props.bookings.map((ele) => ({
      title: ele.stationName,
      start: ele.startDateTime,
      end: ele.endDateTime,
      amount:ele.amount,
      carName:ele.carName,
      model:ele.model
      // Add more properties as needed
    }))
    // Set the formatted data as state
    setEvents(formattedEvents)
    console.log(formattedEvents,"e")
  }, [props.bookings])

  // Ref to store the currently active popover
  const activePopoverRef = useRef(null)

  // Function to dispose and remove the popover
  const disposePopover = () => {
    if (activePopoverRef.current) {
      activePopoverRef.current.dispose()
      activePopoverRef.current = null
    }
  }

  // Function to handle event click
  const handleEventClick = (info) => {
    // Dispose and remove the previous popover
    disposePopover()

    // Create a new popover
    activePopoverRef.current = new bootstrap.Popover(info.el, {
      title: `Station Name: ${info.event.title}`,
      placement: 'auto',
      trigger: 'manual', // Use manual trigger to control show/hide manually
      customClass: 'popoverStyle',
      content: `<p><strong>StartDateTime:</strong>${info.event.start} <br/> 
                <strong>EndDateTime:</strong>${info.event.end} <br/>
                <strong>Car Name:</strong>${info.event.carName}<br/>
                <strong>Car Model:</strong>${info.event.model}<br/>
                <strong>Amount:</strong>${info.event.amount}<br/>
                </p> 
                `,
      html: true,
      
    })

    activePopoverRef.current.show() // Show the popover
  }

  // Function to handle calendar click (to close popover when clicking outside the events)
  const handleCalendarClick = () => {
    // Dispose and remove the popover
    disposePopover()
  } 
  
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dayMaxEvents={true}
        // timeZone= 'GMT'
        themeSystem="bootstrap5"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        height={'90vh'}
        events={events}
        eventClick={handleEventClick} // Handle event click
        dateClick={handleCalendarClick} // Handle calendar click
      />
    </div>
  )
}

export default Calender
