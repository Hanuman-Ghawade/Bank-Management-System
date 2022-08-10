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
var Enum_js_1 = require("./Enum.js");
// Banking management system 
var ps = require("prompt-sync");
var prompt = ps();
// We Have created on user class 
var User = /** @class */ (function () {
    function User() {
        var _this = this;
        this.creteAccount = function () {
            var check;
            // Input for Name
            var name = prompt(Enum_js_1.detail.name);
            _this.check(name);
            // Input for age 
            do {
                check = true;
                var age = prompt(Enum_js_1.detail.age);
                var temp = Number(age);
                if ((Number.isNaN(temp))) {
                    console.log("Please enter valid age");
                    check = false;
                }
            } while (check == false);
            // input for contact number 
            do {
                check = true;
                var contactNo = prompt(Enum_js_1.detail.contactNo);
                var temp = Number(contactNo);
                if ((Number.isNaN(temp))) {
                    console.log("Please enter valid Mobile number");
                    check = false;
                }
            } while (check == false);
            // input for email
            do {
                check = true;
                var email = prompt(Enum_js_1.detail.email);
                var temp = Number(email);
                if (!(Number.isNaN(temp))) {
                    console.log("Please enter valid Input ");
                    check = false;
                }
            } while (check == false);
            // Input for date of Birth 
            do {
                check = true;
                var dateOfbirth = prompt(Enum_js_1.detail.dateOfBirth);
                var temp = Number(email);
                if (!(Number.isNaN(temp))) {
                    console.log("Please enter valid Input ");
                    check = false;
                }
            } while (check == false);
            do {
                check = true;
                var username = prompt(Enum_js_1.detail.username);
                var temp = Number(username);
                if (!(Number.isNaN(temp))) {
                    console.log("Please enter valid Input ");
                    check = false;
                }
            } while (check == false);
            var password = prompt(Enum_js_1.detail.password);
            var accountNo = Math.floor((Math.random() * 10000) + 1); // 4 Digit account number 
            return [{ name: name, age: age, contactNo: contactNo, email: email, dateOfbirth: dateOfbirth, accountNo: accountNo, username: username, password: password }];
        };
        this.showDetails = function (userData) {
            var name = userData.name, contactNo = userData.contactNo, age = userData.age, email = userData.email, password = userData.password, dateOfBirth = userData.dateOfBirth, accountNo = userData.accountNo, username = userData.username;
            console.log("User name is ".concat(userData[0].name, " . Contact number is  ").concat(username, " .Account No is ").concat(accountNo));
        };
        this.check = function (input) {
        };
    }
    return User;
}());
var Bank = /** @class */ (function (_super) {
    __extends(Bank, _super);
    function Bank() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.withdraw = function (initialAmount) {
            var n = 0;
            while (n < 3) {
                var userInputName = prompt(Enum_js_1.detail.userInput);
                var userInputPass = prompt(Enum_js_1.detail.userPass);
                if (userName == userInputName && userPass == userInputPass) {
                    var withDraw = prompt(Enum_js_1.detail.withdraw);
                    if (withDraw > initialAmount) {
                        console.log("Insuffient fund");
                    }
                    else {
                        var balance = initialAmount - withDraw;
                        console.log("The remaining balance in your account is ".concat(balance));
                    }
                    break;
                }
                else if (n < 2) {
                    console.log("Please enter correct details");
                }
                n++;
                if (n >= 3) {
                    console.log("You have tried many times. Please try after some time .");
                }
            }
        };
        return _this;
    }
    Bank.prototype.deposit = function () {
        var n = 0;
        while (n < 3) {
            var userInputName = prompt(Enum_js_1.detail.userInput);
            var userInputPass = prompt(Enum_js_1.detail.userPass);
            if (userName == userInputName && userPass == userInputPass) {
                var balance = 0;
                var amount = prompt(Enum_js_1.detail.deposit);
                balance = balance + amount;
                console.log("You have deposited Rs ".concat(amount, " in your account ."));
                return amount;
            }
            else if (n < 2) {
                console.log("Please Enter correct details");
            }
            n++;
            if (n >= 3) {
                console.log("You have tried many times. Please try after some time .");
            }
        }
    };
    Bank.prototype.view_balance = function () {
        var balance;
        console.log("The amount in your account is ".concat(balance));
    };
    return Bank;
}(User));
console.log("Welcome to the bank management system ");
var userDetails;
var initialAmount;
var input;
var user = new User();
var bank = new Bank();
do {
    var userResponse = prompt("Please select  Option :\n     1. Create New Account \n     2. Show Details \n     3. deposit \n     4.withdraw\n     5.view Balance\n     6.exit\n     ");
    input = Number(userResponse);
    switch (input) {
        case 1:
            userDetails = user.creteAccount();
            var fs = require('fs');
            var path = require('path');
            var exitingData = fs.readFileSync('test.json');
            var userDatas = JSON.parse(exitingData);
            userDatas.push(userDetails);
            fs.writeFileSync(path.resolve(__dirname, 'test.json'), JSON.stringify(userDatas, null, 2));
            console.log("Account created successfully");
            break;
        case 2:
            var fss = require('fs');
            var rawdata = fss.readFileSync('test.json');
            var userData = JSON.parse(rawdata);
            var userName = userData[0].username;
            user.showDetails(userData);
            var userPass = userData[0].password;
            break;
        case 3:
            initialAmount = bank.deposit();
            break;
        case 4:
            bank.withdraw(initialAmount);
            break;
        case 5:
            bank.view_balance();
            break;
        default:
            console.log("Please enter valid choice ");
    }
} while (input != 6);
