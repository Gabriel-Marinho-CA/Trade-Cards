import React from 'react';

import { CardButtonProps } from '../../../types/Card';

const AddCardButton = ({ cardId, text, handleAddCard }: CardButtonProps) => {

    return <button
        onClick={() => handleAddCard && handleAddCard(cardId)}
        className='add-card-btn'>{text}</button>
}

export default AddCardButton