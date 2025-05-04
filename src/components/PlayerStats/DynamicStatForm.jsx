import React, { useState } from 'react';

function AccordionUXTest() {
    const fieldGroups = [
        {
            label: 'Scoring',
            fields: ['Points', 'Free Throws', 'Field Goals']
        },
        {
            label: 'Rebounding',
            fields: ['Offensive Rebounds', 'Defensive Rebounds']
        }
    ];

    const [formData, setFormData] = useState({});
    const [openGroup, setOpenGroup] = useState(null);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        alert('Saved!\n' + JSON.stringify(formData, null, 2));
    };

    const handleClear = () => setFormData({});
    const handleDownload = () => alert('Pretend CSV downloaded 🧾');
    const handleHome = () => {
        localStorage.removeItem('selectedSport');
        localStorage.removeItem('selectedPosition');
        alert('Home clicked');
    };

    return (
        <div className="max-w-xl mx-auto pb-40 px-4 pt-6">
            <h2 className="text-2xl font-bold text-center mb-6">Accordion UX Test</h2>

            {fieldGroups.map(group => (
                <div key={group.label} className="mb-4 border border-gray-300 rounded">
                    <button
                        type="button"
                        className="w-full bg-gray-200 px-4 py-2 font-semibold text-left"
                        onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                    >
                        {group.label}
                    </button>
                    {openGroup === group.label && (
                        <div className="p-4 bg-yellow-100">
                            {group.fields.map(field => (
                                <div key={field} className="mb-3">
                                    <label className="block font-medium text-sm mb-1">{field}</label>
                                    <input
                                        type="number"
                                        name={field}
                                        value={formData[field] || ''}
                                        onChange={handleChange}
                                        className="w-full border rounded px-2 py-1"
                                        placeholder={field}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}

            {/* Sticky CTA bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md px-4 py-3 flex justify-around z-50 border-t">
                <button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded">
                    Save
                </button>
                <button onClick={handleClear} className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded">
                    Clear
                </button>
                <button onClick={handleDownload} className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded">
                    Download
                </button>
                <button onClick={handleHome} className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded">
                    Home
                </button>
            </div>
        </div>
    );
}

export default AccordionUXTest;