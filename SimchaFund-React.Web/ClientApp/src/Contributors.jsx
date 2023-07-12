import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ContributorRow from "./ContributorRow";

const Contributors = () => {

    const navigate = useNavigate();
    const [contributorsInfo, setContributorsInfo] = useState({
        totalBalance: 0,
        contributors: []
    });
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        getContributors();
    }, [])

    const getContributors = async () => {
        const { data } = await axios.get('api/contributor/getallcontributors')
        setContributorsInfo(data);
    }

    const onSearchTextChange = (e) => {
        setSearchText(e.target.value);       
    }    
    const isInSearch = (contributor) => {
        return searchText.length > 0 ?
            contributor.firstName.toLowerCase().includes(searchText.toLowerCase())
            || contributor.lastName.toLowerCase().includes(searchText.toLowerCase())
            || contributor.cellNumber.toLowerCase().includes(searchText.toLowerCase())
            : true
    }

    return <>
        <div>
            <h1>Contributors</h1>
        </div>
        <div className="row">
            <div className="col-md-2">
                <button className="btn btn-outline-danger" onClick={() => navigate('/newcontributor')}>New Contributor</button>
            </div>
            <div className="col-md-6">
                <input type="text" className="form-control-sm" value={searchText} placeholder="Search" onChange={onSearchTextChange} />
                <button className="btn btn-outline-danger " onClick={() => setSearchText('')}>Clear</button>
            </div>
            <div className="col-md-4">
                <h3>{`Total: $${contributorsInfo.totalBalance.toFixed(2)}`}</h3>
            </div>
        </div>

        <table className="table table-bordered">
            <thead>
                <tr style={{ textAlign: 'center' }}>
                    <th>Deposit</th>
                    <th>Name</th>
                    <th>Cell</th>
                    <th>Balance</th>
                    <th>Always Include</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {contributorsInfo.contributors.filter(c => isInSearch(c.contributor)).map(i =>
                    <ContributorRow
                        key={i.contributor.id}
                        backendContributor={i.contributor}
                        balance={i.balance}
                        refreshTable={getContributors}
                    />
                )}
            </tbody>
        </table>

    </>
}

export default Contributors;