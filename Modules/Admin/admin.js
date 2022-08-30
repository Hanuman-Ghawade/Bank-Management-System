"use strict";
exports.__esModule = true;
exports.Admin = exports.adminDetails = exports.customerDetails = exports.path = exports.fs = void 0;
var InputDetailEnum_1 = require("../../Constants/InputDetailEnum");
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
    }
    Admin.prototype.userDetails = function () {
        console.table(customerDetails);
    };
    Admin.prototype.accountHolderBasedOnAmount = function () {
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
    Admin.prototype.savingAccount = function () {
        var authorizedUser = customerDetails.filter(function (ele) {
            return ele.accountType == InputDetailEnum_1.detail.savingAccount;
        });
        console.table(authorizedUser);
    };
    Admin.prototype.currentAccount = function () {
        var currentAccount = customerDetails.filter(function (ele) {
            return ele.accountType == InputDetailEnum_1.detail.currentAccount;
        });
        console.table(currentAccount);
    };
    Admin.prototype.approveLoan = function () {
        for (var i = 0; i < customerDetails.length; i++) {
            if (customerDetails[i].loanApplied == true) {
                customerDetails[i].loanApplied = false;
                customerDetails[i].amount += customerDetails[i].loanTaken;
                customerDetails[i].loanTaken = 0;
                fs.writeFileSync(path.resolve(__dirname, InputDetailEnum_1.detail.bankDB), JSON.stringify(customerDetails, null, 2));
                if (customerDetails[i].amount > 100000) {
                    customerDetails[i].accountType = InputDetailEnum_1.detail.currentAccount;
                    fs.writeFileSync(path.resolve(__dirname, InputDetailEnum_1.detail.bankDB), JSON.stringify(customerDetails, null, 2));
                }
            }
        }
        console.log("The loan was approved successfully.");
    };
    Admin.prototype.loanHolder = function () {
        var loanUser = customerDetails.filter(function (ele) {
            return ele.loanAmount > 0;
        });
        console.table(loanUser);
    };
    Admin.prototype.bankAmount = function () {
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
    return Admin;
}());
exports.Admin = Admin;
