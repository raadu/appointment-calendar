import moment from "moment";
import {
    Title,
} from '../styles/AppointmentDetailsStyles';

const AppointmentDetails = ({selectedEvent}) => {
    const startDateTime = selectedEvent.start;
    const endDateTime = selectedEvent.end;
    const formattedStartDate = moment(startDateTime).utc().format("DD MMMM YYYY");
    const formattedStartTime = moment(startDateTime).local().format("hh:mm a");
    const formattedEndTime = moment(endDateTime).local().format("hh:mm a");

    return (
        <div>
        {selectedEvent ? (
            <div>
            <Title>{selectedEvent.title}</Title>
            <div>Name: {selectedEvent.name}</div>
            <div>Age: {selectedEvent.age}</div>
            <div>Gender: {selectedEvent.gender}</div>
            <div>Date: {formattedStartDate}</div>
            <div>Start Time: {formattedStartTime}</div>
            <div>End Time: {formattedEndTime}</div>
            </div>

        ) : (
            <div>Error Getting Data</div>
        )}
        </div>
    );
}
 
export default AppointmentDetails;