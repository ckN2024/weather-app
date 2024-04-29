import cognitoSignUp from "../helpers/cognito/cognitoSignUp.js";
import User from "../models/User.model.js";
import bcrypt from "bcrypt"
import cognitoVerify from "../helpers/cognito/cognitoVerify.js";

// @desc    signup user
// @route   POST /api/users
// @access  Public
const signUp = async (req, res) => {
  const { userName, firstName, lastName, email, mobileNumber, password } = req.body;

  try {
    // db operations
    const user = await User.findOne({email: email})
    if(user) {
        console.log(user)
        throw new Error("User already exists in database")
    }

    // password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
        userName,
        firstName,
        lastName,
        email,
        mobileNumber,
        password: hashedPassword
    })

    const savedUser = await newUser.save()

    // cognito operations
    cognitoSignUp(email, password)

    res.json({
      message: "post method in /signup route",
      user: savedUser
    });
  } catch (error) {
    console.log("Error signing up. \n", error.message)
  }
};

// @desc    verify user
// @route   POST /api/users/verify
// @access  Public
const verify = async (req, res) => {
  const { verifyCode, email } = req.body;
  console.log(`In verify function: `)
  console.log(`verification code : ${verifyCode}`)
  console.log(`email: ${email}`)


  try {
    // cognito operations
    const result = await cognitoVerify(email, verifyCode)
    console.log(`result from verify: \n ${JSON.stringify(result)}`);
    // ressult = "SUCCESS"

    // db operations
    const user = await User.findOne({email: email})
    
    if(!user) {
      throw new Error("Requested user not found in database")
    }

    user.isVerified = true

    await user.save()

  } catch (error) {
    console.log("error in verify", error.message);
  }

  res.json({
    message: "verify route",
    verifyCode,
    email,
  });
};

export { signUp, verify };
