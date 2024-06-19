import { useEffect, useState } from "react";
import { ButtonTradeStateType, CardButtonProps, CardSelectedFunctionType } from "../../../types/Card";

const TradeButton = ({ text, cardId, handleCardSelected, cardType = null, handleToggleSideBar }: CardButtonProps) => {

  const [isSelected, setIsSelected] = useState(false);

  const card: CardSelectedFunctionType = {
    cardId,
    selected: isSelected ? ButtonTradeStateType.REMOVE : ButtonTradeStateType.ADD,
    cardType
  }

  return (
    <button
      className={isSelected ? "cancel" : ""}
      onClick={() => {
        if (handleToggleSideBar) {
          handleToggleSideBar(true);
        }
        if (handleCardSelected) {
          handleCardSelected(card);
        }
        setIsSelected(!isSelected);
      }}>
      {
        isSelected ? "Cancelar" : text
      }
    </button>
  );
}

export default TradeButton

