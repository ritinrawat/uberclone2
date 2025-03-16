const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel=require('../models/blacklistToken.model')
module.exports.registerCaptain = async (req, res, next) => {
  try {
    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error('Validation Errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure data from request body
    console.log('Incoming Request Body:', req.body);

    const { fullname, email, password, vehicle } = req.body;
console.log('Destructured Data:', { fullname, email, password, vehicle });

    // Check if a captain with the same email already exists
    const isCaptainAlreadyExist = await captainModel.findOne({ email });
    if (isCaptainAlreadyExist) {
      return res.status(400).json({ message: 'Captain already exists' });
    }
 
    // Hash the password
    const hashedPassword = await captainModel.hashedPassword(password);

    // Create a new captain
    const captain = await captainService.createCaptain({
      firstname:fullname.firstname,
      lastname:fullname.lastname,
      email,
      password: hashedPassword,

        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
    });

    // Generate JWT token
    const token = captain.generateAuthToken();


    // Respond with the new captain and token
    res.status(201).json({ token, captain });
  } catch (error) {
    console.error('Error in registerCaptain:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
module.exports.loginCaptain =async (req,res,next)=>{
  const errors=validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});

  }
  const {email,password}=req.body
  const captain = await captainModel.findOne({email}).select('+password')
  if(!captain){
    return res.status(401).json({message:"Invalid email or password"})
  }
  const isMatch= await captain.comparePassword(password)

  if(!isMatch){
    return res.status(401).json({message:"Invalid email or password"})
  }
  const token=captain.generateAuthToken();
  res.cookie("token",token)
  res.status(200).json({token,captain})
}
module.exports.getCaptainProfile= async (req,res,next)=>{
  res.status(200).json({captain:req.captain});
}
module.exports.logoutCaptain =async (req,res,next)=>{
  const token=req.cookies.token || req.headers.authorization.split(' ')[1];
  await blacklistTokenModel.create({token})
  res.clearCookie('token');
  res.status(200).json({message:"Logged out"})
}