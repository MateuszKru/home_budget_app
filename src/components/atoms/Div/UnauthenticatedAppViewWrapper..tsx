import styled from 'styled-components'

export const UnauthenticatedAppViewWrapper = styled.div`
    margin: 5px;
    background-color: ${({ theme }) => theme.colors.white};
    width: 100%;
    max-width: 400px;
    padding: 40px 50px;
    border-radius: 25px;
    box-shadow: 0 5px 15px -10px rgba(0, 0, 0, 0.3);
    text-align: center;
`
