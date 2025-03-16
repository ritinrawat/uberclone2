const rideService = require('../services/ride.services')
const mapService=require('../services/map.service')
const { getCoordinates } = require('../services/location.service');
const {validationResult}=require('express-validator')
const { sendMessageToSocketId}=require('../socket')
const rideModel = require('../models/ride.model')
module.exports.createRide = async (req,res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }
    const {userId,pickup,destination,vehicleType}=req.body

    try{
        const ride=await rideService.createRide({user:req.user._id,pickup,destination,vehicleType})


            res.status(201).json(ride)
            const { pickUpCoordination, destinationCoordination } = await getCoordinates(pickup, destination);

            console.log('Pickup Coordinates:', pickUpCoordination);
            console.log('Destination Coordinates:', destinationCoordination);         
         const captainsInRadius=await mapService.getCaptainInRadius(pickUpCoordination.ltd,pickUpCoordination.lng,10)
         ride.otp=''

         const rideWithUser= await rideModel.findOne({_id:ride._id}).populate('user')
         captainsInRadius.map(captain=>{
            sendMessageToSocketId(captain.socketId,{
                event:'new-ride',
             data:rideWithUser   
            })
         })
          console.log(captainsInRadius)
    }catch(err){
        

        return res.status(500).json({message:err.message})
    }
}
module.exports.getFare = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {pickup,destination}=req.query
    try{
        const fare = await rideService.getFare(pickup, destination)
        
        return res.status(200).json(fare)
    } catch (err){
        return res.status(500).json({message:err.message})
    }
}
module.exports.confirmRide= async (req,res)=>{
    const errors =validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array})
    }
    const {rideId}=req.body;
    try{
        const ride= await rideService.confirmRide({rideId,captain:req.captain})

        sendMessageToSocketId(ride.user.socketId,{
            event:'ride-confirmed',
            data:ride
        })
        console.log("function wroking succesfully")
        return res.status(200).json(ride);
    }catch (err){
        console.log(err)
 return res.status(500).json({message:err.message})
    }

}
module.exports.startRide= async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {rideId,otp} =req.query; 
    try{
        const ride= await rideService.confirmRide({rideId,otp,captain:req.captain})
        sendMessageToSocketId(ride.user.socketId,{
            event:'ride-started',
         data:ride   
        })

        return res.status(200).json(ride);
    }catch(err){
        
        return res.status(500).json({message:err.message});
    }
}
 module.exports.endRide=async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {rideId}=req.body
    try{
        const ride = await rideService.endRide({rideId,captain:req.captain})
        sendMessageToSocketId(ride.user.socketId,{
            event:'ride-ended',
         data:ride   
        })
        console.log("Working succesfully")
        return res.status(200).json(ride)
    } catch(err){
        return res.status(500).json({message:err.message})
    }
 }