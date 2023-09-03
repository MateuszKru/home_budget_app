import UnauthenticatedApp from '../Apps/UnauthenticatedApp'
import AuthenticatedApp from './AuthenticatedApp'
import useToken from '../../services/useToken'

export type setTokenFunc = {
    setToken: any
}

export type removeTokenFunc = {
    removeToken: any
}

export type getTokenFunc = {
    getToken: any
}

export type tokenFunc = setTokenFunc & removeTokenFunc

const App = () => {
    const { token, setToken, removeToken } = useToken()

    if (!token) {
        return <UnauthenticatedApp setToken={setToken} />
    }

    return <AuthenticatedApp />
}

export default App
