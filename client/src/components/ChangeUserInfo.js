import React, { useState, useContext, useRef } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import axios from 'axios';

import UserContext from '../context/UserContext';

const ChangeUserInfo = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [showNameEditButton, setShowNameEditButton] = useState(true);
  const [showUsernameEditButton, setShowUsernameEditButton] = useState(true);
  const [showEmailEditButton, setShowEmailEditButton] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const nameInputEl = useRef();
  const usernameInputEl = useRef();
  const emailInputEl = useRef();

  const [user, setUser] = useContext(UserContext);

  const successSpring = useSpring({
    opacity: successMessage ? 1 : 0,
    transform: successMessage ? `translateY(0)` : `translateY(-20px)`
  });
  const errorSpring = useSpring({
    opacity: errorMessage ? 1 : 0,
    transform: errorMessage ? `translateY(0)` : `translateY(-20px)`
  });

  const updateUserInfo = async (e, property) => {
    e.preventDefault();

    let updatedProperties = {};
    let updatedUser = {};
    if (property === 'name') {
      updatedProperties = { name };
      updatedUser = { ...user, name };
    } else if (property === 'username') {
      updatedProperties = { username };
      updatedUser = { ...user, username };
    } else {
      updatedProperties = { email };
      updatedUser = { ...user, email };
    }

    try {
      const token = localStorage.getItem('cork-token');
      await axios.patch('/api/users/me', updatedProperties, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Update User context object with this new property
      setUser(updatedUser);
      // Send a success message for 4 seconds
      setSuccessMessage(`Successfully updated your ${property}`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 4000);
    } catch (error) {
      // Send an error message for 4 seconds
      setErrorMessage('Error updating profile. Try again.');
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
      console.log(error);
    }
  };

  return (
    <SettingsContainer>
      <animated.p className="success-message" style={successSpring}>
        {successMessage}
      </animated.p>
      <animated.p className="error-message" style={errorSpring}>
        {errorMessage}
      </animated.p>

      <form className="name-form" onSubmit={e => updateUserInfo(e, 'name')}>
        <label htmlFor="name">Name</label>
        <input
          ref={nameInputEl}
          type="text"
          name="name"
          id="name"
          placeholder={user.name}
          value={name}
          pattern="^[a-zA-Z'\s]{3,}"
          title="Must contain only letters, spaces, or apostrophes and be at least 3 characters long."
          onChange={e => setName(e.target.value)}
          onFocus={() => setShowNameEditButton(false)}
        />
        {showNameEditButton ? (
          <button
            className="button-edit"
            onClick={e => {
              e.preventDefault();
              nameInputEl.current.focus();
              setShowNameEditButton(false);
            }}
          >
            Edit
          </button>
        ) : (
          <>
            <button className="button-save" type="submit">
              Save
            </button>
            <button
              className="button-cancel"
              onClick={e => {
                e.preventDefault();
                setShowNameEditButton(true);
                setName('');
              }}
            >
              Cancel
            </button>
          </>
        )}
      </form>
      <form
        className="username-form"
        onSubmit={e => updateUserInfo(e, 'username')}
      >
        <label htmlFor="username">Username</label>
        <input
          ref={usernameInputEl}
          type="text"
          name="username"
          id="username"
          placeholder={user.username}
          value={username}
          pattern="[a-zA-Z0-9]{3,15}"
          title="Must contain only letters and numbers and be 3-15 characters long."
          onChange={e => setUsername(e.target.value)}
          onFocus={() => setShowUsernameEditButton(false)}
        />
        {showUsernameEditButton ? (
          <button
            className="button-edit"
            onClick={e => {
              e.preventDefault();
              usernameInputEl.current.focus();
              setShowUsernameEditButton(false);
            }}
          >
            Edit
          </button>
        ) : (
          <>
            <button className="button-save" type="submit">
              Save
            </button>
            <button
              className="button-cancel"
              onClick={e => {
                e.preventDefault();
                setShowUsernameEditButton(true);
                setUsername('');
              }}
            >
              Cancel
            </button>
          </>
        )}
      </form>
      <form className="email-form" onSubmit={e => updateUserInfo(e, 'email')}>
        <label htmlFor="email">Email</label>
        <input
          ref={emailInputEl}
          type="email"
          name="email"
          id="email"
          placeholder={user.email}
          value={email}
          onChange={e => setEmail(e.target.value)}
          onFocus={() => setShowEmailEditButton(false)}
        />
        {showEmailEditButton ? (
          <button
            className="button-edit"
            onClick={e => {
              e.preventDefault();
              emailInputEl.current.focus();
              setShowEmailEditButton(false);
            }}
          >
            Edit
          </button>
        ) : (
          <>
            <button className="button-save" type="submit">
              Save
            </button>
            <button
              className="button-cancel"
              onClick={e => {
                e.preventDefault();
                setShowEmailEditButton(true);
                setEmail('');
              }}
            >
              Cancel
            </button>
          </>
        )}
      </form>
    </SettingsContainer>
  );
};

const SettingsContainer = styled.div`
  padding-top: 3rem;
  position: relative;

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

  .name-form,
  .username-form,
  .email-form {
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  label {
    font-size: 1.1em;
    font-weight: bold;
    color: var(--black);
  }

  input {
    border-bottom: 1px var(--grey) solid;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    padding: 0.75rem 0 0.5rem 0;
    margin-left: 1rem;
    background: transparent;
    transition: border 0.3s ease;
  }

  input:focus {
    outline: 0;
    border-bottom: 1px var(--purple) solid;
  }

  .button-edit,
  .button-save,
  .button-cancel {
    background: transparent;
    width: 60px;
    position: absolute;
    bottom: 1.5rem;
    font-size: 0.9em;
    font-weight: bold;
    cursor: pointer;
    padding: 0.2rem;
    border-radius: 5px;
    transition: all 0.3s ease;
  }

  .button-edit,
  .button-cancel {
    right: 0;
  }

  .button-save {
    right: 70px;
    background: var(--lightpurple);
    border-radius: 5px;
    z-index: 100;
  }

  .button-edit {
    border: 0;
    color: var(--purple);
  }

  .button-cancel {
    right: 0;
    background: transparent;
    color: var(--black);
    border: 1px transparent solid;
  }

  .button-edit:hover {
    background: var(--lightpurple);
  }

  .button-cancel:hover {
    border: 1px var(--lightpurple) solid;
  }

  @media (hover: hover) {
    .button-save:hover {
      background: var(--verylightgrey);
      border: 1px var(--purple) solid;
      color: var(--purple);
    }
  }
`;

export default ChangeUserInfo;
