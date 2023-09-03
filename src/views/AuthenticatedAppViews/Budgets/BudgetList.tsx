import { useEffect, useState } from 'react'
import SendRequest from '../../../services/APIService'
import useNavigateService from '../../../services/useNavigateService'
import BudgetListComponent from '../../../components/organisms/BudgetListComponent'
import LoadingSpinner from '../../../components/molecules/Loader/Loader'

interface IBudgetComponent {
    id: string
    amount: number
}

interface IBudget {
    id: string
    fullAmount: number
    budgetScope: string
}

const BudgetList = () => {
    const [budgetList, setBudgetList] = useState<Array<IBudget>>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<any>(null)
    const { Logout, goTo } = useNavigateService()

    useEffect(() => {
        getBudgetList()
    }, [])

    const getBudgetList = async () => {
        setIsLoading(true)
        setError(null)
        setBudgetList([])
        try {
            const result = await SendRequest({
                url: 'Budget/GetBudgetsList',
                method: 'GET',
            })
            const list = (await result.json()) as Array<IBudget>
            setBudgetList(list)
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    function HandleLogout() {
        Logout()
    }

    return (
        <>
            {isLoading ? (
                <LoadingSpinner />
            ) : error ? (
                <div>
                    <p>Wystąpił błąd: {error.toString()}</p>
                    <button type="button" onClick={() => setError(null)}>
                        Spróbuj ponownie
                    </button>
                </div>
            ) : budgetList ? (
                <BudgetListComponent budgetListProp={budgetList} />
            ) : null}
            <div>
                <button type="button" onClick={() => goTo('/addNewBudget')}>
                    Utwórz nowy budżet
                </button>
            </div>
            <div>
                <button type="button" onClick={HandleLogout}>
                    Wyloguj
                </button>
            </div>
        </>
    )
}

export default BudgetList
