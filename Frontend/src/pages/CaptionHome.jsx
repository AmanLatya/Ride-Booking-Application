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
// import { sendMessageToSockedId } from "../../../Backend/socket";



const CaptionHome = () => {
    const [captionDetailsPanel, setCaptionDetailsPanel] = useState(true);
    const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
    const [acceptRide, setAcceptRide] = useState(false);
    const [ride, setRide] = useState(null);
    const [rideAccepted, setRideAccepted] = useState(false);
    const [otp, setOtp] = useState("");
    const [rideStarted, setRideStarted] = useState(false);

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
                navigator.geolocation.getCurrentPosition(postion => {
                    socket.emit('update-loction-caption', {
                        userId: caption._id,
                        location: {
                            ltd: postion.coords.latitude,
                            lng: postion.coords.longitude
                        }
                    })
                })
            }
        }
        const locationInterval = setInterval(updateLocation, 10000);
        updateLocation();

        socket.on('new-ride', (data) => {
            // console.log(data);
            setRide(data);
            setRidePopUpPanel(true);
        })

        socket.on('ride-cancelled', data => {
            // alert(data);
            setRide(null);
            setAcceptRide(false);
            setRideAccepted(false);
        })
        socket.on('ride-started', (ride) => {
            // alert("Navigating... Message Recived");
            // console.log(ride);
            navigate("/caption-rideing")
        })
    }, [])

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

            // console.log("Ride Accepted Response:", response.data);
            // alert("You accepted this ride")
            setRide(response.data); // Update UI
            setRideAccepted(true);
            // ✅ No need to call sendMessageToUser
            // It is now handled on backend
            setAcceptRide(true);
            setRidePopUpPanel(false);
        } catch (err) {
            console.error("Error in rideAccept:", err);
        }
    }

    if (rideAccepted) {
        sendMessage();
        setRideAccepted(false);
        // console.log(ride);
    }

    async function sendMessage() {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/send-message`, {
            ride: ride
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('captionToken')}`
            }
        });
    }

    async function startRide() {
        console.log(`Ride ID ${ride._id}`);
        console.log(`OTP ${otp}`);
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start`, {
            params: {
                rideID: ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('captionToken')}`
            }
        })

        if (response.status === 200) {
            console.log(response.data);
            setRide(response.data);
            setRideStarted(true);
            alert("we are rendering");
            setOtp("");
            navigate("/caption-rideing");
        }
    }

    if(rideStarted){
        console.log(ride);
        sendMessage();
        setRideStarted(false);
    }
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


            {/* Ride POPUP */}
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
                // test={test}
                />
            </div>

            {/* Accept Ride POPUP */}
            <div
                ref={acceptRideRef}
                className="z-20 fixed bottom-0 left-0 right-0 px-5 bg-white translate-y-full"
            >
                <AcceptRide
                    ride={ride}
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
