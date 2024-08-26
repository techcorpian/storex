import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiPlus } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DownloadButton from './DownloadButton';
import PageLayout from '../../shared/UIElements/PageLayout.jsx'; // Import the Table component

const FileTable = ({filesList, setFilesList, openModal}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const { id } = useParams();

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };
  
    useEffect(() => {
      async function fetchFiles() {
        try {
          const response = await axios.get(`${apiUrl}/store/files/${id}`);
          setFilesList(response.data);
        } catch (error) {
          console.error('Error fetching files:', error);
        }
      }
  
      fetchFiles();
    }, []);

        const columns = [
            { key: 'filename', title: 'File Name', class: 'bg-sky-50 text-left ', sort: 'filename' },
            { key: 'action', title: 'Action', class: 'w-[1%] bg-sky-50 text-right', sort: '' },
            // Add more columns as needed
          ];

          // Concatenate 'firstname' and 'lastname' keys into 'fullname' key
const columnsDatas = filesList.map((file) => ({
    ...file,
    filename: `${file.filename}`,
    action: <div className='flex justify-center'>
        <td className='text-right py-2 px-4'><DownloadButton file={file}/></td>
  </div>
  
  }));
  
  const filteredCustomers = columnsDatas.filter((file) =>
  file.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>

      {/* Use the Table component with pagination props */}
      <PageLayout
        datas={filesList}
        data={filteredCustomers}
        columns={columns}
        setSearchTerm={(e) => setSearchTerm(e.target.value)}
        searchTerm={searchTerm}

      />
      
    </>
  )
}

export default FileTable