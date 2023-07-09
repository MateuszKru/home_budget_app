import React, { useState } from 'react';
import SendRequest from '../services/APIService'
import useNavigateService from '../services/useNavigateService'
import FormLabel from '../components/formLabel';
import FormInputError from '../components/formInputError';

type User = {
    email: string;
    password: string;
};

type AppUser = {
    firstName: string,
    lastName: string,
    email: string,
    token: string,
};
type setTokenFunc = {
    setToken: any
}

const Login = (setToken: setTokenFunc) => {
    const [userEmail, setUserEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [appUser, setAppUser] = useState<AppUser>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const { goTo } = useNavigateService();


    async function loginUser(credentials: User) {
        const response = await SendRequest({ url: "User/login", method: "POST", body: credentials });
        return response;
    };

    const handleSubmit = async (e: any) => {
        setIsLoading(true);
        setError(null);
        e.preventDefault();

        try {
            const result = await loginUser({ email: userEmail, password: password });
            if (result.status === 200) {
                const user = await result.json() as AppUser;
                setAppUser(user);
                const token: string = user.token;
                setToken.setToken(token);
                goTo('/Budget');
            }
            if (result.status === 400) {
                const errorResult = await result.json();
                setError(errorResult.errors);
                setPassword("");
                setUserEmail("");
            }
        }
        catch (error) {
            setError(error);
        }
        finally {
            setIsLoading(false);
        }

    }

    if (isLoading) {
        return <div>Ładowanie...</div>;
    }

    return (
        <>
            <div>
                <h1>Logowanie</h1>
                <form onSubmit={handleSubmit}>
                    <FormLabel
                        name="Email"
                        type="text"
                        onChange={(e: any) => setUserEmail(e.target.value)}
                    />
                    {error && <FormInputError error={error['Email']} />}
                    <FormLabel
                        name="Hasło"
                        type="password"
                        onChange={(e: any) => setPassword(e.target.value)}
                    />
                    {error && <FormInputError error={error['Password']} />}
                    {error && <FormInputError error={error['Credentials']} />}
                    <div>
                        <button type="submit">Zaloguj</button>
                    </div>
                </form>
                <button onClick={() => goTo('/register')}>Przejdź do rejestracji</button>
            </div>
        </>

    );

};
export default Login;