import { FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormWatch } from "react-hook-form";

export interface User {
    email: string;
    password: string;
    name?: string;
    id?: string;
    confirmPassword?: string;
}

export interface UserLogin {
    token: string | null;
    user: User | null;
}

export interface AuthContextType {
    user: User | null;
    isLogged: boolean;
    handleLogin: ({ user, token }: UserLogin) => void;
    tokenUser?: string | null;
    handleLogout?: () => void;
}

export interface AuthComponentProps {
    auth?: AuthContextType | undefined;
    handleLogout?: () => void;
    handleLogin?: ({ user, token }: UserLogin) => void;
    isLogin?: boolean;
}

interface FormProps extends User {
    confirmPassword?: string
}


export interface AuthFormProps {
    handleSubmit: UseFormHandleSubmit<User, undefined>;
    register: UseFormRegister<User>;
    errors: FieldErrors<User>;
    handleSubmitData: (data: User) => void;
    watch?: UseFormWatch<FormProps>;
    confirmPassword?: string;
}


