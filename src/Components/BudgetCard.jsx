import React from 'react';
import { Card, ProgressBar, Stack, Button } from 'react-bootstrap';
import { currenyFormatter } from '../utils';

function BudgetCard({ name, amount, max, gray, hideButtons, onAddExpenseClick, onViewExpensesClick }) {
    console.log('Under function BudgetCard on BudgetCard.jsx Page');
    const classNames = [];
    if (amount > max) {
        classNames.push("bg-danger", "bg-opacity-10");
    } else if (gray) {
        classNames.push("bg-light");
    }

    return (
        <>
            <Card className={classNames.join(" ")}>
                <Card.Body>
                    <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
                        <div className='me-2'>{name}</div>
                        <div className='d-flex align-items-baseline'>{currenyFormatter.format(amount)}
                            {max && (<span className='fs-6 text-muted ms-1'>/ {currenyFormatter.format(max)}</span>)}
                        </div>
                    </Card.Title>
                    {max && (<ProgressBar className='rounded-pill' variant={getProgressBarVariant(amount, max)} min={0} max={max} now={amount}></ProgressBar>)}
                    {!hideButtons && (<Stack direction="horizontal" gap="2" className='mt-4'>
                        <Button variant="outline-primary" className='ms-auto' onClick={onAddExpenseClick}>Add Expense</Button>
                        <Button variant="outline-secondary" onClick={onViewExpensesClick}>View Expense</Button>
                    </Stack>)}
                </Card.Body>
            </Card>
        </>
    )
}

function getProgressBarVariant(amount, max) {
    const ratio = amount / max;
    if (ratio < 0.5) return "primary";
    if (ratio < 0.75) return "warning";
    return "danger";
}

export default React.memo(BudgetCard);