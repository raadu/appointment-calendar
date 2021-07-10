import {useState, useEffect} from 'react';
import {useForm} from "react-hook-form";
import DatePicker from 'react-date-picker';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {add_appointment} from '../redux/appointment/appointmentActions';
import uuid from 'react-uuid';
import {
    FormWrapper,
    Header,
    ListItem,
    ListContainer,
    AddButton,
    Input,
    Label,
} from '../styles/AppointFormStyles';

const AppointmentForm = ({closeModal}) => {
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
        dispatch(add_appointment(appointmentInfo))
        .then(() => {
            console.log("form data: ", appointmentInfo);
            // Check with localstorage data
            if("appointments" in localStorage) {
                let localStorageArray = JSON.parse(localStorage.getItem('appointments'));
                localStorageArray.push(appointmentInfo);
                localStorage.setItem('appointments', JSON.stringify(localStorageArray));
            }
            else {
                let newArray = [];
                newArray.push(appointmentInfo);
                localStorage.setItem("appointments", JSON.stringify(newArray));
            }
            // Reset react-hook-form states
            reset();
            // Reset date picker and time picker
            setStartDateTime(new Date());
            setEndDateTime(new Date());
            // Close modal
            closeModal();
        })
        .catch((error) => {
            console.log(`Error getting data: ${error}`);
            // Close modal
            closeModal();
        });
    };

    return (
        <FormWrapper>
            <Header>Create New Appointment</Header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ListContainer>
                    <ListItem>
                        <Label>Title</Label>
                        <Input
                            name="title"
                            type="text"
                            placeholder="Appointment of..."
                            required
                            {...register("title", {
                                required: true,
                                maxLength: 100,
                            })}
                        />
                    </ListItem>
                    <ListItem>
                        <Label>Name</Label>
                        <Input
                            name="name"
                            type="text"
                            placeholder="Patient Name"
                            required
                            {...register("name", {
                                required: true,
                                maxLength: 45,
                            })}
                        />
                    </ListItem>
                    <ListItem>
                        <Label>Age</Label>
                        <Input
                            name="age"
                            type="number"
                            required
                            {...register("age", {
                                required: true,
                                maxLength: 3,
                            })}
                        />
                    </ListItem>
                    <ListItem>
                        <Label>Gender</Label>
                        <genderContainer>
                            <Input
                                type="radio"
                                id="male"
                                name="gender"
                                value="male"
                                required
                                {...register("gender")}
                            />
                            <Label htmlFor="male">Male</Label>
                            <Input
                                type="radio"
                                id="female"
                                name="gender"
                                value="female"
                                {...register("gender")}
                            />
                            <Label htmlFor="female">Female</Label>
                            <Input
                                type="radio"
                                id="other"
                                name="gender"
                                value="other"
                                {...register("gender")}
                            />
                            <Label htmlFor="other">Other</Label>
                        </genderContainer>
                    </ListItem>
                    <ListItem>
                        <Label>Date</Label>
                            <DatePicker
                                onChange={onChangeDate}
                                value={selectedDate}
                                format="y-MM-d"
                            />
                    </ListItem>
                    <ListItem>
                        <Label>Time</Label>
                            <TimeRangePicker
                                onChange={onChangeTime}
                                value={selectedTime}
                            />
                    </ListItem>
                    <ListItem>
                        <AddButton type="submit">Add To Calendar</AddButton>
                    </ListItem>
                </ListContainer>
            </form>
        </FormWrapper>
    );
};

export default AppointmentForm;
