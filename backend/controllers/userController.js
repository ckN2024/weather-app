import cognitoSignUp from "../helpers/cognito/cognitoSignUp.js";
import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import cognitoVerify from "../helpers/cognito/cognitoVerify.js";

// @desc    signup user
// @route   POST /api/users
// @access  Public
const signUp = async (req, res) => {
  const { userName, firstName, lastName, email, mobileNumber, password } =
    req.body;

  try {
    // db operations
    const user = await User.findOne({ email: email });
    if (user) {
      console.log(user);
      throw new Error("User already exists in database");
    }

    // password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      firstName,
      lastName,
      email,
      mobileNumber,
      password: hashedPassword,
    });

    // cognito operations
    cognitoSignUp(email, password);

    const savedUser = await newUser.save();

    res.json({
      message: "post method in /signup route",
      user: savedUser,
    });
  } catch (error) {
    console.log("Error signing up. \n", error.message);
  }
};

// @desc    verify user
// @route   POST /api/users/verify
// @access  Public
const verify = async (req, res) => {
  const { verifyCode, email } = req.body;

  try {
    // cognito operations
    const verifyResult = await cognitoVerify(email, verifyCode);
    console.log(`result from verify: ${verifyResult}`);
    // verifyResult = "SUCCESS"

    if (verifyResult !== null) {
      // db operations
      const user = await User.findOne({ email: email });

      if (!user) {
        throw new Error("Requested user not found in database");
      }

      user.isVerified = true;

      await user.save();
    }
  } catch (error) {
    console.log("error in verify", error.message);
  }

  res.json({
    message: "verify route",
    verifyCode,
    email,
  });
};

// @desc    add a favourite place
// @route   POST /api/users/favourites
// @access  Private
const addFavourites = async (req, res) => {
  const {city, email} = req.query
  
  // find the user in db by email

  try {
    const user = await User.findOne({email: email})
    if(!user) {
      throw new Error("User not found in db")
    }

    // push the city name to user's favourite
    user.favouritePlaces.push(city)

    // save user in db
    await user.save()

  } catch (error) {
    console.log("Error in updating favourites")
    console.log(error.message)
  }

  res.json({
    message: "Message from addToFavourite function"
  })
}


export { signUp, verify, addFavourites }
