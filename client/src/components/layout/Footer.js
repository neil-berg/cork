import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faPlusCircle,
  faWineGlassAlt
} from '@fortawesome/free-solid-svg-icons';

import UserContext from '../../context/UserContext';
import Portal from '../../components/portal/Portal';
import AuthModal from '../../components/modal/AuthModal';

const Footer = () => {
  const location = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useContext(UserContext);

  return (
    <>
      <FooterContainer>
        <nav className="footer-menu">
          <Link to="/" className="link">
            <FontAwesomeIcon
              className={`link__icon${
                location.pathname === '/' ? ' active' : ''
              }`}
              icon={faHome}
            />
            <span
              className={`link__text${
                location.pathname === '/' ? ' active' : ''
              }`}
            >
              Home
            </span>
          </Link>

          <Link
            to={user.isLoggedIn ? '/wines/add' : '/'}
            className="link"
            onClick={() => (user.isLoggedIn ? null : setShowAuthModal(true))}
          >
            <FontAwesomeIcon
              className={`link__icon${
                location.pathname === '/wines/add' ? ' active' : ''
              }`}
              icon={faPlusCircle}
            />
            <span
              className={`link__text${
                location.pathname === '/wines/add' ? ' active' : ''
              }`}
            >
              Add Wine
            </span>
          </Link>

          <Link
            to={user.isLoggedIn ? '/wines/view' : '/'}
            className="link"
            onClick={() => (user.isLoggedIn ? null : setShowAuthModal(true))}
          >
            <FontAwesomeIcon
              className={`link__icon${
                location.pathname === '/wines/view' ? ' active' : ''
              }`}
              icon={faWineGlassAlt}
            />
            <span
              className={`link__text${
                location.pathname === '/wines/view' ? ' active' : ''
              }`}
            >
              My Wines
            </span>
          </Link>
        </nav>
      </FooterContainer>
      <Portal>
        <AuthModal
          showAuthModal={showAuthModal}
          setShowAuthModal={setShowAuthModal}
        />
      </Portal>
    </>
  );
};

const FooterContainer = styled.footer`
  .footer-menu {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 70px;
    width: 100vw;
    background: var(--verylightgrey);
    border-top: 1px solid var(--lightgrey);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
  }

  .link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .link__icon {
    width: 25px;
    height: 25px;
    color: var(--grey);
  }
  
  .link__icon.active {
    width: 25px;
    height: 25px;
    color: var(--purple);
  }
  
  .link__text {
    padding-top: 0.35rem
    font-size: 0.9em;
    font-weight: bold;
    color: var(--grey);
  }

  .link__text.active {
    padding-top: 0.35rem
    font-size: 0.9em;
    color: var(--purple);
    opacity: 1;
    font-weight: bold;
  }

  @media screen and (min-width: 600px) {
    .link {
      flex-grow: 1;
    }
  }
`;

export default Footer;
