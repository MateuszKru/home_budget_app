interface IBudget {
    id: string,
    fullAmount: number,
    budgetScope: string,
};

type budgetListComponentProps = {
    budgetListProp: Array<IBudget>;
};

const budgetListComponent = ({ budgetListProp }: budgetListComponentProps) => {
    return (
        <ul className="list-group w-auto p-3">
            {budgetListProp?.map((x) =>
                <li
                    key={x.id}
                    className="list-group-item d-flex justify-content-between align-items-center text-start border border-dark border-2"
                    style={{
                        marginBottom: '2%',
                    }}
                >
                    <div className="ms-2 me-auto container-md fs-6">
                        <div className="fw-medium text-capitalize fs-4">
                            {new Date(x.budgetScope).toLocaleDateString("pl-PL", { month: 'long', year: 'numeric' })}r.
                        </div>
                        {x.fullAmount.toFixed(2)}zł
                    </div>
                    <div>
                        <button type="button" className="btn btn-info btn-sm fw-medium">Szczegóły</button>
                    </div>
                </li>
            )}
        </ul>
    );
};

export default budgetListComponent;