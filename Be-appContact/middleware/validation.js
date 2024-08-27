const Joi = require("@hapi/joi");

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(10).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required().messages({
    "string.pattern.base":
      "username, email dan password tidak boleh kosong, password minimal 8 karakter.",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required().messages({
    "string.pattern.base":
      "username, email dan password tidak boleh kosong, password minimal 8 karakter.",
  }),
});

const updateSchema = Joi.object({
    name: Joi.string().min(3).max(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required().messages({
      "string.pattern.base":
        "username, email dan password tidak boleh kosong, password minimal 8 karakter.",
    }),
})


module.exports = { registerSchema, loginSchema, updateSchema }