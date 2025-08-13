const authService = require("../services/authService");

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.registerUser({ email, password });
    res.status(201).json({
      success: true,
      token,
      data: { id: user._id, email: user.email },
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser({ email, password });
    res.json({
      success: true,
      token,
      data: { id: user._id, email: user.email },
    });
  } catch (err) {
    next(err);
  }
};

exports.me = async (req, res, next) => {
  try {
    // req.user is attached by protect middleware
    res.json({
      success: true,
      data: { id: req.user._id, email: req.user.email },
    });
  } catch (err) {
    next(err);
  }
};
