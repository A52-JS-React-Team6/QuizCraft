import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const defaultAuthUser = {
  user: {
    authUser: null,
    userDetails: null,
  },
  setUser: () => { },
};
const AuthContext = createContext(defaultAuthUser);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(defaultAuthUser.user);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
