# INTRODUCTION

Kita akan membuat aplikasi BE untuk keperluan aplikasi contact App, dimana kita menggunakan ExpressJssebagai frameworknya, kemudian postgres untuk database dan sequelize untuk ORM nya,

## PERSIAPAN

* fahami kebutuhan aplikasi dengan membuat flow atau gambar diagram database yang diperlukan. misalnya dalam aplikasi yang kita buat kita membutuhkan tabel address, contact dan user.
* Buat sequence dan usecase pada aplikasi saat berjalan.

## SETUP AWAL

* initiati project dengan
  `npm init`
* intstal package yang diperlukan seperti express, nodemon, dotenv, sequelize, pg, bcrypt, moment
* buat env fila

  ```json
  DB_NAME=
  DB_USER=
  DB_PASSWORD=
  DB_HOST=
  DB_PORT=
  DB_DIALECT=
  ```
* buat strukutr folder

```markdown
project-root/
│
├── .env
├── package.json
│
└── src/
├── controllers/
│   ├── address.controller.js
│   ├── contact.controller.js
│   ├── errorHandling.controller.js
│   └── user.controller.js
│
├── middleware/
│   ├── index.js
│   └── winston.js
│
├── models/
│   ├── address.model.js
│   ├── contact.model.js
│   └── user.model.js
│
├── routes/
│   ├── address.routes.js
│   ├── contact.routes.js
│   └── user.routes.js
│
├── utils/
│   ├── bcrypt.js
│   ├── db.connection.js
│   ├── jwt.js
│   └── sendMail.js
│
├── validation/
│   ├── dataValidation.js
│   └── sanitization.js
│
└── index.js
```

* kita masuk ke index.js

```js
const express = require('express');
require('dotenv').config();
const appMiddleware = require('./middleware');

const app = express();

app.use(appMiddleware);

const port = process.env.PORT || 3333;

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

```

kemudian kita ke Middleware index.js

```js
import express from 'express'
import '../utils/winston'
import cors from 'cors'
import app from '../routes'

const appMiddleware = express()

appMiddleware.use(
  cors({
    origin: true,
    credentials: true,
    preflightContinue: false,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
  })
)

appMiddleware.options('*', cors())
appMiddleware.use(express.json())
appMiddleware.use(app)

export default appMiddleware

```

* kita masuk ke index.js di routes

```js
constexpress = require('express');
constrouter = express.Router();

router.get('/', (req, res) => {  
res.send('Hello World!');
});

module.exports = router;
```

# DATABASE VIA ORM

* buat file db.connection.js di folder utils

```js

constsequelize = require('sequelize');
constdotenv = require('dotenv');
dotenv.config();
const db = new sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {    host:process.env.DATABASE_HOST,  
dialect:'postgres',  
logging:false
});

db.authenticate()  
.then(() => {        console.log('Connection has been established successfully to database.');    })  
.catch(err=> {        console.error('Unable to connect to the database:', err);    });  


db.sync({ alter:true });

module.exports = db;
```

# BUAT MODELS SESUAI ERD

midalnya models usere

```js
const db = require ("../utils/db.connection");
const { Sequelize } = require ("sequelize");
const moment = require ("moment");

const User = db.define(
  "User",
  {
    userId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    expireTime: {
      type: Sequelize.DATE,
      set(value) {
        if (value !== null) {
          this.setDataValue("expireTime", moment(value).add(1, "hours"));
        } else {
          this.setDataValue("expireTime", null);
        }
      },
    },
  },
  {
    tableName: "user",
    timestamps: true,
  }
);

export default User;

```

atau seperti contact yang memiliki hubungan hasMany ke tabel yang lain, begini penulisaanyya

```js
import sequelize from "../utils/db.js";
import { Sequelize } from "sequelize";
import User from "./userModel.js";

const Contact = sequelize.define(
  "Contact",
  {
    contactId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    fullName: {
      type: Sequelize.VIRTUAL,
      get() {
        return this.firstName + " " + this.lastName;
      },
    },
    email: {
      type: Sequelize.STRING,
      set(value) {
        if (value !== null || value !== "") {
          this.setDataValue("email", value.toLowerCase());
        }
      },
    },
    phone: {
      type: Sequelize.STRING,
    },
  },
  {
    tableName: "contact",
    underscored: true,
  }
);

User.hasMany(Contact, {
  foreignKey: "userId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

Contact.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

sequelize.sync();

export default Contact;

```

# BUAT CONTROLLERS

