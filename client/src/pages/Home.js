import React from 'react';
import axios from 'axios';

import Layout from '../components/Layout';

const Home = () => {
  const handleClick = async () => {
    // Get the passwords and store them in state
    const res = await axios.get('/api/test');
    console.log(res.data);
    // setPasswords(Object.keys(res.data));
  };

  return (
    <Layout>
      <h2>Indepage</h2>
      <button onClick={handleClick}>TEST</button>
    </Layout>
  );
};

export default Home;
