import React from 'react';
import styled from 'styled-components';

import ChangeAvatar from '../components/account/ChangeAvatar';
import ChangeUserInfo from '../components/account/ChangeUserInfo';
import ChangePassword from '../components/account/ChangePassword';
import DeleteAccount from '../components/account/DeleteAccount';

const UserAccount = () => {
  return (
    <Container>
      <div className="profile">
        <h2>Profile</h2>
        <ChangeAvatar />
        <ChangeUserInfo />
      </div>
      <div className="password">
        <h2>Password</h2>
        <ChangePassword />
      </div>
      <div className="delete-account">
        <h2>Delete Account</h2>
        <DeleteAccount />
      </div>
    </Container>
  );
};

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;

  h2 {
    font-size: 1.65em;
  }

  .profile,
  .password,
  .delete-account {
    border-bottom: 1px var(--lightgrey) solid;
    padding: 3rem 0;
  }
`;

export default UserAccount;
