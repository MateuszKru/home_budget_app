import { Button } from '../../atoms/Button/Button.styles.'

type buttonProps = {
    title: string
    type: 'submit' | 'reset' | 'button' | undefined
    onClick?: any
}

const FormButton = ({ title, type, onClick }: buttonProps) => {
    return (
        <>
            <Button type={type} onClick={onClick}>
                {title}
            </Button>
        </>
    )
}

export default FormButton
