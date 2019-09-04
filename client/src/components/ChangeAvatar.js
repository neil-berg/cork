import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';

import UserContext from '../context/UserContext';

const ChangeAvatar = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Change Image');
  const [errorMessage, setErrorMessage] = useState('');
  const [avatarExists, setAvatarExists] = useState(false);

  const [user, setUser] = useContext(UserContext);

  // Check if a user image exists
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('cork-token');
        const res = await axios.get(`/api/users/${user._id}/avatar`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.status === 200) {
          setAvatarExists(true);
        }
      } catch (error) {
        setAvatarExists(false);
      }
    };

    fetchUserDetails();
  }, [user._id]);

  const handleChangeImage = async e => {
    const imageFile = e.target.files[0];
    if (imageFile.size > 15000000) {
      setErrorMessage('File size must be less than 15 MB.');
    } else if (/^(jpeg|jpg|png)$/.test(imageFile.type)) {
      setErrorMessage('Files must be JPEG, JPG, or PNG.');
    } else {
      setFile(imageFile);
      setFilename(imageFile.name);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (filename === 'Change Image') {
      return setErrorMessage('Please upload an image.');
    }
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
      // Reload to force new img src GET request
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AvatarContainer>
      <form className="profile-form" onSubmit={e => handleSubmit(e)}>
        <div className="avatar-container">
          {avatarExists ? (
            <img
              className="avatar-image"
              src={`${process.env.REACT_APP_API_URL}/api/users/${user._id}/avatar`}
              alt="user avatar"
            />
          ) : (
            <FontAwesomeIcon className="avatar-icon" icon={faUserCircle} />
          )}
          <input
            className="file-input"
            type="file"
            name="avatar"
            id="avatar"
            accept="image/png, image/jpeg, image/jpg"
            onChange={e => handleChangeImage(e)}
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <label className="avatar-label" htmlFor="avatar">
            {filename}
          </label>
          <input type="submit" value="Upload" />
        </div>
      </form>
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

  .avatar-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px var(--lightgrey) solid;
  }

  .avatar-icon {
    width: 100px;
    height: 100px;
    color: var(--grey);
  }

  .avatar-label {
    margin-top: 1rem;
    color: var(--purple);
    font-weight: bold;
    cursor: pointer;
  }

  .error-message {
    color: var(--red);
    padding-top: 1rem;
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
    padding: 0.5rem 2rem;
    border-radius: 5px;
    margin-top: 1rem;
    cursor: pointer;
    color: var(--black);
    font-weight: bold;
    background: var(--lightpurple);
    border: 1px var(--purplegrey) solid;
  }
`;

export default ChangeAvatar;
