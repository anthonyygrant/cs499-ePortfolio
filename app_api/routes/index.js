const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const tripsController = require("../controllers/trips");
const authController = require("../controllers/authentication");

function authenticateJWT(req, res, next) {
  console.log("authenticateJWT middleware called"); 

  const authHeader = req.headers["authorization"];
  console.log("Authorization Header:", authHeader); // Log the entire Authorization header

  if (authHeader == null) {
    console.log("Auth Header Required but NOT PRESENT!");
    return res.sendStatus(401);
  }

  let headers = authHeader.split(" ");
  console.log("Split Headers:", headers); // Log the result of splitting

  if (headers.length < 2 || headers[0] !== "Bearer") {
    console.log("Invalid Authorization Header format (should be 'Bearer <token>')");
    return res.sendStatus(401);
  }

  const token = headers[1];
  console.log("Extracted Token:", token); // Log the extracted token

  if (token == null) {
    console.log("Null Bearer Token");
    return res.sendStatus(401);
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err, verified) => {
      console.log("JWT Verify Callback - Error:", err); // Log any verification error
      console.log("JWT Verify Callback - Verified Payload:", verified); // Log the verified payload if successful
      if (err) {
        return res.sendStatus(401).json("Token Validation Error!");
      }
      req.auth = verified;
    }
  );
  next();
}

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);

router
  .route("/trips")
  .get(tripsController.tripsList)
  .post(authenticateJWT, tripsController.tripsAddTrip);

router
  .route("/trips/:tripCode")
  .get(tripsController.tripsFindByCode)
  .put(authenticateJWT, tripsController.tripsUpdateTrip);

router
  .route("/trips/:tripId")
  .delete(authenticateJWT, tripsController.tripsDeleteTrip);

// ADD THIS TEST ROUTE
router.route("/test").get((req, res) => {
  res.status(200).json({ message: "Backend test route is working!" });
});

module.exports = router;