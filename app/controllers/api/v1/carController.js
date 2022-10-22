const carService = require("../../../services/carServices");

module.exports = {
  async list(req, res) {
    try {
      const isDelete = false;
      const { data, count } = await carService.list(isDelete);
      res.status(200).json({
        status: "OK",
        data: { cars: data },
        meta: { total: count },
      });
    } catch (err) {
      res.status(400).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },

  async create(req, res) {
    try {
      const dataCar = {
        name: req.body.name,
        prize: req.body.prize,
        type: req.body.type,
        image: req.body.image,
        isDelete: false,
        createdBy: req.user.email,
        updatedBy: req.user.email,
      };

      const car = await carService.create(dataCar);
      res.status(201).json({
        status: "OK",
        data: car,
      });
    } catch (err) {
      res.status(422).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },

  async update(req, res) {
    try {
      const dataCar = {
        name: req.body.name,
        prize: req.body.prize,
        type: req.body.type,
        image: req.body.image,

        updatedBy: req.user.email,
      };

      const car = await carService.update(req.params.id, dataCar);
      res.status(201).json({
        status: "OK",
        data: car,
      });
    } catch (err) {
      res.status(422).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },

  show(req, res) {
    carService
      .get(req.params.id)
      .then((cars) => {
        res.status(200).json({
          status: "OK",
          data: cars,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async destroy(req, res) {
    try {
      const id = req.params.id;
      await carService.update(id, {
        isDelete: true,
        deletedBy: req.user.email,
      });
      res.status(201).json({
        status: "OK",
      });
    } catch (err) {
      res.status(422).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },
};
