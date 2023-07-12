import { Modal } from "bootstrap";
import React, { useState } from "react";
import ReactModal from "react-modal";

const DepositModal = () => {

// ???????????????????????????????????????????

    const onCancelClick = () => {

    }

    const onSaveClick = () => {

    }

    return <>
        <h2 className="form-group col-md-6">Deposit for {"{contributor.firstName} {contributor.lastName}"}</h2>
        <div className="form-group col-md-4">
            <label>Amount</label>
            <input className="form-control" name="amount" placeholder="Deposit Amount" type="text" />
        </div>
        <div className="form-group col-md-4">
            <label>Date</label>
            <input type="date" name="date" className="form-control" />
        </div>
        <div style={{ marginTop: 10 }}>
            <button className="btn btn-outline-info" style={{ marginRight: 10 }} onClick={onSaveClick}>Save</button>
            <button className="btn btn-outline-warning" onClick={onCancelClick}>Cancel</button>
        </div>
    </>
}
export default DepositModal;