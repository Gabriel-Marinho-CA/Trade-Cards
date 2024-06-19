import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

import { useAuth } from '../../hooks/useAuth';
import useFetch, { BASE_URL } from '../../hooks/useFetch';

import { AuthComponentProps, User } from '../../types/Auth';
import LoginForm from '../../components/Login/LoginForm';

import "../../assets/scss/pages/auth.scss";

const Login = () => {

    const [submitTrigger, setSubmitTrigger] = useState<boolean>(false);
    const [formData, setFormData] = useState<User | null>(null);

    const API_LOGIN_URL = `${BASE_URL}/login`;
    let clean = false;

    const { handleLogin } = useAuth();


    const { register, handleSubmit, formState, reset } = useForm<User>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    });

    const { errors, isValid } = formState;

    const { data, isLoading, error } = useFetch({
        url: API_LOGIN_URL,
        method: "POST",
        body: formData,
    }, submitTrigger);


    const handleSubmitData = (data: User) => {
        if (isValid) {
            setFormData({
                email: data.email,
                password: data.password
            });

            setSubmitTrigger(true);
            reset();
        }
    }

    useEffect(() => {

        if (!clean) {
            if (error) {
                toast.error("Ops algo deu errado ou senha login/senha incorreta :(")
            }
            if (data) {
                toast.success(`Redirecionando...`);

                setTimeout(() => handleLogin(data), 1000);
            }
        }
        return (() => {
            clean = true
        })
    }, [data, error])


    return (
        <div className='login-page auth-page'>
            <div className="container">
                <div className="wrapper-auth-content">
                    <h2>Entre ou Cadastre-se</h2>
                    <LoginForm
                        handleSubmit={handleSubmit}
                        register={register}
                        handleSubmitData={handleSubmitData}
                        errors={errors}
                    />
                </div>
            </div>
        </div>
    )
}

export default Login