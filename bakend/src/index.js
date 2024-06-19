const express = require('express');
const app = express();
const cors = require('cors')

const routes = require('./routes/index');
const connectDB = require('./db/mongodb');

app.use(cors())

app.use(express.json())
app.use('/api/v1', routes);
connectDB()

app.listen(5000, () => {
    console.log("Server start at port 5000");
})