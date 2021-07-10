import {ADD_APPOINTMENT, SEARCH_APPOINTMENT} from "./appointmentTypes";

// Action creators list. All action creator functions are listed here.

// add_appointment action creator
// function returns an action object
export const add_appointment = (appointmentData) => dispatch => {
    dispatch({
        type: ADD_APPOINTMENT,
        payload: appointmentData,
    });
    return Promise.resolve();
}

// search appointment with ID
export const search_appointment = (id) => {
    return {
        type: SEARCH_APPOINTMENT,
        payload: id,
    }
}
