import { NavLink } from 'react-router-dom';
import './NavBar.css';
// import { UserSettings } from '../UserSettings/UserSettings';
import { logoutUser } from '../../services/auth.services';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


export function NavBar() {

    const navigate = useNavigate();
    const toast = useToast();
    const { user, setUser } = useAuth();

    const onLogout = () => {
        logoutUser();
        setUser({
            authUser: null,
            userDetails: null,
        });
        toast({
            title: "You have logged out successfully.",
            status: "success",
            duration: 3000,
            isClosable: true
        });
        navigate('/');
    }
    return (
        <nav className='nav'>
            <div className='nav-center'>
                <div className='nav-links'>
                    <NavLink to='/' className={({ isActive }) => isActive ? 'navigation-link navigation-link-active' : 'navigation-link'}>Home</NavLink>
                    {/* {user?.authUser && (
                <>
                  <NavLink to='/forum' className={({ isActive }) => isActive ? 'navigation-link navigation-link-active' : 'navigation-link'}>Forum</NavLink>
                </>
              )} */}
                    <NavLink to='/about' className={({ isActive }) => isActive ? 'navigation-link navigation-link-active' : 'navigation-link'}>About</NavLink>
                    <NavLink to='/sampleQuiz' className={({ isActive }) => isActive ? 'navigation-link navigation-link-active' : 'navigation-link'}>Take a sample quiz </NavLink>
                    <NavLink to='/create-quiz' className={({ isActive }) => isActive ? 'navigation-link navigation-link-active' : 'navigation-link'}>Create a Quiz</NavLink>
                    {user?.authUser ? (
                        <UserSettings username={user.userDetails?.username} onLogout={onLogout} />
                    ) : (
                        <>
                            <NavLink to='/signin' className={({ isActive }) => isActive ? 'navigation-link navigation-link-active' : 'navigation-link'}>Sign In</NavLink>
                            <NavLink to='/registration' className={({ isActive }) => isActive ? 'navigation-link navigation-link-active' : 'navigation-link'}>Registration</NavLink>
                        </>
                    )}
                </div>
            </div>
            {user?.authUser && (
                <div className='logged-as'>
                    Logged as: {user.userDetails?.username} {user.userDetails?.isAdmin && '(Admin)'}
                </div>
            )}
        </nav>
    );
}
