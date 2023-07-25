import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DepositModal from "./DepositModal";
import "bootstrap-icons/font/bootstrap-icons.css";
import ShowHistory from "./ShowHistory";

const ContributorRow = ({ backendContributor, balance, refreshTable }) => {

    const [editMode, setEditMode] = useState(false);
    const [editableContributor, setEditableContributor] = useState({ ...backendContributor });
    const [show, setShow] = useState(false);

    const onSaveClick = async () => {
        await axios.post('api/contributor/updatecontributor', { ...editableContributor })
        await refreshTable();
        setEditMode(false);
    }

    const onCancelClick = async () => {
        setEditableContributor(backendContributor)
        setEditMode(false);
    }

    const onTextChange = (e) => {
        const copy = { ...editableContributor }
        copy[e.target.name] = e.target.value;
        setEditableContributor(copy)
    }

    const onCheckboxClick = (e) => {
        const copy = { ...editableContributor }
        copy[e.target.name] = e.target.checked;
        setEditableContributor(copy);

    }

    return <>
        <tr style={{ textAlign: 'center' }}>
            <td>
                <button type="button" disabled={editMode} onClick={() => { setShow(true) }} className="btn btn-outline-success" variant="primary">Deposit </button>
                <DepositModal
                    show={show}
                    contributor={backendContributor}
                    setShow={() => setShow()}
                    refreshTable={refreshTable}
                />
            </td>
            <td>{!editMode ? `${backendContributor.firstName} ${backendContributor.lastName}`
                : <div>
                    <input className="form-control-sm" name="firstName" placeholder="First Name" value={editableContributor.firstName} type="text" onChange={onTextChange} style={{ marginRight: 8 }} />
                    <input className="form-control-sm" name="lastName" placeholder="Last Name" value={editableContributor.lastName} type="text" onChange={onTextChange} />
                </div>
            }</td>
            <td>{!editMode ? backendContributor.cellNumber
                :
                <input className="form-control-sm" name="cellNumber" placeholder="Cell Number" value={editableContributor.cellNumber} type="text" onChange={onTextChange} />
            }</td>
            <td>{`$${balance.toFixed(2)}`}</td>
            <td>
                {!editMode ? backendContributor.alwaysInclude && <i className="bi bi-check-lg" style={{ fontSize: "30" }} />
                    :
                    <div className="form-check-sm mt-1 ml-3">

                        <input type="checkbox" className="form-check-input" name="alwaysInclude" checked={editableContributor.alwaysInclude} onChange={onCheckboxClick} />
                    </div>}
            </td>
            <td>
                {!editMode ?
                    <div>

                        <Link to={`/showHistory/${backendContributor.id}`}>
                            <button className="btn btn-outline-primary"
                                style={{ marginRight: 10 }}>Show History</button>
                        </Link>

                        <button className="btn btn-outline-danger" onClick={() => setEditMode(true)}>Edit</button>
                    </div>
                    : <div>
                        <button className="btn btn-outline-info" style={{ marginRight: 10 }} onClick={onSaveClick}>Save</button>
                        <button type="button" className="btn btn-outline-warning" onClick={onCancelClick}>Cancel</button>
                    </div>
                }
            </td>
        </tr>
    </>
}
export default ContributorRow;