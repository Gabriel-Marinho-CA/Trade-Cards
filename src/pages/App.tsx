import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { AuthProvider, useAuth } from '../hooks/useAuth';

const App = () => {
    const { handleLogout, isLogged } = useAuth();

    return (
        <div className='App'>
            <Header
                handleLogout={handleLogout}
                isLogin={isLogged}
            />
            <main>
                <Outlet
                />
            </main>
            <Footer />
        </div>
    )
}

export default App