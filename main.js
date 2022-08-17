"use strict";
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
            // Input details for name
            do {
                check = true;
                var name = String(prompt(Enum_js_1.detail.name));
                var temp = Number(name);
                if (!(Number.isNaN(temp))) {
                    console.log("Please enter valid name");
                    check = false;
                }
            } while (check == false);
            // Input details for age 
            do {
                check = true;
                var age = parseInt(prompt(Enum_js_1.detail.age));
                if ((Number.isNaN(age))) {
                    console.log("Please enter valid age");
                    check = false;
                }
                // else if (age < 18 && age > 85 ) {
                //     console.log("You are not eligible for account creation.");
                //     check = false;
                // }
            } while (check == false);
            // input details for contact number 
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
            // input details  for email
            do {
                var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
                check = true;
                var email = prompt(Enum_js_1.detail.email);
                if (email.match(pattern) === null) {
                    check = false;
                    console.log("Please enter valid email");
                }
            } while (check == false);
            // Input details for date of Birth 
            do {
                var dateReg = /^\d{2}([./-])\d{2}\1\d{4}$/;
                check = true;
                var dateOfbirth = prompt(Enum_js_1.detail.dateOfBirth);
                if (dateOfbirth.match(dateReg) == null) {
                    console.log("Please enter valid date ");
                    check = false;
                }
            } while (check == false);
            // input details for username
            do {
                check = true;
                var username = prompt(Enum_js_1.detail.username);
                var temp = Number(username);
                if (!(Number.isNaN(temp))) {
                    console.log("Please enter valid Input ");
                    check = false;
                }
            } while (check == false);
            // Intial  amount
            var amount = 0;
            // input details for password 
            var password = prompt(Enum_js_1.detail.password);
            // Auto generated Account number .
            var accountNo = Math.floor((Math.random() * 10000) + 1); // 4 Digit account number 
            // let set flag for authorization 
            var flag = true;
            // return the all input 
            return { name: name, age: age, contactNo: contactNo, email: email, dateOfbirth: dateOfbirth, accountNo: accountNo, username: username, password: password, amount: amount, flag: flag };
        };
        // Details of the customer 
        this.showDetails = function (userData) {
            var check;
            var no = 0;
            var userInputName;
            var userInputPass;
            check = true;
            while (check != false) {
                userInputName = prompt(Enum_js_1.detail.userInput);
                userInputPass = prompt(Enum_js_1.detail.userPass);
                for (var i = 0; i < userData.length; i++) {
                    if (userData[i].username == userInputName && userData[i].password == userInputPass) {
                        check = false;
                        no = i;
                    }
                }
            }
            if (check === false) {
                console.table(userData[no]);
            }
        };
    }
    return User;
}());
// Admin class for view user details , authorize to the user .  
var Admin = /** @class */ (function () {
    function Admin() {
    }
    Admin.prototype.userDetails = function () {
        var fss = require('fs');
        console.table(JSON.parse(fss.readFileSync('user.json')));
    };
    Admin.prototype.zeroBalanceHolder = function () {
        var fz = require('fs');
        var data = fz.readFileSync('user.json');
        var zero = JSON.parse(data);
        var zeroBalance = zero.filter(function (ele) {
            return ele.amount == 0;
        });
        console.table(zeroBalance);
    };
    Admin.prototype.one_Lakh_Holder = function () {
        var fz = require('fs');
        var data = fz.readFileSync('user.json');
        var zero = JSON.parse(data);
        var oneLakh = zero.filter(function (ele) {
            return ele.amount > 0 && ele.amount < 100000;
        });
        console.table(oneLakh);
    };
    Admin.prototype.more_Than_1lakh = function () {
        var fz = require('fs');
        var data = fz.readFileSync('user.json');
        var zero = JSON.parse(data);
        var more_than_oneLakh = zero.filter(function (ele) {
            return ele.amount >= 100000;
        });
        console.table(more_than_oneLakh);
    };
    Admin.prototype.deleteAccount = function () {
        var fz = require('fs');
        var data = fz.readFileSync('user.json');
        var zero = JSON.parse(data);
        var path = require('path');
        var removeAmount = function (zero, amount) {
            var requiredIndex = zero.findIndex(function (el) {
                return el.amount === Number(amount);
            });
            if (requiredIndex === -1) {
                return true;
            }
            ;
            return !!zero.splice(requiredIndex, 1);
        };
        removeAmount(zero, 0);
        fz.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(zero, null, 2));
        console.log("Account deleted Successfully");
    };
    Admin.prototype.isAuthenticate = function () {
        var fz = require('fs');
        var data = fz.readFileSync('user.json');
        var auth = JSON.parse(data);
        var path = require('path');
        for (var i = 0; i < auth.length; i++) {
            if (auth[i].amount === 0) {
                auth[i].flag = false;
                fz.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(auth, null, 2));
            }
            else {
                auth[i].flag = true;
                fz.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(auth, null, 2));
            }
        }
        console.log("All accounts authenticated successfully ");
    };
    Admin.prototype.authorizeUsers = function () {
        var fz = require('fs');
        var data = fz.readFileSync('user.json');
        var zero = JSON.parse(data);
        var authorizedUser = zero.filter(function (ele) {
            return ele.flag == true;
        });
        console.table(authorizedUser);
    };
    Admin.prototype.unauthorizeUsers = function () {
        var fz = require('fs');
        var data = fz.readFileSync('user.json');
        var zero = JSON.parse(data);
        var unauthorizedUser = zero.filter(function (ele) {
            return ele.flag == false;
        });
        console.table(unauthorizedUser);
    };
    return Admin;
}());
// Bank class  for the deposit , withdraw & show balance 
var Bank = /** @class */ (function () {
    function Bank() {
        this.withdraw = function (withdawId, fc) {
            var path = require('path');
            var userInputName = prompt(Enum_js_1.detail.userInput);
            var userInputPass = prompt(Enum_js_1.detail.userPass);
            for (var i = 0; i < withdawId.length; i++) {
                if (withdawId[i].username == userInputName && withdawId[i].password == userInputPass) {
                    var withDraw = parseInt(prompt(Enum_js_1.detail.withdraw));
                    if (withDraw < 1) {
                        console.log("Please enter valid amount");
                    }
                    else if (withDraw > withdawId[i].amount) {
                        console.log("Insufficient fund");
                    }
                    else {
                        console.log("The amount was withdrawn successfully.");
                        var balance = withdawId[i].amount - withDraw;
                        withdawId[i].amount = balance;
                        fc.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(withdawId, null, 2));
                        console.log("The remaining balance in your account is ".concat(balance));
                    }
                    break;
                }
            }
        };
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
                ff.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(depositId, null, 2));
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
                console.log("The amount in your account ".concat(viewBalance));
            }
        }
    };
    return Bank;
}());
console.log("Welcome to the bank management system. ");
var userDetails;
var initialAmount;
var input;
var adminResponse;
var user = new User();
var bank = new Bank();
var admin = new Admin();
do {
    var response = parseInt(prompt("Please choose  one option \n    1. User Class \n    2. Admin Class \n    "));
    console.clear();
    if (response === 1) {
        console.clear();
        console.log("******* User Login *****");
        var userResponse = parseInt(prompt("Please select  option :\n    \n     1. Create a New Account\n     2. Show Details \n     3. Deposit \n     4. Withdraw\n     5. View Balance\n     6. Exit\n\n     "));
        console.clear();
        switch (userResponse) {
            case 1:
                userDetails = user.createAccount();
                var fs = require('fs');
                var path = require('path');
                var exitingData = fs.readFileSync('user.json');
                var userDatas = JSON.parse(exitingData);
                userDatas.push(userDetails);
                fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(userDatas, null, 2));
                console.log("Account created successfully");
                break;
            case 2:
                var fss = require('fs');
                var rawdata = fss.readFileSync('user.json');
                var userData = JSON.parse(rawdata);
                user.showDetails(userData);
                break;
            case 3:
                var ff = require('fs');
                var depositFIle = ff.readFileSync('user.json');
                var depositId = JSON.parse(depositFIle);
                initialAmount = bank.deposit(depositId, ff);
                break;
            case 4:
                var fc = require('fs');
                var withdrawFile = fc.readFileSync('user.json');
                var withdrawId = JSON.parse(withdrawFile);
                bank.withdraw(withdrawId, fc);
                break;
            case 5:
                var fa = require('fs');
                var balanceFile = fa.readFileSync('user.json');
                var viewBalanceId = JSON.parse(balanceFile);
                bank.view_balance(viewBalanceId);
                break;
            default:
                break;
        }
    }
    else if (response === 2) {
        console.clear();
        console.log("******* Admin Login *****");
        var AC = require('fs');
        var adminFile = AC.readFileSync('admin.json');
        var adminDetailsId = JSON.parse(adminFile);
        var userInputName = prompt(Enum_js_1.detail.userInput);
        var userInputPass = prompt(Enum_js_1.detail.userPass);
        if (adminDetailsId[0].adminUserName == userInputName && adminDetailsId[0].adminPass == userInputPass) {
            console.log("Admin login successfully done");
            do {
                adminResponse = parseInt(prompt("Please choose option :\n\n     1. UserDetails \n     2. Rs.0 Balance Holder User\n     3. < 1L Amount holder User\n     4. > 1L Amount holder User\n     5. User Authentication\n     6. Authorized User  \n     7. Unauthorized User (\n     8. Delete Account\n     9.exit\n\n     "));
                console.clear();
                switch (adminResponse) {
                    case 1:
                        admin.userDetails();
                        break;
                    case 2:
                        admin.zeroBalanceHolder();
                        break;
                    case 3:
                        admin.one_Lakh_Holder();
                        break;
                    case 4:
                        admin.more_Than_1lakh();
                        break;
                    case 5:
                        admin.isAuthenticate();
                        break;
                    case 6:
                        admin.authorizeUsers();
                        break;
                    case 7:
                        admin.unauthorizeUsers();
                        break;
                    case 8:
                        admin.deleteAccount();
                    default:
                        break;
                }
            } while (adminResponse != 9);
        }
        else {
            console.log("Please enter valid input ");
        }
    }
} while (input != 6);
