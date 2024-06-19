import { Link } from 'react-router-dom';
import { AuthFormProps } from '../../types/Auth';

const RegisterForm = ({
    handleSubmit,
    handleSubmitData,
    register,
    watch,
    errors
}: AuthFormProps) => {
    return (
        <form onSubmit={handleSubmit(handleSubmitData)}>
            <div className="input-group">
                <label htmlFor="nome">Nome</label>
                <input
                    type="nome"
                    placeholder='Fulano de tal'
                    {...register('name', {
                        required: {
                            value: true,
                            message: "Nome é requerido"
                        }
                    })}

                />
                <div className="erroForm">
                    <p data-message={errors.name?.message || ""}>{errors.name?.message}</p>
                </div>


            </div>
            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    placeholder='fulano@gmail.com'
                    {...register('email', {
                        required: {
                            value: true,
                            message: "Email é requerido"
                        },
                        pattern: {
                            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                            message: "Por favor digite um email válido"
                        }
                    })}

                />
                <div className="erroForm">
                    <p data-message={errors.email?.message || ""}>{errors.email?.message}</p>
                </div>

            </div>
            <div className="input-group">
                <label htmlFor="password">senha</label>
                <input
                    {...register('password', {
                        required: {
                            value: true,
                            message: "Senha é requerida"
                        }
                    })}
                    type="password"
                    placeholder='fulano123'
                />
                <div className="erroForm">
                    <p data-message={errors.password?.message || ""}>{errors.password?.message}</p>
                </div>
            </div>
            <div className="input-group">
                <label htmlFor="confirmPassword">Confirmar senha</label>

                <input
                    {...register('confirmPassword', {
                        required: {
                            value: true,
                            message: "Senha é requerida"
                        },
                        validate: (value) => {
                            if (!watch) return "Watch function is undefined";
                            return value === watch('password') || "Senhas diferentes";
                        },
                    })}
                    type="password"
                    placeholder='fulano123'
                />
                <div className="erroForm">
                    <p data-message={errors.confirmPassword?.message || ""}>{errors.confirmPassword?.message}</p>
                </div>
            </div>
            <div className="submit-area">
                <button type="submit">Entrar</button>
            </div>
            <div className='sign-up-area'>
                <p>Já possui uma conta? <Link to={'/login'} title='Link para Entrar'>Faça login</Link> </p>
            </div>
        </form>
    )
}

export default RegisterForm