'use strict';
/** @type {import('sequelize-cli').Migration} */

const table = 'Skills';

module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      { tag: 'Budidaya Tanaman' },
      { tag: 'Manajemen Irigasi' },
      { tag: 'Persiapan Tanah' },
      { tag: 'Manajemen Hama dan Penyakit' },
      { tag: 'Praktik Pertanian Organik' },
      { tag: 'Pemupukan' },
      { tag: 'Pengoperasian dan Pemeliharaan Peralatan' },
      { tag: 'Pemanenan' },
      { tag: 'Penanganan Pasca Panen' },
      { tag: 'Agribisnis dan Pemasaran' },
    ]
    await queryInterface.bulkInsert(table, data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(table, null, {});
  }
};

