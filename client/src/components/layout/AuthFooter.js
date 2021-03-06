import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faPlusCircle,
  faWineGlassAlt
} from '@fortawesome/free-solid-svg-icons';

const AuthFooter = () => {
  const location = useLocation();

  return (
    <>
      <AuthFooterContainer>
        <nav className="footer-menu">
          <Link to="/wines/all/1" className="link">
            <FontAwesomeIcon
              className={`link__icon${
                location.pathname.startsWith('/wines/all') ? ' active' : ''
              }`}
              icon={faHome}
            />
            <span
              className={`link__text${
                location.pathname.startsWith('/wines/all') ? ' active' : ''
              }`}
            >
              Home
            </span>
          </Link>

          <Link to="/wines/add" className="link">
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

          <Link to="/wines/mine/1" className="link">
            <FontAwesomeIcon
              className={`link__icon${
                location.pathname === '/wines/mine/1' ? ' active' : ''
              }`}
              icon={faWineGlassAlt}
            />
            <span
              className={`link__text${
                location.pathname === '/wines/mine/1' ? ' active' : ''
              }`}
            >
              My Wines
            </span>
          </Link>
        </nav>
      </AuthFooterContainer>
    </>
  );
};

const AuthFooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  height: 70px;
  width: 100vw;
  background: var(--verylightgrey);
  border-top: 1px solid var(--lightgrey);
  z-index: 3;

  .footer-menu {
    height: 70px;
    max-width: 1080px;
    margin: 0 auto;
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
`;

export default AuthFooter;
