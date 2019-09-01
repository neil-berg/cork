import React, { useState } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const successSpring = useSpring({
    opacity: successMessage ? 1 : 0,
    transform: successMessage ? `translateY(0)` : `translateY(-20px)`
  });

  const updatePassword = async e => {
    e.preventDefault();

    setErrorMessage(null);
    // Check that new and confirmed passwords are equal
    if (newPassword !== confirmPassword) {
      return setErrorMessage('Error: New passwords do not match.');
    }

    if (currentPassword === newPassword) {
      return setErrorMessage('Error: Must choose a new password.');
    }

    try {
      const token = localStorage.getItem('cork-token');
      await axios.patch(
        '/api/users/me',
        {
          currentPassword,
          password: newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setSuccessMessage('Successfully updated your password.');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 4000);
    } catch (error) {
      setErrorMessage('Error updating password. Try again.');
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
      console.log(error);
    }
  };

  return (
    <PasswordContainer>
      <animated.p className="success-message" style={successSpring}>
        {successMessage}
      </animated.p>
      <form onSubmit={e => updatePassword(e)}>
        <label htmlFor="currentPassword">Current Password</label>
        <input
          type={showCurrentPassword ? 'text' : 'password'}
          name="currentPassword"
          id="currentPassword"
          placeholder="Enter your current password"
          required
          autoComplete="off"
          value={currentPassword}
          onChange={e => setCurrentPassword(e.target.value)}
        />
        {showCurrentPassword ? (
          <FontAwesomeIcon
            className="current-password-icon"
            icon={faEye}
            onClick={() => {
              setShowCurrentPassword(false);
            }}
          />
        ) : (
          <FontAwesomeIcon
            className="current-password-icon"
            icon={faEyeSlash}
            onClick={() => setShowCurrentPassword(true)}
          />
        )}
        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          name="newPassword"
          id="newPassword"
          placeholder="Enter a new password"
          type={showNewPassword ? 'text' : 'password'}
          pattern="(?=.*\d)(?=.*[~`!@#$%^*()+=_-{}\|:;”’?/<>,.]).{8,}"
          title="Must be at least 8 characters long and contain at least one number and one special characer (~`!@#$%^*()+=_-{}[]\|:;”’?/<>,.)"
          autoComplete="off"
          required
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
        />
        {showNewPassword ? (
          <FontAwesomeIcon
            className="new-password-icon"
            icon={faEye}
            onClick={() => {
              setShowNewPassword(false);
            }}
          />
        ) : (
          <FontAwesomeIcon
            className="new-password-icon"
            icon={faEyeSlash}
            onClick={() => setShowNewPassword(true)}
          />
        )}
        <label htmlFor="confirmPassword">Confirm New Password</label>
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm your new password"
          required
          autoComplete="off"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        {showConfirmPassword ? (
          <FontAwesomeIcon
            className="confirm-password-icon"
            icon={faEye}
            onClick={() => {
              setShowConfirmPassword(false);
            }}
          />
        ) : (
          <FontAwesomeIcon
            className="confirm-password-icon"
            icon={faEyeSlash}
            onClick={() => setShowConfirmPassword(true)}
          />
        )}
        <p className="error-message">{errorMessage}</p>
        <button type="submit">Update Password</button>
      </form>
    </PasswordContainer>
  );
};

const PasswordContainer = styled.div`
  position: relative;

  .success-message {
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
    color: var(--red);
    font-weight: bold;
  }

  form {
    position: relative;
    padding: 3rem 0 1rem 0;
    display: flex;
    flex-direction: column;
  }

  label {
    padding-top: 1rem;
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
    margin-bottom: 1rem;
    background: transparent;
    transition: border 0.3s ease;
  }

  input:focus {
    outline: 0;
    border-bottom: 1px var(--purple) solid;
  }

  .current-password-icon {
    position: absolute;
    right: 0.5rem;
    top: 6rem;
    color: var(--purple);
  }

  .new-password-icon {
    position: absolute;
    right: 0.5rem;
    top: 11.75rem;
    color: var(--purple);
  }

  .confirm-password-icon {
    position: absolute;
    right: 0.5rem;
    top: 17.5rem;
    color: var(--purple);
  }

  button {
    background: var(--lightpurple);
    width: 200px;
    font-weight: bold;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    transition: all 0.3s ease;
    margin: 2rem auto 0 auto;
  }
`;

export default ChangePassword;
