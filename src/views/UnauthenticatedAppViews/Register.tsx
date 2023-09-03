import React, { useState } from 'react'
import sendRequest from '../../services/APIService'
import useNavigateService from '../../services/useNavigateService'
import LoadingSpinner from '../../components/molecules/Loader/Loader'
import FormLabel from '../../components/molecules/FormComponents/FormLabel/FormLabel'
import FormButton from '../../components/molecules/FormComponents/FormButton'
import { UnauthenticatedAppViewWrapper } from '../../components/atoms/Div/UnauthenticatedAppViewWrapper.'
import { ButtonContainer } from '../../components/atoms/Div/ButtonContainer.styles'
import { Title } from '../../components/atoms/Title/Title.styles.'
import { Span } from '../../components/atoms/Span/Span.styles.'

type newUser = {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
}
type requestBody = {
    newUser: newUser
}

const Register = () => {
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [userEmail, setUserEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<any>(null)
    const { goTo } = useNavigateService()

    async function registerUser(requestBody: requestBody) {
        const response = await sendRequest({
            url: 'User/register',
            method: 'POST',
            body: requestBody,
        })
        return response
    }

    const handleSubmit = async (e: any) => {
        setIsLoading(true)
        setError(null)
        e.preventDefault()

        try {
            const newUser: newUser = {
                email: userEmail,
                password: password,
                confirmPassword: confirmPassword,
                firstName: firstName,
                lastName: lastName,
            }
            const requestBody: requestBody = { newUser: newUser }
            const result = await registerUser(requestBody)
            if (result.status === 200) {
                goTo('/login')
            }
            if (result.status === 400) {
                const errorResult = await result.json()
                setError(errorResult.errors)
            }
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return <LoadingSpinner title="Rejestracja..." />
    }

    return (
        <>
            <UnauthenticatedAppViewWrapper>
                <Title>Rejestracja</Title>
                <form onSubmit={handleSubmit}>
                    <FormLabel
                        name="Imię:"
                        type="text"
                        onChange={(e: any) => setFirstName(e.target.value)}
                        errorsMessage={
                            error && error['NewUser.FirstName']
                                ? error['NewUser.FirstName']
                                : ''
                        }
                    />
                    <FormLabel
                        name="Nazwisko:"
                        type="text"
                        onChange={(e: any) => setLastName(e.target.value)}
                        errorsMessage={
                            error && error['NewUser.LastName']
                                ? error['NewUser.LastName']
                                : ''
                        }
                    />
                    <FormLabel
                        name="Email:"
                        type="text"
                        onChange={(e: any) => setUserEmail(e.target.value)}
                        errorsMessage={
                            error && error['NewUser.Email']
                                ? error['NewUser.Email']
                                : ''
                        }
                    />
                    <FormLabel
                        name="Hasło:"
                        type="password"
                        onChange={(e: any) => setPassword(e.target.value)}
                        errorsMessage={
                            error && error['NewUser.Password']
                                ? error['NewUser.Password']
                                : ''
                        }
                    />
                    <FormLabel
                        name="Powtóz hasło:"
                        type="password"
                        onChange={(e: any) =>
                            setConfirmPassword(e.target.value)
                        }
                        errorsMessage={
                            error && error['NewUser.ConfirmPassword']
                                ? error['NewUser.ConfirmPassword']
                                : ''
                        }
                    />
                    <ButtonContainer>
                        <FormButton title="Zarejestruj" type="submit" />
                        <Span>lub</Span>
                        <FormButton
                            title="Przejdź do logowania"
                            type="button"
                            onClick={() => goTo('/login')}
                        />
                    </ButtonContainer>
                </form>
            </UnauthenticatedAppViewWrapper>
        </>
    )
}
export default Register
