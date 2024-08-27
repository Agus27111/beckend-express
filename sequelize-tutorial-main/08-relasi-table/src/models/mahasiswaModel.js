import { DataTypes } from "sequelize";

const Mahasiswa = {
  mahasiswaId: {
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

export default Mahasiswa;
