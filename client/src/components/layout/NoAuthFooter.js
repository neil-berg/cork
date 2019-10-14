import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faPlusCircle,
  faWineGlassAlt
} from '@fortawesome/free-solid-svg-icons';

import Portal from '../../components/portal/Portal';
import AuthModal from '../../components/modal/AuthModal';

const NoAuthFooter = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <NoAuthFooterContainer>
        <nav className="footer-menu">
          <Link to="/" className="link">
            <FontAwesomeIcon className="link__icon active" icon={faHome} />
            <span className="link__text active ">Home</span>
          </Link>

          <div className="link" onClick={() => setShowAuthModal(true)}>
            <FontAwesomeIcon className="link__icon" icon={faPlusCircle} />
            <span className="link__text">Add Wine</span>
          </div>

          <div className="link" onClick={() => setShowAuthModal(true)}>
            <FontAwesomeIcon className="link__icon" icon={faWineGlassAlt} />
            <span className="link__text">My Wines</span>
          </div>
        </nav>
      </NoAuthFooterContainer>
      <Portal>
        <AuthModal
          showAuthModal={showAuthModal}
          setShowAuthModal={setShowAuthModal}
        />
      </Portal>
    </>
  );
};

const NoAuthFooterContainer = styled.footer`
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

export default NoAuthFooter;
