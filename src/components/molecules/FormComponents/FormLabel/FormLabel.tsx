import FormErrorMessage from '../FormErrorMessage/FormErrorMessage'
import { Input } from '../../../atoms/Input/Input.styles'
import { Label } from '../../../atoms/Label/Label.styles.'
import { FormLabelWrapper } from '../FormLabel/FormLabelWrapper.styles'

type labelProps = {
    name: string
    type: string
    onChange: any
    errorsMessage?: string
}

const FormLabel = ({ name, type, onChange, errorsMessage }: labelProps) => {
    return (
        <>
            <FormLabelWrapper>
                <Label>{name}</Label>
                <Input
                    type={type}
                    step={0.01}
                    min={0.01}
                    onChange={onChange}
                    required
                />
            </FormLabelWrapper>
            <FormErrorMessage errorMessage={errorsMessage ?? ''} />
        </>
    )
}

export default FormLabel
