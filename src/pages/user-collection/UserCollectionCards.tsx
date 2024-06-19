import React from 'react'

import UserCards from '../../components/cards/UserCards';

import "../../assets/scss/pages/user-cards-collection.scss"

const UserCollectionCards = () => {

    return (
        <div className='user-collection-page'>
            <div className="container">
                <h1>Minha Coleção</h1>
                <UserCards />
            </div>
        </div>
    )
}

export default UserCollectionCards