import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ReactComponent as GrapesIcon } from '../assets/wine.svg';
import { ReactComponent as HomeIcon } from '../assets/home.svg';
import { ReactComponent as AddIcon } from '../assets/plus.svg';

const Footer = () => {
  return (
    <FooterContainer>
      <nav className="footer-menu">
        <Link to="/" className="link">
          <HomeIcon className="link__icon" />
          <span className="link__text">Home</span>
        </Link>
        <Link to="/wines/add" className="link">
          <AddIcon className="link__icon" />
          <span className="link__text">Add Wine</span>
        </Link>
        <Link to="/wines/view" className="link">
          <GrapesIcon className="link__icon" />
          <span className="link__text">My Wines</span>
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
    padding: 1rem;
  }

  .link {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .link__icon {
    width: 25px;
    height: 25px;
    fill: var(--black);
  }

  .link__text {
    padding-top: 0.35rem
    font-size: 0.9em;
  }

  @media screen and (min-width: 600px) {
    .footer-menu {
      height: 70px;
    }

    .link {
      flex-grow: 1;
    }

    .link__icon {
      width: 35px;
      height: 35px;
    }
  }
`;

export default Footer;
