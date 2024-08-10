/* eslint-disable prettier/prettier */
import Divider from '@mui/material/Divider';
import Header from './header';
import Details from './details';
import Map from './Map';
import { useState } from 'react';

const Dashboard = () => {
const [showNotification, setShowNotification] = useState<boolean>(false);
return (
    <>
        <Header setShowNotification={setShowNotification}/>
        <Divider/>
        <Details showNotification={showNotification} setShowNotification={setShowNotification}/>
        <Map/>
    </>

);
}

export default Dashboard;