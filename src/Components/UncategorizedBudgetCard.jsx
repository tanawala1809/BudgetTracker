import React from 'react'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../Contexts/BudgetsContext';
import BudgetCard from './BudgetCard'

function UncategorizedBudgetCard(props) {
    console.log('Under UncategorizedBudgetCard method on UncategorizedBudgetCard.jsx Page');
    const { getBudgetExpenses } = useBudgets();
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce((total, expense) => total + expense.amount, 0);
    if (amount === 0) return null;

    return (
        <>
            <BudgetCard amount={amount} name="Uncategorized" gray {...props} />
        </>
    )
}

export default React.memo(UncategorizedBudgetCard);
