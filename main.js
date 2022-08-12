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
        this.createAccount = function () {
            var check;
            // Input for Name
            do {
                check = true;
                var name = String(prompt(Enum_js_1.detail.name));
                var temp = Number(name);
                if (!(Number.isNaN(temp))) {
                    console.log("Please enter valid name");
                    check = false;
                }
            } while (check == false);
            // Input for age 
            do {
                check = true;
                var age = parseInt(prompt(Enum_js_1.detail.age));
                if ((Number.isNaN(age))) {
                    console.log("Please enter valid age");
                    check = false;
                }
            } while (check == false);
            // input for contact number 
            do {
                check = true;
                var contactNo = parseInt(prompt(Enum_js_1.detail.contactNo));
                var temp = Number(contactNo);
                if (String(contactNo).length < 10) {
                    console.log("Please Enter 10 digit number ");
                    check = false;
                    if ((Number.isNaN(temp))) {
                        console.log("Please enter valid Mobile number");
                        check = false;
                    }
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
            // input for username
            do {
                check = true;
                var username = prompt(Enum_js_1.detail.username);
                var temp = Number(username);
                if (!(Number.isNaN(temp))) {
                    console.log("Please enter valid Input ");
                    check = false;
                }
            } while (check == false);
            var amount = 0;
            var password = prompt(Enum_js_1.detail.password);
            var accountNo = Math.floor((Math.random() * 10000) + 1); // 4 Digit account number 
            return { name: name, age: age, contactNo: contactNo, email: email, dateOfbirth: dateOfbirth, accountNo: accountNo, username: username, password: password, amount: amount };
        };
        this.showDetails = function (userData) {
            var check = true;
            do {
                var userInputName = prompt(Enum_js_1.detail.userInput);
                var userInputPass = prompt(Enum_js_1.detail.userPass);
                for (var i = 0; i < userData.length; i++) {
                    if (userData[i].username == userInputName && userData[i].password == userInputPass) {
                        console.log(" User name is ", userData[i].name, "Age of user is ", userData[i].age, "The account number of user is ", userData[i].accountNo, "Date of birth user is ", userData[i].dateOfbirth, "The amount in account is ", userData[i].amount);
                        check = true;
                    }
                    else {
                        check = false;
                    }
                }
            } while (check = false);
        };
    }
    return User;
}());
var Bank = /** @class */ (function (_super) {
    __extends(Bank, _super);
    function Bank() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.withdraw = function (withdawId, fc) {
            var path = require('path');
            var userInputName = prompt(Enum_js_1.detail.userInput);
            var userInputPass = prompt(Enum_js_1.detail.userPass);
            for (var i = 0; i < withdawId.length; i++) {
                if (withdawId[i].username == userInputName && withdawId[i].password == userInputPass) {
                    var withDraw = parseInt(prompt(Enum_js_1.detail.withdraw));
                    console.log(withdawId[i].amount);
                    if (withDraw > withdawId[i].amount) {
                        console.log("Insuffient fund");
                    }
                    else {
                        console.log("The amount was withdrawn successfully.");
                        var balance = withdawId[i].amount - withDraw;
                        withdawId[i].amount = balance;
                        fc.writeFileSync(path.resolve(__dirname, 'test.json'), JSON.stringify(withdawId, null, 2));
                        console.log("The remaining balance in your account is ".concat(balance));
                    }
                    break;
                }
                // while (n < 3) {
                //     } else if (n < 2) {
                //         console.log("Please enter correct details")
                //     }
                //     n++
                // if (n >= 3) {
                //     console.log("You have tried many times. Please try after some time .")
                // }
            }
        };
        return _this;
    }
    Bank.prototype.deposit = function (depositId, ff) {
        var path = require('path');
        var userInputName = prompt(Enum_js_1.detail.userInput);
        var userInputPass = prompt(Enum_js_1.detail.userPass);
        for (var i = 0; i < depositId.length; i++) {
            if (depositId[i].username == userInputName && depositId[i].password == userInputPass) {
                var amount = Number(prompt(Enum_js_1.detail.deposit));
                var balance = Number(depositId[i].amount);
                balance = balance + amount;
                depositId[i].amount = balance;
                ff.writeFileSync(path.resolve(__dirname, 'test.json'), JSON.stringify(depositId, null, 2));
                console.log("You have deposited Rs ".concat(amount, " in your account ."));
            }
        }
    };
    Bank.prototype.view_balance = function (viewBalanceId) {
        var userInputName = prompt(Enum_js_1.detail.userInput);
        var userInputPass = prompt(Enum_js_1.detail.userPass);
        for (var i = 0; i < viewBalanceId.length; i++) {
            if (viewBalanceId[i].username == userInputName && viewBalanceId[i].password == userInputPass) {
                var viewBalance = viewBalanceId[i].amount;
                console.log("The Balance in your Account ".concat(viewBalance));
            }
        }
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
            userDetails = user.createAccount();
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
            user.showDetails(userData);
            break;
        case 3:
            var ff = require('fs');
            var depositFIle = ff.readFileSync('test.json');
            var depositId = JSON.parse(depositFIle);
            initialAmount = bank.deposit(depositId, ff);
            break;
        case 4:
            var fc = require('fs');
            var withdrawFile = fc.readFileSync('test.json');
            var withdrawId = JSON.parse(withdrawFile);
            bank.withdraw(withdrawId, fc);
            break;
        case 5:
            var fa = require('fs');
            var balanceFile = fa.readFileSync('test.json');
            var viewBalanceId = JSON.parse(balanceFile);
            bank.view_balance(viewBalanceId);
            break;
        default:
            break;
    }
} while (input != 6);
