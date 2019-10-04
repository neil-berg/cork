import React from 'react';
import styled from 'styled-components';

const WineCard = ({ wine }) => {
  return (
    <Card>
      <img
        src={process.env.REACT_APP_API_URL + `/api/wines/${wine._id}/image`}
        alt="wine bottle"
      />
      <h2>{wine.name}</h2>
    </Card>
  );
};

const Card = styled.div`
  img {
    width: 100%;
    max-width: 400px;
  }

  name {
    color: var(--purple);
  }
`;

export default WineCard;
