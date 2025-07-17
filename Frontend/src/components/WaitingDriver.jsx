import React from "react";
import carImg from "../assets/car.png";
import autoImg from "../assets/Auto.png"
import bikeImg from "../assets/Bike.webp";
import userImg from "../assets/user.png";

const WaitingDriver = (props) => {
    if (!props.ride) {
        return <div>Loading ride details...</div>;
    }

    let vehicle = props.vehicleType;

    let img = carImg;
    if (vehicle == 'car') img = carImg;
    else if (vehicle == 'bike') img = bikeImg;
    else if (vehicle == 'auto') img = autoImg;

    return (
        <div className="px-5 py-6 flex flex-col gap-5 w-full h-1/2 max-w-2xl mx-auto">
            {/* Pull Handle */}
            {/* <div
                onClick={() => {
                    props.setWaitingDriverPanel(true) ? false : true;
                    // props.setWaitingDriverPanel(WaitingDriver);
                    // props.setConfirmRidePanel(true);
                }}
                className="flex justify-center"
            >
                <div className="w-14 h-1 bg-gray-300 rounded-full cursor-pointer"></div>
            </div> */}

            {/* Heading */}
            <div className="flex justify-between items-center border-b pb-2">
                <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Meet at pickup point</h1>
                <span className="px-3 py-1 bg-black text-white text-sm md:text-lg font-bold rounded-lg">2 Min</span>
            </div>

            {/* Driver Info */}
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <img className="h-16 w-16 rounded-full object-cover" src={userImg} alt="Driver" />
                    <img className="h-16 object-contain" src={img} alt="Car" />
                </div>
                <div className="text-right">
                    <h3 className="text-lg font-medium text-gray-800 capitalize">{props.ride.caption.fullName.firstName}</h3>
                    <h1 className="text-2xl font-semibold text-black tracking-wide capitalize">{props.ride.caption.vehicle.vehicleNumber}</h1>
                    <p className="text-sm text-gray-600 capitalize">White Suzuki S-Presso LXI</p>
                    <p className="text-green-500 text-md font-semibold">OTP - {props.ride.otp}</p>
                </div>
            </div>

            {/* Chat Box */}
            <form className="relative w-full md:w-3/4">
                <input
                    type="text"
                    placeholder="Send a message..."
                    className="py-3 pl-5 pr-12 w-full bg-gray-200 rounded-full placeholder:text-base font-medium focus:outline-none"
                />
                <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
                >
                    <i className="ri-send-plane-2-fill text-xl"></i>
                </button>
            </form>

            {/* Action Buttons */}
            <div className="flex justify-around items-center text-center">
                <div className="flex flex-col items-center text-sm text-gray-700">
                    <i className="bg-gray-200 rounded-full p-3 text-2xl ri-shield-fill"></i>
                    <span className="mt-1">Safety</span>
                </div>
                <div className="flex flex-col items-center text-sm text-gray-700">
                    <i className="bg-gray-200 rounded-full p-3 text-2xl ri-share-box-fill"></i>
                    <span className="mt-1">Share Trip</span>
                </div>
                <div className="flex flex-col items-center text-sm text-gray-700">
                    <i className="bg-gray-200 rounded-full p-3 text-2xl ri-phone-fill"></i>
                    <span className="mt-1">Call Driver</span>
                </div>
            </div>

            {/* Pickup Info */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg shadow-md bg-white w-full">
                <div className="text-xl text-green-600">
                    <i className="ri-user-location-line"></i>
                </div>
                <div>
                    <h2 className="text-lg font-medium text-gray-800">Pickup</h2>
                    <p className="text-sm text-gray-600">{props.ride.pickup}</p>
                </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg shadow-md bg-white w-full">
                <div className="text-xl text-red-600">
                    <i className="ri-user-location-line"></i>
                </div>
                <div>
                    <h2 className="text-lg font-medium text-gray-800">Destination</h2>
                    <p className="text-sm text-gray-600">{props.ride.destination}</p>
                </div>
            </div>

            {/* Cancel Button */}
            <button
                onClick={() => {
                    props.setWaitingDriverPanel(false);
                    props.setVehiclePanel(true);
                    props.cancelRide();
                }}
                type="button"
                className="w-full bg-red-500 hover:bg-red-600 text-white text-lg font-semibold py-3 rounded-lg shadow-md"
            >
                Cancel Ride
            </button>
        </div>
    );
};

export default WaitingDriver;
