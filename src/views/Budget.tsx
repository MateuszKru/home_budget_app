
import { useState } from "react";
import sendRequest from "../services/APIService";

interface IBudget {
    bugdetMonth: string
    entertainmentFund: number,
    fixedCharges: number,
    fullAmount: number,
    irregularExpenses: number,
    retirementInvestments: number,
    savings: number,
}

const Budget = () => {
    const [budgetList, setBudgetList] = useState<Array<IBudget>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const getBudgetList = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await sendRequest({ url: "Budget/GetAllBudgetsList", method: "GET" });
            const list = result as Array<IBudget>;
            setBudgetList(list);
        }
        catch (error) {
            setError(error);
        }
        finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button onClick={getBudgetList}>Get data</button>
            <div>
                {isLoading ? (
                    <p>Ładowanie...</p>
                ) : error ? (
                    <p>Wystąpił błąd: {error.toString()}</p>
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
        </>
    )
}

export default Budget;