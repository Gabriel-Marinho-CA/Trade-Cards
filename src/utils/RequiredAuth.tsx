import { Navigate, Outlet } from 'react-router-dom'
import { UserLogin } from '../types/Auth';
import { useAuth } from '../hooks/useAuth';

const RequiredAuth = () => {

    const loginToken = localStorage.getItem('token');


    if (!loginToken) {
        return <Navigate to={'/login'} />
    }

    return <Outlet />
};

export default RequiredAuth;