import FormInputError from './formInputError'

type labelProps = {
    name: string,
    type: string,
    onChange: any,
    errorsMessage?: string
}

const FormLabel = ({ name, type, onChange, errorsMessage }: labelProps) => {
    return (
        <>
            <div className="row g-6 align-items-center row justify-content-between">
                <div className="col-auto">
                    <label
                        htmlFor="inputPassword6"
                        className="col-form-label"
                    >
                        {name}
                    </label>
                </div>
                <div className="col-auto">
                    <input
                        type={type}
                        onChange={onChange}
                        className="form-control"
                        aria-labelledby="passwordHelpInline"
                        required />
                </div>
            </div>
            <FormInputError error={errorsMessage ?? ""} />
        </>
    );
};

export default FormLabel;