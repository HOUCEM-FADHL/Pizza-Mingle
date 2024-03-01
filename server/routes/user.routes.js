// Import the UserController
const UserController = require("../controllers/user.controller");

// Define API routes for User operations and associate them with corresponding controller methods
module.exports = (app) => {
    app.post("/api/registerUser", UserController.registerUser);
    app.post("/api/loginUser", UserController.loginUser);
    app.post("/api/logoutUser", UserController.logoutUser);
};