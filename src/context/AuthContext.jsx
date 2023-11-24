import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const userRole = {
  STUDENT: 'student',
  ORGANIZER: 'organizer',
}

const defaultAuthUser = {
  user: {
    uid: '',
    email: '',
    username: '',
    phone: '',
    photo: '',
    firstName: '',
    lastName: '',
    role: userRole.STUDENT,
    isAdmin: false,
    isLoggedIn: false,
    address: '',
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
