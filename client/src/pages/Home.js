import React, { useContext } from 'react';
import axios from 'axios';

import UserContext from '../context/UserContext';
import Layout from '../components/Layout';

const Home = () => {
  const handleClick = async () => {
    // Get the passwords and store them in state
    const res = await axios.get('/api/test');
    console.log(res.data);
    // setPasswords(Object.keys(res.data));
  };

  const [name, setName] = useContext(UserContext);

  return (
    <Layout>
      <h1>{name}</h1>
      <button onClick={() => setName('Neil')}>Change Name</button>
      <h2>Indepage</h2>
      <button onClick={handleClick}>TEST</button>
    </Layout>
  );
};

export default Home;
