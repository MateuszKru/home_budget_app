import React from 'react'
import FormInputError from './formInputError'

type labelProps = {
    name: string,
    type: string,
    onChange: any,
}

const FormLabel = (props: labelProps) => {
    return (
        <>
            <label>
                {props.name}
                <input
                    type={props.type}
                    onChange={props.onChange}
                    style={{
                        fontSize: '1 rem',
                        marginLeft: '5px'
                    }}
                >
                </input>
            </label>
        </>
    );
}

export default FormLabel;