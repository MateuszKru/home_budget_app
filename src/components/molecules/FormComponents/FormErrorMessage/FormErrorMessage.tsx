import { ErrorMessageWrapper } from './ErrorMessageWrapper.styles'
import { ErrorMessageSpan } from './ErrorMessageSpan.styles'

type FormErrorMessageProps = {
    errorMessage: string
}

const FormErrorMessage = ({ errorMessage }: FormErrorMessageProps) => {
    return (
        <>
            <ErrorMessageWrapper>
                <ErrorMessageSpan>{errorMessage}</ErrorMessageSpan>
            </ErrorMessageWrapper>
        </>
    )
}

export default FormErrorMessage
