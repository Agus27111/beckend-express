const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const bcrypt = require('bcryptjs');

const  userSchema = Schema(
  {
    name: {
        type: String,
        required: [true, 'Nama wajib diisi'],
        minlength: [3, 'Panjang nama minimal 3 karakter'],
        maxlength: [50, 'Panjang nama maksimal 20 karakter'],
    },
    email: {
      type: String,
      required: [true, 'Email wajib diisi'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password wajib diisi'],
      minlength: [6, 'Panjang password minimal 6 karakter'],
    },
    role: {
      type: String,
      enum: ['admin', 'organizer', 'owner'],
      default: 'admin',
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: 'organizer',
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
    const User = this;
    if (User.isModified('password')) {
        User.password = await bcrypt.hash(User.password, 10);
    };
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}   


module.exports = model('user', userSchema);