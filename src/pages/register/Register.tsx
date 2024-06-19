import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';

import useFetch, { BASE_URL } from '../../hooks/useFetch';

import RegisterForm from '../../components/register/RegisterForm'
import { User } from '../../types/Auth';

import "../../assets/scss/pages/auth.scss";
import toast from 'react-hot-toast';

const Register = () => {
    const [submitTrigger, setSubmitTrigger] = useState<boolean>(false);
    const [formData, setFormData] = useState<User | null>(null);

    const API_REGISTER_URL = `${BASE_URL}/register`;
    let clean = false;


    const navigate = useNavigate();

    const { register, handleSubmit, formState, reset, watch } = useForm<User>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    });

    const { errors, isValid } = formState;

    const { data, isLoading, error } = useFetch({
        url: API_REGISTER_URL,
        method: "POST",
        body: formData,

    }, submitTrigger);


    const handleSubmitData = (data: User) => {

        if (isValid) {
            setFormData({
                name: data.name,
                email: data.email,
                password: data.password
            });
            setSubmitTrigger(prev => !prev);
        }
        reset();
    }


    useEffect(() => {
        if (!clean) {
            if (error) {
                toast.error("Ops algo deu errado :(")
            }
            if (data) {
                toast.success(`Cadastrado com sucesso :)`);

                setTimeout(() => navigate("/login"), 1500);

            }
        }
        return (() => {
            clean = true
        })
    }, [data, error]);


    return (
        <div className='register-page auth-page'>
            <div className="container">
                <div className="wrapper-auth-content">
                    <h2>Cadastre-se</h2>
                    <RegisterForm
                        handleSubmit={handleSubmit}
                        register={register}
                        handleSubmitData={handleSubmitData}
                        watch={watch}
                        errors={errors}
                    />
                </div>
            </div>
        </div>
    )
}

export default Register