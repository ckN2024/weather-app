import express from "express";
import bodyParser from "body-parser";
import AmazonCognitoIdentity from "amazon-cognito-identity-js";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB.js";

dotenv.config()
connectDB()

const app = express();
const PORT = 5000;

var corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// sign up
app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  var poolData = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    ClientId: process.env.COGNITO_CLIENT_ID,
  };
  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  var attributeList = [];

  userPool.signUp(email, password, attributeList, null, function (err, result) {
    if (err) {
      console.log("failed to register", err.message);
      return;
    }
    console.log("User registered successfully");
  });

  res.json({
    message: "post method in /signup route",
    email,
    password,
  });
});

// verify
app.post("/verify", (req, res) => {
  const { otp, email } = req.body;
  console.log("opt recieved: ", otp);

  try {
    var poolData = {
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      ClientId: process.env.COGNITO_CLIENT_ID,
    };

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
      Username: email, // ##############put user email here
      Pool: userPool,
    };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.confirmRegistration(otp, true, function (err, result) {
      if (err) {
        console.log(err.message || JSON.stringify(err));
        return;
      }
      console.log("call result: " + result);
    });
  } catch (error) {
    console.log("error in verify otp", error.message);
  }

  res.json({
    message: "verify route",
    otp,
  });
});


app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
