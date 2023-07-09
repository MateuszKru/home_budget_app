import { useState } from 'react';

export default function useToken() {

    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        if (tokenString) {
            const userToken = JSON.parse(tokenString);
            return userToken;
        };
    };

    const [token, setToken] = useState(getToken());

    function saveToken(userToken: string): any {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
    };
    function removeToken(): void {
        localStorage.removeItem('token');
    };

    return {
        getToken,
        setToken: saveToken,
        removeToken,
        token
    };
};