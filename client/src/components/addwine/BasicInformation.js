import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const BasicInformation = ({ wineInfo, setWineInfo }) => {
  const stars = [1, 2, 3, 4, 5];
  const wineTypes = ['Red', 'White', 'Rosé', 'Orange', 'Dessert', 'Sparkling'];

  return (
    <InfoContainer>
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
        <div className="stars-container">
          {stars.map((item, i) => (
            <FontAwesomeIcon
              className="star-icon"
              key={i}
              icon={faStar}
              color={item > wineInfo.rating ? 'lightgrey' : 'orange'}
              onClick={() => setWineInfo({ ...wineInfo, rating: item })}
            />
          ))}
        </div>
      </div>
      <p className="wine-type-header">Type</p>
      <div className="wine-type-container">
        {wineTypes.map((item, i) => (
          <span
            key={i}
            className={`wine-type${item === wineInfo.type ? ' selected' : ''}`}
            onClick={() => setWineInfo({ ...wineInfo, type: item })}
          >
            {item}
          </span>
        ))}
      </div>
    </InfoContainer>
  );
};

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;

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

  .stars-container {
    padding: 1rem 0 0 1rem;
  }

  .star-icon {
    font-size: 1.5rem;
  }

  .wine-type-header {
    font-size: 1.1em;
    font-weight: bold;
    color: var(--black);
    margin-top: 1rem;
  }

  .wine-type-container {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .wine-type {
    min-width: 100px;
    text-align: center;
    padding: 0.5rem;
    border: 1px var(--lightgrey) solid;
    border-radius: 5px;
    margin: 0 2px 2px 0;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .wine-type.selected {
    background: var(--lightpurple);
  }
`;

export default BasicInformation;
