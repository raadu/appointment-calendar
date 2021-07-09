import React, {useEffect} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {events} from '../data/appointment-sample';
import {useLocation, useParams} from 'react-router-dom';

const Calendar = () => {

  // Router Location
  const location = useLocation();

  // Router Params
  const {year, monthDate} = useParams();

  // Initial Date
  let initialDate = new Date().toISOString();

  // Comdition for changing initial date from route params
  if(location.pathname !== "/" && year>999 && year<10000) {
    const parsedMonth = parseInt(monthDate.split("-")[0]);
    const parsedDate = parseInt(monthDate.split("-")[1]);
    const month = (parsedMonth > 0 && parsedMonth < 13) ? parsedMonth : null;
    const date = (parsedDate > 0 && parsedDate < 31) ? parsedDate : null;

    if(month && date) {
      initialDate=`${year}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date}T00:00:00`;
    }
  }

    // Set task data to defaultValue state
    useEffect(() => {
      console.log("events fetched: ", events);
    },[]); // eslint-disable-line react-hooks/exhaustive-deps


    // Open modal when clicked on an event
    const handleEventClick = (clickInfo) => {
        console.log("clickinfo", clickInfo);
    }

    return (
      <div>
        {events ?
          <FullCalendar
            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
            headerToolbar={{
              left: 'prev,next',
              center: 'title',
              right: 'today'
            }}
            initialView="dayGridMonth"
            initialDate={initialDate}
            editable={true}
            selectable={false}
            selectMirror={true}
            weekends={true}
            initialEvents={events}
            eventClick={handleEventClick}
            dateClick={handleEventClick}
            views= {{
              dayGrid: {
                dayMaxEventRows: 4
              }
            }}
          />
            :
          <div>Loading</div>
        }
      </div>
    );
}
 
export default Calendar;