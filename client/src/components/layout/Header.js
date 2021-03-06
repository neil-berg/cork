import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';

import UserContext from '../../context/UserContext';
import Portal from '../portal/Portal';
import UserMenuModal from '../modal/UserMenuModal';
import AuthModal from '../modal/AuthModal';

const Header = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenuModal, setShowUserMenuModal] = useState(false);
  const [avatarExists, setAvatarExists] = useState(false);

  const [user, setUser] = useContext(UserContext);

  // Display avatar if user avatar exists
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

  return (
    <>
      <HeaderContainer>
        <div className="link-wrapper">
          <Link to="/">
            <h1>Cork</h1>
          </Link>

          {avatarExists ? (
            <img
              className="avatar-image"
              src={`${process.env.REACT_APP_API_URL}/api/users/${user._id}/avatar`}
              alt="user avatar"
              onClick={() => {
                user.isLoggedIn
                  ? setShowUserMenuModal(!showUserMenuModal)
                  : setShowAuthModal(!showAuthModal);
              }}
            />
          ) : (
            <FontAwesomeIcon
              className="header__icon"
              icon={faUserCircle}
              onClick={() => {
                user.isLoggedIn
                  ? setShowUserMenuModal(!showUserMenuModal)
                  : setShowAuthModal(!showAuthModal);
              }}
            />
          )}
        </div>
      </HeaderContainer>
      <Portal>
        <UserMenuModal
          showUserMenuModal={showUserMenuModal}
          setShowUserMenuModal={setShowUserMenuModal}
        />
        <AuthModal
          showAuthModal={showAuthModal}
          setShowAuthModal={setShowAuthModal}
        />
      </Portal>
    </>
  );
};

const HeaderContainer = styled.header`
  position: relative;
  height: 60px;
  background: linear-gradient(135deg, var(--purple), var(--maroon));

  .link-wrapper {
    height: 60px;
    padding: 0 1rem;
    max-width: 1080px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  h1 {
    color: var(--white);
    font-family: 'Satisfy', cursive;
  }

  .header__icon {
    width: 25px;
    height: 25px;
    color: var(--white);
    cursor: pointer;
  }

  .avatar-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px var(--lightpurple) solid;
    cursor: pointer;
  }
`;
export default Header;
