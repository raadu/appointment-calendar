import styled from "styled-components";
import {Button} from "./CalendarStyles";

export const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const Header = styled.h3`
    margin: 0 auto;
`;

export const ListItem = styled.li`
    display: flex;
    flex-direction: column;
    padding: 0.3rem;
`;

export const ListContainer = styled.ul`
    padding: 0;
    list-style-type: none;
    width: 100%;
`;

export const AddButton = styled(Button)`
    background-color: #28b463;
`;

export const Input = styled.input`
    padding: 0.3rem;
    border: 0.1rem #c0c0c0 solid;
`;

export const Label = styled.label`
    padding-bottom: 0.2rem;
`;

export const genderContainer = styled.div`
    display: flex;
    flex-direction: row;
`;
