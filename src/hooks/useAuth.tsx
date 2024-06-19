import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContextType, User, UserLogin } from '../types/Auth';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';


const AuthContext = createContext<AuthContextType | undefined>(undefined);


const AuthProvider = ({ children }: any) => {

    const [user, setUser] = useState<User | null>(null);
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [tokenUser, setTokenUser] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleLogin = ({ token, user }: UserLogin) => {
        setUser(user);
        setIsLogged(true);
        setTokenUser(token);

        if (token && user) {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        }

        navigate("/");
    };

    const handleLogout = () => {
        setUser(null);
        setIsLogged(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate("/");
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsLogged(true);
                setTokenUser(storedToken);
            } catch (error) {
                console.error("Failed to parse user from local storage", error);
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, tokenUser, isLogged, handleLogin, handleLogout }}>
            {children}

            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </AuthContext.Provider>
    )

}


const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}


export { AuthProvider, useAuth };