const express=require('express')
const router =express.Router()
const {body,query,validationResult}=require('express-validator')
const rideController=require('../controllers/ride.controller')
const authMiddleware=require('../middleware/auth-middleware')
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Ride creation route
router.post(
    "/create",
    authMiddleware.authUser,
    body("pickup").isString().isLength({ min: 3 }).withMessage("Invalid pickup address"),
    body("destination").isString().isLength({ min: 3 }).withMessage("Invalid destination address"),
    body("vehicleType").isString().isIn(["auto", "car", "motorcycle"]).withMessage("Invalid VehicleType"),
    validateRequest, // ✅ Validate input before calling the controller
    rideController.createRide
);


router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({min:3}).withMessage('Invalid pickup'),
    query('destination').isString().isLength({min:3}).withMessage('Invalid destination'),
    rideController.getFare
)
router.post(
    "/confirm",
    authMiddleware.authCaptain,  // ✅ This must run first
    body("rideId").isMongoId().withMessage("Invalid ride id"),
    rideController.confirmRide
);
router.get('/start-ride',
    authMiddleware.authCaptain,
    query("rideId").isMongoId().withMessage("Invalid ride id"),
    query('otp').isString().isLength({min:6,max:6}).withMessage('Invalid OTP'),
    rideController.startRide
)
router.post('/end-ride',
    authMiddleware.authCaptain,
    body("rideId").isMongoId().withMessage("Invalid ride id"),
    rideController.endRide
)
module.exports=router