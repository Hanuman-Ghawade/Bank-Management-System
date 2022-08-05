"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
// Banking management system 
var ps = require("prompt-sync");
var prompt = ps();
// We Have created on user class 
var User = /** @class */ (function () {
    function User() {
        this.creteAccount = function () {
            var name = prompt("Please enter your name:  ");
            var age = prompt("Please enter your age:  ");
            var contactNo = prompt("Please enter your contact number:  ");
            var email = prompt("Please enter your email:  ");
            var password = prompt("Please enter your password:  ");
            var dateOfbirth = prompt("Please enter your dateOfBirth:  ");
            console.log("Account created successfully");
            return { name: name, age: age, contactNo: contactNo, email: email, password: password, dateOfbirth: dateOfbirth };
        };
        this.showDetails = function (details) {
            var name = details.name, contactNo = details.contactNo, age = details.age, email = details.email, password = details.password, dateOfBirth = details.dateOfBirth;
            console.log("User name is ".concat(name, " . Contact number is  ").concat(contactNo, " .Email is ").concat(email));
        };
    }
    return User;
}());
var Bank = /** @class */ (function (_super) {
    __extends(Bank, _super);
    function Bank() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bank.prototype.deposit = function () {
        var balance;
        var amount = prompt("Please enter the amount to the deposit ");
        balance = balance + amount;
        console.log("You have deposited Rs ".concat(amount, " in your account ."));
    };
    Bank.prototype.withdraw = function () {
        var balance;
        var amount = prompt("Please enter the amount to the deposit ");
        amount = amount;
        if (amount > balance) {
            console.log("Insuffient fund");
        }
        else {
            balance = balance - amount;
            console.log("The balance in your account is ".concat(balance));
        }
    };
    Bank.prototype.view_balance = function () {
        var balance;
        console.log("The amount in your account is ".concat(balance));
    };
    return Bank;
}(User));
console.log("Welcome to the bank management system ");
var details;
var user = new User();
var bank = new Bank();
while (true) {
    var userResponse = prompt("Please select  Option :\n     1. Create New Account \n     2. Show Details \n     3. deposit \n     4.withdraw\n     5.view Balance\n     6.exit\n     ");
    var input = userResponse;
    if (input == 1) {
        details = user.creteAccount();
    }
    else if (input == 2) {
        user.showDetails(details);
    }
    else if (input == 3) {
        bank.deposit();
    }
    else if (input == 4) {
        bank.withdraw();
    }
    else if (input == 5) {
        bank.view_balance();
    }
    else {
        break;
    }
}
