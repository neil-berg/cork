import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro, faWineBottle } from '@fortawesome/free-solid-svg-icons';

const UploadImage = ({ setFile, filename, setFilename }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [imageExists, setImageExists] = useState(false);

  const handleChangeImage = async e => {
    const imageFile = e.target.files[0];
    if (imageFile.size > 15000000) {
      setErrorMessage('File size must be less than 15 MB.');
    } else if (/^(jpeg|jpg|png)$/.test(imageFile.type)) {
      setErrorMessage('Files must be JPEG, JPG, or PNG.');
    } else {
      setFile(imageFile);
      setFilename(imageFile.name);
      setImageExists(true);
    }
  };

  return (
    <ImageContainer>
      <div className="wine-icon-container">
        <FontAwesomeIcon
          className="wine-icon"
          icon={imageExists ? faWineBottle : faCameraRetro}
        />
        <input
          className="file-input"
          type="file"
          name="image"
          id="image"
          accept="image/png, image/jpeg, image/jpg"
          onChange={e => handleChangeImage(e)}
        />
        {errorMessage && <p className="image-error-message">{errorMessage}</p>}
        <label className="image-label" htmlFor="image">
          {filename}
        </label>
      </div>
    </ImageContainer>
  );
};

const ImageContainer = styled.div`
  .image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .image-label {
    color: var(--purple);
    font-weight: bold;
    font-size: 1.1em;
    padding: 1rem 0;
  }

  .image-error-message {
    padding: 1rem 0;
    color: var(--red);
    font-size: 1.25rem;
    font-weight: bold;
  }

  .wine-icon-container {
    height: 150px;
    border-radius: 10px 10px 0 0;
    background: var(--lightpurple);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .wine-icon {
    width: 80px;
    height: 80px;
    color: var(--purple);
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
`;

export default UploadImage;
