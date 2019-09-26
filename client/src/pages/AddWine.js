import React, { useContext } from 'react';

import UserContext from '../context/UserContext';
import AddWineForm from '../components/addwine/AddWineForm';

const AddWine = () => {
  const [user, setUser] = useContext(UserContext);

  return user.isLoggedIn ? (
    <AddWineForm />
  ) : (
    <div>
      <h2>Please log in to add a wine</h2>
    </div>
  );
};

export default AddWine;
