import React, { useState } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import axios from 'axios';

import UploadImage from './UploadImage';
import BasicInformation from './BasicInformation';
import ExtraInformation from './ExtraInformation';

const AddWineForm = () => {
  // State for the image upload
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Select Image of Wine');

  // State for form inputs and error/success
  const [wineInfo, setWineInfo] = useState({
    name: '',
    rating: 0,
    type: '',
    vineyard: '',
    varietal: '',
    country: '',
    origin: '',
    review: 'Enter review here...'
  });

  const [submitSuccess, setSubmitSuccess] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Animation for the form
  const animationProps = useSpring({
    from: {
      opacity: 0,
      transform: 'translateY(-20px)'
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)'
    }
  });

  const handleErrorMessage = message => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Need an image before submission
    if (filename === 'Select Image of Wine') {
      handleErrorMessage('Make sure you upload an image!');
      return;
    }

    // Need name, rating, and wineType before submission
    if (!wineInfo.name) {
      handleErrorMessage('Make sure your wine has a name!');
      return;
    }
    if (wineInfo.rating === 0) {
      handleErrorMessage('Make sure your wine has a rating!');
      return;
    }

    if (!wineInfo.type) {
      handleErrorMessage('Make sure you select a type of wine!');
      return;
    }

    try {
      const token = localStorage.getItem('cork-token');

      // First POST new wine info without image
      const res = await axios.post('/api/wines', wineInfo, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Then POST wine image using the newly created wine _id
      // Initialize form data for image POST
      const formData = new FormData();
      formData.append('image', file);
      await axios.post(`/api/wines/${res.data._id}/image`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      // Flip button to show success for 2 seconds
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
      // Clear wine information state
      Object.keys(wineInfo).forEach(
        key => (wineInfo[key] = key !== 'rating' ? '' : 0)
      );
      setFile('');
      setFilename('Select Image of Wine');
    } catch (error) {
      setErrorMessage('Error adding new wine. Please try again.');
      console.log(error);
    }
  };

  return (
    <FormContainer submitSuccess={submitSuccess}>
      <animated.form
        style={animationProps}
        className="add-wine-form"
        onSubmit={e => handleSubmit(e)}
      >
        <UploadImage
          setFile={setFile}
          filename={filename}
          setFilename={setFilename}
        />
        <BasicInformation wineInfo={wineInfo} setWineInfo={setWineInfo} />
        <ExtraInformation wineInfo={wineInfo} setWineInfo={setWineInfo} />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">
          {submitSuccess ? 'Successfully Added!' : 'Add Wine'}
        </button>
      </animated.form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  padding: 1rem;

  .add-wine-form {
    max-width: 600px;
    margin: 0 auto 10rem auto;
    display: flex;
    flex-direction: column;
    border: 1px var(--lightgrey) solid;
    border-radius: 10px;
    box-shadow: 0px 5px 10px rgba(204, 195, 214, 0.75);
  }

  button[type='submit'] {
    margin: 1rem;
    padding: 1rem 4rem;
    border-radius: 5px;
    background: ${props =>
      props.submitSuccess
        ? 'var(--green)'
        : 'linear-gradient(135deg, var(--purple), var(--maroon))'};
    color: white;
    font-size: 1.2em;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0px 10px 10px rgba(138, 54, 92, 0.15);
    transition: all ease 0.2s;
    pointer-events: ${props => (props.submitSuccess ? 'none' : 'auto')}
  }

  .error-message {
    color: var(--red);
    font-size: 1.1em;
    font-weight: bold
    padding-top: 1rem;
    margin-left: 1rem;
  }

  @media (hover: hover) {
    button:hover {
      background: var(--verylightgrey);
      border: 1px var(--purple) solid;
      color: var(--purple);
    }
  }
`;

export default AddWineForm;
