const bcrypt = require("bcryptjs");
const authService = require("../../../services/authService");

module.exports = {
  register(req, res) {
    const { email, password } = req.body;

    authService
      .register(email, password)
      .then((user) => {
        res.status(201).json({
          status: "OK",
          data: user,
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  registerMember(req, res) {
    const { email, password, role } = req.body;

    const isMember = req.user.role;

    if (isMember === "member") {
      res.status(401).json({
        status: "FAIL",
        message: "Unauthorized, you are not super admin and admin. Only super admin and admin add member",
      });
    } else {
    }

    authService
      .register(email, password, role)
      .then((user) => {
        const isMember = req.user.role;

        res.status(201).json({
          status: "OK",
          data: user,
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  registerAdmin(req, res) {
    const { email, password, role } = req.body;

    const isSuperAdmin = req.user.role;

    if (isSuperAdmin !== "superAdmin") {
      res.status(401).json({
        status: "FAIL",
        message: "Unauthorized because only super admin can add admin",
      });
      return;
    }
    authService
      .registerAdmin(email, password, role)
      .then((user) => {
        res.status(201).json({
          status: "OK",
          data: user,
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  list(req, res) {
    authService
      .list()
      .then(({ data, count }) => {
        res.status(200).json({
          status: "OK",
          data: { user: data },
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

  login(req, res) {
    const { email, password } = req.body;

    authService
      .login(email, password)
      .then((auth) => {
        if (!auth) {
          res.status(401).json({
            status: "FAIL",
            message: "Email or password is incorrect",
          });
          return;
        }

        res.status(200).json({
          status: "OK",
          data: auth,
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  authorize(req, res, next) {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      res.status(403).json({
        message: "Unauthorized",
      });
      return;
    }
    const token = bearerToken.split("Bearer ")[1];

    authService
      .authorize(token)
      .then((user) => {
        if (!user) {
          res.status(403).json({
            message: "Unauthorized1",
          });
          return;
        }

        req.user = user;
        next();
      })
      .catch((err) => {
        res.status(403).json({
          message: "Unauthorized2",
        });
      });
  },

  authorizeSuperAdmin(req, res, next) {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      res.status(403).json({
        message: "Unauthorized",
      });
      return;
    }
    const token = bearerToken.split("Bearer ")[1];

    authService
      .authorizeSuperAdmin(token)
      .then((user) => {
        if (!user) {
          res.status(403).json({
            message: "You arn't super admin",
          });
          return;
        }

        req.user = user;
        next();
      })
      .catch((err) => {
        res.status(403).json({
          message: "Unauthorized",
        });
      });
  },

  authorizeAdmin(req, res, next) {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      res.status(403).json({
        message: "Unauthorized",
      });
      return;
    }
    const token = bearerToken.split("Bearer ")[1];

    authService
      .authorizeAdmin(token)
      .then((user) => {
        if (!user) {
          res.status(403).json({
            message: "You arn't admin",
          });
          return;
        }

        req.user = user;
        next();
      })
      .catch((err) => {
        res.status(403).json({
          message: "Unauthorized",
        });
      });
  },

  currentUser(req, res) {
    const user = req.user;
    res.status(201).json({
      status: "OK",
      data: user,
    });
  },
};
