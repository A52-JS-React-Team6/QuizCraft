import { NavLink } from 'react-router-dom';
import './NavBar.css';
// import { UserSettings } from '../UserSettings/UserSettings';
import { logoutUser } from '../../services/auth.services';
import { useAuth, userRole } from '../../context/AuthContext';
import { Button, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export function NavBar() {

    const navigate = useNavigate();
    const toast = useToast();
    const { user, setUser } = useAuth();

    const onLogout = () => {
        logoutUser();
        setUser({
            isLoggedIn: false,
        });
        toast({
            title: "You have logged out successfully.",
            status: "success",
            duration: 3000,
            isClosable: true
        });
        navigate('/signin');
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
                    <NavLink to='/sample-quiz' className={({ isActive }) => isActive ? 'navigation-link navigation-link-active' : 'navigation-link'}>Take a sample quiz </NavLink>
                    <NavLink to='/student-dashboard' className={({ isActive }) => isActive ? 'navigation-link navigation-link-active' : 'navigation-link'}>Student Dashboard</NavLink>
                    {user?.isLoggedIn && user?.role === userRole.EDUCATOR &&
                        <NavLink to='/create-quiz' className={({ isActive }) => isActive ? 'navigation-link navigation-link-active' : 'navigation-link'}>Create a Quiz</NavLink>
                    }
                    {user?.isLoggedIn && user?.role === userRole.STUDENT &&
                        <NavLink to='/scoreboard' className={({ isActive }) => isActive ? 'navigation-link navigation-link-active' : 'navigation-link'}>Score Board</NavLink>
                    }
                    {user?.isLoggedIn ? (
                        <>
                            <NavLink onClick={onLogout} className='navigation-link'>Logout</NavLink>
                            <NavLink to='/api-response' className={({ isActive }) => isActive ? 'navigation-link navigation-link-active' : 'navigation-link'}>API response</NavLink>
                            {user?.isAdmin && <NavLink to='/admin-page' className={({ isActive }) => isActive ? 'navigation-link navigation-link-active' : 'navigation-link'}>Admin Page</NavLink>}
                        </>
                    ) : (
                        <>
                            <NavLink to='/signin' className={({ isActive }) => isActive ? 'navigation-link navigation-link-active' : 'navigation-link'}>Sign In</NavLink>
                            <NavLink to='/registration' className={({ isActive }) => isActive ? 'navigation-link navigation-link-active' : 'navigation-link'}>Registration</NavLink>
                        </>
                    )}
                </div>
            </div>
            {user?.isLoggedIn && (
                <div className='logged-as'>
                    Logged as: {user.username} {user.isAdmin && '(Admin)'}
                </div>
            )}
        </nav>
    );
}
