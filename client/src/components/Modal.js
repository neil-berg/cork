import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { animated, useTransition } from 'react-spring';
import axios from 'axios';

import UserContext from '../context/UserContext';

const Modal = ({ showModal, setShowModal }) => {
  // Local UI state and form values
  const [showLogin, setShowLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        email,
        password
      });

      // Store JWT and time of token creation in localstorage
      // for further auth calls and then close modal
      localStorage.setItem('cork-JWT', res.data.token);
      setShowModal(false);

      // Store the created user in app-level context
      setUser({ name, loggedIn: true });

      // TODO: Reset the form
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async e => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('cork-JWT');
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
      localStorage.removeItem('cork-JWT');
      localStorage.setItem('cork-JWT', res.data.token);
      setShowModal(false);
      console.log(res.data);
      // Store the created user in app-level context
      // setUser({ res.data.user.name, loggedIn: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container name={name} email={email} password={password}>
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
                            <p>Log in to your account</p>
                            <form>
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
                                  type="password"
                                  pattern="(?=.*\d)(?=.*[~`!@#$%^*()+=_-{}\|:;”’?/<>,.]).{8,}"
                                  title="Must be at least 8 characters long and contain at least one number and one special characer (~`!@#$%^*()+=_-{}[]\|:;”’?/<>,.)"
                                  autoComplete="off"
                                  required
                                  value={password}
                                  onChange={e => setPassword(e.target.value)}
                                />
                                <span className="placeholder">Password</span>
                              </label>
                              <button
                                type="submit"
                                onClick={e => {
                                  loginUser(e);
                                }}
                              >
                                Log in
                              </button>
                            </form>
                            <p>Don't have an account?</p>
                            <button onClick={() => setShowLogin(false)}>
                              Register
                            </button>
                          </div>
                        )}
                        {!showLogin && (
                          <div className="register-container">
                            <p>Register for an account</p>
                            <form>
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
                                  type="password"
                                  pattern="(?=.*\d)(?=.*[~`!@#$%^*()+=_-{}\|:;”’?/<>,.]).{8,}"
                                  title="Must be at least 8 characters long and contain at least one number and one special characer (~`!@#$%^*()+=_-{}[]\|:;”’?/<>,.)"
                                  autoComplete="off"
                                  required
                                  value={password}
                                  onChange={e => setPassword(e.target.value)}
                                />
                                <span className="placeholder">Password</span>
                              </label>
                              <button
                                type="submit"
                                onClick={e => createUser(e)}
                              >
                                Sign Up
                              </button>
                            </form>
                            <p>Have an account?</p>
                            <button onClick={() => setShowLogin(true)}>
                              Log In
                            </button>
                          </div>
                        )}
                      </div>
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
  & .backdrop {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.75);
    overflow: hidden;
  }
  & .card {
    position: relative;
    border-radius: 10px;
    padding: 15px;
    min-width: 320px;
    background-color: white;
  }

  .card__info,
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    border-bottom: 2px grey solid;
  }

  input:focus {
    outline: 0;
  }

  .placeholder {
    transition: all ease 0.3s;
  }

  input + .placeholder {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(50%);
  }

  input:focus + .placeholder {
    transform: translateY(-50%);
    font-size: 0.8em;
  }

  .name-input:not(focus) + .placeholder {
    transform: ${props => (props.name.length > 0 ? `translateY(-50%)` : '')};
    font-size: ${props => (props.name.length > 0 ? '0.8em' : '')};
  }

  .email-input:not(focus) + .placeholder {
    transform: ${props => (props.email.length > 0 ? `translateY(-50%)` : '')};
    font-size: ${props => (props.email.length > 0 ? '0.8em' : '')};
  }

  .password-input:not(focus) + .placeholder {
    transform: ${props =>
      props.password.length > 0 ? `translateY(-50%)` : ''};
    font-size: ${props => (props.password.length > 0 ? '0.8em' : '')};
  }

  input:valid {
    border-bottom: 2px solid green;
  }
`;

export default Modal;
