const router = require("express").Router();
const authController = require("../controllers/auth");


router.use('/register', authController.register);