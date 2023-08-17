import React, { useState } from "react";


const ContributionsRow = ({ contributor, balance, contribute, amnt, onAnyChange, simchaId }) => {

    const [contribution, setContribution] = useState({
        simchaId,
        contributorId: contributor.id,
        amount: `${parseFloat(amnt).toFixed(2)}`,
        date: new Date()
    });
    const [isContributing, setIsContributing] = useState(contribute)

    const onSwitch = (e) => {
        setIsContributing(e.target.checked)
        onAnyChange(contribution, e.target.checked)
    }

    const onTextChange = (e) => {
        const copy = { ...contribution }
        copy[e.target.name] = parseFloat(e.target.value)
        setContribution(copy)
    }

    const onBlur = (e) => {
        const copy = { ...contribution }
        copy[e.target.name] = e.target.value ? (`${parseFloat(e.target.value).toFixed(2)}`) : parseFloat(5).toFixed(2);
        setContribution(copy)
        if (isContributing) {
            onAnyChange(contribution, isContributing)
        }
    }

    const onFocus = (e) => {
        const copy = { ...contribution }
        copy[e.target.name] = parseFloat(contribution.amount).toFixed(0)
        setContribution(copy)
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

                <input type="number" name="amount" value={isNaN(contribution.amount) ? "" : contribution.amount} style={{ width: "6.5em", paddingLeft: "1.5em" }} onBlur={onBlur} onChange={onTextChange} onFocus={onFocus} />
                <span style={{ marginLeft: "-5.5em", marginRight: "10em" }}>$</span>


            </></td>
        </tr >
    </>
}
export default ContributionsRow;