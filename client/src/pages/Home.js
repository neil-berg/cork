import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Loading from '../components/loading/Loading';
import Error from '../components/error/Error';
import WineCard from '../components/card/WineCard';
import UserContext from '../context/UserContext';

const Home = () => {
  const [user, setUser] = useContext(UserContext);

  // Fetch latest 20 wines in the DB
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [wines, setWines] = useState([]);

  useEffect(() => {
    // Fetch latest 20 wines in the DB
    // and if a user is logged in, their liked wines
    const fetchAllWines = async () => {
      setLoading(false);
      setError(false);
      try {
        setLoading(true);
        const { data: wines } = await axios.get('/api/wines/all', {
          params: {
            limit: 20,
            skip: 0,
            sortBy: 'createdAt:desc'
          }
        });

        // If a user is logged in, fetch their liked wines
        if (user.isLoggedIn) {
          const token = localStorage.getItem('cork-token');
          if (!token) setError(true);
          const { data } = await axios.get('/api/users/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const likedWines = data.likedWines.map(item => item._id);

          // Append new boolean prop 'likedByUser' if wine id's match
          wines.map(wine =>
            likedWines.includes(wine._id)
              ? Object.assign(wine, { likedByUser: true })
              : Object.assign(wine, { likedByUser: false })
          );
        }

        setWines(wines);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    };
    fetchAllWines();
  }, [user.isLoggedIn]);

  const renderWines = () => {
    return wines.map(wine => <WineCard key={wine._id} wine={wine} />);
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-items: center;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 100px;

  @media screen and (min-width: 450px) {
    grid-gap: 1rem;
  }
`;

export default Home;
