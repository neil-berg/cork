import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Pagniation = ({ page, total }) => {
  const numPages = Math.ceil(total / 20);
  const pageArr = [...new Array(numPages).keys()].map(item => item + 1);

  return (
    <PageContainer>
      {pageArr.map(num => (
        <Link
          to={`/${num}`}
          className={`${page === num.toString() ? 'link active' : 'link'}`}
          key={num}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <span>{num}</span>
        </Link>
      ))}
    </PageContainer>
  );
};

const PageContainer = styled.div`
  margin-bottom: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  .link {
    padding: 0.25rem 0.5rem;
    margin-right: 0.25rem;
    color: var(--purple);
    font-size: 1.25em;
    font-weight: bold;
    border-bottom: 3px var(--white) solid;
  }

  .link.active {
    border-bottom: 3px var(--green) solid;
  }
`;

export default Pagniation;
