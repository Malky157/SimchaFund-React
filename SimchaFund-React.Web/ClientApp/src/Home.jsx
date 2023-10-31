import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import AlertMessage from "./AlertMessage";


const Home = () => {

    const [simchasInfo, setSimchasInfo] = useState({
        totalAmountContributors: 0,
        simchas: []
    });
    const [addMode, setAddMode] = useState(false);
    const [simcha, setSimcha] = useState({
        simchaName: '',
        date: new Date()
    });
    const [simchaAlertMessage, setSimchaAlertMessage] = useState('')
    const [searchText, setSearchText] = useState('')
    const getSimchas = async () => {
        const { data } = await axios.get('api/simcha/getallsimchas')
        setSimchasInfo(data);
    }

    useEffect(() => {
        getSimchas();
    }, []);

    const onTextChange = (e) => {
        const copy = { ...simcha };
        copy[e.target.name] = e.target.value
        setSimcha(copy)
    }

    const onAddClick = async () => {
        const { data } = await axios.post('api/simcha/addsimcha', simcha)
        setSimchaAlertMessage(data)
        setAddMode(false);
        setSimcha({
            simchaName: '',
            date: new Date()
        })
        getSimchas();
    }

    const onSearchTextChange = (e) => {
        setSearchText(e.target.value);
    }

    const isInSearch = (simcha) => {
        return searchText.length > 0 ?
            simcha.simchaName.toLowerCase().includes(searchText.toLowerCase())
            : true
    }

    return <>
        <div className="container">
            <div>
                <h1>Simchas</h1>
            </div>
            {(!!simchaAlertMessage.length && !addMode) &&
                <AlertMessage
                    message={simchaAlertMessage}
                    event={'simcha'}
                />
            }
            <div style={{ marginBottom: 10 }}>
                {addMode ? <div className="row">
                    <div className="col-md-3">
                        <input type="text" className="form-control" placeholder="Simcha Name" name="simchaName" value={simcha.simchaName} onChange={onTextChange} />
                    </div>
                    <div className="col-md-3">
                        <input type="date" name="date" className="form-control" onChange={onTextChange} />
                    </div>
                    <div className="col-md-3">
                        <button className="btn btn-outline-info" onClick={onAddClick} style={{ marginRight: 5 }}>Add</button>
                        <button className="btn btn-outline-warning" onClick={() => { setAddMode(false) }}>Cancel</button>
                    </div>
                </div>
                    : <>
                        <div className="form-control-sm">
                            <button className="btn btn-outline-danger" style={{ marginRight: 35 }} onClick={() => setAddMode(true)}>
                                New Simcha
                            </button>

                            <input type="text" className="form-control-sm" value={searchText} placeholder="Search" onChange={onSearchTextChange} />
                            <button className="btn btn-outline-danger " onClick={() => setSearchText('')}>Clear</button>

                        </div>
                    </>
                }
            </div>

            <table className="table table-bordered" style={{ textAlign: 'center' }}>
                <thead>
                    <tr>
                        <th>Contributions</th>
                        <th>Simcha Name</th>
                        <th>Contributor Count</th>
                        <th>Total Raised</th>
                        <th>Date of Simcha</th>
                    </tr>
                </thead>
                <tbody>
                    {simchasInfo.simchas.filter(s => isInSearch(s.simcha)).map(i =>
                        <tr key={i.simcha.id}>
                            <td>
                                <Link to={`/contributions/${i.simcha.id}`}>
                                    <button className="btn btn-outline-primary">Contributions</button>
                                </Link>
                            </td>
                            <td>{i.simcha.simchaName}</td>
                            <td>{`${i.contributorCount} / ${simchasInfo.totalAmountContributors}`}</td>
                            <td>{`$${i.totalAmount.toFixed(2)}`}</td>
                            <td>{dayjs(i.simcha.date).format('MM/DD/YY')}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>


    </>
}

export default Home;