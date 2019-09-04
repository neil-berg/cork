import React from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import ChangeAvatar from '../components/ChangeAvatar';
import ChangeUserInfo from '../components/ChangeUserInfo';
import ChangePassword from '../components/ChangePassword';
import DeleteAccount from '../components/DeleteAccount';

const UserAccount = () => {
  return (
    <Layout>
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
    </Layout>
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
