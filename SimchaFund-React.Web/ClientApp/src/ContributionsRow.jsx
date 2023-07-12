import React, { useState, useEffect } from "react";
//import axios from "axios";

const ContributionsRow = ({ contributor, balance, amount, onTextChange, onSwitched }) => {


    return <>
        <tr>
            <td>
                <div className="d-flex justify-content-center">
                    <div className="form-check form-switch">
                        <input style={{ width: "4rem", height: "2rem" }} name="contributed" className="form-check-input" type="checkbox" checked={contributor.contributed} onChange={onSwitched} />
                    </div>
                </div>
            </td>
            <td>{`${contributor.firstName} ${contributor.lastName}`}</td>
            <td>
                {`$${parseInt(balance).toFixed(2)}`}
            </td>
            <td style={{ textAlign: "center" }}>
                {contributor.alwaysInclude && <i style={{ fontSize: 30 }} className="bi bi-check" />}
            </td>
            <td>
                <input type="text" name="amount" className="form-control" value={`$${(amount ? parseInt(amount) : 5).toFixed(2)}`} onChange={onTextChange} />
            </td>
        </tr>
    </>
}

export default ContributionsRow;