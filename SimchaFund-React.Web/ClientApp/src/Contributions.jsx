import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import "bootstrap-icons/font/bootstrap-icons.css";
import ContributionsRow from "./ContributionsRow";

const Contributions = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [contributionsInfo, setContributionsInfo] = useState({});


    useEffect(() => {
        getContributions();
    }, [])

    const getContributions = async () => {
        const { data } = await axios.get(`/api/simcha/getcontributionsforsimcha?id=${id}`)
        setContributionsInfo(data)
    }

    const onTextChange = (e) => {
        const copy = { currentContributor }
        copy[e.target.name] = e.target.value
        setCurrentContributor(copy)
        //console.log(currentContributor)
    }

    const onSwitched = (e) => {
        setCurrentContributor(currentContributor[e.target.name] = e.target.value)
    }

    const onUpdateClick = () => {

        navigate('/')
    }

    return <>

        {contributionsInfo.simcha ?
            <div>
                <h1>Contributions for {contributionsInfo.simcha.simchaName}</h1>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Contribute</th>
                            <th>Name</th>
                            <th>Balance</th>
                            <th>Always Include</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contributionsInfo.contributors.map(c =>
                            <ContributionsRow
                                key={c.contributor.id}
                                contributor={c.contributor}
                                balance={c.balance}
                                amount={c.amount}
                                //onTextChange={() => onTextChange(e)}
                                onTextChange={() => onTextChange(c)} //??? Closures
                                onSwitched={() => onSwitched(c)}
                            />
                        )}
                    </tbody>
                </table>
                <div style={{ textAlign: "center" }}>
                    <button className="btn-lg btn-outline-danger" onClick={onUpdateClick}>Update</button>
                </div>
            </div>
            : <h1 style={{ fontSize: 240, color: 'red' }}>LOADING</h1>}
    </>
}

export default Contributions;