import { FaExchangeAlt } from "react-icons/fa";
import MainBanner from '../../components/banner/MainBanner';
import Showcase from '../../components/showcase/Showcase';
import "../../assets/scss/pages/home.scss";

const HomePage = () => {
    return (
        <div id="trades-home">
            <MainBanner />

            <div className="container home-content">
                <h1><span><FaExchangeAlt /></span>Confira as trocas recentes</h1>
                <Showcase />
            </div>
        </div>
    )
}

export default HomePage