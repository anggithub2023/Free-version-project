import React from 'react';

const FormField = ({ id, label, type = "text", value, onChange, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <input
            id={id}
            name={id}
            type={type}
            value={value}
            onChange={onChange}
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            {...props}
        />
    </div>
);

export default FormField;