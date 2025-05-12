// src/pages/GetStartedPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillPeopleFill, BsPlusCircle, BsBoxArrowInRight } from 'react-icons/bs';

export default function GetStartedPage() {
    const navigate = useNavigate();

    return (
        <div className="max-w-md mx-auto mt-24 px-4 text-center font-[Poppins]">
            <BsFillPeopleFill className="text-4xl mx-auto text-blue-600 mb-4" />
            <h1 className="text-2xl font-semibold mb-2">Welcome to ProcessWins</h1>
            <p className="text-sm text-gray-600 mb-8">
                Get started by creating or joining a team.
            </p>

            <div className="flex flex-col gap-4">
                <button
                    onClick={() => navigate('/create-team')}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    <BsPlusCircle className="text-lg" />
                    Create a Team
                </button>

                <button
                    onClick={() => navigate('/join-team')}
                    className="flex items-center justify-center gap-2 px-4 py-3 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
                >
                    <BsBoxArrowInRight className="text-lg" />
                    Join with a Code
                </button>
            </div>
        </div>
    );
}