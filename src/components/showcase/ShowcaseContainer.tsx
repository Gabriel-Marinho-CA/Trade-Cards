import { FaExchangeAlt } from "react-icons/fa";
import { ShowcaseContainerProps, UserTrades } from '../../types/Trades';
import TradeUserList from './TradeUserList';
import ShowMoreButton from '../../utils/ShowMoreButton';
import { CardType } from "../../types/Card";
import DeleteTradeButton from "../cards/actions/DeleteTradeButton";


const ShowcaseContainer = (
    {
        allData,
        hasMore,
        handleTradeRemove,
        handleShowMore
    }: ShowcaseContainerProps
) => {
    return (
        <div className='showcase'>
            {
                allData && <div className="wrapper-showcase" data-next={hasMore}>
                    {
                        allData.map((trade: UserTrades) => {
                            const { tradeCards, user, id } = trade;

                            if (tradeCards.length > 0) {

                                const OfferringUserCards = tradeCards.filter((cards) => cards.type === CardType.OFFERING);
                                const ToReceiveUserCards = tradeCards.filter((card) => card.type === CardType.RECEIVING);

                                return (
                                    <div key={`${id}`} className="user-trade">
                                        <div className="user-name-action">
                                            <h3>
                                                User: <strong>{user.name}</strong>
                                            </h3>
                                            {
                                                handleTradeRemove && (
                                                    <div className="delete-button">
                                                        <DeleteTradeButton
                                                            handleTradeRemove={handleTradeRemove}
                                                            tradeId={id} />
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className="user-cards-trade">
                                            <div className="wrapper-container-slider" data-elements={OfferringUserCards.length}>
                                                <TradeUserList data={OfferringUserCards} isOffering={true} />
                                            </div>

                                            <div className="change-image">
                                                <FaExchangeAlt size={30} />
                                            </div>

                                            <div className="wrapper-container-slider" data-elements={ToReceiveUserCards.length}>
                                                <TradeUserList data={ToReceiveUserCards} isOffering={false} />

                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                    {
                        hasMore && <div className="show-more-btn btn-primary"> <ShowMoreButton onClick={handleShowMore} /> </div>
                    }
                </div>
            }
        </div>

    )
}

export default ShowcaseContainer