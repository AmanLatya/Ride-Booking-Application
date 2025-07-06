import React from "react";
import userImg from "../assets/user.png";
import { useContext } from "react";
import { CaptionDataContext } from "../context/captionContext";

const CaptionDetails = () => {
    const {caption} = useContext(CaptionDataContext);

    return (
        <div className="p-4 space-y-5">
            {/* Profile Card */}
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-4">
                    <img className="h-14 w-14 object-cover rounded-full border border-gray-300" src={userImg} alt="User" />
                    <h3 className="text-lg font-semibold text-gray-800 capitalize">{caption.fullName.firstName + " " + caption.fullName.lastName}</h3>
                </div>
                <div className="text-right">
                    <h1 className="text-xl font-bold text-green-600">₹192.52</h1>
                    <p className="text-sm text-gray-500">Earned Today</p>
                </div>
            </div>

            {/* Stats Panel */}
            <div className="flex items-center justify-between bg-gray-100 p-4 rounded-xl shadow-inner">
                {/* Hours Online */}
                <div className="flex flex-col items-center text-center">
                    <i className="ri-time-line text-3xl text-blue-600"></i>
                    <h2 className="text-lg font-semibold text-gray-800 mt-1">10.2</h2>
                    <p className="text-xs text-gray-500">Hours Online</p>
                </div>

                {/* Distance */}
                <div className="flex flex-col items-center text-center">
                    <i className="ri-speed-up-line text-3xl text-amber-600"></i>
                    <h2 className="text-lg font-semibold text-gray-800 mt-1">30 KM</h2>
                    <p className="text-xs text-gray-500">Total Distance</p>
                </div>

                {/* Total Rides */}
                <div className="flex flex-col items-center text-center">
                    <i className="ri-booklet-line text-3xl text-purple-600"></i>
                    <h2 className="text-lg font-semibold text-gray-800 mt-1">30</h2>
                    <p className="text-xs text-gray-500">Total Rides</p>
                </div>
            </div>
        </div>
    );
};

export default CaptionDetails;
