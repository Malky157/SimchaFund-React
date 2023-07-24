import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import "bootstrap-icons/font/bootstrap-icons.css";
import ContributionsRow from "./ContributionsRow";

const Contributions = () => {

    const navigate = useNavigate();
    const { id: simchaId } = useParams();
    const [contributionsInfo, setContributionsInfo] = useState({
        simcha: {},
        contributors: []
    });
    const [contributions, setContributions] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const { data } = await axios.get(`/api/simcha/getcontributionsforsimcha?id=${simchaId}`)
            setContributionsInfo(data);
            setContributions(data.contributors.filter(c => c.contribution !== null).flatMap(c => c.contribution));
        }
        loadData();
    }, []);

    const updateContributionsArray = (contribution, isContributing) => {
        if (isContributing) {
            if (contributions.find(c => c.contributorId === contribution.contributorId)) {
                setContributions([...contributions.filter(c => c.contributorId !== contribution.contributorId), contribution])
            } else {
                setContributions([...contributions, contribution])
            }
        } else {
            setContributions([...contributions.filter(c => c.contributorId !== contribution.contributorId)])
        }
    }

    const onUpdate = async () => {
        await axios.post('/api/simcha/addorupdatecontribution', { contributions, simchaId })
        navigate('/')
    }

    return <>

        {contributionsInfo.simcha ?
            <div>
                <h1 style={{ textAlign: "center", marginBottom: 20 }}>Contributions for {contributionsInfo.simcha.simchaName}</h1>
                <table className="table table-bordered table-striped" style={{ textAlign: "center" }}>
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
                                simchaId={contributionsInfo.simcha.id}
                                balance={c.balance}
                                contribute={!!c.contribution}
                                amnt={c.contribution ? c.contribution.amount : 5}
                                onAnyChange={updateContributionsArray}

                            />
                        )}
                    </tbody>
                </table>
                <div style={{ textAlign: "center" }}>
                    <button className="btn btn-outline-info" style={{ marginRight: 5 }} onClick={onUpdate}>Update</button>
                    <button className="btn btn-outline-warning" onClick={() => navigate('/')}>Cancel</button>
                </div>
            </div>
            : <h1 style={{ fontSize: 200, color: 'red' }}>LOADING</h1>}
    </>
}

export default Contributions;