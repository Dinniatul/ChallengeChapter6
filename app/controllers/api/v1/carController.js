const carService = require("../../../services/carServices");

module.exports = {
  list(req, res) {
    carService
      .list()
      .then(({ data, count }) => {
        res.status(200).json({
          status: "OK",
          data: { cars: data },
          meta: { total: count },
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  create(req, res) {
    const isMember = req.user.role;

    if (isMember === "member") {
      res.status(401).json({
        message: "cant not create car, you dont have permission",
      });
      return;
    }

    const body = {
      ...req.body,
      createdBy: req.user.role,
      dataAvailable: true,
    };

    carService
      .create(body)
      .then((post) => {
        res.status(201).json({
          status: "OK",
          data: post,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  update(req, res) {
    const id = req.params.id;

    const isMember = req.user.role;

    if (isMember === "member") {
      res.status(401).json({
        message: "cant not update car, you dont have permission",
      });
      return;
    }

    const body = {
      ...req.body,
      updatedBy: req.user.role,
    };
    carService
      .update(body, id)
      .then((car) => {
        res.status(200).json({
          status: "OK",
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  show(req, res) {
    carService
      .get(req.params.id)
      .then((post) => {
        res.status(200).json({
          status: "OK",
          data: post,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  destroy(req, res) {
    const id = req.params.id;

    const isMember = req.user.role;

    if (isMember === "member") {
      res.status(401).json({
        message: "cant not destroy car, you dont have permission",
      });
      return;
    }

    const payload = {
      deletedBy: req.user.role,
      dataAvailable: false,
    };

    carService
      .delete(id, payload)
      .then((post) => {
        res.status(204).json({
          status: "deleted OK",
          data: post,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },
};