```js
import sequelize from "../utils/db.js";
import { dataValid } from "../validation/dataValidation.js";
import { sendMail, sendPassword } from "../utils/sendMail.js";
import User from "../models/userModel.js";
import { Op } from "sequelize";
import { compare } from "../utils/bcrypt.js";
import {
  generateAccessToken,
  generateRefreshToken,
  parseJWT,
  verifyRefreshToken,
} from "../utils/jwt.js";
import { isExists } from "../validation/sanitization.js";
import { Entropy, charset32 } from "entropy-string";
const setUser = async (req, res, next) => {
  const t = await sequelize.transaction();
  const valid = {
    name: "required",
    email: "required,isEmail",
    password: "required,isStrongPassword",
    confirmPassword: "required",
  };
  try {
    // const user = req.body;
    const user = await dataValid(valid, req.body);
    // cek password
    if (user.data.password !== user.data.confirmPassword) {
      user.message.push("Password does not match");
    }
    if (user.message.length > 0) {
      return res.status(400).json({
        errors: user.message,
        message: "Register Field",
        data: null,
      });
    }
    const userExists = await User.findAll({
      where: {
        email: user.data.email,
      },
    });
    if (userExists.length > 0 && userExists[0].isActive) {
      return res.status(400).json({
        errors: ["Email already activated"],
        message: "Register Field",
        data: null,
      });
    } else if (
      userExists.length > 0 &&
      !userExists[0].isActive &&
      Date.parse(userExists[0].expireTime) > new Date()
    ) {
      return res.status(400).json({
        errors: ["Email already registered, please check your email"],
        message: "Register Field",
        data: null,
      });
    } else {
      User.destroy(
        {
          where: {
            email: user.data.email,
          },
        },
        {
          transaction: t,
        }
      );
    }
    const newUser = await User.create(
      {
        ...user.data,
        expireTime: new Date(),
      },
      {
        transaction: t,
      }
    );
    const result = await sendMail(newUser.email, newUser.userId);
    if (!result) {
      await t.rollback();
      return res.status(500).json({
        errors: ["Send email failed"],
        message: "Register Field",
        data: null,
      });
    } else {
      await t.commit();
      res.status(201).json({
        errors: null,
        message: "User created, please check your email",
        data: {
          userId: newUser.userId,
          name: newUser.name,
          email: newUser.email,
          expireTime: newUser.expireTime.toString(),
        },
      });
    }
  } catch (error) {
    await t.rollback();
    next(new Error("controllers/userController.js:setUser - " + error.message));
  }
};

const setActivateUser = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const user = await User.findOne({
      where: {
        userId: user_id,
        isActive: false,
        expireTime: {
          [Op.gte]: new Date(),
        },
      },
    });
    if (!user) {
      return res.status(404).json({
        errors: ["User not found or expired"],
        message: "Activate User Field",
        data: null,
      });
    } else {
      user.isActive = true;
      user.expireTime = null;
      await user.save();
      return res.status(200).json({
        errors: [],
        message: "User activated successfully",
        data: {
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (error) {
    next(
      new Error(
        "controllers/userController.js:setActivateUser - " + error.message
      )
    );
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findAll();
    res.status(200).json({
      errors: [],
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    next(new Error("controllers/userController.js:getUser - " + error.message));
  }
};

const setLogin = async (req, res, next) => {
  try {
    const valid = {
      email: "required,isEmail",
      password: "required",
    };
    const user = await dataValid(valid, req.body);
    const data = user.data;
    if (user.message.length > 0) {
      return res.status(400).json({
        errors: user.message,
        message: "Login Field",
        data: null,
      });
    }
    const userExists = await User.findOne({
      where: {
        email: data.email,
        isActive: true,
      },
    });
    if (!userExists) {
      return res.status(400).json({
        errors: ["User not found"],
        message: "Login Field",
        data: data,
      });
    }
    if (compare(data.password, userExists.password)) {
      const usr = {
        userId: userExists.userId,
        name: userExists.name,
        email: userExists.email,
      };
      const token = generateAccessToken(usr);
      const refreshToken = generateRefreshToken(usr);
      return res.status(200).json({
        errors: [],
        message: "Login successfully",
        data: usr,
        acessToken: token,
        refreshToken: refreshToken,
      });
    } else {
      return res.status(400).json({
        errors: ["Wrong password"],
        message: "Login Field",
        data: data,
      });
    }
  } catch (error) {
    next(
      new Error("controllers/userController.js:setLogin - " + error.message)
    );
  }
};

const setRefreshToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        errors: ["Refresh token not found"],
        message: "Refresh Field",
        data: null,
      });
    }
    const verify = verifyRefreshToken(token);
    if (!verify) {
      return res.status(401).json({
        errors: ["Invalid refresh token"],
        message: "Refresh Field",
        data: null,
      });
    }
    let data = parseJWT(token);
    const user = await User.findOne({
      where: {
        email: data.email,
        isActive: true,
      },
    });
    if (!user) {
      return res.status(404).json({
        errors: ["User not found"],
        message: "Refresh Field",
        data: null,
      });
    } else {
      const usr = {
        userId: user.userId,
        name: user.name,
        email: user.email,
      };
      const token = generateAccessToken(usr);
      const refreshToken = generateRefreshToken(usr);
      return res.status(200).json({
        errors: [],
        message: "Refresh successfully",
        data: usr,
        acessToken: token,
        refreshToken: refreshToken,
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

const updateUser = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const valid = {};
    if (isExists(req.body.name)) {
      valid.name = "required";
    }
    if (isExists(req.body.email)) {
      valid.email = "required,isEmail";
    }
    if (isExists(req.body.password)) {
      valid.password = "required,isStrongPassword";
      valid.conformPassword = "required";
    }
    const user = await dataValid(valid, req.body);
    if (
      isExists(user.data.password) &&
      user.data.password !== user.data.conformPassword
    ) {
      user.message.push("Password not match");
    }
    if (user.message.length > 0) {
      return res.status(400).json({
        errors: user.message,
        message: "Update Field",
        data: null,
      });
    }
    const result = await User.update(
      {
        ...user.data,
      },
      {
        where: {
          userId: user_id,
        },
      }
    );
    if (result[0] == 0) {
      return res.status(404).json({
        errors: ["User not found"],
        message: "Update Field",
        data: null,
      });
    } else {
      return res.status(200).json({
        errors: [],
        message: "User updated successfully",
        data: user.data,
      });
    }
  } catch (error) {
    next(
      new Error("controllers/userController.js:updateUser - " + error.message)
    );
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const usrDelete = User.destroy({
      where: {
        userId: user_id,
      },
    });
    if (!usrDelete) {
      return res.status(404).json({
        errors: ["User not found"],
        message: "Delete Field",
        data: null,
      });
    }
    return res.status(200).json({
      errors: [],
      message: "User deleted successfully",
      data: null,
    });
  } catch (error) {
    next(
      new Error("controllers/userController.js:deleteUser - " + error.message)
    );
  }
};

const forgotPassword = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const valid = {
      email: "required,isEmail",
    };
    const userData = await dataValid(valid, req.body);
    if (userData.message.length > 0) {
      return res.status(400).json({
        errors: userData.message,
        message: "Forgot Password Field",
        data: null,
      });
    }
    const user = await User.findOne({
      where: {
        email: userData.data.email,
      },
    });
    if (!user) {
      return res.status(404).json({
        errors: ["User not found"],
        message: "Forgot Password Field",
        data: null,
      });
    }
    // dapatkan random password
    const random = new Entropy({ bits: 60, charset: charset32 });
    const stringPwd = random.string();
    await User.update(
      {
        password: stringPwd,
      },
      {
        where: {
          user_id: user.userId,
        },
        transaction: t,
      }
    );
    const result = await sendPassword(user.email, stringPwd);
    if (!result) {
      await t.rollback();
      return res.status(400).json({
        errors: ["Email not sent"],
        message: "Forgot Password Field",
        data: null,
      });
    }
    await t.commit();
    return res.status(200).json({
      errors: [],
      message: "Forgot Password success, please check your email",
      data: null,
    });
  } catch (error) {
    await t.rollback();
    next(
      new Error(
        "controllers/userController.js:forgotPassword - " + error.message
      )
    );
  }
};

export {
  setUser,
  setActivateUser,
  getUser,
  setLogin,
  setRefreshToken,
  updateUser,
  deleteUser,
  forgotPassword,
};

```

