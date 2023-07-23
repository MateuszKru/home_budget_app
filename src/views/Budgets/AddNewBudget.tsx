
import { useEffect, useState } from "react";
import SendRequest from "../../services/APIService";
import useNavigateService from '../../services/useNavigateService'
import DatePicker, { registerLocale } from 'react-datepicker';
import pl from 'date-fns/locale/pl';
import "react-datepicker/dist/react-datepicker.module.css";
import FormContainer from "../../components/formComponents/formContainer";
import FormLabel from "../../components/formComponents/formLabel";
import FormInputError from "../../components/formComponents/formInputError";


interface IBudget extends INewBudget {
    id: string,
};

interface INewBudget {
    fullAmount: number,
    budgetScope: Date,
};



const AddNewBudget = () => {
    const [budgetAmount, setBudgetAmount] = useState<number>(0);
    const [budgetDate, setBudgetDate] = useState<Date>(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const { goTo } = useNavigateService();
    registerLocale("pl", pl);

    const handleBudgetDateChange = (date: Date) => {
        setBudgetDate(date);
    };

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(budgetDate);
        CreateBudget();
    };

    const CreateBudget = async () => {
        setIsLoading(true);
        setError(null);

        const requestBody = {
            budgetScope: budgetDate,
            fullAmount: budgetAmount,
        };

        try {
            const result = await SendRequest({ url: "Budget/AddBudget", method: "POST", body: requestBody });
            if (result.status == 201) {
                goTo('/budgetList');
            }
            if (result.status === 400) {
                const errorResult = await result.json();
                setError(errorResult.errors);
            }
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
            {isLoading ? (
                <p>Ładowanie...</p>
            ) : (
                <FormContainer onSubmit={onFormSubmit}>
                    <FormLabel 
                    name="Kwota budżetu" 
                    type="number" 
                    onChange={(e: any) => setBudgetAmount(e.target.value)} 
                    errorsMessage={(error && error['FullAmount']) ? error['FullAmount'] : ""}
                    />
                    <div className="row g-6 align-items-center row justify-content-between">
                        <div className="col-auto">
                            <label className="col-form-label">
                                {"Okres budżetu"}
                            </label>
                        </div>
                        <div className="col-auto">
                            <DatePicker
                                className="form-control text-capitalize"
                                selected={budgetDate}
                                onChange={handleBudgetDateChange}
                                title="okres budżetu"
                                dateFormat="MMM yyyy"
                                showMonthYearPicker
                                showFullMonthYearPicker
                                locale={pl}
                                required
                            />
                        </div>
                        <FormInputError error={(error && error['BudgetScope']) ? error['BudgetScope'] : "" ?? ""} />
                    </div>
                    <button type="submit" className="btn btn-success btn-lg">Zatwierdź</button>
                </FormContainer>
            )}
        </>
    );
};

export default AddNewBudget;