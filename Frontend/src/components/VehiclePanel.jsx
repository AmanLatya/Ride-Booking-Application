import React from "react";
import carImg from "../assets/car.png"; // Assuming you have a car image in your assets folder
import bikeImg from "../assets/Bike.webp";
import autoImg from "../assets/Auto.png";

const VehiclePanel = (props) => {
    return (
        <div className="flex flex-col gap-5">
            <div
                onClick={() => {
                    props.setVehiclePanel(false)
                    props.setPanel(true)
                }}
                className="flex items-center justify-center p-2">
                <div className="line w-15 h-1 mb-2 bg-gray-300 rounded-full"></div>
            </div>
            <h1 className="text-2xl font-semibold">Choose Vehicle</h1>


            {/* CAR */}
            <div 
            onClick={() =>{
                props.setConfirmRidePanel(true);
                props.setVehiclePanel(false);
                props.setVehicleType('car');
            }}
            className="flex items-center border-2 border-gray-100 active:border-black w-full justify-between  py-2 rounded-lg shadow-md">
                <img className="h-16" src={carImg} alt="" />
                <div className=" px-5 w-1/2">
                    <h2 className="text-base font-medium">UberGo  <span><i className="ri-group-line"></i> 4</span></h2>
                    <h4 className="">2 min away</h4>
                    <h5 className="text-gray-700">Affordable, compact ride</h5>
                </div>
                <h2 className="font-medium text-xl p-4">₹{props.fare.car}</h2>
            </div>


            {/* BIKE */}
            <div 
            onClick={() =>{
                props.setConfirmRidePanel(true);
                props.setVehiclePanel(false);
                props.setVehicleType('bike');
            }}
            className="flex items-center border-2 border-gray-100 active:border-black w-full justify-between  py-2 rounded-lg shadow-md">
                <img className="h-13" src={bikeImg} alt="" />
                <div className=" px-5 w-1/2">
                    <h2 className="text-base font-medium">Bike  <span><i className="ri-group-line"></i> 1</span></h2>
                    <h4 className="">2 min away</h4>
                    <h5 className="text-gray-700">Affordable, Bike ride</h5>
                </div>
                <h2 className="font-medium text-xl p-4">₹{props.fare.bike}</h2>
            </div>


            {/* AUTO */}
            <div 
            onClick={() =>{
                props.setConfirmRidePanel(true);
                props.setVehiclePanel(false);
                props.setVehicleType('auto');
            }}
            className="flex items-center border-2 border-gray-100 active:border-black w-full justify-between  py-2 rounded-lg shadow-md">
                <img className="h-16" src={autoImg} alt="" />
                <div className=" px-5 w-1/2">
                    <h2 className="text-base font-medium">Auto  <span><i className="ri-group-line"></i> 3</span></h2>
                    <h4 className="">2 min away</h4>
                    <h5 className="text-gray-700">Affordable, Auto ride</h5>
                </div>
                <h2 className="font-medium text-xl p-4">₹{props.fare.auto}</h2>
            </div>
        </div>
    )
}

export default VehiclePanel;