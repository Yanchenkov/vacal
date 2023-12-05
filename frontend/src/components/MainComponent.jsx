import React, { useState, useEffect } from 'react';
import CalendarComponent from './CalendarComponent';

const API_URL = process.env.REACT_APP_API_URL;

const MainComponent = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch(API_URL+'/')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const fetchTeamData = async () => {
        try {
            const response = await fetch(API_URL+'/');
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    if (!data) return <div>Loading...</div>;

    return (
        <CalendarComponent teamData={data.teams} holidays={data.holidays} currentMonth={new Date()} updateTeamData={fetchTeamData}/>
    );
};

export default MainComponent;
