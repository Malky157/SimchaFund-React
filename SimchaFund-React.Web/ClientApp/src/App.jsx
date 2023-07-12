import React from 'react';
import { Route, Routes } from 'react-router';
import Layout from './Layout';
import Home from './Home';
import Contributors from './Contributors';
import NewContributor from './NewContributor';
import Contributions from './Contributions';
import DepositModal from './DepositModal';
import ShowHistory from './ShowHistory';

const App = () => {

    return (
        <Layout>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/contributors' element={<Contributors />} />
                <Route exact path='/newcontributor' element={<NewContributor />} />
                <Route exact path='/contributions/:id' element={<Contributions />} />
                <Route exact path='/depositmodal' element={<DepositModal />} />
                <Route exact path='/showhistory/:id' element={<ShowHistory />} />
            </Routes>
        </Layout>
    )
}

export default App;