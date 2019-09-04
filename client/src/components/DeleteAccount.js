import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import axios from 'axios';

import UserContext from '../context/UserContext';

const DeleteAccount = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [user, setUser] = useContext(UserContext);

  const successSpring = useSpring({
    opacity: successMessage ? 1 : 0,
    transform: successMessage ? `translateY(0)` : `translateY(-20px)`
  });
  const errorSpring = useSpring({
    opacity: errorMessage ? 1 : 0,
    transform: errorMessage ? `translateY(0)` : `translateY(-20px)`
  });

  const deleteUser = async () => {
    try {
      const token = localStorage.getItem('cork-token');
      await axios.delete('/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSuccessMessage('Successfully deleted account');
      setUser({
        _id: null,
        name: null,
        username: null,
        email: null,
        loggedIn: false
      });
    } catch (error) {
      setErrorMessage('Error deleting account. Try again.');
      console.log(error);
    }
  };

  return (
    <DeleteContainer>
      <animated.p className="success-message" style={successSpring}>
        {successMessage}
      </animated.p>
      <animated.p className="error-message" style={errorSpring}>
        {errorMessage}
      </animated.p>
      <p classname="warning-message">
        <span className="bold">Warning: </span>This account cannot be undone!
      </p>
      <button onClick={() => deleteUser()}>Delete Account</button>
    </DeleteContainer>
  );
};

const DeleteContainer = styled.div`
  padding: 3rem 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .success-message,
  .error-message {
    background: var(--green);
    color: var(--white);
    font-weight: bold;
    padding: 0.5rem;
    text-align: center;
    border-radius: 5px;
    position: absolute;
    top: 1rem;
    left: 0;
    width: 100%;
  }

  .error-message {
    background: var(--red);
  }

  .bold {
    font-weight: bold;
  }

  button {
    background: var(--lightpurple);
    padding: 0.5rem 2rem;
    margin-top: 2rem;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export default DeleteAccount;
