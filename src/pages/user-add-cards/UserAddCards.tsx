import React, { useEffect, useState } from 'react';
import AllCards from '../../components/cards/AllCards';
import "../../assets/scss/pages/user-add-cards.scss";
import useFetch, { BASE_URL } from '../../hooks/useFetch';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const UserAddCards = () => {

    const [submitTrigger, setSubmitTrigger] = useState<boolean>(false);
    const [cardIdToAdd, setCardIdToAdd] = useState<string | null>(null);

    const { tokenUser } = useAuth();

    const API_ADD_CARD_TO_USER_URL = `${BASE_URL}/me/cards`;

    const handleAddCard = (cardId: string) => {
        setCardIdToAdd(cardId);
        setSubmitTrigger(true);

    }

    const { data, isLoading, error } = useFetch({
        url: API_ADD_CARD_TO_USER_URL,
        method: "POST",
        body: { cardIds: [cardIdToAdd] },
        config: {
            headers: {
                Authorization: `Bearer ${tokenUser}`,
            },
        }
    }, submitTrigger);

    useEffect(() => {
        if (submitTrigger) {
            setSubmitTrigger(false);
        }
    }, [submitTrigger])


    useEffect(() => {
        if (error) {
            toast.error("Ops algo deu errado :(")
        }
        if (isLoading) {
            toast(`⏳ Carregando...`);
        }
        if (data == "") {
            toast.success(`Carta adicionada com sucesso !!!`);
        }
    }, [data, error, isLoading, submitTrigger])


    return (
        <div className='user-add-cards-page'>
            <div className="container">
                <h1>Adicione as cartas do sistema abaixo </h1>
                <AllCards
                    handleAddCard={handleAddCard}
                />
            </div>
        </div>
    )
}

export default UserAddCards