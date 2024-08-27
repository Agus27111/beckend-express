import { DataTypes } from "sequelize";

const MataKuliah = {
  mataKuliahId: {
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

export default MataKuliah;
