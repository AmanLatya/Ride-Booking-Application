import React from "react";
import userImg from "../assets/user.png";

const RidePopUpPanel = (props) => {
    return (
        <div className="bg-white p-5 rounded-2xl shadow-xl space-y-4 w-full max-w-md mx-auto border border-gray-200">
            {/* Rider Info */}
            <div className="bg-violet-100 p-4 rounded-xl flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <img className="h-14 w-14 object-cover rounded-full border border-white shadow-sm" src={userImg} alt="User" />
                    <div>
                        <h2 className="font-semibold text-gray-800 text-lg">Bethny Page</h2>
                        <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">10% Discount</span>
                    </div>
                </div>
                <div className="text-right">
                    <h3 className="text-lg font-semibold text-violet-600">$25.00</h3>
                    <p className="text-sm text-gray-600">2.25 km</p>
                </div>
            </div>

            {/* Pickup and Drop Info */}
            <div className="space-y-3">
                {/* Pickup */}
                <div className="flex items-start gap-3 bg-gray-50 px-4 py-3 rounded-xl shadow-sm">
                    <i className="ri-user-location-line text-xl text-blue-500 mt-1"></i>
                    <div>
                        <p className="text-xs text-gray-500 font-medium">PICKUP</p>
                        <p className="text-base font-semibold text-gray-800">Vijay Nagar, Near Atal Ground</p>
                    </div>
                </div>

                {/* Drop */}
                <div className="flex items-start gap-3 bg-gray-50 px-4 py-3 rounded-xl shadow-sm">
                    <i className="ri-map-pin-2-fill text-xl text-red-500 mt-1"></i>
                    <div>
                        <p className="text-xs text-gray-500 font-medium">DROP OFF</p>
                        <p className="text-base font-semibold text-gray-800">Railway Station</p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-2">
                <button
                    onClick={() => props.setRidePopUpPanel(false)}
                    className="px-5 py-2 font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
                >
                    Decline
                </button>
                <button
                    onClick={() => {

                        props.setAcceptRide(true)
                        props.setRidePopUpPanel(false)
                    }} // Replace with your logic
                    className="px-5 py-2 font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition"
                >
                    Accept
                </button>
            </div>
        </div>
    )
}

export default RidePopUpPanel;