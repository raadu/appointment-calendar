import React, {useState, useEffect} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {useLocation, useParams} from 'react-router-dom';
import Modal from "react-modal";
import AppointmentForm from './AppointmentForm';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import AppointmentDetails from './AppointmentDetails';
import { search_appointment } from '../redux/appointment/appointmentActions';

const Calendar = () => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      // height: '90vh',
      // width: '90vw',
    },
    overlay: {zIndex: 1000}
  };

  // States
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState("");
  const events = useSelector(state => state.appointment.appointments);
  const selectedEvent = useSelector(state => state.appointment.selectedAppointment);

  //Assign useDispatch hook to a variable
  const dispatch = useDispatch();

  console.log('selectedEvent: ', selectedEvent);
  

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


    // Open appointment details when clicked on an event
    const handleEventClick = (clickInfo) => {
      if(clickInfo.event) {
        dispatch(search_appointment(clickInfo.event._def.publicId));
        setSelectedModal("AppointmentDetails");
        openModal();
          console.log("clickinfo", clickInfo.event._def.publicId);
      }
    }

    // Open appoitment form
    const openForm = () => {
      setSelectedModal("AppointmentForm");
      openModal();
    }

    // Open Modal Function
    const openModal = () => {
      setModalOpen(true);
    };

    // Close Modal Function
    const closeModal = () => {
      setModalOpen(false);
    };

    return (
      <div>
        <button onClick={openForm}>Add Appointment</button>
        
        
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
            events={events}
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

        {modalOpen && (
          <Modal 
            isOpen={true} 
            onRequestClose={closeModal} 
            ariaHideApp={false}
            style={customStyles}
          >
            {selectedModal === "AppointmentForm" ? 
              <AppointmentForm/> : 
              selectedModal === "AppointmentDetails" ? 
              <AppointmentDetails selectedEvent={selectedEvent}/> :
              null
            }
          </Modal>
        )}
      </div>
    );
}
 
export default Calendar;