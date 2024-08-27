import express from "express";
const app = express();
const port = 3000;
// import sequelize from "./utils/db.js";
// import user from "./models/userModel2.js";
import db from "./models/index.js";
import sequelize from "./utils/db.js";
import { Op } from "sequelize";
const User = db.models.User;

app.get("/", async (req, res) => {
  try {
    // select age, email nama_user from users where user_id in(1,2,3) and email like 'user%'
    // let data = await db.models.Post.findAll({
    //   include: [
    //     {
    //       model: User,
    //       where: {
    //         email: {
    //           [Op.like]: "POJOK%",
    //         },
    //       },
    //     },
    //   ],
    //   where: {
    //     title: "Testing",
    //   },
    //   limit: 10,
    //   offset: 0,
    // });

    // const data = await db.query(
    //   "select users.*, post.title,post.body " +
    //     "from users join post on users.user_id=post.user_id where users.email like 'POJOK%'",
    //   {
    //     type: sequelize.QueryTypes.SELECT,
    //     raw: true,
    //   }
    // );

    const data = await db.query("select * from users", {
      type: sequelize.QueryTypes.SELECT,
      model: User,
      mapToModel: true,
    });
    const getPost = async (id) => {
      return await db.query("select * from post where user_id=:id", {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT,
        model: db.models.Post,
        mapToModel: true,
      });
    };

    let dtl = await Promise.all(
      data.map(async (item) => {
        return {
          ...item.dataValues,
          post: await Promise.all(await getPost(item.userId)),
        };
      })
    );
    res.send(dtl);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
});

app.get("/insert", async (req, res) => {
  // User.create({
  await User.bulkCreate([
    {
      firstName: "Pojok",
      lastName: "Code",
      userName: "user10",
      password: "123456",
      email: "POJOK@GAMAIL.COM",
      age: 20,
      isActive: true,
    },
  ]).then((data) => {
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
