import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const Pagniation = ({ page, total }) => {
  const numPages = Math.ceil(total / 20);

  // No pagination if only one page
  if (numPages < 2) {
    return <div style={{ marginBottom: '100px' }}></div>;
  }

  return (
    <PageContainer>
      {page > 1 ? (
        <Link className="link" to={`/wines/all/${Number(page) - 1}`}>
          <FontAwesomeIcon className="icon" icon={faAngleLeft} />
        </Link>
      ) : (
        <FontAwesomeIcon className="disabled-icon" icon={faAngleLeft} />
      )}
      <span className="current-page">{page}</span>
      <span className="slash">/</span>
      <span className="total-pages">{numPages}</span>
      {page < numPages ? (
        <Link className="link" to={`/wines/all/${Number(page) + 1}`}>
          <FontAwesomeIcon className="icon" icon={faAngleRight} />
        </Link>
      ) : (
        <FontAwesomeIcon className="disabled-icon" icon={faAngleRight} />
      )}
    </PageContainer>
  );
};

const PageContainer = styled.div`
  margin-bottom: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  .current-page {
    font-size: 1.5rem;
    padding: 0 0.25rem;
  }

  .slash {
    font-size: 2rem;
  }

  .total-pages {
    font-size: 1.5rem;
    padding: 0 0.25rem;
  }

  .icon,
  .disabled-icon {
    font-size: 3rem;
  }

  .disabled-icon {
    color: var(--lightgrey);
  }

  .icon {
    color: var(--purple);
  }
`;

export default Pagniation;
