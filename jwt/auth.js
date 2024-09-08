/***************vertify token*****************/
const jwt = require("jsonwebtoken");
//define secret key for signing the token
const client_secret = "abc-store-api";

const authenticateToken = (req, res, next) => {
    const tokenHeader = req.headers.authorization;
  
    if (!tokenHeader) {
      return res.status(401).send("Token Required!!");
    }
    const token = tokenHeader.split(" ")[1];
  
    jwt.verify(token, client_secret, async (err, decoded) => {
      if (err) {
        return res.status(401).send("Invalid token");
      }
      req.user = decoded;
      next();
    });
  };

