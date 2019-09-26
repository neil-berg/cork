import React, { useState, useContext, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { animated, useTransition } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faHandPeace } from '@fortawesome/free-regular-svg-icons';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import UserContext from '../../context/UserContext';

const UserMenuModal = ({
  showUserMenuModal,
  setShowUserMenuModal,
  history
}) => {
  const [avatarExists, setAvatarExists] = useState(false);
  const [user, setUser] = useContext(UserContext);

  const transition = useTransition(showUserMenuModal, null, {
    from: { opacity: 0, transform: `translateX(50px)` },
    enter: { opacity: 1, transform: `translateX(0)` },
    leave: { opacity: 0, transform: `translateX(50px)` }
  });

  // Display avatar is user avatar exists
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('cork-token');
        const res = await axios.get(`/api/users/${user._id}/avatar`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.status === 200) {
          setAvatarExists(true);
        }
      } catch (error) {
        setAvatarExists(false);
      }
    };
    fetchUserDetails();
  }, [user._id]);

  const signOutUser = async () => {
    try {
      const token = localStorage.getItem('cork-token');
      await axios.post('/api/users/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Remove current token in local storage and clear user context
      localStorage.removeItem('cork-token');
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
      console.log(error);
    }
  };

  return (
    <UserMenuContainer>
      {transition.map(({ item, key, props: animation }) => {
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
                  setShowUserMenuModal(false);
                }
              }}
            >
              {transition.map(({ item, key, props: animation }) => {
                return (
                  item && (
                    <animated.nav className="menu" key={key} style={animation}>
                      <Link to="/account" className="menu__link-details">
                        {avatarExists ? (
                          <img
                            className="menu__avatar-image"
                            src={`${process.env.REACT_APP_API_URL}/api/users/${user._id}/avatar`}
                            alt="user avatar"
                          />
                        ) : (
                          <FontAwesomeIcon
                            className="menu__icon-avatar"
                            icon={faUserCircle}
                          />
                        )}
                        <p className="menu__username">{user.username}</p>
                        <p className="menu__email">{user.email}</p>
                      </Link>
                      <Link
                        to="/account"
                        className="menu__link"
                        onClick={() => setShowUserMenuModal(false)}
                      >
                        <FontAwesomeIcon
                          className="menu__icon-settings"
                          icon={faSlidersH}
                        />
                        <span className="menu__link-text">Edit Profile</span>
                      </Link>
                      <button
                        className="menu__button"
                        onClick={() => {
                          signOutUser();
                          setShowUserMenuModal(false);
                        }}
                      >
                        <FontAwesomeIcon
                          className="menu__icon-logout"
                          icon={faHandPeace}
                        />
                        <p className="menu__button-text">Sign Out</p>
                      </button>
                    </animated.nav>
                  )
                );
              })}
            </animated.div>
          )
        );
      })}
    </UserMenuContainer>
  );
};

const UserMenuContainer = styled.div`
  .backdrop {
    position: fixed;
    top: 60px;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: transparent;
    overflow: hidden;
  }

  .menu {
    position: fixed;
    top: 0;
    right: 0;
    background: var(--white);
    width: 100%;
    border-radius: 0 0 10px 10px;
    border: 1px var(--lightpurple) solid;
    box-shadow: 0px 10px 20px rgba(76, 54, 138, 0.35);
  }

  .menu__link-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--white);
    padding: 1rem;
    transition: all 0.3s ease;
  }

  .menu__icon-avatar,
  .menu__avatar-image {
    width: 50px;
    height: 50px;
    color: var(--grey);
  }

  .menu__avatar-image {
    border-radius: 50%;
  }

  .menu__icon-settings,
  .menu__icon-logout {
    color: var(--purple);
  }

  .menu__username {
    padding: 0.75rem 0;
    color: var(--black);
  }

  .menu__email {
    color: var(--grey);
  }

  .menu__link,
  .menu__button {
    width: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-top: 1px var(--lightgrey) solid;
    background: var(--white);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .menu__button {
    border-radius: 0px 0px 10px 10px;
    border-left: 0;
    border-right: 0;
    border-bottom: 0;
  }

  .menu__link-text,
  .menu__button-text {
    padding-left: 1rem;
    color: var(--purple);
  }

  @media screen and (min-width: 600px) {
    .menu {
      width: 250px;
    }
  }

  @media (hover: hover) {
    .menu__link-details:hover,
    .menu__link:hover,
    .menu__button:hover {
      background: var(--verylightgrey);
    }
  }
`;
export default withRouter(UserMenuModal);
