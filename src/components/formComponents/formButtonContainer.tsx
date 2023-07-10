
type formButtonContainerProps = {
    children: React.ReactNode;
};

const FormButtonContainer = ({ children }: formButtonContainerProps) => {
    return (
        <>
            <div className="d-grid gap-3 col-10 mx-auto">
                {children}
            </div>
        </>
    );
};

export default FormButtonContainer;