import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Loading from '../components/loading/Loading';
import Error from '../components/error/Error';
import WineCard from '../components/card/WineCard';

const Home = () => {
  // Fetch latest 20 wines in the DB
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [wines, setWines] = useState([]);

  useEffect(() => {
    const fetchAllWines = async () => {
      // setLoading(false);
      // setError(false);
      try {
        setLoading(true);
        const res = await axios.get('/api/wines/all', {
          params: {
            limit: 20,
            skip: 0,
            sortBy: 'createdAt:desc'
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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return <WineList>{renderWines()}</WineList>;
};

const WineList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  grid-gap: 1rem;
  justify-content: center;
  margin-bottom: 100px;
`;

export default Home;
