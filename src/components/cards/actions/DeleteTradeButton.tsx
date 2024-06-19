import { FaTrashAlt } from "react-icons/fa";
import { CardRemoveButtonType } from "../../../types/Card";


const DeleteTradeButton = ({ tradeId, handleTradeRemove }: CardRemoveButtonType) => {
    return (
        <>
            <button onClick={() => {
                (handleTradeRemove && tradeId) && handleTradeRemove(tradeId)
            }
            }><span><FaTrashAlt color='white' size={14} /></span>Cancelar troca </button>
        </>

    )
}

export default DeleteTradeButton