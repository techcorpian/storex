import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

import PageLayout from '../../shared/UIElements/PageLayout';
import { BsThreeDots } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa6";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";




import ProjectModal from '../components/ProjectModal';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [name, setName] = useState('');
    const [locationId, setLocationId] = useState('');
    const [TypeId, setTypeId] = useState('');
    const [typeName, setTypeName] = useState('');
    const [locationName, setLocationName] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // handling modal open and close
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);

        // Reset project input field
        setName('');
        setLocationId('');
        setTypeId('');
    };

    const [searchTerm, setSearchTerm] = useState('');
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const handleProjectUpload = async () => {
        // validation of inputs
        if (!name) {
            toast.error('Please Choose a File');
            return;
        } else if (!locationId) {
            toast.error('Please Choose a Location');
            return;
        } else if (!TypeId) {
            toast.error('Please Choose a Project Type');
            return;
        }

        const formData = { name, location_id: locationId, type_id: TypeId };
        try {
            const response = await axios.post(`${apiUrl}/projects/upload`, formData);
            console.log(response.data);
            toast.success('Project added successfully');

            // Reset project input field
            setName('');
            setLocationId('');
            setTypeId('');
            setIsModalOpen(false);

            // Update projects list after successful upload dynamically
            const updatedProjectsList = await axios.get(`${apiUrl}/projects/list`);
            setProjects(updatedProjectsList.data);
        } catch (error) {
            console.error('Error uploading folder:', error);
            toast.error('Error uploading folder');
        }
    };

    //handling input onChange
    const handleProjectChange = (e) => {
        // console.log(e.target.value);
        setName(e.target.value);
    };
    const handleLocationChange = (e) => {
        console.log(e.target.value);
        setLocationId(e.target.value);
    };
    const handleTypeChange = (e) => {
        // console.log(e.target.value);
        setTypeId(e.target.value);
    };

    // get projects list in UI
    useEffect(() => {
        axios.get(`${apiUrl}/projects/list`)
            .then((res) => {
                setProjects(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // get locations for dropdown
    useEffect(() => {
        axios.get(`${apiUrl}/projects/locations`)
            .then((res) => {
                setLocationName(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    //get project type for dropdown
    useEffect(() => {
        axios.get(`${apiUrl}/projects/projecttype`)
            .then((res) => {
                setTypeName(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const columns = [
        { key: 'projectname', title: 'Project Name', class: 'bg-sky-50 text-left', sort: 'projectname' },
        { key: 'location', title: 'Location', class: 'bg-sky-50 text-left', sort: 'location' },
        { key: 'type', title: 'Project Type', class: 'bg-sky-50 text-left', sort: 'type' },
        { key: 'team', title: 'Team', class: 'bg-sky-50 text-left', sort: 'team' },
        { key: 'action', title: 'Action', class: ' bg-sky-50 text-left w-5', sort: '' },
        // Add more columns as needed
    ];

    // Concatenate 'firstname' and 'lastname' keys into 'fullname' key
    const columnsDatas = projects.map((project) => ({
        ...project,
        projectname: `${project.name}`,
        location: `${project.location_name}`,
        type: <div className='text-xs bg-black/60 p-1 px-3 text-white rounded-full'>{project.type_name}</div>,
        team: <><div className='flex justify-center items-center text-lg font-bold bg-sky-700 h-8 w-8 text-white rounded-full border-4 border-gray-200'>{project.type_name.charAt(0)}</div>
            <div className='relative right-2 flex justify-center items-center text-lg font-bold bg-green-600 h-8 w-8 text-white rounded-full border-4 border-gray-200'>A</div></>,
        action: <div className='flex justify-center gap-2'>
            <div className='text-lg text-gray-400 hover:text-black/90 cursor-pointer'><BiSolidEdit /></div>
            <div className='text-lg text-gray-400 hover:text-black/90 cursor-pointer'><FaRegEye /></div>
            <div className='text-lg text-gray-400 hover:text-black/90 cursor-pointer'><RiDeleteBin6Line /></div>
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
            <PageLayout datas={projects} data={filteredProjects} columns={columns} setSearchTerm={(e) => setSearchTerm(e.target.value)} searchTerm={searchTerm} openModal={openModal} headerTitle='Projects' tagCount='98' tagTitle='Total Projects' addTitle='Add Projects'>
                <ProjectModal isModalOpen={isModalOpen} handleProjectUpload={handleProjectUpload} handleProjectChange={handleProjectChange} name={name} handleLocationChange={handleLocationChange} locationName={locationName} typeName={typeName} TypeId={TypeId} handleTypeChange={handleTypeChange} locationId={locationId} closeModal={closeModal} />
                <div className='text-sm text-white'>FILTER BY</div>


            </PageLayout>
            {/* Toast container to display notifications */}
            <ToastContainer />
        </>
    );
}

export default ProjectList;
