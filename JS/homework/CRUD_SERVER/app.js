const http = require('http');
const userController = require('./controllers/userController.js')

require('dotenv').config();
const app = http.createServer((req, res) => {
    if (req.url === "/create" && req.method === "POST") {
        req.on('data', (userData) => {
            userController.createUser(JSON.parse(userData.toString()), res);
        })
        return;

    }

    if (req.url.startsWith("/getAll") && req.method === "GET") {
        userController.getAllUsers(res);
        return;
    }

    if (req.url.startsWith("/get/") && req.method === "GET") {
        let param = userController.checkURL(req);
        if (typeof param === "number") {
            userController.getById(param, res);
            return;
        }
        if (typeof param === "string") {
            userController.getByName(param, res);
            return;
        }
    }

    if (req.url.startsWith('/update/') && req.method === "GET") {
        let id = userController.checkURL(req);
        req.on('data', userData => {
            userController.updateUser(id, JSON.parse(userData.toString()), res);
        });
        return;
    }
    if (req.url.startsWith('/delete/') && req.method === "GET") {
        let id = userController.checkURL(req);
        userController.deleteUser(id, res);
        return;
    }

    res.statusCode = 404;
    return res.end(JSON.stringify({
        message: "Invalid endpoint"
    }));

});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is runnig at ${PORT}`);
})