import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const [folderSize, setFolderSize] = useState(0);
    const [mediaSize, setMediaSize] = useState(0);
    const [dwgSize, setDwgSize] = useState(0);
    const [docSize, setDocSize] = useState(0);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const totalMemory = 10240;

    useEffect(() => {
        axios.get(`${apiUrl}/foldersize`)
            .then((response) => {
                setFolderSize(response.data.totalSize || 0);
            })
            .catch((error) => {
                console.error('Error fetching folder size:', error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${apiUrl}/foldersize?extension=.jpeg,.png,.jpg,.mp4`)
            .then((response) => {
                setMediaSize(response.data.extensionSize || 0);
            })
            .catch((error) => {
                console.error('Error fetching media size:', error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${apiUrl}/foldersize?extension=.dwg`)
            .then((response) => {
                setDwgSize(response.data.extensionSize || 0);
            })
            .catch((error) => {
                console.error('Error fetching DWG size:', error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${apiUrl}/foldersize?extension=.pdf`)
            .then((response) => {
                setDocSize(response.data.extensionSize || 0);
            })
            .catch((error) => {
                console.error('Error fetching document size:', error);
            });
    }, []);

    // Data and options for the Doughnut chart
    const data = {
        labels: ['Media', 'CAD File', 'Documents'],
        datasets: [
            {
                label: `Storage`,
                data: [mediaSize, dwgSize, docSize],
                backgroundColor: [
                    'rgb(202 138 4)', //yellow
                    'rgba(0, 0, 0, 0.8)', //black
                    'rgb(103 232 249)', //lightcyan
                ],
                borderColor: [
                    'rgb(202 138 4)',
                    'rgba(0, 0, 0, 1)',
                    'rgb(103 232 249)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        cutout: '70%', // Reduces the thickness of the doughnut
        plugins: {
            legend: {
                display: false,
                position: 'bottom',
                align: 'center',
                labels: {
                    boxWidth: 30,
                    boxHeight: 20,
                    padding: 20,
                    font: {
                        size: 16,
                        style: 'bold',
                        family: 'Arial',
                    },
                    color: '#333',
                },
            },
            tooltip: {
                display: true,
                enabled: true,
            },
        },
    };

    return (
        <main className='pt-20'>
            <div className='flex md:flex-row flex-col gap-3'>
                <div className='md:w-1/4 border bg-white rounded-3xl px-6 py-4 shadow-lg'>
                    <div className='text-2xl font-bold'>
                        Storage
                    </div>
                    <div className='relative px-9'>
                        <Doughnut data={data} options={options} />
                        <div className='absolute inset-0 flex justify-center items-center md:text-4xl text-2xl text-black/40 font-extrabold'>
                            {folderSize} MB
                        </div>
                    </div>
                    <div className='text-center pt-4 '>Remaining {((totalMemory - folderSize) / 1024).toFixed(2)} GB of {totalMemory / 1024} GB</div>
                </div>

                <div className='flex justify-between rounded-xl p-4 w-full h-full bg-white border-b-4 border-black/80 hover:border-black/80 text-black/80 shadow-lg'>
                    <div>
                        <div>CAD Files</div>
                        <div className='text-3xl font-bold'>{dwgSize} MB</div>
                    </div>
                    {/* <div className='bg-black/80 h-4 w-4 rounded-full'></div> */}
                </div>

                <div className='flex justify-between rounded-xl p-4 w-full h-full bg-white border-b-4 border-yellow-600 hover:border-gray-500 text-black/80 shadow-lg'>
                    <div>
                        <div>Media</div>
                        <div className='text-3xl font-bold'>{mediaSize} MB</div>
                    </div>
                    {/* <div className='bg-yellow-600 h-4 w-4 rounded-full'></div> */}
                </div>

                <div className='flex justify-between rounded-xl p-4 w-full h-full bg-white border-b-4 border-cyan-300 hover:border-gray-300 shadow-lg text-black/80'>
                    <div>
                        <div>Documents</div>
                        <div className='text-3xl font-bold'>{docSize} MB</div>
                    </div>
                    {/* <div className='bg-cyan-300 h-4 w-4 rounded-full'></div> */}
                </div>
            </div>

            {/* 
            <div className='w-1/4 border bg-white rounded-3xl py-4 shadow-lg'>
                <div className='px-4 text-xl font-bold'>Storage</div>
                <Doughnut data={data} options={options} />
                <div className='relative top-1/2flex justify-center items-center'>asdasd</div>
            </div> */}
        </main>
    );
};

export default Dashboard;
