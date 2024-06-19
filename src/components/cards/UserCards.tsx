import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import toast from 'react-hot-toast';

import useFetch, { BASE_URL } from '../../hooks/useFetch';
import { useAuth } from '../../hooks/useAuth';

import CardElement from '../../components/cards/CardElement';

import { Card, CardElementTypes } from '../../types/Card';

import "../../assets/scss/pages/user-cards-collection.scss";


const UserCards = (
    {
        showDesc = true,
        tradeButtonText,
        cardType,
        handleCardSelected,
        handleTriggerFetch
    }: CardElementTypes
) => {

    const [triggerFetch, setTriggerFetch] = useState<boolean>(false);

    const { tokenUser } = useAuth();

    const API_GET_USER_DATA = `${BASE_URL}/me/cards`;
    let clean = false;

    const { data, isLoading, error } = useFetch({
        url: API_GET_USER_DATA,
        method: "GET",
        config: {
            headers: {
                Authorization: `Bearer ${tokenUser}`
            }
        }
    }, triggerFetch);


    useEffect(() => {

        if (!clean) {
            if (error) {
                toast.error("Ops algo deu errado :(")
            }
            if (isLoading) {
                toast(`⏳ Carregando...`);
            }
        }
        return (() => {
            clean = true
        })
    }, [error, isLoading])


    useEffect(() => {
        if (tokenUser) setTriggerFetch(true);
    }, [tokenUser])


    return (
        <>
            {
                data && data.length > 0 ? (
                    <div className="user-cards-collection">
                        <ul>
                            {
                                data.map((card: Card) => {
                                    return <li key={card.id}>
                                        <CardElement
                                            hasTradeButton={true}
                                            showDesc={showDesc}
                                            hasAddButton={false}
                                            tradeButtonText={tradeButtonText}
                                            handleCardSelected={handleCardSelected}
                                            cardType={cardType}
                                            card={card} />
                                    </li>
                                })
                            }
                        </ul>
                        {
                            handleTriggerFetch && <div className="btn-primary confirm-trade">
                                <button onClick={handleTriggerFetch}>Confirmar</button>
                            </div>
                        }

                    </div>
                ) :
                    (
                        <div className='empty-collection'>
                            <h4>Sua coleção está vazia :(</h4>
                            <div><Link to={'/cards'}>Clique aqui </Link><p>para adicionar cartas</p></div>
                        </div>
                    )
            }
        </>
    )
}

export default UserCards