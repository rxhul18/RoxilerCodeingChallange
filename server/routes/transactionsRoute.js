const { Router } = require("express")
const { getAllTransactions } = require("../controller/transactionsController")
const router = Router();

router.get('/transactions',getAllTransactions);

module.exports = router;