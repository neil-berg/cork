import React, { useContext } from 'react';

import UserContext from '../../context/UserContext';
import AuthFooter from './AuthFooter';
import NoAuthFooter from './NoAuthFooter';

const Footer = () => {
  const [user, setUser] = useContext(UserContext);

  return user.isLoggedIn ? <AuthFooter /> : <NoAuthFooter />;
};

export default Footer;
