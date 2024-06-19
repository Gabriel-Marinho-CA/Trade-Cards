import React from 'react';
import { Link } from 'react-router-dom';
import "../../assets/scss/pages/error.scss";

const ErrorPage = () => {
    return (
        <div className='error-page'>
            <h1>
                Error 404
            </h1>
            <Link to={'/'} title='voltar para pagina inicial'>Cliquei aqui para voltar</Link>
        </div>
    )
}

export default ErrorPage