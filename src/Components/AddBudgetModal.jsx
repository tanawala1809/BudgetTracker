import React from 'react';
import { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useBudgets } from "../Contexts/BudgetsContext";

function AddBudgetModal({show, handleClose}) {
    console.log('Under AddBudgetModal method on AddBudgetModal.jsx Page');
    const nameRef = useRef();
    const maxRef = useRef();
    const { addBudget } = useBudgets();

    function handleSubmit(e) {
        e.preventDefault();
        console.log("NameRef: ", nameRef);
        console.log("MaxRef: ", maxRef);
        console.log('Under handleSubmit function on AddBudgetModal.jsx Page');
        addBudget({
            name: nameRef.current.value,
            max: parseFloat(maxRef.current.value),
        });
        handleClose();
    }

  return (
  <>
    <Modal show = {show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>New Budget</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className='mb-3' controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control ref={nameRef} type="text" required/>
                </Form.Group>

                <Form.Group className='mb-3' controlId="max">
                    <Form.Label>Maximum Spending</Form.Label>
                    <Form.Control ref={maxRef} type="number" required min={0} step={0.01} />
                </Form.Group>

                <div className="d-flex justify-content-end">
                    <Button variant="primary" type="submit">Add</Button>
                </div>
            </Modal.Body>
        </Form>
    </Modal>
  </>
  )
}

export default React.memo(AddBudgetModal);