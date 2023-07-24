import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
//import axios from "axios";

const ContributionsRow = ({ contributor, balance, contribute, amnt, onAnyChange, simchaId }) => {

    const [contribution, setContribution] = useState({
        simchaId,
        contributorId: contributor.id,
        amount: `${parseFloat(amnt).toFixed(2)}`,
        date: new Date()
    });
    const [isContributing, setIsContributing] = useState(contribute)

    const onTextChange = (e) => {
        const copy = { ...contribution }
        //if backspace everything, says NaN                    
        if (e.nativeEvent.data === '.') {
            copy[e.target.name] = e.target.value
        }
        else if (isNaN(e.nativeEvent.data)) {
            copy[e.target.name] = parseFloat(e.target.value.replace(NaN, 5));
        }
        else {
            copy[e.target.name] = parseFloat(e.target.value)
        }
        setContribution(copy)
    }

    const onSwitch = (e) => {
        setIsContributing(e.target.checked)
        onAnyChange(contribution, e.target.checked)
    }

    const onBlur = (e) => {
        const copy = { ...contribution }
        copy[e.target.name] = (`${parseFloat(e.target.value).toFixed(2)}`);
        setContribution(copy)
        if (isContributing) {
            onAnyChange(contribution, isContributing)
        }
    }

    return <>
        <tr>
            <td>
                <div className="d-flex justify-content-center">
                    <div className="form-check form-switch">
                        <input disabled={balance <= 0 && !contribute} name="isContributing" className="form-check-input" type="checkbox" checked={isContributing} onChange={onSwitch} style={{ width: "2.9rem", height: "1.5rem" }} />
                    </div>
                </div>
            </td>
            <td>{`${contributor.firstName} ${contributor.lastName}`}</td>
            <td>
                {`$${parseFloat(balance).toFixed(2)}`}
            </td>
            <td>
                {contributor.alwaysInclude && <i style={{ fontSize: 25 }} className="bi bi-check" />}
            </td>
            <td><>
                <input type="text" name="amount" value={contribution.amount} style={{ width: "6.5em", paddingLeft: "1.5em" }} onBlur={onBlur} onChange={onTextChange} />
                <span style={{ marginLeft: "-5.5em", marginRight: "10em" }}>$</span>
            </></td>
        </tr >
    </>
}
export default ContributionsRow;