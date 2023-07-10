type formContainerProps = {
    onSubmit: any,
    children: React.ReactNode;
};

const FormContainer = ({ children, onSubmit }: formContainerProps) => {
    return (
        <div
            className="container-auto text-center"
            style={{ width: '415px' }}
        >
            <div className="row align-items-start">
                <form onSubmit={onSubmit} >
                    {children}
                </form>
            </div>
        </div>
    );
};

export default FormContainer;