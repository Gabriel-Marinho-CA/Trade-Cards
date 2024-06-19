import { Link } from 'react-router-dom';
import { AuthFormProps } from '../../types/Auth';


const LoginForm = (
    {
        handleSubmit,
        handleSubmitData,
        register,
        errors
    }: AuthFormProps
) => {

    return (
        <form onSubmit={handleSubmit(handleSubmitData)}>
            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                    data-label="email"
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
                    data-label="password"
                    type="password"
                    {...register('password', {
                        required: {
                            value: true,
                            message: "Senha é requerida"
                        }
                    })}
                    placeholder='fulano123'
                />
                <div className="erroForm">
                    <p data-message={errors.password?.message || ""}>{errors.password?.message}</p>
                </div>
            </div>

            <div className="forget-password">
                <Link to={'/register'} title='Link para redefinir senha'>Esqueci a senha</Link>
            </div>
            <div className="submit-area">
                <button type="submit">Entrar</button>
            </div>
            <div className='sign-up-area'>
                <p>Não possui uma conta? <Link to={'/register'} title='Link para cadastrar-se'>Cadastre-se</Link> </p>
            </div>
        </form>
    )
}

export default LoginForm;