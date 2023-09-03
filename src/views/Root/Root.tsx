import { ThemeProvider } from 'styled-components'
import App from '../Apps/App'
import { theme } from '../../assets/styles/theme'
import { GlobalStyle } from '../../assets/styles/GlobalStyle'
import { AppWrapper } from './Root.styles.'

const Root = () => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <AppWrapper>
                <App />
            </AppWrapper>
        </ThemeProvider>
    )
}

export default Root
