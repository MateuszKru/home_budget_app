import BudgetList from '../AuthenticatedAppViews/Budgets/BudgetList'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddNewBudget from '../AuthenticatedAppViews/Budgets/AddNewBudget'

const AuthenticatedApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<BudgetList />} />
                <Route path="/budgetList" element={<BudgetList />} />
                <Route path="/addNewBudget" element={<AddNewBudget />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AuthenticatedApp
