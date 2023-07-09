
import { useState } from "react";
import SendRequest from "../services/APIService";
import useNavigateService from '../services/useNavigateService'

interface IBudget {
    bugdetMonth: string
    entertainmentFund: number,
    fixedCharges: number,
    fullAmount: number,
    irregularExpenses: number,
    retirementInvestments: number,
    savings: number,
}
type removeTokenFunc = {
    removeToken: any
}

const Budget = (removeToken: removeTokenFunc) => {
    const [budgetList, setBudgetList] = useState<Array<IBudget>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const { goTo } = useNavigateService();


    const getBudgetList = async () => {
        setIsLoading(true);
        setError(null);
        setBudgetList([]);
        try {
            const result = await SendRequest({ url: "Budget/GetAllBudgetsList", method: "GET" });
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
            <button onClick={getBudgetList}>Pobierz dane</button>
            <div>
                {isLoading ? (
                    <p>Ładowanie...</p>
                ) : error ? (
                    <div>
                        <p>Wystąpił błąd: {error.toString()}</p>
                        <button onClick={() => setError(null)}>Spróbuj ponownie</button>
                    </div>

                ) : budgetList ? (
                    budgetList?.map((x) =>
                        <>
                            <div key={x.bugdetMonth}>
                                <p>Miesiąc: {x.bugdetMonth}</p>
                                <p>Całkowita kwota: {x.fullAmount.toFixed(2)}zł</p>
                                <p>Stałe opłaty: {x.fixedCharges.toFixed(2)}zł</p>
                                <p>Nieregularne wydatki: {x.irregularExpenses.toFixed(2)}zł</p>
                                <p>Oszczędności: {x.savings.toFixed(2)}zł</p>
                                <p>Rozrywka: {x.entertainmentFund.toFixed(2)}zł</p>
                                <p>Fundusz inwestycyjny: {x.retirementInvestments.toFixed(2)}zł</p>
                            </div>
                        </>
                    )
                ) : null}
            </div>
            <button onClick={Logout}>Wyloguj</button>
        </>
    )
};

export default Budget;