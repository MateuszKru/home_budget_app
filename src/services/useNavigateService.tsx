import React from 'react'
import { useNavigate } from 'react-router-dom'
import useToken from '../services/useToken'

export default function useNavigateService() {
    const navigate = useNavigate()
    const { removeToken } = useToken()

    function goTo(path: string): void {
        navigate(path)
    }

    function Logout() {
        removeToken()
        goTo('/login')
        window.location.reload()
    }

    return {
        goTo,
        Logout,
    }
}
