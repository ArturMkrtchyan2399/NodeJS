const {User} = require('../models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authService = require('../service/authService')

const register = async (req, res) => {
    try {
        const userInfo = req.body;
        const {firstName, lastName, age, email, password} = userInfo;

        const message = authService.validate(userInfo);

        if (message) {
            return res.status(400).json({
                message: message
            });
        }

        const foundUser = await User.findOne({email: email});
        if (foundUser) {
            return res.status(400).json({
                message: "This email has already occupied."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            age,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        return res.status(200).json({
            message: `${user.firstName}, you are successfully registered.`
        });

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }

}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({
                error: 'Fill in all fields'
            });
        }

        const user = await User.findOne({email: email});
        if (!user) {
            return res.status(400).json({
                message: "The email is incorrect"
            })
        }
        const isSamePassword = await bcrypt.compare(password, user.password);
        if (isSamePassword) {
            const token = jwt.sign({
                id: user._id,
                email: user.email
            }, process.env.SECRET);
            user.password = undefined;
            return res.status(200).json({
                message: `${user.firstName}, you are successfully logged in.`,
                token: `Bearer ${token}`,
                user
            })
        }
        return res.status(401).json({
            message: "The password is incorrect."
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }


}

module.exports = {
    register,
    login
}