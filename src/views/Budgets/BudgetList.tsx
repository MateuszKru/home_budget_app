
import { useEffect, useState } from "react";
import SendRequest from "../../services/APIService";
import useNavigateService from '../../services/useNavigateService'
import BudgetListComponent from '../../components/budgetListComponent'

interface IBudgetComponent {
    id: string,
    amount: number
};

interface IBudget {
    id: string,
    fullAmount: number,
    budgetScope: string,
};

type removeTokenFunc = {
    removeToken: any
};

const BudgetList = (removeToken: removeTokenFunc) => {
    const [budgetList, setBudgetList] = useState<Array<IBudget>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const { goTo } = useNavigateService();

    useEffect(() => {
        getBudgetList();
    }, [])

    const getBudgetList = async () => {
        setIsLoading(true);
        setError(null);
        setBudgetList([]);
        try {
            const result = await SendRequest({ url: "Budget/GetBudgetsList", method: "GET" });
            const list = await result.json() as Array<IBudget>;
            setBudgetList(list);
        }
        catch (error) {
            setError(error);
        }
        finally {
            setIsLoading(false);
        }
    };

    function Logout() {
        removeToken.removeToken();
        goTo('/login');
    };

    return (
        <>
            {isLoading ? (
                <p>Ładowanie...</p>
            ) : error ? (
                <div>
                    <p>Wystąpił błąd: {error.toString()}</p>
                    <button type="button" className="btn btn-primary" onClick={() => setError(null)}>Spróbuj ponownie</button>
                </div>
            ) : budgetList ? (
                <BudgetListComponent budgetListProp={budgetList} />
            )
                : null}
            <div>
                <button type="button" className="btn btn-success btn-lg" onClick={() => goTo("/addNewBudget")}>Utwórz nowy budżet</button>
            </div>
            <div>
                <button type="button" className="btn btn-warning" onClick={Logout}>Wyloguj</button>
            </div>
        </>
    )
};

export default BudgetList;