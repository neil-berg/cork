import React, { useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import UserContext from '../context/UserContext';

const DeleteAccount = () => {
  const [user, setUser] = useContext(UserContext);

  return <div>Delete accccount!</div>;
};

export default DeleteAccount;
