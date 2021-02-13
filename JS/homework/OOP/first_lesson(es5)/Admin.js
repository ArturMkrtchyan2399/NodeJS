function Admin(name, age) {
    User.call(this, name, age);
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

Admin.prototype.setGoldenAccount = function () {

    if (this.goldenAccount) {
        return 'You already have gold account';
    }
    if (this.wallet < 100) {
        return 'You dont have enough money for gold account';
    }

    this.wallet -= 100;
    this.goldenAccount = true;

    return 'Congratulations!'

}
