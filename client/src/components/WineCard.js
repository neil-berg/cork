import React from 'react';
import styled from 'styled-components';

const WineCard = ({ wine }) => {
  return (
    <div>
      <span>{wine.name}</span>
      <img
        src={process.env.REACT_APP_API_URL + `/api/wines/${wine._id}/image`}
        alt="wine bottle"
      />
    </div>
  );
};

export default WineCard;
