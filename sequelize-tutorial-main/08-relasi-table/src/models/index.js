import db from "../utils/db.js";
import User from "./userModel.js";
import Penjual from "./penjualModel.js";
import Kota from "./kotaModel.js";
import Post from "./postModel.js";
import Mahasiswa from "./mahasiswaModel.js";
import MataKuliah from "./mataKuliahModel.js";

const penjual = db.define("Penjual", Penjual, {
  tableName: "penjual",
  underscored: true,
});

const kota = db.define("Kota", Kota, {
  tableName: "kota",
  underscored: true,
});

kota.hasOne(penjual, {
  foreignKey: "kotaId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

penjual.belongsTo(kota, {
  foreignKey: "kotaId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

const user = db.define("User", User, {
  tableName: "users",
  underscored: true,
  freezeTableName: true,
  indexes: [
    {
      fields: ["email"],
      unique: true,
    },
  ],
});

const post = db.define("Post", Post, {
  tableName: "post",
  underscored: true,
  timestamps: false,
});

user.hasMany(post, {
  foreignKey: "userId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

post.belongsTo(user, {
  foreignKey: "userId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

const mahasiswa = db.define("Mahasiswa", Mahasiswa, {
  tableName: "mahasiswa",
  underscored: true,
});

const mataKuliah = db.define("MataKuliah", MataKuliah, {
  tableName: "mataKuliah",
  underscored: true,
});

mahasiswa.belongsToMany(mataKuliah, {
  through: "MahasiswaMataKuliah",
  foreignKey: "mahasiswaId",
  otherKey: "mataKuliahId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

mataKuliah.belongsToMany(mahasiswa, {
  through: "MahasiswaMataKuliah",
  foreignKey: "mataKuliahId",
  otherKey: "mahasiswaId",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

db.sync();

export default db;
