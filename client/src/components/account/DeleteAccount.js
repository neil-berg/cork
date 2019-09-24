import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import UserContext from '../../context/UserContext';

const DeleteAccount = ({ history }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useContext(UserContext);

  const deleteUser = async () => {
    try {
      const token = localStorage.getItem('cork-token');
      await axios.delete('/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Remove user in context
      setUser({
        _id: null,
        name: null,
        username: null,
        email: null,
        isLoggedIn: false
      });

      // Send user to the home page
      history.push('/');
    } catch (error) {
      setErrorMessage('Error deleting account. Try again.');
      console.log(error);
    }
  };

  return (
    <DeleteContainer>
      <p className="warning-message">
        <span className="bold">Warning: </span>This action cannot be undone!
      </p>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button onClick={() => deleteUser()}>Delete Account</button>
    </DeleteContainer>
  );
};

const DeleteContainer = styled.div`
  padding: 2rem 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .error-message {
    color: var(--red);
    font-weight: bold;
    padding-top: 1rem;
    align-self: flex-start;
  }

  .warning-message {
    align-self: flex-start;
  }

  .bold {
    font-weight: bold;
    color: var(--red);
  }

  button {
    background: var(--red);
    color: var(--white);
    padding: 0.5rem 2rem;
    margin-top: 2rem;
    min-width: 175px;
    border: 1px var(--red) solid;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  @media (hover: hover) {
    button:hover {
      background: var(--verylightgrey);
      color: red;
    }
  }
`;

export default withRouter(DeleteAccount);
