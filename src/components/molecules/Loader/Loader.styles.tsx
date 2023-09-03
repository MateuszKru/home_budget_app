import styled, { keyframes } from 'styled-components'

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

export const Loader = styled.div`
    border: 0.5em solid ${({ theme }) => theme.colors.darkPurple};
    border-top: 0.5em solid ${({ theme }) => theme.colors.darkGrey};
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    animation: Hqxfx 0.6s linear infinite;
`
