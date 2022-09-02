"use strict";
exports.__esModule = true;
exports.Admin = exports.adminDetails = exports.customerDetails = exports.path = exports.fs = void 0;
var InputDetailEnum_1 = require("../../Constants/InputDetailEnum");
var sqlite3 = require(InputDetailEnum_1.detail.sqlite).verbose();
var db = new sqlite3.Database(InputDetailEnum_1.detail.database);
var ps = require(InputDetailEnum_1.detail.prompt);
var prompt = ps();
var fs = require(InputDetailEnum_1.detail.fs);
exports.fs = fs;
var path = require(InputDetailEnum_1.detail.path);
exports.path = path;
var customerData = fs.readFileSync(InputDetailEnum_1.detail.userDB);
var customerDetails = JSON.parse(customerData);
exports.customerDetails = customerDetails;
var adminData = fs.readFileSync(InputDetailEnum_1.detail.adminDB);
var adminDetails = JSON.parse(adminData);
exports.adminDetails = adminDetails;
var Admin = /** @class */ (function () {
    function Admin() {
        this.customerDetails = function () {
            var userDetailsQuery = "SELECT * FROM user ";
            db.all(userDetailsQuery, [], function (err, rows) {
                if (err)
                    return console.log(err.message);
                rows.forEach(function (row) {
                    console.log(" Name : ".concat(row.Name, ", Age : ").concat(row.Age, ", Mobile Number : ").concat(row.mobileNumber, ", Balance : Rs.").concat(row.amount, ", Loan Amount : Rs.").concat(row.loanAmount));
                });
            });
        };
        this.deactivateAccount = function (accountNumber) {
            var deleteAccountQuery = "SELECT username, password FROM user WHERE accountNo = '".concat(accountNumber, "' ");
            db.all(deleteAccountQuery, [], function (err, rows) {
                if (err)
                    return console.log(err.message);
                if (rows.length == 0) {
                    console.log("Invalid account number");
                }
                rows.forEach(function (row) {
                    console.log("".concat(accountNumber, " account number successfully deleted."));
                });
            });
        };
        this.savingAccount = function () {
            var savingAccountQuery = "SELECT * FROM user WHERE accountType = 'Saving'";
            db.all(savingAccountQuery, [], function (err, rows) {
                if (err)
                    return console.log(err.message);
                rows.forEach(function (row) {
                    console.log(" Name : ".concat(row.Name, ", Age : ").concat(row.Age, ", Mobile Number : ").concat(row.mobileNumber, ", Amount : ").concat(row.amount));
                });
            });
        };
        this.currentAccount = function () {
            var currentAccountQuery = "SELECT * FROM user WHERE accountType = 'Current'";
            db.all(currentAccountQuery, [], function (err, rows) {
                if (err)
                    return console.log(err.message);
                rows.forEach(function (row) {
                    console.log(" Name : ".concat(row.Name, ", Age : ").concat(row.Age, ", Mobile Number : ").concat(row.mobileNumber, ",  Amount : Rs.").concat(row.amount));
                });
            });
        };
        this.approveLoan = function () {
            var totalUserAmount;
            var CustomerAccountNumber = prompt(InputDetailEnum_1.detail.accountNumber);
            var ViewBalanceQuery = "SELECT amount , loanTaken FROM user WHERE accountNo = ".concat(CustomerAccountNumber);
            db.all(ViewBalanceQuery, [], function (err, rows) {
                if (err)
                    return console.log(err.message);
                rows.forEach(function (row) {
                    var userBalanceAmount = row.amount;
                    var userLoanAmount = row.loanTaken;
                    totalUserAmount = userBalanceAmount + userLoanAmount;
                });
                var updateLoanQuery = "UPDATE user\n                               SET amount = '".concat(totalUserAmount, "', loanTaken = 0,loanApplied = 0\n                               WHERE accountNo = ").concat(CustomerAccountNumber);
                db.run(updateLoanQuery, function (err) {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log("The loan was approved successfully..");
                });
            });
        };
        this.loanHolder = function () {
            var userDetailsQuery = "SELECT * FROM user WHERE loanAmount > 0";
            db.all(userDetailsQuery, [], function (err, rows) {
                if (err)
                    return console.log(err.message);
                rows.forEach(function (row) {
                    console.log(" Name : ".concat(row.Name, ", Age : ").concat(row.Age, ", Mobile Number : ").concat(row.mobileNumber, ",  Loan Amount : Rs.").concat(row.loanAmount));
                });
            });
        };
        this.bankAmount = function () {
            var bankCash = 0;
            var loanCash = 0;
            var count = 0;
            var userDetailsQuery = "SELECT * FROM user";
            db.all(userDetailsQuery, [], function (err, rows) {
                if (err)
                    return console.log(err.message);
                rows.forEach(function (row) {
                    bankCash += row.amount;
                    loanCash += row.loanAmount;
                    count++;
                });
                console.log("The total amount in your bank is  Rs.".concat(bankCash, "."));
                console.log("The total amount lent to the customer is Rs.".concat(loanCash, "."));
                console.log("The total number of customers is ".concat(count, "."));
            });
        };
    }
    return Admin;
}());
exports.Admin = Admin;
