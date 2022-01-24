'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transaksi', {
      id_transaksi: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_member: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:"member",
          key:"id_member"
        }
      },
      tgl: {
        type: Sequelize.STRING
      },
      batas_waktu: {
        type: Sequelize.STRING
      },
      tgl_bayar: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      dibayar: {
        type: Sequelize.STRING
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:"user",
          key:"id_user"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('transaksi');
  }
};