import styled from 'styled-components'

export const Button = styled.button`
    cursor: pointer;
    margin: 15px 0;
    // padding: ${({ isBig }: any) => (isBig ? '10px 38px' : '7px 20px')};
    padding: 10px 38px;
    // font-size: ${({ isBig, theme: { fontSize } }: any) =>
        isBig ? fontSize.m : fontSize.s};
    font-size: ${({ theme }: any) => theme.fontSize.m};
    background-color: ${({ theme }) => theme.colors.lightPurple};
    border-radius: 20px;
    border: none;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.darkGrey};
    &:hover {
        box-shadow: -2px 4px 10px rgba(115, 124, 142, 0.3);
        background-color: ${({ theme }) => theme.colors.darkPurple};
    }
`
