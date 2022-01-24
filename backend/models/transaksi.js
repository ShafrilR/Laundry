'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.member,{
        foreignKey: 'id_member',
        as: "member"
      })
      this.belongsTo(models.user,{
        foreignKey: 'id_user',
        as: "user"
      })
      this.hasMany(models.detail, {
        foreignKey: "id_detail",
        as: "detail"
      })
    }
  };
  transaksi.init({
    id_transaksi:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true
    },
    id_member: DataTypes.INTEGER,
    tgl: DataTypes.STRING,
    batas_waktu: DataTypes.STRING,
    tgl_bayar: DataTypes.STRING,
    status: DataTypes.STRING,
    dibayar: DataTypes.STRING,
    id_user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transaksi',
    tableName: 'transaksi'
  });
  return transaksi;
};