const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API; // Your API key from environment variables
   const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  
  try {
    const response = await axios.get(url);
    if (response.data.status === 'OK') {
      // Extract latitude and longitude
     
      const location = response.data.results[0].geometry.location;
      console.log("Coordinates for" ,"${address}",location);
      return { 
        ltd:location.lat,
         lng:location.lng };
    } else {
      throw new Error('Geocoding API error: ' + response.data.status);
    }
    
  } catch (error) {
    console.error(error);
    throw error;
  }
};
module.exports.getDistanceTime=async (origin,destination)=>{
 if(!origin || !destination){
  throw new Error('Origin and destination are required ')
 } 
 const apiKey = process.env.GOOGLE_MAPS_API;
 const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
  origin
)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
 try{
  const response= await axios.get(url)
  console.log("✅ API Response:", response.data);
  if(response.data.status==='OK'){
    if(response.data.rows[0].elements[0].status === 'ZERO_RESULTS'){
      throw new Error('No routes found')
    }
  const element= response.data.rows[0].elements[0];
  
  return element
  }else{
    throw new Error('Unable to fetch distance and time')
  }
 }catch(err){
  console.log(err);
  throw err;
 }
};
module.exports.getAutoCompleteSuggestion = async(input)=>{
  if(!input){
    throw new Error('query is required')
  }
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

  try{
    const response = await axios.get(url);
    if(response.data.status === 'OK'){
      return response.data.predictions;
    }else{
      throw new Error('Unable to fetch suggestion')
    }
  }catch(err){
    console.log(err);
    throw err;
  }
}
module.exports.getCaptainInRadius = async (ltd,lng,radius)=>{
  const captains = await captainModel.find({
    location:{
      $geoWithin:{
        $centerSphere:[[ltd,lng],radius/6371]
      }
    }
  })
  return captains;
}

