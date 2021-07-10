import {combineReducers} from "redux";
import appointmentReducer from "./appointment/appointmentReducer";

const rootReducer = combineReducers({
    appointment: appointmentReducer,
});

export default rootReducer;
