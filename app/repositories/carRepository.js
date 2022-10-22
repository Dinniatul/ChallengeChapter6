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

  find(condition) {
    return Mobil.findOne({ where: condition });
  },

  findAll(condition) {
    return Mobil.findAll({ where: condition });
  },

  getTotalCars(condition) {
    return Mobil.count({ where: condition });
  },
};
