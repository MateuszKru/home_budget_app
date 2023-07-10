
type FormInputErrorProps = {
    error: string
};

const FormInputError = (inputErrors: FormInputErrorProps) => {
    return (
        <>
            <div style={{
                margin: '0px 0px 5px',
                height: '25px',
                display: 'flex',
                alignItems: 'flex-start'
            }}>
                <span
                    style={{
                        fontSize: '0.75rem',
                        color: 'red',
                        margin: '0'
                    }}
                >
                    {inputErrors.error}
                </span>
            </div>
        </>
    );
};

export default FormInputError;