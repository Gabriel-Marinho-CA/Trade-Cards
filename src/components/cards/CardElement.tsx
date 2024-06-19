import AddCardButton from './actions/AddCardButton';

import { FaCircleQuestion } from "react-icons/fa6";
import TradeButton from './actions/TradeButton';
import { CardElementProps } from '../../types/Card';


const CardElement = ({
  card,
  hasAddButton = false,
  showDesc = false,
  hasTradeButton = false,
  addButtonText = "Adicionar",
  tradeButtonText = "Trocar",
  cardType = null,
  handleCardSelected,
  handleToggleSideBar,
  handleAddCard
}: CardElementProps) => {

  if (!(card && card.id && card.imageUrl && card.description && card.name)) {
    return null;
  }

  return (
    <div className='card-element' data-id={card.id} aria-label={card.name}>
      <img
        src={card.imageUrl}
        alt={card.name}
        loading='lazy'
      />
      <div className="card-name-wrapper">
        <h3 className='card-name'>{card.name}</h3>
      </div>

      {
        showDesc && <div className="description">
          <div className="icon">
            <FaCircleQuestion size={24} color='#36A9E9' />
          </div>
          <p className='descriptionText'>{card.description}</p>
        </div>

      }

      {
        hasAddButton && <div className="addCard btn-primary">
          <AddCardButton
            handleAddCard={handleAddCard}
            cardId={card.id}
            text={addButtonText} />
        </div>
      }
      {hasTradeButton && handleCardSelected && (
        <div className="tradeButton btn-primary">
          <TradeButton
            handleCardSelected={handleCardSelected}
            handleToggleSideBar={handleToggleSideBar}
            cardId={card.id}
            text={tradeButtonText}
            cardType={cardType}
          />
        </div>
      )}

    </div>
  )
}

export default CardElement