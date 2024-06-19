import React, { useEffect, useState } from 'react'
import AllCards from '../../components/cards/AllCards'
import useFetch, { BASE_URL } from '../../hooks/useFetch';
import { TradeRequestType } from '../../types/Trades';
import "../../assets/scss/pages/user-trade-cards.scss";
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { ButtonTradeStateType, CardSelectedFunctionType, CardType } from '../../types/Card';
import UserCards from '../../components/cards/UserCards';



const UserTradeCards = () => {

    const [submitTrigger, setSubmitTrigger] = useState<boolean>(false);

    const [cardsIdToTrade, setCardsIdToTrade] = useState<TradeRequestType[]>([]);

    const [isActive, setIsActive] = useState<boolean>(false);

    const { tokenUser } = useAuth();

    const API_TRADE_CARDS_URL = `${BASE_URL}/trades`;


    const handleCardSelected = ({ cardId, selected, cardType }: CardSelectedFunctionType) => {
        if (cardType) {
            if (selected === ButtonTradeStateType.ADD) {
                setCardsIdToTrade(prev => [...prev, { cardId, type: cardType }]);
            } else {
                setCardsIdToTrade(prev => prev.filter(card => card.cardId !== cardId));
            }
        }
    };


    const handleTriggerFetch = () => {
        const isTradeArrayValid = handleTradeArrayValidation();
        if (isTradeArrayValid) {
            setSubmitTrigger(true);
        }
        else {
            toast.error('Por favor selecione as cartas que deseja trocar/receber');
        }
    }

    const handleToggleSideBar = (open: boolean | null = null) => {
        const openSidebar = open || !isActive;
        setIsActive(openSidebar);
    }

    const handleTradeArrayValidation = () => {
        const hasOffering = cardsIdToTrade.some(item => item.type === 'OFFERING');

        const hasReceiving = cardsIdToTrade.some(item => item.type === 'RECEIVING');

        return hasOffering && hasReceiving;
    };


    const { data, isLoading, error } = useFetch({
        url: API_TRADE_CARDS_URL,
        method: "POST",
        body: { cards: (cardsIdToTrade) },
        config: {
            headers: {
                Authorization: `Bearer ${tokenUser}`,
            },
        }
    }, submitTrigger);


    let clean = false;

    useEffect(() => {

        if (!clean) {
            if (error) {
                toast.error("Ops algo deu errado :(")
            }
            if (isLoading) {
                toast(`⏳ Carregando...`);
            }
            if (data) {
                toast.success(`Dados enviados com sucesso :)`)
            }
        }
        return (() => {
            clean = true
        })
    }, [data, error, isLoading]);

    useEffect(() => {
        if (submitTrigger) {
            setSubmitTrigger(false);
        }
    }, [submitTrigger])


    return (
        <div className='trade-user-page container'>
            <h1>
                Escolha as cartas disponíveis para trocar
                <span onClick={() => handleToggleSideBar(null)}>
                    <RxHamburgerMenu size={18} />
                    Minhas Cartas
                </span>
            </h1>
            <div className={isActive ? "wrapper-all-system-cards active" : "wrapper-all-system-cards"}>
                <AllCards
                    hasTradeButton={true}
                    showDesc={true}
                    hasAddButton={false}
                    handleCardSelected={handleCardSelected}
                    handleToggleSideBar={handleToggleSideBar}
                    cardType={CardType.RECEIVING}
                />
            </div>
            <div className={isActive ? "side-bar all-user-cards active" : "side-bar all-user-cards"}>
                <div className="wrapper-user-cards">
                    <header className='header-side-bar'>
                        <h3>
                            Selecione as cartas que deseja oferecer
                            <span onClick={() => handleToggleSideBar(null)}><IoClose color='red' size={24} /></span>
                        </h3>
                    </header>

                    <UserCards
                        showDesc={false}
                        tradeButtonText={"Oferecer"}
                        cardType={CardType.OFFERING}
                        handleCardSelected={handleCardSelected}
                        handleToggleSideBar={handleToggleSideBar}
                        handleTriggerFetch={handleTriggerFetch}
                    />
                </div>
            </div>
        </div>
    )
}

export default UserTradeCards