import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const Error = () => (
  <ErrorContainer>
    <FontAwesomeIcon className="error-icon" icon={faExclamationCircle} />
    <span>Error loading wines.</span>
  </ErrorContainer>
);

const ErrorContainer = styled.div`
  height: calc(100vh - 130px);
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .error-icon {
    font-size: 4rem;
  }

  span {
    font-size: 2rem;
    margin-top: 1rem;
  }
`;

export default Error;
