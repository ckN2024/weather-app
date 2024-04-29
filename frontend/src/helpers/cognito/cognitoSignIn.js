import {AuthenticationDetails, CognitoUserPool, CognitoUser} from "amazon-cognito-identity-js"
import * as AWS from "aws-sdk/global"
import cognitoGetCurrentUser from "./cognitoGetCurrentUser";

const cognitoSignIn = async (email, password) => {
  const UserPoolId = import.meta.env.VITE_COGNITO_USER_POOL_ID;
  const ClientId = import.meta.env.VITE_COGNITO_CLIENT_ID;

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
        let accessToken = result.getAccessToken().getJwtToken()
        let idToken = result.getIdToken().getJwtToken()
        let refreshToken = result.getRefreshToken().getToken()

        // console.log(`from cognitoSignIn : accessToken : ${JSON.stringify(accessToken)}`)
        // console.log(`from cognitoSignIn : idToken : ${JSON.stringify(idToken)}`)
        // console.log(`from cognitoSignIn : refreshToken : ${JSON.stringify(refreshToken)}`)

        resolve({
          accessToken,
          idToken,
          refreshToken
        })

        // try {
        //   const tokens = cognitoGetCurrentUser();
        //   resolve(tokens)
        // } catch (error) {
        //   reject("User cannot be found : ", error)
        // }
      },

      onFailure: function (err) {
        reject(err);
      },
    });
  });
};

export default cognitoSignIn;
