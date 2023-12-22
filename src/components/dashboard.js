// Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const Dashboard = () => {
    const [productCount, setProductCount] = useState(0);

    useEffect(() => {
        axios.get('/api/products/count')
            .then(response => {
                setProductCount(response.data.count);
            })
            .catch(error => {
                console.error('Error fetching product count:', error);
            });
    }, []);

    const data = {
        labels: ['Products'],
        datasets: [
            {
                label: 'Product Count',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                data: [productCount]
            }
        ]
    };

const options = {
    scales: {
        y: {
            type: 'linear', // Set the type to 'linear' for numerical values
            beginAtZero: true // Starts the y-axis scale at zero
            // You can add more configurations as needed based on your chart requirements
        }
    }
};


    return (
        <div>
            <h1>Product Count: {productCount}</h1>
            <div>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default Dashboard;
