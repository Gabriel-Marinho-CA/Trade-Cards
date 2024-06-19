export enum CardType {
    OFFERING = "OFFERING",
    RECEIVING = "RECEIVING"
}
export enum ButtonTradeStateType {
    ADD = "ADD",
    REMOVE = "REMOVE"
}

export interface Card {
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    createdAt?: string
}

export interface CardElementProps extends CardElementTypes {
    card: Card;
}

export interface CardElementTypes extends CardButtonFunctionType {
    hasAddButton?: boolean;
    hasTradeButton?: boolean;
    showDesc?: boolean;
    cardType?: CardType | null;
    addButtonText?: string;
    tradeButtonText?: string;
}

export interface CardButtonProps extends CardButtonFunctionType {
    text: string;
    cardId: string;
    cardType?: CardType | null;
}

export interface CardButtonFunctionType {
    handleCardSelected?: ({ cardId, selected, cardType }: { cardId: string, selected: boolean | ButtonTradeStateType, cardType: CardType | null }) => void;
    handleToggleSideBar?: (open: boolean | null) => void | undefined;
    handleTriggerFetch?: () => void;
    handleAddCard?: (cardId: string) => void;
}

export interface CardSelectedFunctionType {
    cardId: string;
    selected: ButtonTradeStateType | boolean;
    cardType: CardType | null;
}

export interface CardRemoveButtonType {
    tradeId?: string | null;
    handleTradeRemove?: (tradeId: string | null) => void;
}