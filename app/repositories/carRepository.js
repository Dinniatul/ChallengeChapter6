const { Mobil } = require("../models");

module.exports = {
  create(createArgs) {
    return Mobil.create(createArgs);
  },

  update(id, updateArgs) {
    return Mobil.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  delete(id) {
    return Mobil.destroy(id);
  },

  find(id) {
    return Mobil.findByPk(id);
  },

  findAll() {
    return Mobil.findAll();
  },

  getTotalCars() {
    return Mobil.count();
  },
};
