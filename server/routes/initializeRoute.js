const { Router } = require("express")
const { initializeController } = require("../controller/initializeController")
const router = Router();

router.get('/initialize',initializeController);

module.exports = router;