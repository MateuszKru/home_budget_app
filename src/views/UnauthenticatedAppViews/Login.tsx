import React, { useState } from 'react'
import SendRequest from '../../services/APIService'
import useNavigateService from '../../services/useNavigateService'
import LoadingSpinner from '../../components/molecules/Loader/Loader'
import FormLabel from '../../components/molecules/FormComponents/FormLabel/FormLabel'
import FormButton from '../../components/molecules/FormComponents/FormButton'
import { ButtonContainer } from '../../components/atoms/Div/ButtonContainer.styles'
import { setTokenFunc } from '../Apps/App'
import { Title } from '../../components/atoms/Title/Title.styles.'
import { Span } from '../../components/atoms/Span/Span.styles.'
import { UnauthenticatedAppViewWrapper } from '../../components/atoms/Div/UnauthenticatedAppViewWrapper.'

type User = {
    email: string
    password: string
}

type AppUser = {
    firstName: string
    lastName: string
    email: string
    token: string
}

const Login = ({ setToken }: setTokenFunc) => {
    const [userEmail, setUserEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [appUser, setAppUser] = useState<AppUser>()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<any>(null)
    const { goTo } = useNavigateService()

    async function loginUser(credentials: User) {
        const response = await SendRequest({
            url: 'User/login',
            method: 'POST',
            body: credentials,
        })
        return response
    }

    const handleSubmit = async (e: any) => {
        setIsLoading(true)
        setError(null)
        e.preventDefault()

        try {
            const result = await loginUser({
                email: userEmail,
                password: password,
            })
            if (result.status === 200) {
                const user = (await result.json()) as AppUser
                setAppUser(user)
                const token: string = user.token
                setToken(token)
                goTo('/budgetList')
            }
            if (result.status === 400) {
                const errorResult = await result.json()
                setError(errorResult.errors)
                setPassword('')
                setUserEmail('')
            }
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return <LoadingSpinner title="Logowanie..." />
    }

    return (
        <>
            <UnauthenticatedAppViewWrapper>
                <Title>Logowanie</Title>
                <form onSubmit={handleSubmit}>
                    <FormLabel
                        name="Email:"
                        type="text"
                        onChange={(e: any) => setUserEmail(e.target.value)}
                        errorsMessage={
                            error && error['Email'] ? error['Email'] : ''
                        }
                    />
                    <FormLabel
                        name="Hasło:"
                        type="password"
                        onChange={(e: any) => setPassword(e.target.value)}
                        errorsMessage={
                            (error && error['Password']
                                ? error['Password']
                                : '') +
                            ' ' +
                            (error && error['Credentials']
                                ? error['Credentials']
                                : '')
                        }
                    />
                    <ButtonContainer>
                        <FormButton title="Zaloguj" type="submit" />
                        <Span>lub</Span>
                        <FormButton
                            title="Przejdź do rejestracji"
                            type="button"
                            onClick={() => goTo('/register')}
                        />
                    </ButtonContainer>
                </form>
            </UnauthenticatedAppViewWrapper>
        </>
    )
}
export default Login
