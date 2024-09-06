const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let organizerSchema = Schema(
  {
    organizer: {
      type: String,
      required: [true, 'Penyelenggara wajib harus diisi'],
    },
  },
  { timestamps: true }
);

module.exports = model('Organizer', organizerSchema);