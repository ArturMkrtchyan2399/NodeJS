const {User} = require('../models');
const bcrypt = require('bcrypt');

const updateAndSaveUser = async (userId, user) => {
    const foundedUser = await User.findOne({_id: userId});
    if (!foundedUser) {
        return false;
    }
    const {firstName, lastName, age, email, password} = user;
    if (firstName)
        foundedUser.firstName = firstName;
    if (lastName)
        foundedUser.lastName = lastName;
    if (age)
        foundedUser.age = age;
    if (email)
        foundedUser.email = email;
    if (password)
        foundedUser.password = await bcrypt.hash(password, 10);

    await foundedUser.save();

    return true;

}

module.exports = {
    updateAndSaveUser
}