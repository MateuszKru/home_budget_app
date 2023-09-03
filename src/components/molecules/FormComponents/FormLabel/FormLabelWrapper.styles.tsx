import styled from 'styled-components'
import { Label } from '../../../atoms/Label/Label.styles.'

export const FormLabelWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    text-align: start;
    ${Label} {
        margin: 5px 0;
    }
`
