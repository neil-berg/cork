import React, { useState } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWineBottle,
  faStar,
  faPlus
} from '@fortawesome/free-solid-svg-icons';

import UploadImage from './UploadImage';

const AddWineForm = () => {
  // State for the image upload
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Select Image of Wine');
  const [imageErrorMessage, setImageErrorMessage] = useState('');
  const [imageExists, setImageExists] = useState(false);

  // State for form inputs and error/success
  const [wineInfo, setWineInfo] = useState({
    name: '',
    rating: 0,
    winetype: '',
    vineyard: '',
    varietal: '',
    country: '',
    origin: '',
    review: 'Enter review here...'
  });
  const [successMessage, setSuccessMessage] = useState('');
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

  //
  const successAnimation = useSpring({
    opacity: successMessage ? 1 : 0,
    transform: successMessage ? `translateY(0)` : `translateY(-20px)`
  });

  const handleSubmit = async e => {
    e.preventDefault();

    // Clear error states
    setImageErrorMessage('');
    setErrorMessage('');

    // Need an image before submission
    if (filename === 'Select Image of Wine') {
      return setImageErrorMessage('Please upload an image.');
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

      setSuccessMessage('Added new wine!');
      // Clear wine information state
      Object.keys(wineInfo).forEach(
        key => (wineInfo[key] = key !== 'rating' ? '' : 0)
      );
      setFile('');
      setFilename('Select Image of Wine');
      // Remove sucess message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      setErrorMessage('Error adding new wine. Please try again.');
      console.log(error);
    }
  };

  const renderRadioButtons = () => {
    const wineTypes = ['red', 'white', 'orange', 'rose', 'sparkling'];
    return wineTypes.map((item, i) => (
      <div key={i} className="radio-container">
        <input
          type="radio"
          name="winetype"
          id={`${item}Choice`}
          value={wineInfo[item]}
          checked={wineInfo.winetype === item}
          onChange={e => setWineInfo({ ...wineInfo, winetype: item })}
        />
        <label htmlFor={`${item}Choice`}>
          {item === 'rose' ? 'Rosé' : item[0].toUpperCase() + item.slice(1)}
        </label>
      </div>
    ));
  };

  const renderStars = () => {
    const stars = [1, 2, 3, 4, 5].map((item, i) => (
      <FontAwesomeIcon
        className="star-icon"
        key={i}
        icon={faStar}
        color={item > wineInfo.rating ? 'lightgrey' : 'orange'}
        onClick={() => setWineInfo({ ...wineInfo, rating: item })}
      />
    ));
    return <div className="stars-container">{stars}</div>;
  };

  return (
    <FormContainer>
      <animated.form
        style={animationProps}
        className="add-wine-form"
        onSubmit={e => handleSubmit(e)}
      >
        <h2>Wine Information</h2>
        <UploadImage
          setFile={setFile}
          filename={filename}
          setFilename={setFilename}
        />

        <div className="info-container">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            name="name"
            id="name"
            placeholder="Enter name of the wine"
            value={wineInfo['name']}
            pattern="^[0-9a-zA-Z'\s]{3,}"
            title="Must contain only letters, numbers, spaces, or apostrophes and be at least 3 characters long."
            onChange={e => setWineInfo({ ...wineInfo, name: e.target.value })}
          />
          <div className="ratings-container">
            <label htmlFor="rating">Rating</label>
            {renderStars()}
          </div>
          <fieldset>
            <legend>Select type of wine:</legend>
            <div className="wine-type-container">{renderRadioButtons()}</div>
          </fieldset>
        </div>

        <div className="extra-info-container">
          <h3>Additional Details</h3>

          <label htmlFor="vineyard">Vineyard</label>
          <input
            type="text"
            name="vineyard"
            id="vineyard"
            placeholder="Enter vineyard name"
            value={wineInfo['vineyard']}
            pattern="^[a-zA-Z'\s]{3,}"
            title="Must contain only letters, spaces, or apostrophes and be at least 3 characters long."
            onChange={e =>
              setWineInfo({ ...wineInfo, vineyard: e.target.value })
            }
          />
          <label htmlFor="varietal">Varietal</label>
          <input
            type="text"
            name="varietal"
            id="varietal"
            placeholder="Enter varietal type"
            value={wineInfo['varietal']}
            pattern="^[a-zA-Z'\s]{3,}"
            title="Must contain only letters, spaces, or apostrophes and be at least 3 characters long."
            onChange={e =>
              setWineInfo({ ...wineInfo, varietal: e.target.value })
            }
          />
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            placeholder="Enter country wine is made in"
            value={wineInfo['country']}
            pattern="^[a-zA-Z'\s]{3,}"
            title="Must contain only letters, spaces, or apostrophes and be at least 3 characters long."
            onChange={e =>
              setWineInfo({ ...wineInfo, country: e.target.value })
            }
          />
          <label htmlFor="origin">Origin</label>
          <input
            type="text"
            name="origin"
            id="origin"
            placeholder="Enter origin of country wine is made in"
            value={wineInfo['origin']}
            pattern="^[a-zA-Z'\s]{3,}"
            title="Must contain only letters, spaces, or apostrophes and be at least 3 characters long."
            onChange={e => setWineInfo({ ...wineInfo, origin: e.target.value })}
          />
          <label htmlFor="review">Review</label>
          <textarea
            name="review"
            id="review"
            cols="30"
            rows="10"
            value={wineInfo['review']}
            pattern="^[a-zA-Z'\s]{3,}"
            title="Must contain only letters, spaces, or apostrophes and be at least 3 characters long."
            onChange={e => setWineInfo({ ...wineInfo, review: e.target.value })}
          ></textarea>
        </div>
        {successMessage && (
          <animated.p className="success-message" style={successAnimation}>
            {successMessage}
          </animated.p>
        )}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Add Wine</button>
      </animated.form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto 0 auto;
  transition: width 0.3s ease;

  h2 {
    padding: 1rem 0;
    margin-bottom: 1rem;
    border-radius: 10px 10px 0 0;
    text-align: center;
    background: var(--purple);
    color: var(--white);
  }

  h3 {
    text-align: center;
    color: var(--purple);
    border-top: 1px var(--purple) solid;
    border-bottom: 1px var(--purple) solid;
    padding: 1rem 0;
    margin-bottom: 1rem;
  }

  .add-wine-form {
    margin: 1rem 1rem 10rem 1rem;
    display: flex;
    flex-direction: column;
    border: 1px var(--lightgrey) solid;
    border-radius: 10px;
    box-shadow: 0px 5px 10px rgba(204, 195, 214, 0.75);
  }

  button[type='submit'] {
    width: calc(100% - 2rem);
    padding: 1rem 2rem;
    margin: 1rem;
    border-radius: 5px;
    align-self: center;
    cursor: pointer;
    color: var(--black);
    font-size: 1.25em;
    font-weight: bold;
    background: var(--lightpurple);
    border: 1px var(--purplegrey) solid;
    transition: all 0.3s ease;
  }

  .radio-container {
    display: flex;
    align-items: center;
    height: 30px;
  }

  .radio-container > input {
    margin: 0 0 0.35rem 0.5rem;
  }

  .radio-container > label {
    font-size: 1rem;
    margin-bottom: 0.25rem;
    padding-left: 1rem;
  }

  .info-container,
  .extra-info-container {
    display: flex;
    flex-direction: column;
    padding: 2rem 1rem;
  }

  .info-container {
    padding-bottom: 0;
  }

  label {
    font-size: 1.1em;
    font-weight: bold;
    color: var(--black);
  }

  input {
    border-bottom: 1px var(--grey) solid;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    padding: 0.75rem 0 0.5rem 0;
    margin-left: 1rem;
    margin-bottom: 1rem;
    background: transparent;
    transition: border 0.3s ease;
  }

  input:focus {
    outline: 0;
    border-bottom: 1px var(--purple) solid;
  }

  fieldset {
    margin: 1.5rem 0 0.5rem 0;
    font-size: 1.1em;
    font-weight: bold;
    color: var(--black);
    border: 1px var(--grey) solid;
    border-radius: 5px;
  }

  textarea {
    border: 1px var(--grey) solid;
    border-radius: 5px;
    background: var(--white);
    margin: 1rem 0 0 1rem;
    padding: 0.5rem;
  }

  .stars-container {
    padding: 1rem 0 0 1rem;
  }

  .star-icon {
    font-size: 1.5rem;
  }

  .image-error-message, .error-message {
    color: var(--red);
    font-size: 1.1em;
    font-weight: bold
    padding: 1rem 0;
    margin-left: 1rem;
  }

  .success-message {
    background: var(--green);
    color: var(--white);
    font-weight: bold;
    font-size: 1.25rem;
    padding: 1rem;
    margin: 1rem;
    text-align: center;
    border-radius: 5px;
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
