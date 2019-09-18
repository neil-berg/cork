import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Layout from '../components/Layout';

const Home = () => {
  // Fetch latest 20 wines in the DB
  const [wines, setWines] = useState([]);

  useEffect(() => {
    const fetchAllWines = async () => {
      try {
        const res = await axios.get('/api/wines/all', {
          limit: 20,
          skip: 0,
          sortBy: 'desc'
        });
        setWines(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllWines();
  }, []);

  const renderWines = () => {
    return wines.map(wine => (
      <li key={wine._id}>
        <span>{wine.name}</span>
        <img
          src={process.env.REACT_APP_API_URL + `/api/wines/${wine._id}/image`}
          alt="wine bottle"
        />
      </li>
    ));
  };

  return (
    <Layout>
      <h2>Home Page for Cork</h2>
      <ul>{renderWines()}</ul>
    </Layout>
  );
};

export default Home;
