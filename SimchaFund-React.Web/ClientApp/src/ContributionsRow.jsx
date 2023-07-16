import React, { useState, useEffect } from "react";
//import axios from "axios";

const ContributionsRow = ({ contributor, balance, contrib, amnt, alwaysInclude }) => {

    const [amount, setAmount] = useState(`$${parseFloat(amnt).toFixed(2)}`);
    const [contribute, setcontribute] = useState(!!contrib || alwaysInclude)

    const onTextChange = (e) => {

        //can't write out $ sign
        //if backspace everything, says $NaN        
        console.log(`${e.nativeEvent.inputType === 'deleteContentBackward'}  ${e.nativeEvent.data === 'NaN'}`)
        //console.log(e)
        let n = '';
        if (e.nativeEvent.data === '.') {
            n = e.target.value.replace('$', '')
        }
        else if (e.nativeEvent.data === '$') {

        }
        else {
            n = parseFloat(e.target.value.replace('$', ''));
        }
        if (e.nativeEvent.data === 'NaN') n = 5
        //if (n === NaN) n = 5;
        setAmount(n);
        // console.log(`e.target.value: ${e.target.value}
        // state: ${amount}
        // e: `)
    }
    const onBlur = (e) => {

        setAmount(`$${parseFloat(e.target.value.replace('$', '')).toFixed(2)}`);
    }

    return <>
        <tr>
            <td>
                <div className="d-flex justify-content-center">
                    {/* {console.log(contribute)} */}
                    <div className="form-check form-switch">
                        <input style={{ width: "2.9rem", height: "1.5rem" }} name="contribute" className="form-check-input" type="checkbox" checked={contribute} onChange={(e) => setcontribute(e.target.checked)} />
                    </div>
                </div>
            </td>
            <td>{`${contributor.firstName} ${contributor.lastName}`}</td>
            <td>
                {`$${parseInt(balance).toFixed(2)}`}
            </td>
            <td>
                {contributor.alwaysInclude && <i style={{ fontSize: 30 }} className="bi bi-check" />}
            </td>
            <td>
                <input type="text" name="amount" className="form-control" value={amount === 'NaN' ? 5 : amount}
                    onBlur={onBlur}
                    onChange={onTextChange}
                />
            </td>
        </tr >
    </>
}

export default ContributionsRow;