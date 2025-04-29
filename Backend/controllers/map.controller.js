const mapService=require('../services/map.service')
const {validationResult}=require('express-validator')
module.exports.getCoordinates=async(req,res,next)=>{

 const errors=validationResult(req);
 if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
 }
 const {address}=req.query;
 try{
const coordinates=await mapService.getAddressCoordinate(address);
console.log(coordinates);
console,log('function is working')
res.status(200).json(coordinates);
 }catch(error){
res.status(404).json({message:'Coordinates not found'})
 }
}
module.exports.getDistanceTime= async (req,res,next)=>{
   try{
   const error= validationResult(req);
   if(!error.isEmpty()){
      return res.status(400).json({error:error.array()})
   }
   const {origin,destination}=req.query
   const distanceTime = await mapService.getDistanceTime(origin,destination)
   res.status(200).json(distanceTime)
   }catch(err){
      console.log(err);
      res.status(500).json({message:'Internal server error'})
   }
}
module.exports.getAutoCompleteSuggestion=async( req,res,next)=>{
   try{
      const error=validationResult(req)
      if(!error.isEmpty()){
         return res.status(400).json({error:error.array()})
      }
      const {input}= req.query
      const suggestions= await mapService.getAutoCompleteSuggestion(input)
      res.status(200).json(suggestions)
   }catch(err){
   console.log(err);
   res.status(500).json({message:'Internal server error'})
   
   }
}