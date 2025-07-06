const axios = require('axios');

module.exports.getDistanceTime = async (pickup, destination) => {
    if (!pickup || !destination) {
        throw new Error('pickup and destination are required');
    }

    const apiKey = process.env.ORS_API_KEY;

    try {
        console.log("🔍 Starting geocoding for pickup:", pickup);
        const pickupRes = await axios.get(`https://api.openrouteservice.org/geocode/search`, {
            params: {
                api_key: apiKey,
                text: pickup
            }
        });
        console.log("📦 Pickup geocode response:", JSON.stringify(pickupRes.data, null, 2));

        console.log("🔍 Starting geocoding for destination:", destination);
        const destinationRes = await axios.get(`https://api.openrouteservice.org/geocode/search`, {
            params: {
                api_key: apiKey,
                text: destination
            }
        });
        console.log("📦 Destination geocode response:", JSON.stringify(destinationRes.data, null, 2));

        const pickupCoords = pickupRes.data.features[0].geometry.coordinates;
        const destinationCoords = destinationRes.data.features[0].geometry.coordinates;

        console.log("📍 Coordinates:");
        console.log("Pickup Coordinates:", pickupCoords);
        console.log("Destination Coordinates:", destinationCoords);

        // Requesting directions from ORS
        console.log("🧭 Fetching directions from ORS...");
        const directionsRes = await axios.post(
            `https://api.openrouteservice.org/v2/directions/driving-car`,
            {
                coordinates: [pickupCoords, destinationCoords]
            },
            {
                headers: {
                    Authorization: apiKey,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log("🚗 Directions response:", JSON.stringify(directionsRes.data, null, 2));

        const data = directionsRes.data.routes[0].summary;
        const distanceInKm = data.distance / 1000;
        const durationInMin = Math.ceil(data.duration / 60);

        const result = {
            distance: `${distanceInKm.toFixed(2)} km`,
            distanceInKm,
            duration: `${durationInMin} min`,
            durationInMin
        };

        console.log("✅ Final Result:", result);
        return result;

    } catch (err) {
        console.error("❌ Error occurred in getDistanceTime:");
        console.error(err.message || err);
        throw new Error('Failed to fetch distance and duration');
    }
};


// const axios = require("axios");

module.exports.getSuggestions = async (query) => {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=7`;

    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            return response.data.features.map(feature => {
                const props = feature.properties;
                const parts = [
                    props.name,
                    props.street,
                    props.postcode,
                    props.city,
                    props.state,
                    props.country
                ].filter(Boolean); // remove undefined/null

                return {
                    description: parts.join(', '),
                    coordinates: feature.geometry.coordinates // [lng, lat]
                };
            });
        } else {
            throw new Error("Failed to fetch suggestions");
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};
