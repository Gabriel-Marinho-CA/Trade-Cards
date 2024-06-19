import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

import useFetch, { BASE_URL } from '../../hooks/useFetch'

import ShowMoreButton from '../../utils/ShowMoreButton';
import CardElement from './CardElement';

import { Card, CardElementTypes } from '../../types/Card';


const AllCards = ({
    showDesc = true,
    hasAddButton = true,
    hasTradeButton = false,
    cardType = null,
    handleCardSelected,
    handleToggleSideBar,
    handleAddCard
}: CardElementTypes) => {

    const [page, setPage] = useState<number>(1);
    const [allData, setAllData] = useState<Card[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(false);


    const numberItemsPerPage = 10;
    const API_GET_ALL_CARDS_URL = `${BASE_URL}/cards?rpp=${numberItemsPerPage}&page=${page}`;
    let clean = false;


    const { data, isLoading, error } = useFetch({ url: API_GET_ALL_CARDS_URL }, page);


    const handleShowMore = () => {
        setPage(prevPage => prevPage + 1);
    }

    useEffect(() => {
        if (data) {
            setAllData(prevData => [...prevData, ...data.list]);
            setHasMore(data.more);
        }
    }, [data]);

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

    return (
        <>
            {
                allData &&
                (
                    <div className='all-collection-cards' data-next={hasMore}>
                        <ul>
                            {
                                allData.map((card: Card) => {
                                    if (card.imageUrl && card.id && card.name && card.description) {
                                        return (
                                            <li key={card.id}>
                                                <CardElement
                                                    showDesc={showDesc}
                                                    hasAddButton={hasAddButton}
                                                    hasTradeButton={hasTradeButton}
                                                    handleCardSelected={handleCardSelected}
                                                    handleToggleSideBar={handleToggleSideBar}
                                                    handleAddCard={handleAddCard}
                                                    cardType={cardType}
                                                    card={card}
                                                />
                                            </li>
                                        )
                                    }
                                })
                            }
                        </ul>
                        {
                            hasMore && <div className='btn-primary show-more-btn'><ShowMoreButton onClick={handleShowMore} /></div>
                        }
                    </div>
                )
            }
        </>
    )
}

export default AllCards