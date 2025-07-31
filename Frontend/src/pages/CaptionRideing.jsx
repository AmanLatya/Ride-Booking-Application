import React, { useContext, useEffect, useRef, useState } from "react";
import uberLogo from "../assets/Uber_black.webp";
import mapImg from "../assets/map.png";
import { Link, useLocation } from "react-router-dom";
import RideDetail from "../components/RideDetail"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { toast } from "react-toastify";
import { SocketContext } from "../context/socketContext";


const CaptionRideing = (props) => {
    
    const [rideDetailPanel, setRideDetailPanel] = useState(false);
    const rideDetailPanelRef = useRef(null);
    const location = useLocation();
    const rideData = location.state?.ride;

    const {socket} = useContext(SocketContext);
    useEffect(() => {
        socket.on("ride-ended", (data) => {
            toast.success("Ride End")
        })
    }, [socket])

    useGSAP(function () {
        if (rideDetailPanel) {
            gsap.to(rideDetailPanelRef.current, {
                transform: "translateY(0)"
            })
        } else {
            gsap.to(rideDetailPanelRef.current, {
                transform: "translateY(100%)"
            })
        }
    }, [rideDetailPanel])
    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Background Map */}
            <img src={mapImg} className="absolute top-0 left-0 h-full w-full object-cover" alt="Map" />

            {/* Top Nav */}
            <div className="z-10 fixed top-5 left-0 right-0 flex justify-between items-center px-6">
                <img src={uberLogo} className="h-9" alt="Uber Logo" />
                <Link
                    to="/caption-home"
                    className="text-2xl flex items-center justify-center bg-white shadow-md h-12 w-12 rounded-full"
                >
                    <i className="ri-home-line"></i>
                </Link>
            </div>

            {/* Caption Details Panel */}
            <div
                onClick={() => {
                    setRideDetailPanel(true)
                }}
                className="z-10 fixed bottom-0 left-0 right-0 bg-yellow-300 rounded-t-xl shadow-2xl px-5 "
            >
                <div className="flex justify-around items-center w-full py-5">
                    <h1 className="text-xl font-semibold">{rideData.distance} KM Away</h1>
                    <button
                        className="px-5 py-2 font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition"
                    >
                        Ride Complete
                    </button>
                </div>
            </div>


            <div
                ref={rideDetailPanelRef}
                className="z-20 fixed bottom-0 left-0 right-0 px-5 bg-white translate-y-full"
            >
                <RideDetail
                    setRideDetailPanel={setRideDetailPanel}
                    rideData={rideData}
                />
            </div>
        </div>
    );
}

export default CaptionRideing