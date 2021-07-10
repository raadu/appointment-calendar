import {useState, useEffect} from 'react';
import {useForm} from "react-hook-form";
import DatePicker from 'react-date-picker';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {add_appointment} from '../redux/appointment/appointmentActions';
import uuid from 'react-uuid';

const AppointmentForm = () => {
    // States
    const [startDateTime, setStartDateTime] = useState(new Date());
    const [endDateTime, setEndDateTime] = useState(new Date());

    //Assign useDispatch hook to a variable
    const dispatch = useDispatch();

    // useForm handler
    const { register, handleSubmit, reset } = useForm();

    // Date Picker State
    const [selectedDate, onChangeDate] = useState(new Date());

    // Timerange Picker State
    const [selectedTime, onChangeTime] = useState(['10:00', '11:00']);

    // Add start and end date time when state changes
    useEffect(() => {
        let formattedDate = moment(selectedDate).format("YYYY-MM-DD");
        setStartDateTime(formattedDate+"T"+selectedTime[0]+":00");
        setEndDateTime(formattedDate+"T"+selectedTime[1]+":00");
    }, [selectedDate, selectedTime]);


    // onSubmit Function
    const onSubmit = (data) => {
        const appointmentInfo = {
            ...data,
            start: startDateTime,
            end: endDateTime,
            id: uuid(),
        };
        dispatch(add_appointment(appointmentInfo));
        console.log("form data: ", appointmentInfo);
        reset();
        setStartDateTime(new Date());
        setEndDateTime(new Date());

    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ul>
                    <li>
                        <label>Title</label>
                        <input
                            name="title"
                            type="text"
                            placeholder="Appointment of..."
                            required
                            {...register("title", {
                                required: true,
                                maxLength: 100,
                            })}
                        />
                    </li>
                    <li>
                        <label>Name</label>
                        <input
                            name="name"
                            type="text"
                            placeholder="Patient Name"
                            required
                            {...register("name", {
                                required: true,
                                maxLength: 45,
                            })}
                        />
                    </li>
                    <li>
                        <label>Age</label>
                        <input
                            name="age"
                            type="number"
                            required
                            {...register("age", {
                                required: true,
                                maxLength: 3,
                            })}
                        />
                    </li>
                    <li>
                        <label>Gender</label>
                        <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            required
                            {...register("gender")}
                        />
                        <label htmlFor="male">Male</label>
                        <br />
                        <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            {...register("gender")}
                        />
                        <label htmlFor="female">Female</label>
                        <br />
                        <input
                            type="radio"
                            id="other"
                            name="gender"
                            value="other"
                            {...register("gender")}
                        />
                        <label htmlFor="other">Other</label>
                        <br />
                    </li>
                    <li>
                        <div>
                            <DatePicker
                                onChange={onChangeDate}
                                value={selectedDate}
                                format="y-MM-d"
                            />
                        </div> 
                    </li>
                    <li>
                        <div>
                            <TimeRangePicker
                                onChange={onChangeTime}
                                value={selectedTime}
                            />
                        </div>
                    </li>
                    <li>
                        <button type="submit">Add To Calendar</button>
                    </li>
                </ul>
            </form>
        </div>
    );
};

export default AppointmentForm;
