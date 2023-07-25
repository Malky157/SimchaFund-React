import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from "react";
import axios from 'axios';

const DepositModal = ({ contributor, show, setShow, refreshTable }) => {

    const [deposit, setDeposit] = useState({
        contributorId: contributor.id,
        amount: '',
        date: new Date()
    })

    const onCancelClick = () => {
        setShow(false)
        setDeposit({
            contributorId: contributor.id,
            amount: '',
            date: new Date()
        })
    }
    const isValid = (deposit.amount.length > 0 && parseInt(deposit.amount) > 0)
    const onSaveClick = async () => {
        if (isValid) {
            await axios.post('/api/contributor/adddeposit', deposit)
        }
        setShow(false)
        await refreshTable()
        setDeposit({
            contributorId: contributor.id,
            amount: '',
            date: new Date()
        })
    }

    const onTextChange = (e) => {
        const copy = { ...deposit };
        copy[e.target.name] = e.target.value;
        setDeposit(copy);
    }

    return <>
        <div>
            <Modal show={show} onHide={onCancelClick} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Deposit for {contributor.firstName} {contributor.lastName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group col-md-4">
                        <label>Amount</label>
                        <input className="form-control" name="amount" placeholder="Deposit Amount" type="text" value={deposit.amount} onChange={onTextChange} />
                    </div>
                    <div className="form-group col-md-4">
                        <label>Date</label>
                        <input type="date" name="date" className="form-control" onChange={onTextChange} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button disabled={!isValid} className="btn btn-outline-info" style={{ marginRight: 10 }} onClick={onSaveClick}>Save</button>
                    <button className="btn btn-outline-warning" data-bs-dismiss="modal" onClick={onCancelClick}>Cancel</button>
                </Modal.Footer>
            </Modal>
        </div >
    </>
}
export default DepositModal;