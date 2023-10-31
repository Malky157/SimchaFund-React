import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewContributor = () => {

    const navigate = useNavigate();
    const [contributor, setContributor] = useState({
        firstName: '',
        lastName: '',
        cellNumber: '',
        initialDeposit: '',
        dateCreated: new Date(),
        alwaysInclude: false
    });
    const [isFormValid, setIsFormValid] = useState(false);

    const onTextChange = (e) => {
        const copy = { ...contributor }
        copy[e.target.name] = e.target.value
        setContributor(copy)
        setIsFormValid(contributor.firstName.length > 0 && contributor.lastName.length > 0 && contributor.cellNumber.length > 0 && parseInt(contributor.initialDeposit) > 0 && parseInt(contributor.initialDeposit))
    }

    const onCheckboxClick = () => {
        const copy = { ...contributor }
        copy.alwaysInclude = !contributor.alwaysInclude
        setContributor(copy)
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) {
            //show mess. - form not complete? & when you do via button
            return;
        }
        await axios.post('api/contributor/addcontributor', contributor)
        navigate('/contributors')
    }

    return <>

        <h1>New Contributor</h1>
        <form onSubmit={onFormSubmit}>
            <div className="row">
                <div className="form-group col-md-4">
                    <label className="form-label">First Name</label>
                    <input className="form-control" name="firstName" placeholder="First Name" type="text" onChange={onTextChange} />
                </div>
                <div className="form-group col-md-4">
                    <label className="form-label">Last Name</label>
                    <input className="form-control" name="lastName" placeholder="Last Name" type="text" onChange={onTextChange} />
                </div>
            </div>
            <div className="row mt-3">
                <div className="form-group col-md-4">
                    <label className="form-label">Cell Number</label>
                    <input className="form-control" name="cellNumber" placeholder="Cell Number" type="text" onChange={onTextChange} />
                </div>
                <div className="form-group col-md-4">
                    <label className="form-label">Initial Deposit</label>
                    <input type="text" className="form-control" name="initialDeposit" placeholder="Initial Deposit" onChange={onTextChange} />
                </div>
            </div>
            <div className="row mt-3">
                <div className="form-group col-md-4">
                    <label className="form-label">Date Created</label>
                    <input className="form-control" name="dateCreated" placeholder="Date" type="date" onChange={onTextChange} />
                </div>
                <div>
                    <div className="form-check mt-3 ml-3">
                        <input type="checkbox" className="form-check-input" name="alwaysInclude" checked={contributor.alwaysInclude} onChange={onCheckboxClick} />
                        <div className="row mt-3">
                            <label className="form-check-label">Always Include</label>
                            <label className="form-check-label" style={{ fontSize: 10.5 }}>By clicking here you will atomatically be contributing to all current and future  Simchos.</label>
                        </div>
                    </div>
                </div>
            </div>
            <button disabled={!isFormValid} className="btn btn-outline-info" style={{ marginRight: 5 }}>Save</button>
            <button type="button" className="btn btn-outline-warning" onClick={() => navigate('/contributors')}>Cancel</button>
        </form>
    </>
}

export default NewContributor;