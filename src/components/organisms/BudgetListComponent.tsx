interface IBudget {
    id: string
    fullAmount: number
    budgetScope: string
}

type BudgetListComponentProps = {
    budgetListProp: Array<IBudget>
}

const BudgetListComponent = ({ budgetListProp }: BudgetListComponentProps) => {
    return (
        <ul>
            {budgetListProp?.map((x) => (
                <li
                    key={x.id}
                    style={{
                        marginBottom: '2%',
                    }}
                >
                    <div>
                        <div>
                            {new Date(x.budgetScope).toLocaleDateString(
                                'pl-PL',
                                { month: 'long', year: 'numeric' }
                            )}
                            r.
                        </div>
                        {x.fullAmount.toFixed(2)}zł
                    </div>
                    <div>
                        <button type="button">Szczegóły</button>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default BudgetListComponent
