const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
app.use('/uploads/images', express.static('uploads/images'));

const PORT = process.env.PORT || 3000;
const db = process.env.MONGO_URI;
app.use(express.json());


app.use('/api', require('./routes/authRouter'));
app.use('/api', require('./routes/usersRouter'));
app.use('/api', require('./routes/postsRouter'));
app.use((req, res) => res.status(404).send({error: '404: Not found'}));


mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true})
    .then(() => {
        console.log('MongoDB is connected');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.log(err));

