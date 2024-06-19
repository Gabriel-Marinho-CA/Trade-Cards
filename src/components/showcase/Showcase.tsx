import useFetch, { BASE_URL } from '../../hooks/useFetch';
import { UserTrades } from '../../types/Trades';

import { useEffect, useState } from "react";
import ShowcaseContainer from './ShowcaseContainer';
import toast from 'react-hot-toast';

const Showcase = () => {
    const [page, setPage] = useState<number>(1);
    const [allData, setAllData] = useState<UserTrades[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(false);

    const numberItemsPerPage = 5;

    const API_URL = `${BASE_URL}/trades?rpp=${numberItemsPerPage}&page=${page}`;
    let clean = false;

    const { data, isLoading, error } = useFetch({
        url: API_URL
    }, page);


    useEffect(() => {
        if (!clean) {
            if (error) {
                toast.error("Ops algo deu errado :(")
            }
            if (isLoading) {
                toast(`⏳ Carregando...`);
            }
            if (data) {
                setAllData(prevData => [...prevData, ...data.list]);
                setHasMore(data.more);
            }
        }
        return (() => {
            clean = true
        })
    }, [data, error, isLoading])

    const handleShowMore = () => {
        setPage(prevPage => prevPage + 1);
    }

    return (
        <ShowcaseContainer
            allData={allData}
            hasMore={hasMore}
            handleShowMore={handleShowMore}
        />
    )
}

export default Showcase
