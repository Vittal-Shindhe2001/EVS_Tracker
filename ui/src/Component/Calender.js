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
      // Add more properties as needed
    }))
    // Set the formatted data as state
    setEvents(formattedEvents)
  }, [props.bookings])
  
  useEffect(() => {
    // Cleanup function
    return () => {
      // Dispose and remove the popover when component unmounts
      disposePopover();
    };
  }, [])
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
      content: `<p><strong>StartDateTime:</strong>${info.event.start} <br/> <strong>EndDateTime:</strong>${info.event.end}</p>`,
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
