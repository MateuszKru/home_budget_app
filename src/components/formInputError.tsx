import React from "react";

type FormInputErrorProps = {
    error: string
};

const FormInputError = (inputErrors: FormInputErrorProps) => {
    return (
        <p
        style={{
            fontSize: '0.75rem',
            color: 'red'
        }}
        >
            {inputErrors.error}
        </p>
    );

}

export default FormInputError;