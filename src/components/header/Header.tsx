import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';
import Logo from "../../assets/svg/Logo";
import "../../assets/scss/components/common/header.scss";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { AuthComponentProps } from "../../types/Auth";

const Header = ({ isLogin, handleLogout }: AuthComponentProps) => {
    const [isActive, setIsActive] = useState<boolean>(false);

    const handleActiveMenuMob = () => {
        setIsActive(prev => !prev);
    }

    return (
        <header className='header'>
            <div className="container">
                <div className="header-wrapper">
                    <div className="wrapper-menu-mobile">
                        <div
                            onClick={handleActiveMenuMob}
                            className="toggle-menu-mobile">
                            <GiHamburgerMenu color="#36A9E9" size={24} />
                        </div>

                        <div className={isActive ? "menu-mobile active" : "menu-mobile"}>
                            <div onClick={handleActiveMenuMob} className="close-menu-btn">
                                <IoIosCloseCircleOutline color="red" size={24} />
                            </div>
                            <div
                                onClick={handleActiveMenuMob}
                                className="user-actions">
                                {
                                    !isLogin ?
                                        <div className='login'>
                                            <FaUser />
                                            <Link title="link para loggar" aria-label="login" to={'/login'}>
                                                Entre ou <br />
                                                Cadastre-se
                                            </Link>
                                        </div>
                                        :
                                        <nav>
                                            <ul>
                                                <li>
                                                    <Link to={"/user/trades"}>Minhas Trocas</Link>
                                                </li>
                                                <li>
                                                    <Link to={"/user/cards"}>Minha Coleção</Link>
                                                </li>
                                                <li>
                                                    <Link to={"/cards"}>Adicionar Cartas</Link>
                                                </li>
                                                <li>
                                                    <Link to={"/user/trade-card"}>Trocar Cartas</Link>
                                                </li>
                                                <li>
                                                    <button aria-label="logout" onClick={handleLogout}>Sair</button>
                                                </li>
                                            </ul>
                                        </nav>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='logo'>
                        <Link to={'/'} title="Logo pagina inicial"> <Logo /> </Link>
                    </div>

                    <div className="user-actions">
                        {
                            !isLogin ?
                                <div className='login'>
                                    <FaUser />
                                    <Link to={'/login'} aria-label="login" title="link para loggar">
                                        <strong>
                                            Entre ou <br />
                                            Cadastre-se
                                        </strong>
                                    </Link>
                                </div>
                                :
                                <nav>
                                    <ul>
                                        <li>
                                            <Link to={"/user/trades"}>Minhas Trocas</Link>
                                        </li>
                                        <li>
                                            <Link to={"/user/cards"}>Minha Coleção</Link>
                                        </li>
                                        <li>
                                            <Link to={"/cards"}>Adicionar Cartas</Link>
                                        </li>
                                        <li>
                                            <Link to={"/user/trade-card"}>Trocar Cartas</Link>
                                        </li>
                                        <li>
                                            <button aria-label="logout" onClick={handleLogout}>Sair</button>
                                        </li>
                                    </ul>
                                </nav>
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header