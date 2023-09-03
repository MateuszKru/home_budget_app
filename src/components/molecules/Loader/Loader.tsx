import { Loader } from './Loader.styles'
import { LoaderContainer } from './LoaderContainer.styles'

type loaderProps = {
    title?: string
}

const LoadingSpinner = ({ title = 'Ładowanie...' }: loaderProps) => {
    return (
        <>
            <LoaderContainer>
                <Loader />
                <span>{title}</span>
            </LoaderContainer>
        </>
    )
}

export default LoadingSpinner
