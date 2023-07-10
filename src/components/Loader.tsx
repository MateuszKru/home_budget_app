type loaderProps = {
    title?: string
};

const Loader = ({ title }: loaderProps) => {
    return (
        <>
            <div className="spinner-border m-5" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p>{ title }</p>
        </>
    );
};

export default Loader;