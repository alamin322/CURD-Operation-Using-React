import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UpdateData = () => {

    const [information, setInformation] = useState([]);

    useEffect(() => {
        async function getInformation() {
            try {
                const response = await axios.get('http://localhost:5000/information');
                setInformation(response.data)
            } catch (error) {
                console.log('error');
            }
        }
        getInformation();
    }, []);

    return (
        <>
            <h1>something</h1>
        </>
    )
};

export default UpdateData;