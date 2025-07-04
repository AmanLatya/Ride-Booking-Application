import React from "react";
import carImg from "../assets/car.png";
import bikeImg from "../assets/Bike.webp";
import autoImg from "../assets/Auto.png";

const VehiclePanel = (props) => {
    const handleSelection = () => {
        props.setConfirmRidePanel(true);
        props.setVehiclePanel(false);
    };

    const vehicleOptions = [
        {
            img: carImg,
            title: "UberGo",
            people: 4,
            time: "2 min away",
            desc: "Affordable, compact ride",
            price: "₹193.25"
        },
        {
            img: bikeImg,
            title: "Bike",
            people: 1,
            time: "2 min away",
            desc: "Affordable, bike ride",
            price: "₹80"
        },
        {
            img: autoImg,
            title: "Auto",
            people: 3,
            time: "2 min away",
            desc: "Affordable, auto ride",
            price: "₹111.25"
        }
    ];

    return (
        <div className="flex flex-col gap-5 w-full max-w-2xl mx-auto px-4 md:px-6">
            {/* Pull Handle */}
            <div
                onClick={() => {
                    props.setVehiclePanel(false);
                    props.setPanel(true);
                }}
                className="flex justify-center"
            >
                <div className="w-14 h-1 bg-gray-300 rounded-full cursor-pointer"></div>
            </div>

            {/* Title */}
            <h1 className="text-xl md:text-2xl font-semibold text-center md:text-left">
                Choose Your Vehicle
            </h1>

            {/* Options */}
            {vehicleOptions.map((item, index) => (
                <div
                    key={index}
                    onClick={handleSelection}
                    className="flex items-center gap-4 md:gap-6 border border-gray-200 hover:border-black active:border-black w-full justify-between py-3 px-4 md:px-6 rounded-xl shadow-sm bg-white cursor-pointer hover:bg-gray-50 transition-all duration-200"
                >
                    <img className="h-14 md:h-16 object-contain" src={item.img} alt={item.title} />
                    <div className="flex-1 px-2 md:px-4">
                        <h2 className="text-base md:text-lg font-medium text-gray-800 flex items-center gap-1">
                            {item.title}
                            <span className="text-sm text-gray-500 ml-1">
                                <i className="ri-group-line text-base"></i> {item.people}
                            </span>
                        </h2>
                        <p className="text-sm text-gray-500">{item.time}</p>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                    <h2 className="font-semibold text-base md:text-xl text-green-600">{item.price}</h2>
                </div>
            ))}
        </div>
    );
};

export default VehiclePanel;
