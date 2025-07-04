import React, { useRef, useState } from "react";
import mapImg from "../assets/map.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import uberLogo from "../assets/Uber_black.webp";
import CaptionDetails from "../components/CaptionDetails";
import RidePopUpPanel from "../components/RidePopUpPanel";
import AcceptRide from "../components/AcceptRide";

const CaptionHome = () => {
    const [captionDetailsPanel, setCaptionDetailsPanel] = useState(true);
    const [ridePopUpPanel, setRidePopUpPanel] = useState(true);
    const [acceptRide, setAcceptRide] = useState(false);

    const captionDetailsPanelRef = useRef(null);
    const ridePopUpPanelRef = useRef(null);
    const acceptRideRef = useRef(null);

    // Animate CaptionDetails Panel
    useGSAP(() => {
        gsap.to(captionDetailsPanelRef.current, {
            y: captionDetailsPanel ? 0 : "100%",
            duration: 0.5,
            ease: "power2.out"
        });
    }, [captionDetailsPanel]);

    useGSAP(() => {
        gsap.to(ridePopUpPanelRef.current, {
            y: ridePopUpPanel ? 0 : "100%",
            duration: 0.5,
            ease: "power2.out"
        });
    }, [ridePopUpPanel]);

    // Animate RideInvitation Panel
    useGSAP(() => {
        gsap.to(acceptRideRef.current, {
            y: acceptRide ? 0 : "100%",
            duration: 0.5,
            ease: "power2.out"
        });
    }, [acceptRide]);

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
                ref={captionDetailsPanelRef}
                className="z-10 fixed bottom-0 left-0 right-0 translate-y-full bg-white rounded-t-3xl shadow-2xl px-5 pt-4 pb-7"
            >
                <CaptionDetails setCaptionDetailsPanel={setCaptionDetailsPanel} />
            </div>

            <div
                ref={ridePopUpPanelRef}
                className="z-20 fixed bottom-0 left-0 right-0 px-5 translate-y-full"
            >
                <RidePopUpPanel setRidePopUpPanel={setRidePopUpPanel} setAcceptRide={setAcceptRide} />
            </div>
            <div
                ref={acceptRideRef}
                className="z-20 fixed bottom-0 left-0 right-0 px-5 bg-white translate-y-full"
            >
                <AcceptRide setAcceptRide={setAcceptRide} setRidePopUpPanel={setRidePopUpPanel}/>
            </div>
        </div>
    );
};

export default CaptionHome;
