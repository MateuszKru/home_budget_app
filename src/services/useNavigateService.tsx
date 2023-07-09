import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function useNavigateService() {
    const navigate = useNavigate();

    function goTo(path: string): void {
        navigate(path)
    };

    return {
        goTo
    };
};