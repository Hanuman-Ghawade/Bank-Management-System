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
        this.userDetails = function () {
            console.table(customerDetails);
        };
        this.accountHolderBasedOnAmount = function () {
            do {
                var response = parseInt(prompt(InputDetailEnum_1.detail.amountHolder));
                console.clear();
                switch (response) {
                    case 1:
                        var zeroBalanceData = customerDetails.filter(function (ele) {
                            return ele.amount == 0;
                        });
                        console.table(zeroBalanceData);
                        break;
                    case 2:
                        var oneLakh = customerDetails.filter(function (ele) {
                            return ele.amount > 0 && ele.amount < 100000;
                        });
                        console.table(oneLakh);
                        break;
                    case 3:
                        var more_than_oneLakh = customerDetails.filter(function (ele) {
                            return ele.amount >= 100000;
                        });
                        console.table(more_than_oneLakh);
                        break;
                    default:
                        break;
                }
            } while (response != 4);
        };
        this.savingAccount = function () {
            var authorizedUser = customerDetails.filter(function (ele) {
                return ele.accountType == InputDetailEnum_1.detail.savingAccount;
            });
            console.table(authorizedUser);
        };
        this.currentAccount = function () {
            var currentAccount = customerDetails.filter(function (ele) {
                return ele.accountType == InputDetailEnum_1.detail.currentAccount;
            });
            console.table(currentAccount);
        };
        this.approveLoan = function () {
            console.log("The loan was approved successfully..");
            var ViewBalanceQuery = "SELECT amount , loantaken FROM user";
            db.all(ViewBalanceQuery, [], function (err, rows) {
                if (err)
                    return console.log(err.message);
                rows.forEach(function (row) {
                    var userBalanceAmount = row.amount;
                    var userLoanAmount = row.loanTaken;
                    var totalUserAmount = userBalanceAmount + userLoanAmount;
                    console.log(totalUserAmount);
                    var ViewBalanceQuery = "SELECT amount , loanTaken FROM user";
                    db.all(ViewBalanceQuery, [], function (err, rows) {
                        if (err)
                            return console.log(err.message);
                        rows.forEach(function (row) {
                            var userBalanceAmount = row.amount;
                            var userLoanAmount = row.loanTaken;
                            var totalUserAmount = userBalanceAmount + userLoanAmount;
                            console.log(totalUserAmount);
                            var updateQuery = "UPDATE user\n                               SET amount = '".concat(totalUserAmount, "'\n                               WHERE loanApplied = 1 ");
                            console.log("loan update");
                            db.run(updateQuery, function (err) {
                                if (err) {
                                    return console.error(err.message);
                                }
                                console.log("The loan was approved successfully..");
                            });
                        });
                    });
                });
            });
        };
        this.loanHolder = function () {
            var loanUser = customerDetails.filter(function (ele) {
                return ele.loanAmount > 0;
            });
            console.table(loanUser);
        };
        this.bankAmount = function () {
            var BankCash = 0;
            var LoanCash = 0;
            var count = 0;
            for (var i = 0; i < customerDetails.length; i++) {
                BankCash += customerDetails[i].amount;
                LoanCash += customerDetails[i].loanAmount;
                count++;
            }
            console.log("The total amount in your bank is  Rs.".concat(BankCash, "."));
            console.log("The total amount lent to the customer is Rs.".concat(LoanCash, "."));
            console.log(" The total number of customers is ".concat(count, "."));
        };
    }
    return Admin;
}());
exports.Admin = Admin;
