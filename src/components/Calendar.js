import React, {useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {useLocation, useParams} from 'react-router-dom';
import Modal from "react-modal";
import AppointmentForm from './AppointmentForm';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {search_appointment} from '../redux/appointment/appointmentActions';
import AppointmentDetails from './AppointmentDetails';
import {
  MainWrapper,
  ButtonContainer,
  Button, 
  CloseButton
} from '../styles/CalendarStyles';

const Calendar = () => {
  const customModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
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

  // Router Location
  const location = useLocation();

  // Router Params
  const {year, monthDate} = useParams();

  // Initial Date
  let initialDate = new Date().toISOString();

    // Condition for changing initial date from router params
    // When user added `/year/:year/month/:monthDate` path after route
    if(location.pathname !== "/" && year>999 && year<10000) {
      const parsedMonth = parseInt(monthDate.split("-")[0]);
      const parsedDate = parseInt(monthDate.split("-")[1]);
      const month = (parsedMonth > 0 && parsedMonth < 13) ? parsedMonth : null;
      const date = (parsedDate > 0 && parsedDate < 31) ? parsedDate : null;

      if(month && date) {
        // Set up initial date to start the calendar
        initialDate=`${year}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date}T00:00:00`;
      }
    }

    // Open appointment details when clicked on an event
    const handleEventClick = (clickInfo) => {
      if(clickInfo.event) {
        dispatch(search_appointment(clickInfo.event._def.publicId));
        setSelectedModal("AppointmentDetails");
        openModal();
      }
    }

    // Open appointment form
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
      <MainWrapper>
        <ButtonContainer>
          <Button onClick={openForm}>
            Add Appointment
          </Button>
        </ButtonContainer>
        <div>
          {events ?
            <FullCalendar
              plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
              headerToolbar={{
                left: 'title',
                right: 'prevYear,prev,today,next,nextYear'
              }}
              initialView="dayGridMonth"
              initialDate={initialDate}
              events={events}
              editable={true}
              selectable={false}
              selectMirror={true}
              weekends={true}
              eventClick={handleEventClick}
              dateClick={handleEventClick}
              views= {{
                dayGrid: {
                  dayMaxEventRows: 4
                }
              }}
              height="90vh"
            />
              :
            <div>Loading</div>
          }
        </div>

        {modalOpen && (
          <Modal 
            isOpen={true}
            onRequestClose={closeModal}
            ariaHideApp={false}
            style={customModalStyles}
          >
            <CloseButton onClick={closeModal}>X</CloseButton>
            {selectedModal === "AppointmentForm" ? 
              <AppointmentForm closeModal={closeModal}/> : 
              selectedModal === "AppointmentDetails" ? 
              <AppointmentDetails selectedEvent={selectedEvent}/> :
              null
            }
          </Modal>
        )}
      </MainWrapper>
    );
}
 
export default Calendar;
