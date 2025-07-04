import React, { useRef, useState } from "react";
import uberLogo from "../assets/Uber_black.webp";
import mapImg from "../assets/map.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css';

import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRidePanel from "../components/ConfirmRidePanel";
import WaitingDriver from "../components/WaitingDriver";

const Home = () => {
    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [panel, setPanel] = useState(false);
    const [vehiclePanel, setVehiclePanel] = useState(false);
    const [confirmRidePanel, setConfirmRidePanel] = useState(false);
    const [waitingDriverPanel, setWaitingDriverPanel] = useState(false);

    const panelRef = useRef(null);
    const panelCloseRef = useRef(null);
    const vehiclePanelRef = useRef(null);
    const confirmRidePanelRef = useRef(null);
    const waitingDriverRef = useRef(null);

    const onSubmit = (e) => {
        e.preventDefault();
        setPanel(false);
        setVehiclePanel(true);
    };

    // Panel animations
    useGSAP(() => {
        gsap.to(panelRef.current, {
            height: panel ? "65%" : "0%",
            padding: panel ? 20 : 0,
            duration: 0.3,
            ease: "power2.out",
        });
        gsap.to(panelCloseRef.current, {
            opacity: panel ? 1 : 0,
        });
    }, [panel]);

    useGSAP(() => {
        gsap.to(vehiclePanelRef.current, {
            y: vehiclePanel ? 0 : "100%",
            duration: 0.3,
            ease: "power2.out",
        });
    }, [vehiclePanel]);

    useGSAP(() => {
        gsap.to(confirmRidePanelRef.current, {
            y: confirmRidePanel ? 0 : "100%",
            duration: 0.3,
            ease: "power2.out",
        });
    }, [confirmRidePanel]);

    useGSAP(() => {
        gsap.to(waitingDriverRef.current, {
            y: waitingDriverPanel ? 0 : "100%",
            duration: 0.3,
            ease: "power2.out",
        });
    }, [waitingDriverPanel]);

    return (
        <div className="h-screen relative overflow-hidden">
            {/* Map Background */}
            <img src={mapImg} className="h-screen w-screen object-cover absolute" alt="Map" />

            {/* Uber Logo */}
            <img src={uberLogo} className="absolute w-24 top-5 left-5" alt="Uber Logo" />

            {/* Ride Form */}
            <div className="absolute top-0 w-full flex flex-col justify-end h-screen z-10">
                <div className="bg-white p-5 relative rounded-t-3xl shadow-lg">
                    <span
                        className="text-xl absolute right-7 top-5 cursor-pointer"
                        onClick={() => setPanel(false)}
                    >
                        <i ref={panelCloseRef} className="ri-arrow-down-wide-line transition-opacity duration-300"></i>
                    </span>

                    <h3 className="text-2xl font-semibold mb-5">Find a trip</h3>
                    <form onSubmit={onSubmit} className="space-y-3">
                        {/* Vertical Line between inputs */}
                        {/* <div className="absolute left-4 top- h-15 w-2 bg-gray-400 rounded-full"></div> */}

                        {/* Pickup Input */}
                        <div className="relative">
                            <i className="ri-circle-fill absolute top-1/2 left-3 -translate-y-1/2 text-sm text-gray-400"></i>
                            <input
                                onClick={() => setPanel(true)}
                                value={pickup}
                                onChange={(e) => setPickup(e.target.value)}
                                type="text"
                                className="bg-gray-100 rounded-lg pl-10 pr-4 w-full py-2 text-base"
                                placeholder="Enter a pick-up location"
                                required
                            />
                        </div>

                        {/* Destination Input */}
                        <div className="relative">
                            <i className="ri-map-pin-2-fill absolute top-1/2 left-3 -translate-y-1/2 text-sm text-gray-400"></i>
                            <input
                                onClick={() => setPanel(true)}
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                type="text"
                                className="bg-gray-100 rounded-lg pl-10 pr-4 w-full py-2 text-base"
                                placeholder="Enter a destination location"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 rounded-lg text-lg font-medium hover:bg-gray-800 transition duration-200"
                        >
                            Request Ride
                        </button>
                    </form>

                </div>

                {/* Location Search Panel */}
                <div ref={panelRef} className="bg-white overflow-y-auto max-h-[70%] rounded-t-2xl">
                    <LocationSearchPanel setPanel={setPanel} setVehiclePanel={setVehiclePanel} />
                </div>

                {/* Vehicle Options Panel */}
                <div
                    ref={vehiclePanelRef}
                    className="z-20 fixed bg-white px-6 pb-7 pt-5 translate-y-full w-full bottom-0 rounded-t-2xl shadow-2xl"
                >
                    <VehiclePanel
                        setPanel={setPanel}
                        setVehiclePanel={setVehiclePanel}
                        setConfirmRidePanel={setConfirmRidePanel}
                    />
                </div>

                {/* Confirm Ride Panel */}
                <div
                    ref={confirmRidePanelRef}
                    className="z-20 fixed bg-white px-6 pb-7 pt-5 translate-y-full w-full bottom-0 rounded-t-2xl shadow-2xl"
                >
                    <ConfirmRidePanel
                        setVehiclePanel={setVehiclePanel}
                        setConfirmRidePanel={setConfirmRidePanel}
                        setWaitingDriverPanel={setWaitingDriverPanel}
                    />
                </div>

                {/* Waiting for Driver Panel */}
                <div
                    ref={waitingDriverRef}
                    className="z-20 fixed bg-white px-6 pb-7 pt-5 translate-y-full w-full bottom-0 rounded-t-2xl shadow-2xl"
                >
                    <WaitingDriver
                        setWaitingDriverPanel={setWaitingDriverPanel}
                        setConfirmRidePanel={setConfirmRidePanel}
                        setVehiclePanel={setVehiclePanel}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
