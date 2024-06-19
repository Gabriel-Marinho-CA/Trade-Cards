
import { useEffect, useState } from "react";
import toast, { Toaster, resolveValue } from "react-hot-toast";


import { useAuth } from "../../hooks/useAuth";
import useFetch, { BASE_URL } from "../../hooks/useFetch";

import AllUserTrades from "../../components/cards/AllUserTrades";
import "../../assets/scss/pages/user-trade-collection.scss";



const UserTradesCollection = () => {
  const [submitTrigger, setSubmitTrigger] = useState<boolean>(false);
  const [removeTradeId, setRemoveTradeId] = useState<string | null>(null);

  const { tokenUser } = useAuth();


  const API_DELETE_TRADE_URL = `${BASE_URL}/trades/${removeTradeId}`;
  let clean = false;


  const { data, isLoading, error } = useFetch({
    url: API_DELETE_TRADE_URL,
    method: "DELETE",
    config: {
      headers: {
        Authorization: `Bearer ${tokenUser}`,
      },
    }
  }, submitTrigger);


  const handleTradeRemove = (tradeId: string | null) => {
    if (window.confirm('Tem certeza que quer prosseguir?')) {
      setRemoveTradeId(tradeId);
      setSubmitTrigger(true);
    } else {
      toast.error("Cancelamento de troca não prosseguido")
    }
  }

  useEffect(() => {
    if (!clean) {
      if (error) {
        toast.error("Ops algo deu errado :(")
      }
      if (isLoading) {
        toast(`⏳ Carregando...`);
      }
      if (data == "") {
        toast.success(`Troca removida com sucesso :)`)
      }
    }
    return (() => {
      clean = true
    })
  }, [data, error, isLoading, submitTrigger]);


  useEffect(() => {
    if (submitTrigger) {
      setSubmitTrigger(false);
    }
  }, [submitTrigger]);


  return (
    <div className="user-trade-collection-page">
      <div className="container">
        <h1>Minhas trocas</h1>
        <AllUserTrades
          handleTradeRemove={handleTradeRemove}
        />
      </div>
    </div>
  )

}

export default UserTradesCollection

