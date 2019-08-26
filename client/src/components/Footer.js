import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ReactComponent as GrapesIcon } from '../assets/wine.svg';
import { ReactComponent as HomeIcon } from '../assets/home.svg';
import { ReactComponent as AddIcon } from '../assets/plus.svg';

const Footer = () => (
  <FooterContainer>
    <nav className="footer-menu">
      <Link to="/" className="link">
        <HomeIcon className="link__icon" />
        <span className="link__text">Home</span>
      </Link>
      <Link to="/wines/post" className="link">
        <AddIcon className="link__icon" />
        <span className="link__text">Post</span>
      </Link>
      <Link to="/wines/explore" className="link">
        <GrapesIcon className="link__icon" />
        <span className="link__text">Explore</span>
      </Link>
    </nav>
  </FooterContainer>
);

const FooterContainer = styled.footer`
  .footer-menu {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 90px;
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
    width: 35px;
    height: 35px;
    fill: var(--black);
  }

  .link__text {
    padding-top: 0.5rem;
  }

  @media screen and (min-width: 600px) {
    .link {
      flex-grow: 1;
    }
  }
`;

export default Footer;
