import React from "react";
import carImg from "../assets/car.png"
import autoImg from "../assets/Auto.png"
import bikeImg from "../assets/Bike.webp";

const SearchingForDriver = (props) => {
    const vehicle = props.vehicleType;
    let img = carImg; 
    if (vehicle == 'car') img = carImg;
    else if (vehicle == 'bike') img = bikeImg;
    else if (vehicle == 'auto') img = autoImg;
    return (
        <div className="py-5 px-3 w-full flex flex-col justify-center items-center gap-2">
            <div
                onClick={() => {
                    props.setSearchingDriverPanel(false);
                    // props.setConfirmRidePanel(true);
                }}
                className="flex justify-center mb-3">
                <div className="line w-15 h-1  bg-gray-300 rounded-full"></div>
            </div>

            <h1 className="text-2xl font-semibold">Searching for Driver...</h1>
            <div className=" flex items-center justify-center shadow-md w-full">
                <img className="h-50 pl-5 pb-7" src={img} alt="" />
            </div>
            <div className="flex items-center w-full active:border-2 justify-start gap-2 px-4 py-3 rounded-lg shadow-md bg-white">
                <h2 className="flex items-center justify-center text-xl mx-5 rounded-3xl">
                    <i className="ri-user-location-line"></i>
                </h2>
                <div>
                    {/* <h1 className="text-2xl font-medium">196 D-S-3</h1> */}
                    <h3 className="text-lg">{props.pickup}</h3>
                </div>
            </div>
            <div className="flex items-center w-full active:border-2 justify-start gap-2 px-4 py-3 rounded-lg shadow-md bg-white">
                <h2 className="flex items-center justify-center text-xl mx-5 rounded-3xl">
                    <i className="ri-map-pin-2-fill"></i>
                </h2>
                <div>
                    {/* <h1 className="text-2xl font-medium">SGSITS</h1> */}
                    <p className="text-lg ">{props.destination}</p>
                </div>
            </div>
            <div className="flex items-center w-full active:border-2 justify-start gap-2 px-4 py-3 rounded-lg shadow-md bg-white">
                <h2 className="flex items-center justify-center text-xl mx-5 rounded-3xl">
                    <i className="ri-wallet-fill"></i>
                </h2>
                <div>
                    <h1 className="text-2xl font-medium">₹ {props.fare[vehicle]}</h1>
                    <h3 className="">Cash Cash</h3>
                </div>
            </div>
        </div>
    )
}

export default SearchingForDriver;