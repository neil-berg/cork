import React from 'react';
import styled from 'styled-components';

import UploadAvatar from '../components/UploadAvatar';
import Layout from '../components/Layout';

const UserAccount = () => {
  return (
    <Layout>
      <Container>
        <div className="profile">
          <h2>Profile</h2>
          <UploadAvatar />

          {/* <div className="input-container">
              <label htmlFor="email">Email Address</label>
              <input
                className="email-input"
                type="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div> */}
        </div>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
`;

export default UserAccount;
