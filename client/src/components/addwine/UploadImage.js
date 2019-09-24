import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWineBottle,
  faStar,
  faPlus
} from '@fortawesome/free-solid-svg-icons';

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
    }
  };

  return (
    <ImageContainer>
      <div className="wine-icon-container">
        <FontAwesomeIcon className="wine-icon" icon={faWineBottle} />
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
    color: var(--white);
    font-weight: bold;
  }

  .wine-icon-container {
    width: 300px;
    height: 300px;
    border: 3px var(--maroon) solid;
    border-radius: 20px;
    background: var(--maroon);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    margin-top: 1.25rem;
  }

  .wine-icon {
    width: 180px;
    height: 280px;
    color: var(--grey);
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
