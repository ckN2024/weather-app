import {AuthenticationDetails, CognitoUserPool, CognitoUser} from "amazon-cognito-identity-js"
import * as AWS from "aws-sdk/global"
import cognitoGetCurrentUser from "./cognitoGetCurrentUser";

const cognitoSignIn = async (email, password) => {
  const UserPoolId = import.meta.env.VITE_COGNITO_USER_POOL_ID;
  const ClientId = import.meta.env.VITE_COGNITO_CLIENT_ID;

  console.log(`ENV : ${UserPoolId} , ${ClientId}`);

  var authenticationData = {
    Username: email,
    Password: password,
  };

  var authenticationDetails = new AuthenticationDetails(
    authenticationData
  );
  
  var poolData = {
    UserPoolId,
    ClientId,
  };
  var userPool = new CognitoUserPool(poolData);

  var userData = {
    Username: email,
    Pool: userPool,
  };

  var cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        AWS.config.region = "stockholm";
        var accessToken = result.getAccessToken().getJwtToken();

        try {
          const tokens = cognitoGetCurrentUser();
          resolve(tokens)
        } catch (error) {
          reject("User cannot be found : ", error)
        }
      },

      onFailure: function (err) {
        reject(err);
      },
    });
  });
};

export default cognitoSignIn;
