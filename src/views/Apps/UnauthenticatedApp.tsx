import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../UnauthenticatedAppViews/Login'
import Register from '../UnauthenticatedAppViews/Register'
import { setTokenFunc } from './App'

const UnauthenticatedApp = ({ setToken }: setTokenFunc) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Login setToken={setToken} />} />
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default UnauthenticatedApp
