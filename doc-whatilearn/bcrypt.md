BUATLAH FILE bcrypt.js

```js
import bcrypt from "bcrypt";
const saltRounds = 10;

const encript = (password) => {
  return bcrypt.hashSync(password, saltRounds);
};

const compare = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

export { encript, compare };

```

kemudian kita gunakan biasaanya saat kita register dan login pada user

contoh pada login


```js
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
//ini penggunaan bycript
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
```
