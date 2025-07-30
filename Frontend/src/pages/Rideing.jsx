import React, { useContext, useEffect, useRef, useState } from "react";
import mapImg from "../assets/map.png";
import carImg from "../assets/car.png";
import userImg from "../assets/user.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link, useLocation } from "react-router-dom";
import { SocketContext } from "../context/socketContext";

const Rideing = (props) => {
    const [paymentPanel, setPaymentPanel] = useState(true);
    const paymentPanelRef = useRef(null);
    const paymentClosePanelRef = useRef(null);
    const location = useLocation();
    const rideData = location.state?.data; 
    console.log(rideData);

    const { socket } = useContext(SocketContext);
    useEffect(() => {
        socket.on("ride-started", (data) => {
            console.log(data);
            // alert("Ride Started");
            // navigate('/user-rideing');
        })
    }, [socket])

    useGSAP(() => {
        if (paymentPanel) {
            gsap.to(paymentPanelRef.current, {
                transform: "translateY(0%)",
                borderTop: "none"
            });
            gsap.to(paymentClosePanelRef.current, {
                rotate: "0deg"
            });
        } else {
            gsap.to(paymentPanelRef.current, {
                transform: "translateY(88%)"
            });
            gsap.to(paymentClosePanelRef.current, {
                rotate: "180deg"
            });
        }
    }, [paymentPanel]);

    return (
        <div className="h-screen relative">
            {/* Home Icon */}
            <Link
                to="/home"
                className="absolute top-5 right-5 z-20 bg-white text-2xl rounded-full h-10 w-10 flex items-center justify-center shadow-md"
            >
                <i className="ri-home-line"></i>
            </Link>

            {/* Background Map */}
            <img src={mapImg} className="h-screen w-full object-cover" alt="Map" />

            {/* Bottom Payment Panel */}
            <div
                ref={paymentPanelRef}
                className="fixed translate-y-full bottom-0 z-10 bg-white w-full rounded-t-xl shadow-lg "
            >
                {/* Collapse/Expand Handle */}
                <div
                    onClick={() => setPaymentPanel(!paymentPanel)}
                    className="flex justify-center py-2 bg-gray-100 rounded-t-xl cursor-pointer"
                >
                    <i
                        ref={paymentClosePanelRef}
                        className="ri-arrow-down-wide-fill text-2xl font-medium text-gray-700"
                    ></i>
                </div>

                {/* Driver Info */}
                <div className="px-5 py-3 flex justify-between items-center border-b">
                    <div className="w-1/3">
                        <img className="h-20 w-20 rounded-full object-cover" src={userImg} alt="Driver" />
                    </div>
                    <div className="w-2/3 text-right">
                        <h3 className="text-lg font-medium text-gray-800">{rideData.caption.fullName.firstName}</h3>
                        <h1 className="text-xl font-bold text-black">{rideData.caption.vehicle.vehicleNumber}</h1>
                        <p className="text-sm text-gray-500">White Suzuki S-Presso LXI</p>
                    </div>
                </div>

                {/* Ride Details */}
                <div className="px-5 pt-3 space-y-3">
                    <div className="flex items-center gap-4 bg-gray-100 p-3 rounded-lg shadow-sm">
                        <i className="ri-map-pin-2-fill text-xl text-violet-500"></i>
                        <div>
                            <h2 className="text-lg font-semibold">{rideData.pickup}</h2>
                            <p className="text-sm text-gray-600">{rideData.destination}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-gray-100 p-3 rounded-lg shadow-sm">
                        <i className="ri-wallet-fill text-xl text-green-500"></i>
                        <div>
                            <h2 className="text-lg font-semibold">{rideData.fare} Rs</h2>
                            <p className="text-sm text-gray-600">Payment Method: Cash</p>
                        </div>
                    </div>
                </div>

                {/* Payment Button */}
                <div className="flex justify-center py-4">
                    <button
                        type="button"
                        onClick={() => {
                            // Payment logic placeholder
                        }}
                        className="w-2/3 bg-green-500 hover:bg-green-600 transition duration-200 text-white text-lg font-semibold py-3 rounded-full shadow-md"
                    >
                        Make Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Rideing;