# BUAT ROUTE

```js
import express from "express";
import { setUser } from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post("/users", setUser);

export default userRouter;

```

BUAT ERROR HANDLING DI CONTROLLER


```js
import logger from "../middleware/winston.js";
import { verifyAccessToken } from "../utils/jwt.js";

const errorrHandling = (err, req, res, next) => {
  const message = err.message.split(" - ")[1];
  logger.error(err);
  res.status(500).json({
    errors: [message],
    message: "Internal Server Error",
    data: null,
  });
};

const autenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      errors: ["Token not found"],
      message: "Verify Field",
      data: null,
    });
  }
  const user = verifyAccessToken(token);
  if (!user) {
    return res.status(401).json({
      errors: ["Invalid token"],
      message: "Verify Field",
      data: null,
    });
  }
  req.user = user;
  next();
};

export { errorrHandling, autenticate };

```

kemudian gunakan ini pada controller yang lain misalnya 


```js
catch (error) {    next(newError("controllers/userController.js:setUser - "+error.message));  }
```

letakkan routes error handling ini pada bagian bawah route 


```js
import express from "express";
import userRouter from "./userRoute.js";
import { errorrHandling } from "../controllers/errorHandlingController.js";
import contactRouter from "./contactRoute.js";
import addressRouter from "./addressRouter.js";
const route = express.Router();

route.use("/api", userRouter);
route.use("/api", contactRouter);
route.use("/api", addressRouter);
route.use("*", errorrHandling);
route.use("*", (req, res) => {
  res.status(404).json({
    errors: ["Page Not Found"],
    message: "Internal Server Error",
    data: null,
  });
});
export default route;

```


INI ADALAH SETUP AWAL UNTUK KIT AMEMBUAT SEBUAH PROJECT

# CATATAN LAIN

jangan lupa gunakan transaction dan rollback pada controller agar jika terjadi error maka data tidak masuk ke dalam database

```js
const t = awaitsequelize.transaction();
....

catch (error) {  
await t.rollback();  
next(newError("controllers/userController.js:setUser - "+error.message));  
}
```
