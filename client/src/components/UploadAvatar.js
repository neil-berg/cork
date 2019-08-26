import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';

import UserContext from '../context/UserContext';

const UploadAvatar = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState(null);

  const [user, setUser] = useContext(UserContext);

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      // Send the image to the DB
      const token = localStorage.getItem('cork-token');
      await axios.post('/api/users/me/avatar', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      // Then retrieve the image for rendering
      const res = await axios.get(`/api/users/${user.id}/avatar`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const b64string = res.data;
      var buf = Buffer.from(b64string, 'base64');
      console.log(buf);
      // setUploadedFile(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AvatarContainer>
      <form action="" className="profile-form" onSubmit={e => handleSubmit(e)}>
        <div className="avatar-container">
          <FontAwesomeIcon className="avatar-icon" icon={faUserCircle} />
          <input
            className="file-input"
            type="file"
            name="avatar"
            id="avatar"
            accept="image/png, image/jpeg"
            onChange={e => {
              setFile(e.target.files[0]);
              setFilename(e.target.files[0].name);
            }}
          />
          <label className="avatar-label" htmlFor="avatar">
            {filename}
          </label>
          <input type="submit" value="Upload" />
        </div>
      </form>
      <img src={`data:image/jpeg;base64,${uploadedFile}`} />
    </AvatarContainer>
  );
};

const AvatarContainer = styled.div`
  .avatar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .avatar-icon {
    width: 75px;
    height: 75px;
    color: var(--grey);
  }

  .avatar-label {
    margin-top: 1rem;
    color: var(--purple);
    font-weight: bold;
    cursor: pointer;
  }

  [type='file'] {
    border: 0;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  [type='submit'] {
    padding: 0.5rem 1rem;
    border-radius: 20px;
    margin-top: 1rem;
  }
`;

export default UploadAvatar;
