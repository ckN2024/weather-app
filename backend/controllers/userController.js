import AmazonCognitoIdentity from "amazon-cognito-identity-js";
// @desc    signup user
// @route   POST /api/users
// @access  Public
const signUp = (req, res) => {
  const { email, password } = req.body;

  try {
    var poolData = {
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      ClientId: process.env.COGNITO_CLIENT_ID,
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var attributeList = [];

    userPool.signUp(
      email,
      password,
      attributeList,
      null,
      function (err, result) {
        if (err) {
          console.log("failed to register", err.message);
          return;
        }
        console.log("User registered successfully");
      }
    );

    res.json({
      message: "post method in /signup route",
      email,
      password,
    });
  } catch (error) {
    console.log("Error signing up. \n", error.message)
  }
};

// @desc    verify user
// @route   POST /api/users/verify
// @access  Public
const verify = (req, res) => {
  const { otp, email } = req.body;

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
    email,
  });
};

export { signUp, verify };
