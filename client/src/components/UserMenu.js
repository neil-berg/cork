import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faHandPeace } from '@fortawesome/free-regular-svg-icons';
import { faSlidersH, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import UserContext from '../context/UserContext';

const UserMenu = ({
  showModal,
  setShowModal,
  showUserMenu,
  setShowUserMenu
}) => {
  const [user, setUser] = useContext(UserContext);

  const animationProps = useSpring({
    opacity: showUserMenu ? 1 : 0,
    transform: showUserMenu ? `scale(1)` : `scale(0.6)`
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
      style={animationProps}
      showUserMenu={showUserMenu}
      onClick={() => setShowUserMenu(false)}
    >
      {user.isLoggedIn && (
        <div className="menu">
          <div className="menu__user-details">
            <FontAwesomeIcon icon={faUserCircle} />
            <p>{user.username || 'nberg'}</p>
            <p>{user.email || 'neil@example.com'}</p>
          </div>
          <Link className="menu__link" to="/profile/">
            <FontAwesomeIcon icon={faSlidersH} />
            <span className="menu__button-text">Edit Profile</span>
          </Link>
          <button className="menu__button" onClick={() => signOutUser()}>
            <FontAwesomeIcon icon={faHandPeace} />
            <p className="menu__button-text">Sign Out</p>
          </button>
        </div>
      )}

      {!user.isLoggedIn && (
        <div className="menu">
          <div className="menu__user-details">
            <FontAwesomeIcon
              className="menu__icon-avatar"
              icon={faUserCircle}
            />
          </div>

          <button className="menu__button" onClick={() => setShowModal(true)}>
            <FontAwesomeIcon icon={faSignInAlt} />
            <span className="menu__button-text">Log In</span>
          </button>
        </div>
      )}
    </UserMenuContainer>
  );
};

const UserMenuContainer = styled(animated.nav)`
  position: fixed;
  top: 80px;
  left: 0;
  background: var(--white);
  width: 100%;
  border-radius: 0 0 10px 10px;
  border: 1px var(--lightpurple) solid;
  box-shadow: 0px 10px 20px rgba(76, 54, 138, 0.35);
  pointer-events: ${props => (props.showUserMenu ? 'auto' : 'none')};

  .menu {
  }

  .menu__user-details {
    min-height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--white);
  }

  .menu__icon-avatar {
    width: 50px;
    height: 50px;
  }

  .menu__link,
  .menu__button {
    width: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-top: 1px black solid;
    border-radius: 0px 0px 10px 10px;
    background: var(--white);
    color: black;
    cursor: pointer;
  }

  .menu__button-text {
    padding-left: 1rem;
  }
`;
export default UserMenu;
