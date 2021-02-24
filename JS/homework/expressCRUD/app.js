const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use('/users', require('./routes'));

app.use((req, res) => {
    res.status(404).send({message: "Invalid Endpoint"});
});

app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`);
});