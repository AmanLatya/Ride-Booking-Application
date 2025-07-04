import React from "react";
import carImg from "../assets/car.png"


const LookingForDriver = (props) => {
    return (
        <div className="py-5 px-3 w-full flex flex-col justify-center items-center gap-2">
            <div
                onClick={() => {
                    props.setLookingDriverPanel(false);
                    props.setConfirmRidePanel(true);
                }}
                className="flex justify-center mb-3">
                <div className="line w-15 h-1  bg-gray-300 rounded-full"></div>
            </div>

            <h1 className="text-2xl font-semibold">Looking for Drivers</h1>
            <div className=" flex items-center justify-center shadow-md w-full">
                <img className="h-50 pl-5 pb-7" src={carImg} alt="" />
            </div>
            <div className="flex items-center w-full active:border-2 justify-start gap-2 px-4 py-3 rounded-lg shadow-md bg-white">
                <h2 className="flex items-center justify-center text-xl mx-5 rounded-3xl">
                    <i className="ri-user-location-line"></i>
                </h2>
                <div>
                    <h1 className="text-2xl font-medium">196 D-S-3</h1>
                    <h3 className="">Vijay Nagar, Near Atal Ground.</h3>
                </div>
            </div>
            <div className="flex items-center w-full active:border-2 justify-start gap-2 px-4 py-3 rounded-lg shadow-md bg-white">
                <h2 className="flex items-center justify-center text-xl mx-5 rounded-3xl">
                    <i className="ri-map-pin-2-fill"></i>
                </h2>
                <div>
                    <h1 className="text-2xl font-medium">SGSITS</h1>
                    <h3 className="">Near Railway Station</h3>
                </div>
            </div>
            <div className="flex items-center w-full active:border-2 justify-start gap-2 px-4 py-3 rounded-lg shadow-md bg-white">
                <h2 className="flex items-center justify-center text-xl mx-5 rounded-3xl">
                    <i className="ri-wallet-fill"></i>
                </h2>
                <div>
                    <h1 className="text-2xl font-medium">195.56</h1>
                    <h3 className="">Cash Cash</h3>
                </div>
            </div>
        </div>
    )
}

export default LookingForDriver;