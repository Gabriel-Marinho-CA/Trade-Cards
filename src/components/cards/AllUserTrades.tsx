import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useAuth } from '../../hooks/useAuth';
import useFetch, { BASE_URL } from '../../hooks/useFetch';

import { UserTrades } from '../../types/Trades';
import { CardRemoveButtonType } from '../../types/Card';
import ShowcaseContainer from '../showcase/ShowcaseContainer';


const AllUserTrades = ({
    handleTradeRemove
}: CardRemoveButtonType) => {
    const [page, setPage] = useState<number>(1);
    const [triggerFetch, setTriggerFetch] = useState<boolean>(false);

    const { tokenUser, user } = useAuth();

    const idUserLogged = user?.id;

    const numberItemsPerPage = 100;

    const API_GET_ALL_USER_TRADES = `${BASE_URL}/trades?rpp=${numberItemsPerPage}&page=${page}`;
    let clean = false;

    const { data, isLoading, error } = useFetch({
        url: API_GET_ALL_USER_TRADES,
        method: "GET",
        config: {
            headers: {
                Authorization: `Bearer ${tokenUser}`,
            },
        }
    }, triggerFetch);

    const filteredUserTradeData = data?.list?.filter((users: UserTrades) => users.userId === idUserLogged) || [];


    useEffect(() => {
        if (!clean) {
            if (error) {
                toast.error("Ops algo deu errado :(")
            }
            if (isLoading) {
                toast(`⏳ Carregando...`);
            }
            if (tokenUser) {
                setTriggerFetch(true);
            }
        }
        return (() => {
            clean = true
        })
    }, [tokenUser, error, isLoading]);

    return (
        <div className='all-user-trade-wrapper'>
            {
                (filteredUserTradeData && filteredUserTradeData.length > 0) ?
                    (
                        <ShowcaseContainer
                            allData={filteredUserTradeData}
                            handleTradeRemove={handleTradeRemove}
                        />
                    ) : (
                        <div className="empty-collection">
                            <h2>Você não possui Solicitações de Trocas :(</h2>
                            <div><Link to={'/user/trade-card'}>Clique aqui </Link><p>para trocar cartas</p></div>
                        </div>
                    )
            }
        </div>
    )
}

export default AllUserTrades