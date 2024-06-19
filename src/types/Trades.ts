import { Card, CardType } from "./Card"

export interface TradeCards {
    id: string;
    cardId: string;
    tradeId: string;
    type: CardType
    card: Card
}

export interface UserTrades {
    id: string;
    userId: string;
    createdAt?: string;
    user: {
        name: string;
    }
    tradeCards: TradeCards[];
}

export interface TradeRequestType {
    cardId: string;
    type: CardType;
}


export interface ShowcaseContainerProps {
    allData: UserTrades[];
    hasMore?: boolean;
    handleShowMore?: () => void
    handleTradeRemove?: (tradeId: string | null) => void;
}