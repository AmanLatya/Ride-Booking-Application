import React from "react";

const LocationSearchPanel = (props) => {

    const Locations = [
        "Vijay Nagar, 196 D-S-3 Near Atal Ground.",
        "Rajwada Palace, Indore.",
        "MG Road, Indore.",
        "Treasure Island Mall, Indore.",
        "Chappan Dukan, Indore.",
        "Indore Junction Railway Station.",
        "Khajrana Ganesh Temple, Indore.",
        "Rau, Indore.",
    ]

    return (

        <div className="flex flex-col gap-3 h-full overflow-y-auto p-4 border border-gray-300 rounded-lg shadow-lg bg-gray-50">
            {
                Locations.map((e, index) => (
                    <div
                        key={index}  // ✅ Add this line
                        onClick={() => {
                            props.setVehiclePanel(true);
                            props.setPanel(false);
                        }}
                        className="flex items-center active:border-2 justify-start gap-2 px-4 py-3 rounded-lg shadow-md bg-white"
                    >
                        <h2 className="flex items-center justify-center text-lg rounded-3xl bg-gray-200 h-8 w-10">
                            <i className="ri-map-pin-2-fill"></i>
                        </h2>
                        <h3>{e}</h3>
                    </div>
                ))
            }

        </div>
    )
}

export default LocationSearchPanel;