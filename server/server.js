const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
const initializeRoute = require('./routes/initializeRoute')
const transactoinRoute = require('./routes/transactionsRoute')

connectDB();

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send({
        isAlive:true
    })
})

app.use('/api',initializeRoute)
app.use('/api',transactoinRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});