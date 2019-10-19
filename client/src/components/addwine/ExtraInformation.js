import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const ExtraInformation = ({ wineInfo, setWineInfo }) => {
  const [showBody, setShowBody] = useState(false);

  return (
    <ExtraInfoContainer showBody={showBody}>
      <div className="extra-info-header" onClick={() => setShowBody(!showBody)}>
        <h3>Additional Details</h3>
        <FontAwesomeIcon icon={showBody ? faChevronUp : faChevronRight} />
      </div>

      <div className="extra-info-body">
        <label htmlFor="vineyard">Vineyard</label>
        <input
          type="text"
          name="vineyard"
          id="vineyard"
          placeholder="Enter vineyard name"
          value={wineInfo['vineyard']}
          pattern="^[a-zA-Z'\s]{3,}"
          title="Must contain only letters, spaces, or apostrophes and be at least 3 characters long."
          onChange={e => setWineInfo({ ...wineInfo, vineyard: e.target.value })}
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
          onChange={e => setWineInfo({ ...wineInfo, varietal: e.target.value })}
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
          onChange={e => setWineInfo({ ...wineInfo, country: e.target.value })}
        />
        <label htmlFor="region">Region</label>
        <input
          type="text"
          name="region"
          id="region"
          placeholder="Enter region of country wine is made in"
          value={wineInfo['region']}
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
    </ExtraInfoContainer>
  );
};

const ExtraInfoContainer = styled.div`
  .extra-info-header {
    padding: 1rem;
    margin-bottom: ${props => (props.showBody ? '1rem' : '0')};
    background: var(--verylightgrey);
    border-top: 1px var(--lightgrey) solid;
    border-bottom: 1px var(--lightgrey) solid;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .extra-info-body {
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    transition: height 0.2s ease;
    height: ${props => (props.showBody ? '550px' : '0px')};
    overflow: hidden;
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
    border: 1px var(--grey) solid;
    border-radius: 5px;
    background: var(--white);
    margin: 1rem 0 0 1rem;
    padding: 0.5rem;
  }
`;

export default ExtraInformation;
