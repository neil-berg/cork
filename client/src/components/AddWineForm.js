import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWineBottle, faStar } from '@fortawesome/free-solid-svg-icons';

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
  const [sucessMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangeImage = async e => {
    const imageFile = e.target.files[0];
    if (imageFile.size > 15000000) {
      setImageErrorMessage('File size must be less than 15 MB.');
    } else if (/^(jpeg|jpg|png)$/.test(imageFile.type)) {
      setImageErrorMessage('Files must be JPEG, JPG, or PNG.');
    } else {
      setFile(imageFile);
      setFilename(imageFile.name);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    console.log('hitting button?');
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
      console.log('submitted new wine!');
    } catch (error) {
      setErrorMessage('Error adding new wine. Try again.');
      console.log(error);
    }
  };

  const renderRadioButtons = () => {
    const wineTypes = ['red', 'white', 'orange', 'rose', 'sparkling'];

    return wineTypes.map((item, i) => (
      <div key={i}>
        <input
          type="radio"
          name="winetype"
          id={`${item}Choice`}
          value={wineInfo[item]}
          checked={wineInfo.winetype === item}
          // onChange={e => setWineType(e.target.value)}
          onChange={e => setWineInfo({ ...wineInfo, winetype: item })}
        />
        <label htmlFor="redChoice">
          {item === 'rose' ? 'Rosé' : item[0].toUpperCase() + item.slice(1)}
        </label>
      </div>
    ));
  };

  return (
    <FormContainer>
      <h2>Add Wine</h2>
      <form className="add-wine-form" onSubmit={e => handleSubmit(e)}>
        <div className="image-container">
          {imageExists ? (
            <img
              className="wine-image"
              // src={`${process.env.REACT_APP_API_URL}/api/wines/${wine._id}/iimage`}
              alt="wine bottle label"
            />
          ) : (
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
              {imageErrorMessage && (
                <p className="image-error-message">{imageErrorMessage}</p>
              )}
              <label className="image-label" htmlFor="image">
                {filename}
              </label>
            </div>
          )}
        </div>
        <div className="info-container">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter name of the wine"
            value={wineInfo['name']}
            // onChange={e => setName(e.target.value)}
            onChange={e => setWineInfo({ ...wineInfo, name: e.target.value })}
          />
          <div className="ratings-container">
            <label htmlFor="rating">Rating</label>
            <div className="stars-container">
              <FontAwesomeIcon icon={faStar} color="lightgrey" />
              <FontAwesomeIcon icon={faStar} color="lightgrey" />
              <FontAwesomeIcon icon={faStar} color="lightgrey" />
              <FontAwesomeIcon icon={faStar} color="lightgrey" />
              <FontAwesomeIcon icon={faStar} color="lightgrey" />
            </div>
          </div>
        </div>
        <div className="extra-info-container">
          <h3>Additional Details</h3>
          <fieldset>
            <legend>Select type of wine:</legend>
            <div className="wine-type-container">{renderRadioButtons()}</div>
          </fieldset>

          <label htmlFor="vineyard">Vineyard</label>
          <input
            type="text"
            name="vineyard"
            id="vineyard"
            placeholder="Enter vineyard name"
            value={wineInfo['vineyard']}
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
            onChange={e => setWineInfo({ ...wineInfo, origin: e.target.value })}
          />
          <label htmlFor="review">Review</label>
          <textarea
            name="review"
            id="review"
            cols="30"
            rows="10"
            value={wineInfo['review']}
            // onChange={e => setReview(e.target.value)}
            onChange={e => setWineInfo({ ...wineInfo, review: e.target.value })}
          ></textarea>
        </div>
        <button type="submit">Add Wine</button>
      </form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto 0 auto;

  h2,
  h3 {
    text-align: center;
  }

  h3 {
    color: var(--maroon);
    padding: 1.5rem 0;
  }

  .add-wine-form {
    margin: 1rem 1rem 10rem 1rem;
    display: flex;
    flex-direction: column;
    border: 1px var(--lightgrey) solid;
    border-radius: 5px;
    box-shadow: 0px 5px 10px rgba(204, 195, 214, 0.75);
  }

  .image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .image-label {
    color: var(--purple);
    font-weight: bold;
  }

  .wine-icon-container {
    width: 300px;
    height: 300px;
    border: 3px var(--lightgrey) solid;
    border-radius: 5px;
    background: var(--lightgrey);
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

  [type='submit'] {
    padding: 0.5rem 2rem;
    border-radius: 5px;
    margin-top: 1rem;
    cursor: pointer;
    color: var(--black);
    font-weight: bold;
    background: var(--lightpurple);
    border: 1px var(--purplegrey) solid;
    transition: all 0.3s ease;
  }

  .info-container,
  .extra-info-container {
    display: flex;
    flex-direction: column;
    padding: 2rem 1rem;
  }

  .info-container {
    border-bottom: 2px var(--grey) solid;
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

  textarea {
    border: 1px var(--lightgrey) solid;
    background: var(--white);
  }

  .stars-container {
    padding: 1rem 0 0 1rem;
  }

  // Error messages
  .image-error-message {
    color: var(--red);
    font-size: 1.1em;
    font-weight: bold
    padding: 1rem 0;
  }
`;

export default AddWineForm;
