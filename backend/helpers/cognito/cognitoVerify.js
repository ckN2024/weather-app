import AmazonCognitoIdentity from "amazon-cognito-identity-js";

const cognitoVerify = (email, verifyCode) => {
  console.log("from cognitoVerify: ");
  console.log(`email: ${email}`)
  console.log(`verifyCode: ${verifyCode}`)
  
  return new Promise((resolve, reject) => {
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
    cognitoUser.confirmRegistration(verifyCode, true, function (err, result) {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

export default cognitoVerify;
