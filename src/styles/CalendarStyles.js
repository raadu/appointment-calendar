import styled from 'styled-components';

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
  padding-right: 2rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  padding: 0.7rem;
  border: 0.1rem #FFFFFF solid;
  border-radius: 20px;
  color: #FFFFFF;
  cursor: pointer;
  background-color: #02c8cc;

  &:hover {
    border: 0.1rem #17202a solid;
    color: #17202a;
  }
`;

export const CloseButton = styled(Button)`
  padding: 0.2rem 0.4rem 0.2rem 0.4rem;
  position: absolute;
  right: 1%;
  top: 1%;
`;
