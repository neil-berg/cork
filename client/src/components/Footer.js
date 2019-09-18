import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faPlusCircle,
  faWineGlassAlt
} from '@fortawesome/free-solid-svg-icons';

const Footer = ({ match: { path } }) => {
  return (
    <FooterContainer>
      <nav className="footer-menu">
        <Link to="/" className="link">
          <FontAwesomeIcon
            className={`link__icon${path === '/' ? ' active' : ''}`}
            icon={faHome}
          />
          <span className={`link__text${path === '/' ? ' active' : ''}`}>
            Home
          </span>
        </Link>
        <Link to="/wines/add" className="link">
          <FontAwesomeIcon
            className={`link__icon${path === '/wines/add' ? ' active' : ''}`}
            icon={faPlusCircle}
          />
          <span
            className={`link__text${path === '/wines/add' ? ' active' : ''}`}
          >
            Add Wines
          </span>
        </Link>
        <Link to="/wines/view" className="link">
          <FontAwesomeIcon
            className={`link__icon${path === '/wines/view' ? ' active' : ''}`}
            icon={faWineGlassAlt}
          />
          <span
            className={`link__text${path === '/wines/view' ? ' active' : ''}`}
          >
            My Wines
          </span>
        </Link>
      </nav>
    </FooterContainer>
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

export default withRouter(Footer);
