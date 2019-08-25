import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { ReactComponent as DotsMenu } from '../assets/dots-menu.svg';

import UserMenu from './UserMenu';
import Portal from './Portal';
import Modal from './Modal';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  return (
    <>
      <HeaderContainer>
        <h1>Cork</h1>
        <div className="icon-container">
          <DotsMenu className="header__icon-menu" />

          <FontAwesomeIcon
            className="header__icon-user"
            icon={faUserCircle}
            // onClick={() => setShowModal(!showModal)}
            onClick={() => setShowUserMenu(!showUserMenu)}
          />
        </div>

        <UserMenu
          showModal={showModal}
          setShowModal={setShowModal}
          showUserMenu={showUserMenu}
          setShowUserMenu={setShowUserMenu}
        />
      </HeaderContainer>
      <Portal>
        <Modal showModal={showModal} setShowModal={setShowModal} />
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

  .header__icon-menu {
    width: 1.5rem;
    height: 1.5rem;
    fill: var(--white);
    margin-right: 1rem;
  }

  .header__icon-user {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--white);
  }
`;
export default Header;
