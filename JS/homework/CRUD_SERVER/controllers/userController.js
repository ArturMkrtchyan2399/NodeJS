const fs = require('fs').promises;
const bcrypt = require('bcrypt');

const createUser = async (user, res) => {
    try {
        const message = validate(user);
        if (message) {
            res.statusCode = 400;
            return res.end(JSON.stringify({
                message
            }))
        }

        let users = await usersArray();
        if (!users) {
            throw new Error("Error while reading!!!");
        }
        for (const temp of users) {
            if (temp.email === user.email) {
                res.statusCode = 400;
                return res.end(JSON.stringify({
                    message: "This email has already occupied."
                }));
            }
        }

        let lastIndex = users.length === 0 ? 0 : users[users.length - 1].id;
        user.id = ++lastIndex;
        user.password = await bcrypt.hash(user.password, 10);
        users.push(user);

        await fs.writeFile('./db/users.json', JSON.stringify(users, null, 4));
        res.statusCode = 201;
        return res.end(JSON.stringify({
            message: "You have successfully registered"
        }));
    } catch (err) {
        console.log(err);
        res.statusCode = 500;
        return res.end(JSON.stringify({
            message: err.message
        }));
    }
}

const getAllUsers = async (res) => {
    try {
        let users = await usersArray();
        if (!users) {
            throw new Error("Error while reading!!!");
        }
        for (const user of users) {
            delete user.password;
        }
        res.statusCode = 200;
        return res.end(JSON.stringify({users}));
    }catch(err){
        console.log(err);
        res.statusCode = 500;
        return res.end(JSON.stringify({
            message: err.message
        }));
    }
}

const getById = async (id, res) => {
    try {
        const users = await usersArray();
        if (!users) {
            throw new Error("Error while reading!!!");
        }
        for (const user of users) {
            if (user.id === id) {
                delete user.password;
                res.statusCode = 200;
                return res.end(JSON.stringify({user}));
            }
        }
        res.statusCode = 404;
        return res.end(JSON.stringify({
            message: "User not found"
        }));
    }catch(err){
        console.log(err);
        res.statusCode = 500;
        return res.end(JSON.stringify({
            message: err.message
        }));
    }
}

const getByName = async (name, res) => {
    try {
        const users = await usersArray();
        const arr = [];
        if (!users) {
            throw new Error("Error while reading!!!");
        }
        for (const user of users) {
            if (user.name === name) {
                delete user.password;
                arr.push(user);
            }
        }
        if(arr.length !== 0){
            res.statusCode = 200;
            return res.end(JSON.stringify({"user":arr}));
        }
        res.statusCode = 404;
        return res.end(JSON.stringify({
            message: "User not found"
        }));
    }catch(err){
        console.log(err);
        res.statusCode = 500;
        return res.end(JSON.stringify({
            message: err.message
        }));
    }
}

const updateUser = async (id, userData, res) => {
    try {
        let users = await usersArray();
        if (!users) {
            throw new Error("Error while reading!!!");
        }
        let userFound = false;
        if (typeof id === "number") {
            for (let i = 0; i < users.length; ++i) {
                if (users[i].id === id) {
                    users[i].name = userData.name;
                    users[i].surname = userData.surname;
                    users[i].age = userData.age;
                    users[i].username = userData.username;
                    users[i].email = userData.email;
                    users[i].password = await bcrypt.hash(userData.password, 10);
                    userFound = true;
                    break;
                }
            }
        } else {
            res.statusCode = 404;
            return res.end(JSON.stringify({
                message: "Invalid endpoint"
            }));
        }


        if (!userFound) {
            res.statusCode = 404;
            return res.end(JSON.stringify({
                message: "User not found"
            }));
        }

        await fs.writeFile('./db/users.json', JSON.stringify(users, null, 4));
        res.statusCode = 200;
        return res.end(JSON.stringify({
            message: "User successfully updated"
        }));
    } catch (err) {
        console.log(err);
        res.statusCode = 500;
        return res.end(JSON.stringify({
            message: err.message
        }));
    }
}

const deleteUser = async (id, res) => {
    try {
        if (typeof id === "number") {
            var users = await usersArray();
            if (!users) {
                throw new Error("Error while reading!!!");
            }
            var updated = users.filter(el => el.id !== id);
        } else {
            res.statusCode = 404;
            return res.end(JSON.stringify({
                message: "Invalid endpoint"
            }));
        }
        if (users.length === updated.length) {
            res.statusCode = 404;
            return res.end(JSON.stringify({
                message: "User not found"
            }));
        }

        await fs.writeFile('./db/users.json', JSON.stringify(updated, null, 4));
        res.statusCode = 200;
        return res.end(JSON.stringify({
            message: "User successfully deleted"
        }));
    }catch(err){
        console.log(err);
        res.statusCode = 500;
        return res.end(JSON.stringify({
            message: err.message
        }));
    }
}

const checkURL = (req) => {
    const arr = req.url.split('/');
    let param = Number(arr[arr.length - 1])
    if (arr.length === 3 && !isNaN(param)) {
        return param;
    }
    param = arr[arr.length - 1];
    if (arr.length === 3 && (typeof param === "string")) {
        return param;
    }

    return undefined;
}

module.exports = {
    createUser,
    getAllUsers,
    checkURL,
    getById,
    getByName,
    updateUser,
    deleteUser,
}


const validate = (user) => {
    const {name, surname, age, username, email, password} = user;

    const nameRegExp = "[A-Z][a-z]+";
    const usernameRegExp = "^[a-zA-Z0-9]+$";
    const emailRegExp = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)])";
    const passwordRegExp = ["^(.*?[A-Z]){2,}.*$", "^(.*?\\d){2,}.*$"];
    if (!name || !surname || !age || !username || !email || !password) {
        return "Fill all field"
    }

    if (!name.match(nameRegExp)) {
        return "Please enter a valid name";
    }

    if (!surname.match(nameRegExp)) {
        return "Please enter a valid surname";
    }

    if (!(age >= 8 && age <= 100)) {
        return "Please enter a valid password "
    }

    if (!username.match(usernameRegExp)) {
        return "Please a valid username";
    }

    if (!email.match(emailRegExp)) {
        return "Please a valid email";
    }

    if (!(password.length > 8) || !password.match(passwordRegExp[0]) ||
        !password.match(passwordRegExp[1]) || password.includes(" ")) {
        return "Invalid password. Password must contain 2 uppercase letters, 3 numbers, not contain space and be longer than 8 symbols";
    }

    return undefined;
}


const usersArray = async () => {
    try {
        const data = await fs.readFile('./db/users.json');
        return data.toString().length === 0 ? [] : JSON.parse(data);
    }catch(err){
        console.log(err);
        return undefined;
    }
}