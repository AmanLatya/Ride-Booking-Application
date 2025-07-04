const axios = require('axios');

module.exports.getAddressCoordinates = async (address) => {
    const apiKey = process.env.GOMAPS_PRO_API_KEY;
    const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng,
            }
        } else {
            throw new Error('Failed to fetch address coordinates');
        }
    } catch (error) {
        console.error('Error fetching address coordinates:', error);
        throw error;
    }
}


module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOMAPS_PRO_API_KEY;
    const url = `https://maps.gomaps.pro/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        console.log(response.data);
        if (response.data.status === 'OK') {
            if (response.data.routes.length === 0) {
                throw new Error('No route found');
            }
            const distance = response.data.routes[0].legs[0].distance.text;
            const duration = response.data.routes[0].legs[0].duration.text;
            return {
                distance,
                duration
            }
        } else {
            throw new Error('Failed to fetch distance and duration');
        }
    }catch(err){
        console.log(err);
        throw err;
    }
}

module.exports.getSuggestions = async (query) => {
    const apiKey = process.env.GOMAPS_PRO_API_KEY;
    const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${apiKey}`;

    try{
        const response = await axios.get(url);
        if(response.status === 200){
            if(response.data.status === 'OK'){
                return response.data.predictions;
            }else{
                throw new Error('Failed to fetch suggestions');
            }
        }else{
            throw new Error('Failed to fetch suggestions');
        }
    }catch(err){
        console.log(err);
        throw err;
    }
}
