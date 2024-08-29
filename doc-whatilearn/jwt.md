## SETUP

buat file jwt di utils

```js
import JsonWebToken from "jsonwebtoken";
import "dotenv/config";

const generateAccessToken = (user) => {
  return JsonWebToken.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1800s",
  });
};

const generateRefreshToken = (user) => {
  return JsonWebToken.sign(user, process.env.JWT_REFRESH_SCRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "86400s",
  });
};

function verifyRefreshToken(token) {
  try {
    return JsonWebToken.verify(token, process.env.JWT_REFRESH_SCRET);
  } catch (err) {
    return null;
  }
}

const parseJwt = (token) => {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};

const verifyAccessToken = (token) => {
  try {
    return JsonWebToken.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    null;
  }
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  parseJwt,
  verifyAccessToken,
};

```

gunakan dia di controller misalnya saat login

## login


```js
const setLogin = async (req, res, next) => {
  try {
    const valid = {
      email: "requered,isEmail",
      password: "requered",
    };
    const user = await dataValid(valid, req.body);
    const data = user.data;
    if (user.message.length > 0) {
      return res.status(400).json({
        errors: user.message,
        message: "Login field",
        data: data,
      });
    } else {
      // get user with email
      const user = await User.findOne({
        where: {
          email: data.email,
          isActive: true,
        },
      });
      // check user
      if (!user) {
        return res.status(404).json({
          errors: ["User not found"],
          message: "Login field",
          data: data,
        });
      }
      // check password
      if (compare(data.password, user.password)) {
        // generate token
        const usr = {
          userId: user.userId,
          name: user.name,
          email: user.email,
        };
        const token = generateAccessToken(usr);
        const refresh = generateRefreshToken(usr);
        return res.status(200).json({
          errors: [],
          message: "Login success",
          data: {
            userId: user.userId,
            name: user.name,
            email: user.email,
          },
          acessToken: token,
          refreshToken: refresh,
        });
      } else {
        return res.status(400).json({
          errors: ["Wrong password"],
          message: "Login field",
          data: data,
        });
      }
    }
  } catch (error) {
    next(
      new Error("controllers/userController.js:setLogin - " + error.message)
    );
  }
};
```

## refresh token

```js
const setRefreshToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        errors: ["Invalid token"],
        message: "No token provided",
        data: null,
      });
    }
    const verify = verifyRefreshToken(token);
    if (!verify) {
      return res.status(401).json({
        errors: ["Invalid token"],
        message: "Provided token is not valid",
        data: null,
      });
    }
    let data = parseJwt(token);
    const user = await User.findOne({
      where: {
        email: data.email,
        isActive: true,
      },
    });
    if (!user) {
      return res.status(404).json({
        errors: ["User not found"],
        message: "Provided token is not valid",
        data: null,
      });
    } else {
      const usr = {
        userId: user.userId,
        name: user.name,
        email: user.email,
      };
      const token = generateAccessToken(usr);
      const refresh = generateRefreshToken(usr);
      return res.status(200).json({
        errors: [],
        message: "Refresh success",
        data: {
          userId: user.userId,
          name: user.name,
          email: user.email,
        },
        acessToken: token,
        refreshToken: refresh,
      });
    }
  } catch (error) {
    next(
      new Error(
        "controllers/userController.js:setRefreshToken - " + error.message
      )
    );
  }
};
```
