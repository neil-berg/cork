import React, { useState, useContext, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import UserContext from '../context/UserContext';

const ChangeUserInfo = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  const nameInputEl = useRef();
  const usernameInputEl = useRef();
  const emailInputEl = useRef();

  const [user, setUser] = useContext(UserContext);

  return (
    <SettingsContainer>
      <form className="name-form">
        <label htmlFor="name">Name</label>
        <input
          ref={nameInputEl}
          type="text"
          name="name"
          id="name"
          placeholder={user.name}
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button
          className="button-edit"
          onClick={e => {
            e.preventDefault();
            nameInputEl.current.focus();
          }}
        >
          Edit
        </button>
        <button className="button-save">Save</button>
        <button
          className="button-cancel"
          onClick={() => nameInputEl.current.unfocus()}
        >
          Cancel
        </button>
      </form>
      <form className="username-form">
        <label htmlFor="username">Username</label>
        <input
          ref={usernameInputEl}
          type="text"
          name="username"
          id="username"
          placeholder={user.username}
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button
          className="button-edit"
          onClick={e => {
            e.preventDefault();
            usernameInputEl.current.focus();
          }}
        >
          Edit
        </button>
        <button className="button-save">Save</button>
        <button className="button-cancel">Cancel</button>
      </form>
      <form className="email-form">
        <label htmlFor="email">Email Address</label>
        <input
          ref={emailInputEl}
          className="email-input"
          type="email"
          name="email"
          placeholder={user.email}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button
          className="button-edit"
          onClick={e => {
            e.preventDefault();
            emailInputEl.current.focus();
          }}
        >
          Edit
        </button>
        <button className="button-save">Save</button>
        <button className="button-cancel">Cancel</button>
      </form>
    </SettingsContainer>
  );
};

const SettingsContainer = styled.div`
  padding-top: 2rem;

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
    color: ;
  }

  input {
    border-bottom: 1px var(--grey) solid;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    padding: 0.75rem 0 0.5rem 0;
    margin-left: 1rem;
    background: transparent;
    transition: all 0.3s ease;
  }

  .button-save,
  .button-cancel {
    display: none;
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
  }

  .button-edit {
    border: 0;
    color: var(--purple);
  }

  .button-edit:hover {
    background: var(--lightpurple);
  }

  .button-save {
    background: var(--lightpurple);
    border-radius: 5px;
  }

  .button-cancel {
    right: 0;
    background: transparent;
    color: var(--black);
    border: 1px transparent solid;
  }

  .button-cancel:hover {
    border: 1px var(--lightpurple) solid;
  }

  input:focus {
    outline: 0;
    border-bottom: 1px var(--purple) solid;
  }

  input:focus ~ .button-edit {
    display: none;
  }

  input:focus ~ .button-save {
    display: inline;
  }

  input:focus ~ .button-cancel {
    display: inline;
  }
`;

export default ChangeUserInfo;
