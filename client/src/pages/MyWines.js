import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Loading from '../components/loading/Loading';
import Error from '../components/error/Error';
import WineCard from '../components/card/WineCard';

const MyWines = () => {
  // Fetch latest 20 wines in the DB
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [wines, setWines] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('cork-token');
    const fetchAllWines = async () => {
      // setLoading(false);
      // setError(false);
      try {
        setLoading(true);
        const res = await axios.get('/api/wines/mine', {
          params: {
            limit: 20,
            skip: 0,
            sortBy: 'createdAt:desc'
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setWines(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(true);
        console.log(error);
      }
    };
    fetchAllWines();
  }, []);

  const renderWines = () => {
    return wines.map(wine => (
      <li key={wine._id}>
        <WineCard wine={wine} />
      </li>
    ));
  };

  // TODO: Build out no wines component
  const noWines = () => {
    return (
      <div>
        <h1>No Wines Yet</h1>
      </div>
    );
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return <WineList>{wines.length > 0 ? renderWines() : noWines()}</WineList>;
};

const WineList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, 350px);
  grid-gap: 1rem;
  justify-content: center;
  margin-bottom: 100px;
`;

export default MyWines;
