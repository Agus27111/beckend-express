const userModel = require("../models/user.model");
const db = require("../utils/db.connection");
const validation = require("../middleware/validation");
const { encript, compare } = require("../utils/bcrypt");
const crypto = require("crypto");
const { sendMail } = require("../utils/emailService");
const redisClient = require("../utils/redisClients");

const userController = {
  register: async (req, res, next) => {
    const t = await db.transaction();
    try {
      const { name, email, password } = req.body;

      // Ubah email menjadi lowercase
      const lowercasedEmail = email.toLowerCase(); // Ubah email menjadi lowercase

      // Validasi input menggunakan Joi
      const { error } = validation.registerSchema.validate({
        name,
        email: lowercasedEmail,
        password,
      });
      if (error) {
        error.isJoi = true; // Tandai error sebagai Joi error
        return next(error); // Forward error ke middleware
      }

      // Cek apakah email sudah terdaftar
      const emailExist = await userModel.findOne({
        where: { email: lowercasedEmail },
      });
      if (emailExist) {
        const customError = new Error("Email sudah terdaftar");
        customError.statusCode = 400;
        return next(customError); // Forward error ke middleware
      }

      // Enkripsi password
      const hashPassword = await encript(password);

      // Buat kode aktivasi
      const activationCode = crypto.randomBytes(20).toString("hex");

      // Simpan user ke database
      const user = await userModel.create({
        name,
        email: lowercasedEmail,
        password: hashPassword,
        expireTime: new Date(),
        isActive: false,
        activationCode,
      }, 
    {
      transaction: t
    });

      // Kirim email aktivasi
      const result = await sendMail((user.email));
      if (!result) {
        return next(new Error("Gagal mengirim email aktivasi"));
      } else {
        res.status(201).json({
          errors: null,
          message: "Registrasi berhasil, silakan cek email anda",
          data: user,
        });
      }
    } catch (error) {
      await t.rollback()
      return next(error); // Forward error ke middleware
    }
  },

  activate: async (req, res, next) => {
    try {
      const user_id = req.params.id
      const { activationCode } = req.body; // Dapatkan kode dari body request atau query

      // Temukan user berdasarkan activationCode
      const user = await User.findOne({ 
        where: {
          userId: user_id,
          isActive: false,
          expireTime: {
            [Op.gte]: new Date(),
          }
       } });
      if (!user) {
        return res.status(400).json({
          errors: ["Kode aktivasi tidak valid atau sudah usang"],
          message: "Aktivasi gagal",
          data: null,
        });
      } else {
        
        // Aktivasi user
        user.isActive = true;
        user.expireTime = null;
        user.activationCode = null; // Hapus kode aktivasi setelah digunakan
        await user.save();
  
        return res.status(200).json({
          errors: null,
          message: "Akun berhasil diaktifkan",
          data: user,
        });
      }

    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // Ubah email menjadi lowercase
      const lowercasedEmail = email.toLowerCase();

      // Validasi
      const { error } = validation.loginSchema.validate({
        email: lowercasedEmail,
        password,
      });
      if (error) {
        return next(customError);
      }

      // Cek email dan password
      const user = await User.findOne({ where: { email } });
      if (
        !user ||
        !(await compare(password, user.password)) ||
        !user.isActive
      ) {
        return res.status(401).json({
          errors: ["Email atau password salah, atau akun belum aktif"],
          message: "Login gagal",
          data: null,
        });
      }

      // Set expireTime di Redis
      const sessionKey = `session:${user.userId}`;
      const expireTime = user.expireTime || new Date();
      await redisClient.setEx(sessionKey, 3600, JSON.stringify({ expireTime }));

      return res.status(200).json({
        errors: null,
        message: "Login berhasil",
        data: { userId: user.userId },
      });
    } catch (error) {
      next(error);
    }
  },

  checkSession: async (req, res, next) => {
    try {
      const userId = req.session.userId;
      // atau dari token/session

      const sessionKey = `session:${userId}`;
      const sessionData = await redisClient.get(sessionKey);

      if (!sessionData) {
        return res.status(401).json({
          errors: ["Session expired, please log in again"],
          message: "Session expired",
          data: null,
        });
      }

      const { expireTime } = JSON.parse(sessionData);
      if (new Date(expireTime) < new Date()) {
        return res.status(401).json({
          errors: ["Session expired, please log in again"],
          message: "Session expired",
          data: null,
        });
      }

      return res.status(200).json({
        errors: null,
        message: "Session valid",
        data: { userId },
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
