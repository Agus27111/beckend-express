import { Op } from "sequelize";
import Address from "../models/addressModel.js";
import Contact from "../models/contactModel.js";
import sequelize from "../utils/db.js";
import { dataValid } from "../validation/dataValidation.js";
import { isExists } from "../validation/sanitization.js";

const setContact = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    let lstError = [];
    // dapatkan data dari post
    let contact = req.body;
    let address = [];
    if (isExists(contact.Addresses)) {
      address = contact.Addresses;
    }
    delete contact["Addresses"];
    // validasi contacts
    const validContact = {
      firstName: "requered",
      email: "requered,isEmail",
      phone: "requered",
    };
    contact = await dataValid(validContact, contact);
    lstError.push(...contact.message);
    // validasi untuk address
    let dtl = await Promise.all(
      address.map(async (item) => {
        const addressClear = await dataValid(
          {
            addressType: "requered",
            street: "requered",
            province: "requered",
            country: "requered",
          },
          item
        );
        lstError.push(...addressClear.message);
        return addressClear.data;
      })
    );

    contact = {
      ...contact.data,
      userId: req.user.userId,
      address: dtl,
    };

    // jika ada error
    if (lstError.length > 0) {
      return res.status(400).json({
        errors: lstError,
        message: "Create Contact field",
        data: contact,
      });
    }
    // jika tidak ada error
    const creteContact = await Contact.create(contact, { transaction: t });
    const creteAddress = await Promise.all(
      contact.address.map(async (item) => {
        return await Address.create(
          {
            ...item,
            contactId: creteContact.contactId,
          },
          {
            transaction: t,
          }
        );
      })
    );
    if (!creteContact || !creteAddress) {
      await t.rollback();
      return res.status(400).json({
        errors: ["Contact not found"],
        message: "Create Contact field",
        data: contact,
      });
    }
    await t.commit();
    return res.status(200).json({
      errors: [],
      message: "Contact success",
      data: { ...creteContact.dataValues, address: creteAddress },
    });
  } catch (error) {
    await t.rollback();
    next(
      new Error(
        "controllers/contactController.js:setContact - " + error.message
      )
    );
  }
};

const getContact = async (req, res, next) => {
  try {
    // persiapkan filter
    const contacts = req.body;
    let address = [];
    if (isExists(contacts.Addresses)) {
      address = contacts.Addresses;
      delete contacts["Addresses"];
    }
    // filter address
    let objFilter = {};
    const filterAddress = await new Promise((resolve, reject) => {
      Object.entries(address).forEach(([key, value]) => {
        objFilter = {
          ...objFilter,
          [key]: {
            [Op.like]: "%" + value + "%",
          },
        };
      });
      resolve(objFilter);
    });

    // filter contact
    let objContact = {};
    const filterContact = await new Promise((resolve, reject) => {
      Object.entries(contacts).forEach(([key, value]) => {
        objContact = {
          ...objContact,
          [key]: {
            [Op.like]: "%" + value + "%",
          },
        };
      });
      resolve(objContact);
    });

    res.json(
      await Contact.findAll({
        include: {
          model: Address,
          where: filterAddress,
        },
        where: filterContact,
      })
    );
  } catch (error) {
    next(
      new Error(
        "controllers/contactController.js:getContact - " + error.message
      )
    );
  }
};

const getContactById = async (req, res, next) => {
  try {
    // dapatkan id
    const id = req.params.id;
    console.log(id);
    const contact = await Contact.findAll({
      include: {
        model: Address,
      },
      where: {
        contactId: id,
      },
    });
    if (!contact) {
      return res.status(404).json({
        errors: ["Contact not found"],
        message: "Get Contact field",
        data: null,
      });
    }
    return res.status(200).json({
      errors: [],
      message: "Contact success",
      data: contact,
    });
  } catch (error) {
    next(
      new Error(
        "controllers/contactController.js:getContactById - " + error.message
      )
    );
  }
};

const updateContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    const validContact = {
      firstName: "requered",
      lastName: "requered",
      email: "requered",
    };
    const contact = await dataValid(validContact, req.body);
    if (contact.message.length > 0) {
      return res.status(400).json({
        errors: contact.message,
        message: "Update Contact field",
        data: contact.data,
      });
    }
    const result = await Contact.update(
      {
        ...contact.data,
      },
      {
        where: {
          contactId: id,
        },
      }
    );
    if (result[0] == 0) {
      return res.status(404).json({
        errors: ["Contact not found"],
        message: "Update Contact field",
        data: contact.data,
      });
    }
    return res.status(200).json({
      errors: [],
      message: "Update Contact success",
      data: contact.data,
    });
  } catch (error) {
    next(
      new Error(
        "controllers/contactController.js:updateContact - " + error.message
      )
    );
  }
};

const deleteContact = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const id = req.params.id;
    // delete address
    const addressDelete = Address.destroy(
      {
        where: {
          contactId: id,
        },
      },
      {
        transaction: t,
      }
    );
    // delete contact
    const contactDelete = Contact.destroy(
      {
        where: {
          contactId: id,
        },
      },
      {
        transaction: t,
      }
    );
    if (!contactDelete || !addressDelete) {
      await t.rollback();
      return res.status(404).json({
        errors: ["Contact not found"],
        message: "Delete Contact field",
        data: null,
      });
    }
    await t.commit();
    return res.status(200).json({
      errors: [],
      message: "Delete Contact success",
      data: null,
    });
  } catch (error) {
    await t.rollback();
    next(
      new Error(
        "controllers/contactController.js:deleteContact - " + error.message
      )
    );
  }
};

export { setContact, getContact, getContactById, updateContact, deleteContact };
