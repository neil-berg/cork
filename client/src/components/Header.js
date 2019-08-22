import React, { useState } from 'react';
import styled from 'styled-components';

import Portal from './Portal';
import Modal from './Modal';

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <HeaderContainer>
        <button>Menu</button>
        <h1>CORK</h1>
        <button onClick={() => setShowModal(!showModal)}>Profile</button>
      </HeaderContainer>
      <Portal>
        <Modal showModal={showModal} setShowModal={setShowModal} />
      </Portal>
    </>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(
    90deg,
    var(--purple),
    var(--maroon),
    var(--purple)
  );
`;
export default Header;
