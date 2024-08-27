const setPersonal = (req, res, next) => {
  try {
  } catch (error) {
    next(
      new Error(
        "controllers/personalController.js: setPersonal - " + error.message
      )
    );
  }
};

export { setPersonal };
