import React, { useState } from 'react';

const CustomDropdown = ({ options, label, value, optValue, optLabel, setValue }) => {
    const [focused, setFocused] = useState(false);
    // const [selectedOption, setSelectedOption] = useState('');

    const handleFocus = () => setFocused(true);
    const handleBlur = () => {
        console.log(value, 'my value');
        if (value === '') {
            setFocused(false);
        }
    };

    return (
        <div className="relative w-full">
            <select
                onChange={setValue}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`block w-full px-4 py-3 text-base bg-transparent border border-gray-400 rounded ${focused ? 'focus: border-2 focus:border-blue-500' : ''
                    }`}
            >
                <option key='' value=''> </option>
                {options.map((option) => (
                    <option key={option[optValue]} value={option[optValue]}>
                        {option[optLabel]}
                    </option>
                ))}
                
            </select>
            
            <label
                className={`absolute left-3 transition-all duration-200 ease-in-out text-base cursor-text ${focused || value
                    ? '-top-2 text-xs bg-white px-1 text-blue-600 font-semibold'
                    : 'top-2.5 text-gray-900 px-1'
                    }`}
            >
                {label}
            </label>
        </div>
    );
};

export default CustomDropdown;
