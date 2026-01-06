const rideModel= require('../models/ride.model')
const { getCoordinates } = require('../services/location.service');
const mapService= require('./map.service')
 const crypto= require('crypto')
 async function getFare(pickup,destination){
    if(!pickup || !destination){
        throw new Error('Pickup and destination are required');
    }
    const distanceTime = await mapService.getDistanceTime(pickup,destination)
 
 const baseFare ={
    auto:20,
    car:30,
    motorcycle:10
 };
 const perKmRate ={
    auto:5,
    car:10,
    motorcycle:2
}
const perMinuteRate ={
    auto:2,
    car:3,
    motorcycle:1.5
}
if (!distanceTime || !distanceTime.distance || !distanceTime.duration) {
    throw new Error("Invalid distanceTime data received");
}

const fare = {
    auto: Math.round(
        (baseFare?.auto || 0) +
        (((distanceTime.distance.value || 0) / 1000) * (perKmRate?.auto || 0)) +
        (((distanceTime.duration.value || 0) / 60) * (perMinuteRate?.auto || 0))
    ),
    car: Math.round(
        (baseFare?.car || 0) +
        (((distanceTime.distance.value || 0) / 1000) * (perKmRate?.car || 0)) +
        (((distanceTime.duration.value || 0) / 60) * (perMinuteRate?.car || 0))
    ),
    motorcycle: Math.round(
        (baseFare?.motorcycle || 0) +
        (((distanceTime.distance.value || 0) / 1000) * (perKmRate?.motorcycle || 0)) +
        (((distanceTime.duration.value || 0) / 60) * (perMinuteRate?.motorcycle || 0))
    ),
};

return {
    fare,
    distance: distanceTime.distance.text,
    duration: distanceTime.duration.text,
};

 }
 module.exports.getFare=getFare
 function getOtp(num){
    function generateOtp(num){
        const otp= crypto.randomInt(Math.pow(10,num-1),Math.pow(10,num)).toString();
        return otp
    }
    return generateOtp(num)
 }
 module.exports.createRide= async ({
user,pickup,destination,vehicleType,
 })=>{
    if(!user || !pickup || !destination || !vehicleType){
        throw new Error('All fields are required')
    }
   
    const { pickUpCoordination, destinationCoordination } = await getCoordinates(pickup, destination);
    console.log('Pickup Coordinates no 1:', pickUpCoordination);
    console.log('Distance Coordinates no 2:', destinationCoordination);
    const { fare, distance, duration } = await getFare(pickup, destination);
    const ride = rideModel.create({
        user,
        pickup,
        pickUpCoordination,
        destinationCoordination,
        destination,
        otp:getOtp(6),
        fare:fare[vehicleType],
         distance,
        duration
    })
    return ride 
 }
 module.exports.confirmRide = async ({ rideId, captain }) => {
    
    if (!rideId) {
        throw new Error("Ride id is required");
    }

    if (!captain || !captain._id) {
        throw new Error("Captain is missing or does not have an ID");
    }

    await rideModel.findOneAndUpdate(
        { _id: rideId },
        { status: "accepted", captain:captain._id }
    );
    const ride = await rideModel.findOne({ _id: rideId }).populate("user").populate('captain').select("+otp");
    
    if (!ride) {
        throw new Error("Ride not found");
    }

    return ride;
};
module.exports.startRide = async({rideId,otp,captain})=>{
    if (!rideId || !otp) {
        throw new Error("Ride id OTP are required");
    }
    const ride =await rideModel.findOne({
       _id:rideId 
    }).populate("user").populate('captain').select("+otp");   

    if(!ride){
        throw new Error("Ride not found")
    }
    if(ride.status != 'accepted'){
        throw new Error('Ride not accepted')
    }
    if(ride.otp != otp){
        throw new Error('Invalid OTP')
    }
    await rideModel.findOneAndUpdate(
        { _id: rideId },
        { status: "ongoing" }
    );
    sendMessageToSocketId(ride.user.socketId,{
        event:'ride-started',
     data:ride   
    })
    return ride
   

    // const ride = await rideModel.findOne({ _id: rideId }).populate("user").populate('captain').select("+otp");   
}
module.exports.endRide = async ({rideId,captain})=>{
    if (!rideId) {
        throw new Error("Ride id is required");
    }
    const ride =await rideModel.findOne({
        _id:rideId ,
        captain:captain._id
     }).populate("user").populate('captain').select("+otp");
     if(!ride){
        throw new Error('Ride not found')
     }   
     if(ride.status != 'accepted'){
        throw new Error('Ride not accepted')
    }
 
    await rideModel.findOneAndUpdate(
        { _id: rideId },
        { status: "completed" }
    );
  
   
    return ride
}