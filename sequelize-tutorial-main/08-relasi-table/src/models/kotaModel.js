import { DataTypes } from "sequelize";

const Kota = {
  kotaId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

export default Kota;
