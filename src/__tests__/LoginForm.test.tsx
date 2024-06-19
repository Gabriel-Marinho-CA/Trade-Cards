import { render, screen } from "@testing-library/react";
import Login from "../pages/login/Login";
import LoginForm from "../components/login/LoginForm";


// IMCOMPLETE TEST 

jest.mock('react-hook-form', () => ({
    ...jest.requireActual('react-hook-form'),
    useFormContext: () => ({
        handleSubmit: () => jest.fn(),
        control: {
            register: jest.fn(),
            unregister: jest.fn(),
            getFieldState: jest.fn(),
            _names: {
                watch: new Set('test'),
                focus: 'test',
            },
            _subjects: {
                watch: jest.fn(),
                state: jest.fn(),
            },
            _getWatch: jest.fn(),
            _formValues: ['test'],
            _defaultValues: ['test'],
        },
        getValues: () => {
            return [];
        },
        setValue: () => jest.fn(),
        watch: () => jest.fn(),
        formState: {
            errors: {
                email: {
                    message: 'Email is required',
                },
            },
        },
    }),
}));

describe('Login Component', () => {
    it('should return user data', () => {
        const handleSubmit = jest.fn();
        const handleSubmitData = jest.fn();
        const register = jest.fn();

        const formState = {
            errors: {},
        };

        render(
            <LoginForm
                handleSubmit={handleSubmit}
                handleSubmitData={handleSubmitData}
                register={register}
                errors={formState.errors}
            />
        )

        const input = screen.getAllByLabelText("email");

        expect(input).toHaveProperty('type', 'email');
    })
});