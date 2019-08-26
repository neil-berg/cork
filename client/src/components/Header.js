import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';

import UserContext from '../context/UserContext';
import Portal from './Portal';
import UserMenuModal from './UserMenuModal';
import AuthModal from './AuthModal';

const Header = () => {
  // To determine whether or not a user is logged in or not
  const [user, setUser] = useContext(UserContext);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenuModal, setShowUserMenuModal] = useState(false);

  return (
    <>
      <HeaderContainer>
        <Link to="/">
          <h1>Cork</h1>
        </Link>

        <FontAwesomeIcon
          className="header__icon"
          icon={faUserCircle}
          onClick={() => {
            user.isLoggedIn
              ? setShowUserMenuModal(!showUserMenuModal)
              : setShowAuthModal(!showAuthModal);
          }}
        />
      </HeaderContainer>
      <Portal>
        <UserMenuModal
          showAuthModal={showAuthModal}
          setShowAuthModal={setShowAuthModal}
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
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, var(--purple), var(--maroon));
  padding: 0 1rem;

  h1 {
    color: var(--white);
    font-family: 'Satisfy', cursive;
  }

  .header__icon {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--white);
    cursor: pointer;
  }
`;
export default Header;
