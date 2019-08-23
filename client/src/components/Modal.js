import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { animated, useTransition } from 'react-spring';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

import UserContext from '../context/UserContext';

const Modal = ({ showModal, setShowModal }) => {
  // Local UI state and form values
  const [showLogin, setShowLogin] = useState(true);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Context to store authenticated user inforamtion
  const [user, setUser] = useContext(UserContext);

  // Animation transitions for backdrop, modal card, and form card
  const backdropTransition = useTransition(showModal, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  const cardTransition = useTransition(showModal, null, {
    from: { opacity: 0, transform: `translateY(-100px)` },
    enter: { opacity: 1, transform: `translateY(0)` },
    leave: { opacity: 0, transform: `translateY(-100px)` }
  });

  const createUser = async e => {
    e.preventDefault();
    // Create a new user
    try {
      const res = await axios.post('/api/users', {
        name,
        username,
        email,
        password
      });

      // Store JWT in localstorage for further auth calls and then close modal
      localStorage.setItem('cork-token', res.data.token);
      setShowModal(false);
      setShowLogin(true);

      // Store the created user in app-level context
      setUser({ username, loggedIn: true });

      // Reset the form
      setName('');
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (error) {
      setErrorMessage('This email or username has already been taken!');
      // Clear the error message after 5 seconds
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  const loginUser = async e => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('cork-token');
      const res = await axios.post(
        '/api/users/login',
        {
          email,
          password
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Update JWT and time of token creation in local storage
      localStorage.removeItem('cork-token');
      localStorage.setItem('cork-token', res.data.token);
      setShowModal(false);

      const username = res.data.user.username;
      // Store the created user in app-level context
      setUser({ username, loggedIn: true });

      // Clear the form
      setEmail('');
      setPassword('');
    } catch (error) {
      setErrorMessage('Invalid email or password.');
      // Clear the error message after 5 seconds
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <Container
      name={name}
      username={username}
      email={email}
      password={password}
      errorMessage={errorMessage}
    >
      {backdropTransition.map(({ item, key, props: animation }) => {
        return (
          item && (
            <animated.div
              className="backdrop"
              key={key}
              style={animation}
              aria-modal="true"
              role="dialog"
              onClick={e => {
                if (e.target.classList.contains('backdrop')) {
                  setShowModal(false);
                }
              }}
            >
              {cardTransition.map(({ item, key, props: animation }) => {
                return (
                  item && (
                    <animated.div className="card" key={key} style={animation}>
                      <div className="card__info">
                        {showLogin && (
                          <div className="login-container">
                            <p className="header-text">
                              Log in to your account
                            </p>
                            <form
                              onSubmit={e => {
                                loginUser(e);
                              }}
                            >
                              <label>
                                <input
                                  className="email-input"
                                  type="email"
                                  autoComplete="on"
                                  value={email}
                                  required
                                  onChange={e => setEmail(e.target.value)}
                                />
                                <span className="placeholder">Email</span>
                              </label>
                              <label>
                                <input
                                  className="password-input"
                                  type={showPassword ? 'text' : 'password'}
                                  pattern="(?=.*\d)(?=.*[~`!@#$%^*()+=_-{}\|:;”’?/<>,.]).{8,}"
                                  title="Must be at least 8 characters long and contain at least one number and one special characer (~`!@#$%^*()+=_-{}[]\|:;”’?/<>,.)"
                                  autoComplete="off"
                                  required
                                  value={password}
                                  onChange={e => setPassword(e.target.value)}
                                />
                                <span className="placeholder">Password</span>
                                {showPassword ? (
                                  <FontAwesomeIcon
                                    className="password-icon"
                                    icon={faEye}
                                    onClick={() => {
                                      setShowPassword(false);
                                    }}
                                  />
                                ) : (
                                  <FontAwesomeIcon
                                    className="password-icon"
                                    icon={faEyeSlash}
                                    onClick={() => setShowPassword(true)}
                                  />
                                )}
                              </label>
                              {errorMessage && (
                                <p className="error-message">{errorMessage}</p>
                              )}
                              <button className="submit-button" type="submit">
                                Log in
                              </button>
                            </form>
                            <div className="lower-container">
                              <p>Don't have an account?</p>
                              <button
                                className="link-button"
                                onClick={() => setShowLogin(false)}
                              >
                                Register
                              </button>
                            </div>
                          </div>
                        )}
                        {!showLogin && (
                          <div className="register-container">
                            <p className="header-text">
                              Register for an account
                            </p>
                            <form onSubmit={e => createUser(e)}>
                              <label>
                                <input
                                  className="name-input"
                                  type="text"
                                  autoComplete="on"
                                  required
                                  pattern="^[a-zA-Z'\s]{3,}"
                                  title="Must contain only letters, spaces, or apostrophes and be at least 3 characters long."
                                  value={name}
                                  onChange={e => setName(e.target.value)}
                                />
                                <span className="placeholder">Name</span>
                              </label>
                              <label>
                                <input
                                  className="username-input"
                                  type="text"
                                  autoComplete="on"
                                  required
                                  pattern="[a-zA-Z0-9]{3,15}"
                                  title="Must contain only letters and numbers and be 3-15 characters long."
                                  value={username}
                                  onChange={e => setUsername(e.target.value)}
                                />
                                <span className="placeholder">Username</span>
                              </label>
                              <label>
                                <input
                                  className="email-input"
                                  type="email"
                                  autoComplete="on"
                                  value={email}
                                  required
                                  onChange={e => setEmail(e.target.value)}
                                />
                                <span className="placeholder">Email</span>
                              </label>
                              <label>
                                <input
                                  className="password-input"
                                  type={showPassword ? 'text' : 'password'}
                                  pattern="(?=.*\d)(?=.*[~`!@#$%^*()+=_-{}\|:;”’?/<>,.]).{8,}"
                                  title="Must be at least 8 characters long and contain at least one number and one special characer (~`!@#$%^*()+=_-{}[]\|:;”’?/<>,.)"
                                  autoComplete="off"
                                  required
                                  value={password}
                                  onChange={e => setPassword(e.target.value)}
                                />
                                <span className="placeholder">Password</span>
                                {showPassword ? (
                                  <FontAwesomeIcon
                                    className="password-icon"
                                    icon={faEye}
                                    onClick={() => {
                                      setShowPassword(false);
                                    }}
                                  />
                                ) : (
                                  <FontAwesomeIcon
                                    className="password-icon"
                                    icon={faEyeSlash}
                                    onClick={() => setShowPassword(true)}
                                  />
                                )}
                              </label>
                              {errorMessage && (
                                <p className="error-message">{errorMessage}</p>
                              )}
                              <button className="submit-button" type="submit">
                                Sign Up
                              </button>
                            </form>
                            <div className="lower-container">
                              <p>Have an account?</p>
                              <button
                                className="link-button"
                                onClick={() => setShowLogin(true)}
                              >
                                Log in
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                      <button
                        className="close-button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                    </animated.div>
                  )
                );
              })}
            </animated.div>
          )
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  .backdrop {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(248, 247, 250, 0.75);
    overflow: hidden;
  }
  .card {
    position: relative;
    border-radius: 20px;
    border: 1px var(--lightpurple) solid;
    box-shadow: 0px 10px 20px rgba(76, 54, 138, 0.35);
    padding: 1.2rem;
    width: 320px;
    height: ${props => (props.errorMessage ? '461px' : '425px')};
    background: var(--white);
    transition: height ease 0.2s;
  }

  .card__info,
  .login-container,
  .register-container,
  form,
  .lower-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .lower-container {
    margin-top: 1.25rem;
    color: var(--purple);
  }

  .header-text {
    font-size: 1.2em;
    padding-bottom: 1em;
    color: var(--purple);
  }

  label {
    position: relative;
  }

  input {
    padding: 0.5rem 0.5rem 0.5rem 0;
    margin-bottom: 1rem;
    width: 250px;
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 2px var(--purple) solid;
    background: var(--white);
    color: var(--purple);
  }

  input:focus {
    outline: 0;
  }

  .placeholder {
    color: var(--maroon);
    transition: all ease 0.3s;
  }

  input + .placeholder {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(60%);
  }

  input:focus + .placeholder {
    transform: translateY(-60%);
    font-size: 0.8em;
  }

  .name-input:not(focus) + .placeholder {
    transform: ${props => (props.name.length > 0 ? `translateY(-60%)` : '')};
    font-size: ${props => (props.name.length > 0 ? '0.8em' : '')};
  }

  .username-input:not(focus) + .placeholder {
    transform: ${props =>
      props.username.length > 0 ? `translateY(-60%)` : ''};
    font-size: ${props => (props.username.length > 0 ? '0.8em' : '')};
  }

  .email-input:not(focus) + .placeholder {
    transform: ${props => (props.email.length > 0 ? `translateY(-60%)` : '')};
    font-size: ${props => (props.email.length > 0 ? '0.8em' : '')};
  }

  .password-input:not(focus) + .placeholder {
    transform: ${props =>
      props.password.length > 0 ? `translateY(-60%)` : ''};
    font-size: ${props => (props.password.length > 0 ? '0.8em' : '')};
  }

  // input:valid {
  //   border-bottom: 2px solid var(--green);
  // }

  .password-icon {
    position: absolute;
    right: 0;
    top: 10px;
    color: var(--purple);
  }

  .submit-button {
    margin-top: 1rem;
    padding: 1rem 4rem;
    border-radius: 30px;
    background: linear-gradient(135deg, var(--purple), var(--maroon));
    color: white;
    font-size: 1.2em;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0px 10px 10px rgba(138, 54, 92, 0.15);
    transition: all ease 0.2s;
  }

  .link-button {
    background: transparent;
    border: none;
    color: var(--blue);
    font-weight: bold;
    margin-top: 0.4rem;
    cursor: pointer;
  }

  .close-button {
    position: absolute;
    top: -30px;
    right: 0;
    background: transparent;
    border: none;
    text-transform: uppercase;
    color: var(--purple);
    cursor: pointer;
  }

  .error-message {
    color: var(--red);
    width: 250px;
    font-weight: bold;
  }
`;

export default Modal;
