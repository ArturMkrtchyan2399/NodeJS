const fs = require('fs').promises;
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    try {
        const user = req.body;
        const {name, surname, age, username, email, password} = user;
        if (!name || !surname || !age || !username || !email || !password) {
            return res.status(403).json({
                error: 'Fill in all fields'
            });
        }
        const message = validate(user);
        if (message) {
            return res.status(400).json({
                message: message
            });
        }
        const users = await usersArray();
        if (!users) {
            throw new Error("Error while reading!!!");
        }
        for (const temp of users) {
            if (temp.email === user.email) {
                return res.status(400).json({
                    message: "This email has already occupied"
                })
            }
        }
        let lastIndex = users.length === 0 ? 0 : users[users.length - 1].id;
        user.id = ++lastIndex;
        user.password = await bcrypt.hash(user.password, 10);
        users.push(user);

        await fs.writeFile('./db/users.json', JSON.stringify(users, null, 4));
        return res.status(201).json({
            message: "You have successfully registered"
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: err.message
        })
    }
}

const getUsers = async (req, res) => {
    try {
        const {query} = req;
        let users = await usersArray();
        if (!users) {
            throw new Error("Error while reading!!!");
        }
        if (query.name) {
            users = users.filter(user => user.name === query.name);
        }
        for (const user of users) {
            delete user.password;
        }
        return res.status(200).json({
            users
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: err.message
        })
    }
}

const deleteUserById = async (req, res) => {
    try {
        const id = +req.params.id;
        const users = await usersArray()
        if (!users) {
            throw new Error("Error while reading!!!");
        }
        const updated = users.filter(el => el.id !== id);
        if (users.length === updated.length) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        await fs.writeFile('./db/users.json', JSON.stringify(updated, null, 4));
        return res.status(200).json({
            message: "User successfully deleted"
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: err.message
        })
    }
}

const updateUserById = async (req, res) => {
    try {
        const id = +req.params.id;
        const users = await usersArray();
        const user = req.body;
        if (!users) {
            throw new Error("Error while reading!!!");
        }
        let userFound = false;
        for (let i = 0; i < users.length; ++i) {
            if (users[i].id === id) {
                users[i].name = user.name;
                users[i].surname = user.surname;
                users[i].age = user.age;
                users[i].username = user.username;
                users[i].email = user.email;
                users[i].password = await bcrypt.hash(user.password, 10);
                userFound = true;
                break;
            }
        }
        if (!userFound) {
            res.status(404).json({
                message: "User not found",
            })
        }
        await fs.writeFile('./db/users.json', JSON.stringify(users, null, 4));
        res.status(200).json({
            message: "User successfully updated"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const users = await usersArray();
        if (!users) {
            throw new Error('Error while reading!!!');
        }
        for (const user of users) {
            if (user.id === +id) {
                delete user.password;
                res.status(200).json({user});
            }
        }
        res.status(404).json({
            message: "User not found"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    createUser,
    getUsers,
    getById,
    updateUserById,
    deleteUserById,
};

const validate = (user) => {
    const {name, surname, age, username, email, password} = user;
    const error = [];
    const nameRegExp = "[A-Z][a-z]+";
    const usernameRegExp = "^[a-zA-Z0-9]+$";
    const emailRegExp = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)])";
    const passwordRegExp = ["^(.*?[A-Z]){2,}.*$", "^(.*?\\d){2,}.*$"];

    if (!name.match(nameRegExp)) {
        return "Please enter a valid name";
    }
    if (!surname.match(nameRegExp)) {
        return "Please enter a valid surname";
    }
    if (!(age >= 8 && age <= 100)) {
        return "Please enter a valid age "
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
}

const usersArray = async () => {
    try {
        const data = await fs.readFile('./db/users.json');
        return data.toString().length === 0 ? [] : JSON.parse(data);
    } catch (err) {
        console.log(err);
        return undefined;
    }
}