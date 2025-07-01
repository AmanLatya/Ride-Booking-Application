const captionModel = require('../models/caption-model');

module.exports.createCaption = async ({
    firstName,lastName, email, password, color,vehicleNumber, vehicleType, latitude, longitude
})=>{
    if(!firstName || !email || !password || !color || !vehicleNumber || !vehicleType){
        throw new Error("All Fields required");
    }

    const caption = await captionModel.create({
        fullName:{
            firstName,
            lastName  
        },
        email,
        password,
        vehicle:{
            color,
            vehicleNumber,
            vehicleType
        },
        location: {
            latitude: latitude || null,
            longitude: longitude || null
        }
    });
    return caption;
}