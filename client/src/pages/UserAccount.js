import React from 'react';
import styled from 'styled-components';

import UploadAvatar from '../components/UploadAvatar';
import Layout from '../components/Layout';

const UserAccount = () => {
  // const uploadAvatar = async e => {
  //   try {
  //     const token = localStorage.getItem('cork-token');
  //     const formData = new FormData();
  //     formData.append('avatar', e.target.files[0]);

  //     // Send the image to DB
  //     const res = await axios.post('/api/users/me/avatar', formData, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     });

  //     // Update user context with the avatar
  //     // setUser({...user, avatar })
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
