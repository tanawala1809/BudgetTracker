import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import useLocalStorage from '../Hooks/useLocalStorage';

const BudgetsContext = createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export function useBudgets() {
    return useContext(BudgetsContext);
}

// What we store in Budget Array is going to look something like this
// {
//     id : "",
//     name: "",
//     max: ""
// }

// Our expenses will also be just similar, it will have: 
// {
//     id: "",
//     budgetId: "",
//     amount: "",
//     description: "" 
// }

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage("budgets", []);
    const [expenses, setExpenses] = useLocalStorage("expenses", []);

    function getBudgetExpenses(budgetId) {
        console.log("budgetId Received:", budgetId);
        // const arr = [];
        // expenses.map((expense) => {
        //     console.log('Current Expense: ', expense);
        //     console.log('Current Expense Budget Id: ', expense["budgetId"]);
        //     if (expense.budgetId == budgetId) {
        //         console.log("Budget ID are same");
        //         console.log("Current BudgetId: ", expense.budgetId);
        //         arr.push(expense);
        //     }
        // })
        // console.log("ARR: ", arr);
        // return arr;
        return expenses.filter((expense) => expense.budgetId === budgetId);
    }

    function addExpense({ description, amount, budgetId }) {
        setExpenses((prevExpenses) => {

            return [...prevExpenses, {
                id: uuidV4(),
                description,
                amount,
                budgetId
            }]
        });
    }

    function addBudget({ name, max }) {
        setBudgets((prevBudgets) => {
            if (prevBudgets.find((budget) => budget.name === name)) {
                return prevBudgets;
            }
            
            return [...prevBudgets, {
                id: uuidV4(),
                name,
                max
            }]
        });
    }

    function deleteBudget({ id }) {
        //TODO: Deal with uncategorized 
        setExpenses((prevExpenses) => {
            return prevExpenses.map((expense) => {
                if (expense.budgetId !== id) return expense;
                return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID }
            })
        })
        setBudgets((prevBudgets) => {
            return prevBudgets.filter((budget) => budget.id !== id);    // Deleting budget that does not have budgetId
        });
    }

    function deleteExpense({ id }) {
        setExpenses((prevExpenses) => {
            return prevExpenses.filter((expense) => expense.id !== id);    // Deleting budget that does not have budgetId
        });
    }

    return <BudgetsContext.Provider value={{
        budgets,
        expenses,
        getBudgetExpenses, // When we click on entertainment, view expenses we should get a list of all expenses pertaining to entertainment expenses. That's what this function is for
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense
    }}>
        { children }
    </BudgetsContext.Provider>;
}