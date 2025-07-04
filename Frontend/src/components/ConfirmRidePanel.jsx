import React from "react";
import carImg from "../assets/car.png";

const ConfirmRidePanel = (props) => {
    return (
        <div className="py-5 px-4 w-full flex flex-col justify-center items-center gap-4">
            {/* Drag Handle */}
            <div
                onClick={() => {
                    props.setConfirmRidePanel(false);
                    props.setVehiclePanel(true);
                }}
                className="flex justify-center"
            >
                <div className="w-14 h-1 bg-gray-300 rounded-full cursor-pointer"></div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-semibold text-center text-gray-800">
                Looking for nearby drivers...
            </h1>

            {/* Vehicle Image */}
            <div className="flex justify-center w-full">
                <img className="h-40 object-contain" src={carImg} alt="Vehicle" />
            </div>

            {/* Pickup Info */}
            <div className="flex items-center w-full gap-3 px-4 py-3 rounded-xl shadow-sm bg-white">
                <div className="text-2xl text-green-600">
                    <i className="ri-user-location-line"></i>
                </div>
                <div>
                    <h2 className="text-lg font-medium text-gray-900">196 D-S-3</h2>
                    <p className="text-sm text-gray-500">Vijay Nagar, Near Atal Ground.</p>
                </div>
            </div>

            {/* Drop Info */}
            <div className="flex items-center w-full gap-3 px-4 py-3 rounded-xl shadow-sm bg-white">
                <div className="text-2xl text-red-500">
                    <i className="ri-map-pin-2-fill"></i>
                </div>
                <div>
                    <h2 className="text-lg font-medium text-gray-900">SGSITS</h2>
                    <p className="text-sm text-gray-500">Near Railway Station</p>
                </div>
            </div>

            {/* Fare Info */}
            <div className="flex items-center w-full gap-3 px-4 py-3 rounded-xl shadow-sm bg-white">
                <div className="text-2xl text-yellow-600">
                    <i className="ri-wallet-fill"></i>
                </div>
                <div>
                    <h2 className="text-lg font-medium text-gray-900">₹195.56</h2>
                    <p className="text-sm text-gray-500">Cash</p>
                </div>
            </div>

            {/* Confirm Ride Button */}
            <button
                onClick={() => {
                    props.setWaitingDriverPanel(true);
                    props.setConfirmRidePanel(false);
                }}
                className="w-full bg-green-500 text-white text-xl font-semibold py-3 rounded-2xl hover:bg-green-600 transition duration-200"
            >
                Confirm Ride
            </button>
        </div>
    );
};

export default ConfirmRidePanel;
