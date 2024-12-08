const Transaction = require('../model/transaction');

exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({});
        res.status(200).json({
            success: true,
            count: transactions.length,
            data:transactions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

