const express = require('express');
const expressStatic = require('./expressStatic');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(expressStatic('/static'))

app.listen(PORT, () => {
    console.log(`Server is running ${PORT}...`);
});