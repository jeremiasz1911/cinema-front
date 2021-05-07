import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Filmy from './Filmy';
import Sale from './Sale';
import Seanse from './Seanse';
import Rezerwacje from './Rezerwacje';
import React from 'react';


const Dashboard = (props) => {

    const [location, setLocation] = useState('');

    const getDashboardContent = (location) => {
        switch(location) {
            case 'Seanse':
                return <Seanse/>
            case 'Filmy':
                return <Filmy/>
            case 'Sale':
                return <Sale/>
            case 'Rezerwacje':
                return <Rezerwacje/>
            default:
                return <Seanse/>
        }
    }

    return(
            <div className="d-flex">
            
            <Sidebar setLocations={setLocation}/>

                <div className="w-100">
                    <Navbar/>
                        <div className="p-4">
                            {getDashboardContent(location)}
                        </div>
                </div>

            </div>
    )
}
export default Dashboard;