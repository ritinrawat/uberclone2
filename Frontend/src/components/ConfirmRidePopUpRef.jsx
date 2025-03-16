import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
function ConfirmRidePopUpRef(props) {
  const [otp, setOtp] = useState(["", "", "", "","",""]);
const navigate = useNavigate()
  // Handle OTP input change
  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Allow only a single digit (0-9)

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input if a number is entered
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Handle key down (Backspace moves focus to the previous input)
  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpValue = otp.join("");
   
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`,{
     params:{ rideId:props.ride._id,
      otp:otpValue
     },
     headers:{
      Authorization:`Bearer ${localStorage.getItem('captaintoken')}`
     }
    } ) // Combine digits into OTP
    console.log("Entered OTP:", otpValue);
    // H ere, you can send the OTP to the backend for verification
    if(response.status==200){
      props.setConfirmRidePop(false)
      props.setRidePop(false)
      navigate('/captain-ride',{state:{ride:props.ride}})
    }
  };

  return (
    <div>
      <h5
        className="p-1 text-center w-[93] absolute top-0"
        onClick={() => props.setConfirmRidePop(false)}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold p-3">Confirm to Ride Start</h3>

      {/* Ride Details */}
      <div className="bg-yellow-400 rounded-md flex justify-between items-center p-6">
        <div className="flex justify-start items-center gap-3">
          <img
            className="w-10 h-10 object-cover rounded-lg"
            src="https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
            alt="Profile picture of Ritin Rawat"
          />
          <h4 className="text-lg font-medium capitalize">
            {props.ride?.user.fullname.firstname}{" "}
            {props.ride?.user.fullname.lastname}
          </h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">{props.ride?.distance} {props.ride?.duration}</h4>
        </div>
      </div>

      {/* Pickup & Destination Details */}
      <div className="flex justify-between flex-col items-center">
        <div className="w-full">
          <div className="flex items-center p-1 border-b-2 gap-5">
            <i className="ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Pickup</h3>
              <p className="text-base text-gray-600">{props.ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center p-1 border-b-2 gap-5">
            <i className="ri-square-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Desination</h3>
              <p className="text-base text-gray-600">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center p-1 border-b-2 gap-5">
            <i className="ri-bank-card-fill"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
              <p className="text-base text-gray-600">Cash</p>
            </div>
          </div>
        </div>

        {/* OTP Form */}
        <div className="p-6 w-full">
  <form id="otp-form" className="space-y-4" onSubmit={handleSubmit}>
    <h1 className="text-center text-xl font-semibold">Enter Your OTP</h1>
    
    {/* OTP Inputs */}
    <div className="flex justify-center   space-x-2 mb-4">
      {otp.map((digit, index) => (
        <input
          key={index}
          id={`otp-${index}`}
          type="text"
          value={digit}
          maxLength="1"
          className="otp-input w-12 h-12 text-center border-2 rounded-md text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          aria-label={`Enter OTP digit ${index + 1}`}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
        />
      ))}
    </div>

    {/* Full-width Confirm Button */}
    <button
      className="w-full text-2xl py-2 cursor-pointer bg-green-600 text-white rounded-lg mt-2"
    >
      Confirm
    </button>
  </form>
</div>


        {/* Confirm & Cancel Buttons */}
     
        <button
          onClick={() => {
            props.setConfirmRidePop(false);
            props.setRidePop(false);
          }}
          className="w-full text-2xl py-2 cursor-pointer bg-red-600 text-white rounded-lg mt-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmRidePopUpRef;
