"use strict";
exports.__esModule = true;
exports.userInputPass = exports.userInputName = void 0;
var InputDetailEnum_1 = require("./Constants/InputDetailEnum");
var user_js_1 = require("./Modules/User/user.js");
var admin_js_1 = require("./Modules/Admin/admin.js");
var bank_js_1 = require("./Modules/Bank/bank.js");
var database_1 = require("./DB/database");
var sqlite3 = require(InputDetailEnum_1.detail.sqlite).verbose();
var db = new sqlite3.Database(InputDetailEnum_1.detail.database);
var database = new database_1.Data();
// Banking management system  Project
var ps = require(InputDetailEnum_1.detail.prompt);
var prompt = ps();
console.log(" ****** Welcome to the bank management system.****** ");
var user = new user_js_1.User();
var bank = new bank_js_1.Bank();
var admin = new admin_js_1.Admin();
// do {
var response = parseInt(prompt(InputDetailEnum_1.detail.bankLogin));
console.clear();
if (response === 1) {
    console.log("New account registration form");
    var users = user.createAccount();
    bank.insertData(users);
    console.log("Account has been successfully registered. ");
}
if (response === 2) {
    console.log("******* User Login *****");
    exports.userInputName = prompt(InputDetailEnum_1.detail.userInput);
    exports.userInputPass = prompt(InputDetailEnum_1.detail.userPass);
    //    do {
    var userResponse = parseInt(prompt(InputDetailEnum_1.detail.userLogin));
    console.clear();
    switch (userResponse) {
        case 1:
            console.log("**** Customers Details ****");
            bank.accessData();
            break;
        case 2:
            console.log("**** Deposit Amount ****");
            bank.deposit();
            break;
        case 3:
            console.log("**** Withdraw Amount ****");
            bank.withdraw();
            break;
        case 4:
            console.log("**** View Balance ****");
            bank.viewBalance();
            break;
        case 5:
            console.log("**** Loan Section ****");
            bank.loanSection();
            break;
        case 6:
            console.log("**** Money Transfer ****");
            bank.moneyTransfer();
        default:
            break;
    }
    // } while (userResponse != 7);
}
else if (response === 3) {
    console.clear();
    console.log("******* Admin Login *****");
    var adminInputName = prompt(InputDetailEnum_1.detail.userInput);
    var adminInputPass = prompt(InputDetailEnum_1.detail.userPass);
    var depositQuery = "SELECT username , password FROM admin WHERE username = '".concat(adminInputName, "' AND password = '").concat(adminInputPass, "'");
    db.all(depositQuery, [], function (err, rows) {
        if (err)
            return console.log(err.message);
        if (rows.length == 0) {
            "";
            console.log("Invalid username or password");
        }
        rows.forEach(function (row) {
            console.clear();
            console.log("Admin login successfully done");
            console.clear();
            do {
                var adminResponse = parseInt(prompt(InputDetailEnum_1.detail.adminLogin));
                console.clear();
                switch (adminResponse) {
                    case 1:
                        console.clear();
                        console.log(" *** All customers details. ***");
                        admin.customerDetails();
                        break;
                    case 2:
                        console.clear();
                        console.log(" *** Account Deactivation ***");
                        var account_number = prompt(InputDetailEnum_1.detail.deactivateAccountNumber);
                        admin.deactivateAccount(account_number);
                        break;
                    case 3:
                        console.clear();
                        console.log("*** The number of people who have a savings account. ***");
                        admin.savingAccount();
                        break;
                    case 4:
                        console.clear();
                        console.log("*** The number of people who have a current account. *** ");
                        admin.currentAccount();
                        break;
                    case 5:
                        console.clear();
                        console.log("*** Loan approve  *** ");
                        admin.approveLoan();
                        break;
                    case 6:
                        console.clear();
                        console.log("*** Loan Holder *** ");
                        admin.loanHolder();
                        break;
                    case 7:
                        console.clear();
                        console.log("*** Total bank statement *** ");
                        admin.bankAmount();
                        break;
                    default:
                        console.clear();
                        break;
                }
            } while (adminResponse != 8);
        });
    });
}
else if (response === 4) {
    process.exit(1);
}
// } while (response != 8);
