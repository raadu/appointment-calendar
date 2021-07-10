import {ADD_APPOINTMENT, SEARCH_APPOINTMENT} from './appointmentTypes';

// Initial State
const initialState = {
    appointments: localStorage.getItem('appointments') ? JSON.parse(localStorage.getItem('appointments')) : [],
    selectedAppointment: {},
}

// Reducer function
// Takes state, action as arguments 
// Returns new state by switching through action.type
const appointmentReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_APPOINTMENT:
            return {
                ...state,
                appointments: [...state.appointments, action.payload],
            };
        case SEARCH_APPOINTMENT:
            return {
                ...state,
                selectedAppointment: state.appointments.find(item => item.id === action.payload),
            }
        default: 
            return state;
    }
}

export default appointmentReducer;
