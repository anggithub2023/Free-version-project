import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function GetStartedPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 font-[Poppins]">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Ready To Get Started?</h1>
                <p className="text-sm text-gray-500">Choose an option below to begin setting up your team</p>
            </div>

            {/* Action Cards */}
            <div className="space-y-4 max-w-lg mx-auto">
                <div
                    onClick={() => navigate('/create-team')}
                    className="cursor-pointer bg-white shadow-md p-5 rounded-xl border border-gray-200 hover:shadow-lg transition"
                >
                    <h2 className="font-semibold text-lg text-blue-600 mb-1">Create New Team</h2>
                    <p className="text-sm text-gray-600">Add a roster from scratch</p>
                </div>

                <div
                    onClick={() => navigate('/join-team')}
                    className="cursor-pointer bg-white shadow-md p-5 rounded-xl border border-gray-200 hover:shadow-lg transition"
                >
                    <h2 className="font-semibold text-lg text-blue-600 mb-1">Find Your Team</h2>
                    <p className="text-sm text-gray-600">Join an existing team</p>
                </div>

                <div
                    onClick={() => navigate('/create-organization')}
                    className="cursor-pointer bg-white shadow-md p-5 rounded-xl border border-gray-200 hover:shadow-lg transition"
                >
                    <h2 className="font-semibold text-lg text-blue-600 mb-1">Create an Organization</h2>
                    <p className="text-sm text-gray-600">For leagues, clubs, or tournament admins</p>
                </div>
            </div>
        </div>
    );
}