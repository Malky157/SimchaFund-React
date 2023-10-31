import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import dayjs from "dayjs";

const ShowHistory = () => {

    const { id } = useParams();
    const navigate = useNavigate()

    const [history, setHistory] = useState({
        contributorId: '',
        contributorName: '',
        contributorBalance: 0,
        transactions: []
    })

    useEffect(() => {
        const getHistory = async () => {
            const { data } = await axios.get(`/api/contributor/gethistory?id=${id}`)
            setHistory(data)
        }
        getHistory();
    }, [])

    return <>
        <div style={{ textAlign: 'center' }}>
            <h1>History for {history.contributorName}</h1>
            <h3>Current Balance: {`$${parseFloat(history.contributorBalance).toFixed(2)}`}</h3>
        </div>
        <table className="table table-bordered table-striped col-md-4" style={{ marginTop: 20 }}>
            <thead style={{ textAlign: 'center' }}>
                <tr>
                    <th style={{ width: '35%' }}>Action</th>
                    <th>Amount</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {history.transactions.map(t =>
                    <tr key={t.id}>
                        <td>{t.action}</td>
                        <td>{`$${parseFloat(t.amount).toFixed(2)}`}</td>
                        <td>{dayjs(t.date).format('MM/DD/YY')}</td>
                    </tr>
                )}
            </tbody>
        </table>
        <div style={{ textAlign: "center" }}>
            <button className="btn btn-outline-danger" onClick={() => navigate('/contributors')}>Back to Contributors</button>
        </div>
    </>
}
export default ShowHistory;