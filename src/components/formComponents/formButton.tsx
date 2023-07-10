type buttonProps = {
    title: string,
    type: 'submit' | 'reset' | 'button' | undefined,
    onClick?: any,
};

const FormButton = ({ title, type, onClick }: buttonProps) => {
    return (
        <>
            <button
                className="btn btn-primary btn-lg"
                type={type}
                onClick={onClick}
            >
                {title}
            </button>
        </>
    );
};

export default FormButton;