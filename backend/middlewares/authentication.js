const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.send({ message: "Please login 1" });
  }

  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    console.log("decoded object is ", decoded);
    if (err) {
      res.send({ message: "Please login 2" });
    } else {
      req.body.userId = decoded.userId;
      next();
    }
  });
};

module.exports = { authentication };
