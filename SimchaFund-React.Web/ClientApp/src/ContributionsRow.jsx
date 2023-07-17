import React, { useState, useEffect } from "react";
//import axios from "axios";

const ContributionsRow = ({ contributor, balance, contrib, amnt, alwaysInclude }) => {

    const [amount, setAmount] = useState(`${parseFloat(amnt).toFixed(2)}`);
    const [contribute, setcontribute] = useState(!!contrib || alwaysInclude)

    const onTextChange = (e) => {

        //if backspace everything, says NaN        
        let n = '';
        if (e.nativeEvent.data === '.') {
            n = e.target.value
        }
        else if (isNaN(e.nativeEvent.data)) {
            n = parseFloat(e.target.value.replace(NaN, 5));
        }
        else {
            n = parseFloat(e.target.value)
        }
        setAmount(n);
    }
    const onBlur = (e) => {

        setAmount(`${parseFloat(e.target.value).toFixed(2)}`);
    }

    return <>
        <tr>
            <td>
                <div className="d-flex justify-content-center">
                    <div className="form-check form-switch">
                        <input style={{ width: "2.9rem", height: "1.5rem" }} name="contribute" className="form-check-input" type="checkbox" checked={contribute} onChange={(e) => setcontribute(e.target.checked)} />
                    </div>
                </div>
            </td>
            <td>{`${contributor.firstName} ${contributor.lastName}`}</td>
            <td>
                {`${parseInt(balance).toFixed(2)}`}
            </td>
            <td>
                {contributor.alwaysInclude && <i style={{ fontSize: 25 }} className="bi bi-check" />}
            </td>
            <td><>
                <input
                    type="text"
                    name="amount"
                    value={amount}
                    style={{ width: "6.5em", paddingLeft: "1.5em" }}
                    onBlur={onBlur}
                    onChange={onTextChange}
                />
                <span style={{ marginLeft: "-5.5em", marginRight: "10em" }}>$</span>
            </></td>
        </tr >
    </>
}

export default ContributionsRow;