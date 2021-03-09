const validate = (user) => {
    const {firstName, lastName, age, email, password} = user;

    const nameRegExp = "[A-Z][a-z]+";
    const emailRegExp = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)])";
    const passwordRegExp = ["^(.*?[A-Z]){2,}.*$", "^(.*?\\d){2,}.*$"];

    if (firstName === undefined || lastName === undefined || age === undefined || email === undefined || password === undefined) {
        return 'Fill in all fields'
    }

    if (firstName !== null && !firstName.match(nameRegExp)) {
        return "Please enter a valid name";
    }
    if (lastName !== null && !lastName.match(nameRegExp)) {
        return "Please enter a valid surname";
    }
    if (age !== null && !(age >= 8 && age <= 100)) {
        return "Please enter a valid age "
    }
    if (email !== null && !email.match(emailRegExp)) {
        return "Please a valid email";
    }
    if (password !== null && (!(password.length > 8) || !password.match(passwordRegExp[0]) ||
        !password.match(passwordRegExp[1]) || password.includes(" "))) {
        return "Invalid password. Password must contain 2 uppercase letters, 3 numbers, not contain space and be longer than 8 symbols";
    }
}


module.exports = {
    validate
}