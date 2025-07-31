import React, { useContext, useEffect, useRef, useState } from "react";
import mapImg from "../assets/map.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link, useNavigate } from "react-router-dom";
import uberLogo from "../assets/Uber_black.webp";
import CaptionDetails from "../components/CaptionDetails";
import RidePopUpPanel from "../components/RidePopUpPanel";
import AcceptRide from "../components/AcceptRide";
import { SocketContext } from "../context/socketContext";
import { CaptionDataContext } from "../context/captionContext";
import axios from "axios";
import { toast } from "react-toastify";

const CaptionHome = () => {
    const [captionDetailsPanel, setCaptionDetailsPanel] = useState(true);
    const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
    const [acceptRide, setAcceptRide] = useState(false);
    const [ride, setRide] = useState(null);
    const [rideAccepted, setRideAccepted] = useState(false);
    const [otp, setOtp] = useState("");
    const [rideStarted, setRideStarted] = useState(false);
    const [rideCancelled, setRideCancelled] = useState(false);

    const captionDetailsPanelRef = useRef(null);
    const ridePopUpPanelRef = useRef(null);
    const acceptRideRef = useRef(null);

    const navigate = useNavigate();

    const { socket } = useContext(SocketContext);
    const { caption } = useContext(CaptionDataContext);

    useEffect(() => {
        socket.emit("join", {
            userType: "caption",
            userId: caption._id
        });

        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    socket.emit('update-loction-caption', {
                        userId: caption._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    });
                });
            }
        };
        const locationInterval = setInterval(updateLocation, 10000);
        updateLocation();

        socket.on('new-ride', (data) => {
            setRide(data);
            setRidePopUpPanel(true);
        });

        socket.on("ride-cancelled", (data) => {
            // alert("Ride Cancelled");
            toast.success("Ride Cancel")
            setAcceptRide(false);
            setRide(null);
        })
        socket.on('ride-started', (ride) => {
            // alert("Ride Started");
            toast.success("Ride Start")
            navigate("/caption-rideing", { state: { ride } });
        });

        return () => clearInterval(locationInterval);
    }, [socket]);

    useEffect(() => {
        if (rideAccepted) {
            sendMessage();
            setRideAccepted(false);
        }
    }, [rideAccepted]);

    useEffect(() => {
        if (rideStarted) {
            sendMessage();
            setRideStarted(false);
        }
    }, [rideStarted]);

    useEffect(() => {
        if (rideCancelled) {
            sendMessage();
            setRideCancelled(false);
        }
    }, [rideCancelled]);

    async function rideAccept() {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/accept`, {
                rideId: ride._id,
                captionId: caption._id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('captionToken')}`
                }
            });
            setRide(response.data);
            setRideAccepted(true);
            setAcceptRide(true);
            setRidePopUpPanel(false);
        } catch (err) {
            console.error("Error in rideAccept:", err);
        }
    }

    async function sendMessage() {
        if (!ride) return;

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/send-message`, {
                ride: ride
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('captionToken')}`
                }
            });
            if (response.status === 200) {
                console.log(response.data);
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }

    async function startRide() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start`, {
                params: {
                    rideID: ride._id,
                    otp: otp
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('captionToken')}`
                }
            });
            
            if (response.status === 200) {
                console.log(response.data);
                setRide(response.data);
                setRideStarted(true);
                setOtp("");
            }
        } catch (err) {
            console.error("Start ride failed:", err);
            alert("Invalid OTP or ride not found");
        }
    }

    async function cancelRide() {
        if (!ride) {
            alert("No active ride to cancel.");
            return;
        }

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/cancel`, {
                params: {
                    rideID: ride._id
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('captionToken')}`
                }
            });

            if (response.status === 200) {
                setRide(response.data);
                setRideCancelled(true);
            }
        } catch (err) {
            console.error("Ride cancellation failed:", err);
            alert("Failed to cancel ride");
        }
    }

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

    useGSAP(() => {
        gsap.to(acceptRideRef.current, {
            y: acceptRide ? 0 : "100%",
            duration: 0.5,
            ease: "power2.out"
        });
    }, [acceptRide]);

    return (
        <div className="relative h-screen w-full overflow-hidden">
            <img src={mapImg} className="absolute top-0 left-0 h-full w-full object-cover" alt="Map" />

            <div className="z-10 fixed top-5 left-0 right-0 flex justify-between items-center px-6">
                <img src={uberLogo} className="h-9" alt="Uber Logo" />
                <Link
                    to="/caption-home"
                    className="text-2xl flex items-center justify-center bg-white shadow-md h-12 w-12 rounded-full"
                >
                    <i className="ri-home-line"></i>
                </Link>
            </div>

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
                <RidePopUpPanel
                    ride={ride}
                    setRidePopUpPanel={setRidePopUpPanel}
                    setAcceptRide={setAcceptRide}
                    rideAccept={rideAccept}
                    setRideAccepted={setRideAccepted}
                    />
            </div>

            <div
                ref={acceptRideRef}
                className="z-20 fixed bottom-0 left-0 right-0 px-5 bg-white translate-y-full"
                >
                <AcceptRide
                    ride={ride}
                    cancelRide={cancelRide}
                    setAcceptRide={setAcceptRide}
                    setRidePopUpPanel={setRidePopUpPanel}
                    startRide={startRide}
                    setOtp={setOtp}
                    otp={otp}
                    />
            </div>
        </div>
    );
};

export default CaptionHome;
