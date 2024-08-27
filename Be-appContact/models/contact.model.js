const { Sequelize } = require("sequelize");
const db = require("../utils/db.connection");
const addressModel  = require('./address.model')

const Contact = db.define(
  "contact",
  {
    contactId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
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
    },
    phone: {
      type: Sequelize.STRING,
    },
  },
 
);

Contact.hasMany(addressModel, {
  foreignKey: "contactId",
onDelete: "RESTRICT",
onUpdate: "RESTRICT",
})

addressModel.belongsTo(Contact, {
  foreignKey: "contactId",
onDelete: "RESTRICT",
onUpdate: "RESTRICT",
})

module.exports = Contact;
