import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { Dayjs } from "dayjs";

const ShowHistory = () => {

    const { id } = useParams();
    const navigate = useNavigate()

    const [history, setHistory] = useState([])

    useEffect(() => {
        const getHistory = () => {

        }
    })

    return <>
        <div>
            <h1>History for ".ContributorName"</h1>
            <h3>Current Balance: ".ContributorBalance.ToString("C")"</h3>
        </div>
        <table className="table table-bordered table-striped" style={{ textAlign: 'center' }}>
            <thead>
                <tr>
                    <th>Action</th>
                    <th>Date</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                {history.map(h =>
                    <tr key={h.id}>
                        <td>"transaction.Action"</td>
                        <td>
                            "transaction.Date.ToLongDateString()"
                        </td>
                        <td>
                            {"{"}transaction.Amount.ToString("C"){"}"}
                        </td>
                    </tr>)}
            </tbody>
        </table>
        <div style={{ textAlign: "center" }}>
            <button className="btn btn-outline-danger" onClick={() => navigate('/contributors')}>Back to Contributors</button>
        </div>
    </>
}

export default ShowHistory;