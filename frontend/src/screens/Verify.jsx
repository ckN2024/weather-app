import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Verify = ({email}) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
        await axios.post("http://localhost:5000/verify",{otp, email})
        navigate("/")

    } catch (error) {
        console.log("error in code verification")
        console.log(error)
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="otp">Otp</label>
        <input
          id="otp"
          type="text"
          placeholder="Enter otp"
          onChange={(e) => setOtp(e.target.value)}
        />
        <br />
        <button className="border p-2">Verify</button>
      </form>
    </div>
  );
};

export default Verify;
