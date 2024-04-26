import express from "express";
import bodyParser from "body-parser";
import AmazonCognitoIdentity from "amazon-cognito-identity-js"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()


const app = express();
const PORT = 5000;

var corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
}


app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/signup", (req, res) => {
  const {email, password} = req.body;

  const poolData = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID, 
    ClientId: process.env.COGNITO_CLIENT_ID,
  };
  let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  let attributeList = [];

  userPool.signUp(
    email,
    password,
    attributeList,
    null,
    function (err, result) {
      if (err) {
        console.log("failed to register", err.message)
        alert(err.message || JSON.stringify(err));
        return;
      }
      console.log("User registered successfully")
    }
  );

  res.json({
    message: "post method in /signup route",
    email,
    password
  });
});

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
