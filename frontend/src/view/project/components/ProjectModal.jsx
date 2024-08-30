import React, { useState } from 'react';
import ModalLayout from '../../shared/UIElements/ModalLayout';
import { IoIosCloseCircleOutline } from "react-icons/io";

import CustomInput from '../../shared/inputs/CustomInput';
import CustomDropdown from '../../shared/inputs/CustomDropdown';

const ProjectModal = ({ isModalOpen, closeModal, handleProjectUpload, handleProjectChange, name, locationName, locationId, handleLocationChange, typeName, handleTypeChange, TypeId }) => {

    return (
        <div>
            {/* <button onClick={openModal}>Open Modal</button> */}
            {isModalOpen && (
                <ModalLayout onClose={closeModal}>
                    <div className='flex flex-col justify-between h-full'>
                        <div className='mb-4 flex flex-col gap-4 justify-between'>
                            <div className='flex justify-between items-start pb-2'>
                                <div className='text-3xl font-medium text-gray-900 '>Add Projects</div>
                                <div onClick={closeModal}><IoIosCloseCircleOutline className='text-xl text-red-300 hover:text-red-700' /></div>
                            </div>
                            {/* <input type="text" className='border p-2' value={name} onChange={handleProjectChange} /> */}
                            <div className='flex gap-4'>
                                <CustomInput id='name' type='text' label='Project Name' value={name} setValue={handleProjectChange} />
                                <CustomDropdown options={locationName} label='Location' value={locationId} optLabel='name' setValue={handleLocationChange} optValue='id' />
                            </div>
                            <div className='flex gap-4 '>
                                <CustomDropdown options={typeName} label='Project Type' value={TypeId} optLabel='type' setValue={handleTypeChange} optValue='id' />
                                <div className='w-full'></div>
                            </div>
                        </div>
                        <div className='flex justify-end gap-3'>
                            <button onClick={handleProjectUpload} className='border border-gray-900 py-2 px-5 text-base rounded-full hover:bg-black hover:text-white'>Reset</button>
                            <button onClick={handleProjectUpload} className='bg-black py-2 px-5 text-base rounded-full text-white'>Save</button>
                        </div>
                    </div>
                </ModalLayout>
            )}
        </div>
    );
};

export default ProjectModal;
