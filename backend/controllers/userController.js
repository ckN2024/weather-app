import cognitoSignUp from "../helpers/cognito/cognitoSignUp.js";
import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import cognitoVerify from "../helpers/cognito/cognitoVerify.js";
import successResponse from "../helpers/response/successResponse.js";
import errorResponse from "../helpers/response/errorResponse.js";
import AWS from "aws-sdk";
import fs from "fs";
import getDataFromToken from "../helpers/cognito/getDataFromToken.js";
import cognitoAdminInitiateAuth from "../helpers/cognito/cognitoAdminInitiateAuth.js";

// Configure AWS credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "eu-north-1",
});

const s3 = new AWS.S3();

// @desc    signup user
// @route   POST /api/users
// @access  Public
const signUp = async (req, res) => {
  const { userName, firstName, lastName, email, mobileNumber, password } =
    req.body;

  try {
    // cognito operations
    const cognitoSignUpResponse = await cognitoSignUp(email, password);
    const UUID = cognitoSignUpResponse.userSub;

    // db operations
    const user = await User.findOne({ email: email });
    if (user) {
      throw new Error("User already exists in database");
    }

    // password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      _id: UUID,
      userName,
      firstName,
      lastName,
      email,
      mobileNumber,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    successResponse(res, 201, savedUser, "User created successfully");
  } catch (error) {
    errorResponse(res, 400, "Problem in signing up", error.message);
  }

  // res.json("signup controller responded")
};

// @desc    verify user
// @route   POST /api/users/verify
// @access  Public
const verify = async (req, res) => {
  const { verifyCode, email } = req.body;

  try {
    // cognito operations
    const verifyResult = await cognitoVerify(email, verifyCode);
    // verifyResult = "SUCCESS"
    console.log(`VerifyResult -> ${verifyResult}`);

    if (verifyResult !== null) {
      // db operations
      const user = await User.findOne({ email: email }).select("-password");

      if (!user) {
        throw new Error("Requested user not found in database");
      }

      // update verification status
      user.isVerified = true;

      // save user in db
      const savedUser = await user.save();

      successResponse(res, 200, savedUser, "User verified successfully");
    }
  } catch (error) {
    errorResponse(res, 400, error.message);
  }
};

// @desc    add a favourite place
// @route   POST /api/users/favourites
// @access  Private
const addFavourites = async (req, res) => {
  // extract email UUID from token

  const { city, email } = req.query;
  // find the user in db by email
  

  try {
    const user = await User.findOne({ email: email }).select("-password");
    if (!user) {
      throw new Error("User not found in db");
    }

    // prevent adding more than 5 favourite cities
    if (user.favouritePlaces.length >= 5) {
      throw new Error("Favourite places cannot be more than 5");
    }

    // prevent adding repeated cities
    if (user.favouritePlaces.includes(city)) {
      throw new Error("City already added in favourites");
    }

    // push the city name to user's favourite
    user.favouritePlaces.push(city);

    // save user in db
    const savedUser = await user.save();
    successResponse(
      res,
      201,
      { favouritePlaces: savedUser.favouritePlaces },
      `${city} added to favourites`
    );
  } catch (error) {
    errorResponse(res, 400, error.message);
  }

  res.json({ message: "response from addToFav" });
};

const uploadProfilePic = async (req, res) => {
  try {
    const file = req.file;

    const uploadParams = {
      Bucket: "tyloones-weather-app-bucket",
      Key: file.originalname, // Use original file name for the object key
      Body: fs.createReadStream(file.path), // Use the path of the file in the uploads directory
    };

    s3.upload(uploadParams, (err, data) => {
      if (err) {
        console.error("Error uploading file:", err);
        res.status(500).send("Error uploading file");
      } else {
        console.log("Upload successful. File location:", data.Location);
        res.send("File uploaded successfully");
        // Delete the file from the local uploads directory
        fs.unlinkSync(file.path);
      }
    });

    successResponse(res, 200, null, "image uploaded successfully");
  } catch (error) {
    errorResponse(res, 400, "Error in file upload", error.message);
  }
};

// @desc    fetch user by id
// @route   GET /api/users
// @access  Private
const getUserById = async (req, res) => {
  try {
    // find the user by access token userSub(id in mongodb)
    // Extract access token from header.
    const access_token = req.headers.authorization.split(" ")[1];

    // decode the token
    const decodedToken = await getDataFromToken(access_token);

    const UUID = decodedToken.data.sub;

    // find user in db by id
    const user = await User.findById(UUID).select("-password -createdAt -updatedAt -__v");

    if (!user) {
      throw new Error("No user found");
    }

    successResponse(res, 200, user , "User fetched successfully" )
  } catch (error) {
    errorResponse(res, 400, "Error in fetching user", error.message)
  }

  // res.json("getUserBy id route");
};

export { signUp, verify, addFavourites, uploadProfilePic, getUserById };
