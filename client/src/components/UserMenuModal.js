import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { animated, useTransition } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faHandPeace } from '@fortawesome/free-regular-svg-icons';
import { faSlidersH, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import UserContext from '../context/UserContext';

const UserMenuModal = ({
  showAuthModal,
  setShowAuthModal,
  showUserMenuModal,
  setShowUserMenuModal
}) => {
  const [user, setUser] = useContext(UserContext);

  // const animationProps = useSpring({
  //   opacity: showUserMenu ? 1 : 0,
  //   transform: showUserMenu ? `scale(1)` : `scale(0.6)`
  // });

  // const transition = useTransition(showUserMenuModal, null, {
  //   from: { opacity: 0, transform: `scale(0.6)` },
  //   enter: { opacity: 1, transform: `scale(1)` },
  //   leave: { opacity: 0, transform: `scale(0.6)` }
  // });

  const transition = useTransition(showUserMenuModal, null, {
    from: { opacity: 0, transform: `translateX(50px)` },
    enter: { opacity: 1, transform: `translateX(0)` },
    leave: { opacity: 0, transform: `translateX(50px)` }
  });

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserMenuContainer
    // style={animationProps}
    // showUserMenu={showUserMenu}
    // onClick={() => setShowUserMenu(false)}
    >
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
                  item &&
                  user.isLoggedIn && (
                    <animated.nav className="menu" key={key} style={animation}>
                      <Link to="/profile" className="menu__link-details">
                        <FontAwesomeIcon
                          className="menu__icon-avatar"
                          icon={faUserCircle}
                        />
                        <p className="menu__username">{user.username}</p>
                        <p className="menu__email">{user.email}</p>
                      </Link>
                      <Link to="/profile" className="menu__link">
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

              {transition.map(({ item, key, props: animation }) => {
                return (
                  item &&
                  !user.isLoggedIn && (
                    <animated.nav className="menu" key={key} style={animation}>
                      <button
                        className="menu__button"
                        onClick={() => {
                          setShowUserMenuModal(false);
                          setShowAuthModal(true);
                        }}
                      >
                        <FontAwesomeIcon icon={faSignInAlt} />
                        <span className="menu__button-text">Log In</span>
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
    top: 80px;
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

  .menu__icon-avatar {
    width: 50px;
    height: 50px;
    color: var(--grey);
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
export default UserMenuModal;