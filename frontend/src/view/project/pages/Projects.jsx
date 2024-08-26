import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

import PageLayout from '../../shared/UIElements/PageLayout';
import { BsThreeDots } from "react-icons/bs";



const UserList = () => {
    const [projects, setProjects] = useState([]);
    const [name, setName] = useState('');
    const [locationId, setLocationId] = useState('');
    const [locationName, setLocationName] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const [searchTerm, setSearchTerm] = useState('');
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const handleProjectUpload = async () => {
        if (!name) {
            toast.error('Please Choose a File');
            return;
        } else if (!locationId) {
            toast.error('Please Choose a Location');
            return;
        }

        const formData = { name, location_id: locationId };

        try {
            const response = await axios.post(`${apiUrl}/projects/upload`, formData);
            console.log(response.data);
            toast.success('Project added successfully');

            // Reset project input field
            setName('');
            setLocationId('');

            // Update projects list after successful upload
            const updatedProjectsList = await axios.get(`${apiUrl}/projects/list`);
            setProjects(updatedProjectsList.data);
        } catch (error) {
            console.error('Error uploading folder:', error);
            toast.error('Error uploading folder');
        }
    };

    const handleProjectChange = (e) => {
        // console.log(e.target.value);
        setName(e.target.value);

    };

    const handleLocationChange = (e) => {
        // console.log(e.target.value);
        setLocationId(e.target.value);

    };

    // const handleProjectIdChange = (e) => {
    //   setProjectId(e.target.value);
    // };

    useEffect(() => {
        axios.get(`${apiUrl}/projects/list`)
            .then((res) => {
                setProjects(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios.get(`${apiUrl}/projects/locations`)
            .then((res) => {
                setLocationName(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const columns = [
        { key: 'projectname', title: 'Project Name', class: 'bg-sky-50 text-left ', sort: 'projectname' },
        { key: 'location', title: 'Location', class: 'bg-sky-50 text-left ', sort: 'location' },
        { key: 'type', title: 'Project Type', class: 'bg-sky-50 text-left ', sort: 'type' },
        { key: 'action', title: 'Action', class: 'w-[1%] bg-sky-50 text-right', sort: '' },
        // Add more columns as needed
    ];

    // Concatenate 'firstname' and 'lastname' keys into 'fullname' key
    const columnsDatas = projects.map((project) => ({
        ...project,
        projectname: `${project.name}`,
        location: `${project.location_name}`,
        type: <div className='text-xs bg-sky-700 p-1 px-3 text-white rounded-full'>{project.type_name}</div>,
        action: <div className='flex justify-center'>
            <td className='text-right py-2 px-4'></td>
        </div>

    }));

    const filteredProjects = useMemo(() => {
        return columnsDatas.filter(project =>
            project.name.toLowerCase().includes(searchTerm.toLowerCase())
            // ||
            // project.location_name.toLowerCase().includes(search.toLowerCase()) ||
            // project.type_name.toLowerCase().includes(search.toLowerCase())
        );
    }, [projects, searchTerm]);

    return (
        <>
            <PageLayout datas={projects} data={filteredProjects} columns={columns} setSearchTerm={(e) => setSearchTerm(e.target.value)} searchTerm={searchTerm}>
                <div className='text-sm text-white'>FILTER BY</div>


            </PageLayout>
        </>
    );
}

export default UserList;
