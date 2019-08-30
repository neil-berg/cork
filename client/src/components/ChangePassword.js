import React, { useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import UserContext from '../context/UserContext';
const ChangePassword = () => {
  const [user, setUser] = useContext(UserContext);

  return <div>Change password!</div>;
};

export default ChangePassword;
