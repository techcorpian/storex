import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { BsFillGridFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { BsSortUp } from "react-icons/bs";
import { BsSortDown } from "react-icons/bs";
import { TbArrowsSort } from "react-icons/tb";
import './Tables.css';

const PageLayout = ({ children, datas, data, columns, setSearchTerm, searchTerm, headerTitle, tagCount, tagTitle, addTitle, openModal }) => {
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const handleSort = (column) => {
        setSortColumn(column);
        setSortDirection(sortColumn === column ? (sortDirection === 'asc' ? 'desc' : 'asc') : 'asc');
    };

    const sortedCustomers = sortColumn
        ? data.sort((a, b) => {
            const columnA = a[sortColumn];
            const columnB = b[sortColumn];
            if (columnA < columnB) return sortDirection === 'asc' ? -1 : 1;
            if (columnA > columnB) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        })
        : data;

    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    const currentData = sortedCustomers.slice(startIndex, endIndex);

    const getPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePerPageChange = (perPageValue) => {
        setPerPage(perPageValue);
        // Ensure current page remains valid after changing entries per page
        const newTotalPages = Math.ceil(datas.length / perPageValue);
        setCurrentPage(Math.min(currentPage, newTotalPages));
    };

    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / perPage);

    return (
        <main className='flex flex-col md:flex-row justify-between items-start p-6 pt-20 gap-6 h-screen'>

            <div className='flex flex-col w-full md:w-1/4'>
                <div className='flex items-center gap-6 mb-5'>
                    <div className='text-4xl font-medium text-black/80'>{headerTitle}</div>
                    <div className='text-xs border text-gray-500 border-gray-300 p-1 px-3 rounded-full'>
                        <span className='text-sm font-semibold text-gray-900'>{tagCount} </span>
                        {tagTitle}
                    </div>
                </div>
                <div className='bg-black/80 rounded-lg p-4'>
                    {children}
                </div>
            </div>

            <div className='flex flex-col w-full md:w-full gap-4'>
                <div className='flex justify-between items-center gap-3'>
                    {/* Search Box */}
                    <div className='relative w-full md:w-auto flex-1'>
                        <input
                            type="text"
                            placeholder="Search Users..."
                            className='w-full bg-white text-gray-700 placeholder-gray-300 placeholder:font-light outline-none pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500'
                            value={searchTerm}
                            onChange={setSearchTerm}
                        />
                        <AiOutlineSearch className='w-5 h-5 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-700 ' />
                    </div>
                    <div>
                        <label className='border border-gray-200 bg-gray-200 p-3 text-sm rounded-lg px-3 text-black font-light'>
                            Show
                            <select className='p-1 text-gray-700 font-light bg-transparent border-r border-l border-gray-300 text-md mx-1' value={perPage} onChange={(e) => handlePerPageChange(parseInt(e.target.value, 10))}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                            </select>
                            Entries
                        </label>
                    </div>
                    <div className='flex bg-gray-200 rounded-lg'>
                        <button className='border border-transparent hover:border-blue-500 hover:text-blue-500 rounded-lg p-2 text-2xl'>
                            <FiMenu />
                        </button>
                        <button className='border border-transparent hover:border-blue-500 hover:text-blue-500 rounded-lg p-2 text-2xl'>
                            <BsFillGridFill />
                        </button>
                    </div>
                    <div className='flex justify-between items-center border-l pl-3 border-gray-300'>
                        <button onClick={openModal} className='md:block hidden bg-black/80 text-white py-2 px-4 rounded-lg'>
                            {addTitle}
                        </button>
                        <button className='md:hidden bg-blue-500 text-white p-3 rounded-lg'>
                            <FaPlus />
                        </button>
                    </div>
                </div>
                <div className='flex-grow'>
                    <div className='max-h-[calc(100vh-13.5rem)] overflow-x-auto overflow-y-auto'>

                        <table className='min-w-full table-auto '>
                            {/* Table headers */}
                            <thead className=''>
                                <tr className="bg-cyan-100 cursor-pointer sticky top-0 z-10">
                                    {columns.map((column, index) => (
                                        <th key={index} className={`py-3 px-4 text-black/80 text-sm font-semibold uppercase ${column.class}`} onClick={() => handleSort(column.sort)}>
                                            {column.title}
                                            <button className='filter_button font-thin ml-1'>
                                                {sortColumn === column.sort ? (sortDirection === 'asc' ? <BsSortUp /> : <BsSortDown />) : (<TbArrowsSort />)}
                                            </button>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            {/* Table body */}
                            <tbody className="bg-gray-200">
                                {currentData.length > 0 ? (
                                    currentData.map((item) => (
                                        <tr
                                            className="hover:bg-sky-50 hover:border-gray-800 text-gray-700 m-6"
                                            key={item.id}
                                        >
                                            {columns.map((column, index) => (
                                                <td
                                                    className={`py-1 my-3 text-sm font-light ${column.class}`}
                                                    key={column.key}
                                                >
                                                    <div
                                                        className={`py-3 bg-black/5 px-4 border border-transparent h-[47px] items-center flex font-light ${index === 0 ? "rounded-l-lg" : ""
                                                            } ${index === columns.length - 1
                                                                ? "rounded-r-lg"
                                                                : ""
                                                            } ${column.key === "action"
                                                                ? ""
                                                                : "hover:border-black/10 hover:bg-black/10"
                                                            }`}
                                                    >
                                                        {item[column.key]}
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={columns.length}
                                            className="py-3 text-center text-gray-500 border border-gray-400"
                                        >
                                            No data to show
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                    </div>
                    {/* Pagination controls */}
                    <div className='pagination mt-6'>
                        <button className='hover:bg-black/80 hover:border hover:border-black/80 hover:text-white' disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                            Previous
                        </button>
                        {getPageNumbers().map((page) => (
                            <button key={page} onClick={() => handlePageChange(page)} className={currentPage === page ? 'active' : ''}>{page}</button>
                        ))}
                        <button className='hover:bg-black/80 hover:border hover:border-black/80 hover:text-white' disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default PageLayout;
