import { useEffect, useState } from 'react'
import SendRequest from '../../../services/APIService'
import useNavigateService from '../../../services/useNavigateService'
import DatePicker, { registerLocale } from 'react-datepicker'
import pl from 'date-fns/locale/pl'
import 'react-datepicker/dist/react-datepicker.module.css'
import FormLabel from '../../../components/molecules/FormComponents/FormLabel/FormLabel'
import FormErrorMessage from '../../../components/molecules/FormComponents/FormErrorMessage/FormErrorMessage'
import LoadingSpinner from '../../../components/molecules/Loader/Loader'

interface IBudget extends INewBudget {
    id: string
}

interface INewBudget {
    fullAmount: number
    budgetScope: Date
}

const AddNewBudget = () => {
    const [budgetAmount, setBudgetAmount] = useState<number>(0)
    const [budgetDate, setBudgetDate] = useState<Date>(new Date())
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<any>(null)
    const { goTo } = useNavigateService()
    registerLocale('pl', pl)

    const handleBudgetDateChange = (date: Date) => {
        setBudgetDate(date)
    }

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(budgetDate)
        CreateBudget()
    }

    const CreateBudget = async () => {
        setIsLoading(true)
        setError(null)

        const requestBody = {
            budgetScope: budgetDate,
            fullAmount: budgetAmount,
        }

        try {
            const result = await SendRequest({
                url: 'Budget/AddBudget',
                method: 'POST',
                body: requestBody,
            })
            if (result.status === 201) {
                goTo('/budgetList')
            }
            if (result.status === 400) {
                const errorResult = await result.json()
                setError(errorResult.errors)
            }
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <form onSubmit={onFormSubmit}>
                    <FormLabel
                        name="Kwota budżetu"
                        type="number"
                        onChange={(e: any) => setBudgetAmount(e.target.value)}
                        errorsMessage={
                            error && error['FullAmount']
                                ? error['FullAmount']
                                : ''
                        }
                    />
                    <div>
                        <div>
                            <label>{'Okres budżetu'}</label>
                        </div>
                        <div>
                            <DatePicker
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
                        <FormErrorMessage
                            errorMessage={
                                error && error['BudgetScope']
                                    ? error['BudgetScope']
                                    : '' ?? ''
                            }
                        />
                    </div>
                    <button type="submit">Zatwierdź</button>
                </form>
            )}
        </>
    )
}

export default AddNewBudget
