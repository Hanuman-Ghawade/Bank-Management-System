"use strict";
exports.__esModule = true;
exports.Bank = exports.adminDetails = exports.customerDetails = exports.path = exports.fs = void 0;
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
// Bank class  for the deposit , withdraw & show balance 
var Bank = /** @class */ (function () {
    function Bank() {
    }
    Bank.prototype.deposit = function () {
        var balanceAmount;
        var totalBalance;
        var userInputName = prompt(InputDetailEnum_1.detail.userInput);
        var userInputPass = prompt(InputDetailEnum_1.detail.userPass);
        var sqlOne = "SELECT * FROM user WHERE username = '".concat(userInputName, "' AND password = '").concat(userInputPass, "'");
        db.all(sqlOne, [], function (err, rows) {
            if (err)
                return console.log(err.message);
            if (rows.length == 0) {
                console.log("Invalid username or password");
            }
            rows.forEach(function (row) {
                balanceAmount = row.amount;
                var deposit = Number(parseInt(prompt(InputDetailEnum_1.detail.deposit)));
                totalBalance = balanceAmount + deposit;
                var updateQuery = "UPDATE user\n                               SET amount = ".concat(totalBalance, "\n                               WHERE username = '").concat(userInputName, "'");
                db.run(updateQuery, function (err) {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log(" The funds have been successfully deposited into your account.");
                    console.log("Updated balance is ".concat(totalBalance));
                });
            });
        });
    };
    Bank.prototype.withdraw = function () {
        var balanceAmount;
        var totalBalance;
        var userInputName = prompt(InputDetailEnum_1.detail.userInput);
        var userInputPass = prompt(InputDetailEnum_1.detail.userPass);
        var sqlOne = "SELECT * FROM user WHERE username = '".concat(userInputName, "' AND password = '").concat(userInputPass, "'");
        db.all(sqlOne, [], function (err, rows) {
            if (err)
                return console.log(err.message);
            if (rows.length == 0) {
                console.log("Invalid username or password");
            }
            rows.forEach(function (row) {
                balanceAmount = row.amount;
                var withdrawAmount = Number(parseInt(prompt(InputDetailEnum_1.detail.withdraw)));
                if (withdrawAmount > balanceAmount) {
                    console.log("Insufficient funds");
                }
                else {
                    totalBalance = balanceAmount - withdrawAmount;
                    var updateQuery = "UPDATE user\n                               SET amount = ".concat(totalBalance, "\n                               WHERE username = '").concat(userInputName, "'");
                    db.run(updateQuery, function (err) {
                        if (err) {
                            return console.error(err.message);
                        }
                        console.log(" The funds have been successfully deposited into your account.");
                        console.log("Updated balance is ".concat(totalBalance));
                    });
                }
            });
        });
    };
    Bank.prototype.viewBalance = function () {
        var userInputName = prompt(InputDetailEnum_1.detail.userInput);
        var userInputPass = prompt(InputDetailEnum_1.detail.userPass);
        for (var i = 0; i < customerDetails.length; i++) {
            if (customerDetails[i].username == userInputName && customerDetails[i].password == userInputPass) {
                var viewBalance = customerDetails[i].amount;
                console.log("The amount in your account ".concat(viewBalance));
            }
        }
    };
    Bank.prototype.loanSection = function () {
        var loanResponse;
        var userInputName = prompt(InputDetailEnum_1.detail.userInput);
        var userInputPass = prompt(InputDetailEnum_1.detail.userPass);
        do {
            loanResponse = parseInt(prompt(InputDetailEnum_1.detail.loanSection));
            console.clear();
            var check = void 0;
            switch (loanResponse) {
                case 1:
                    console.log(" *** Loan Application  *** ");
                    do {
                        check = true;
                        for (var i = 0; i < customerDetails.length; i++) {
                            if (customerDetails[i].username == userInputName && customerDetails[i].password == userInputPass) {
                                var loanBalance = Number(parseInt(prompt(InputDetailEnum_1.detail.loanAmount)));
                                if (customerDetails[i].loanApplied == true) {
                                    console.log(" Your previous loan was not approved.");
                                }
                                else if (Number.isNaN(loanBalance) || loanBalance < 1) {
                                    console.log("Please enter valid amount");
                                    check = false;
                                }
                                else if (customerDetails[i].loanApplicable == false) {
                                    console.log(" Your loan limit has exceeded.");
                                }
                                else if (customerDetails[i].loanLimit < loanBalance) {
                                    console.log("You have entered an amount that is greater than the loan limit.");
                                    check = false;
                                }
                                else {
                                    customerDetails[i].loanAmount += loanBalance;
                                    customerDetails[i].loanTaken += loanBalance;
                                    customerDetails[i].loanLimit = customerDetails[i].loanLimit - loanBalance;
                                    customerDetails[i].loanApplied = true;
                                    fs.writeFileSync(path.resolve(__dirname, InputDetailEnum_1.detail.bankDB), JSON.stringify(customerDetails, null, 2));
                                    console.log("You successfully applied for a loan.");
                                    if (customerDetails[i].loanLimit < 1) {
                                        customerDetails[i].loanApplicable = false;
                                        fs.writeFileSync(path.resolve(__dirname, InputDetailEnum_1.detail.bankDB), JSON.stringify(customerDetails, null, 2));
                                    }
                                    else {
                                        customerDetails[i].loanApplicable = true;
                                        fs.writeFileSync(path.resolve(__dirname, InputDetailEnum_1.detail.bankDB), JSON.stringify(customerDetails, null, 2));
                                    }
                                }
                            }
                        }
                    } while (check == false);
                    break;
                case 2:
                    console.log("  *** Loan Status *** ");
                    for (var i = 0; i < customerDetails.length; i++) {
                        if (customerDetails[i].username == userInputName && customerDetails[i].password == userInputPass) {
                            if (customerDetails[i].loanApplied == true) {
                                console.log("Your loan is not approved. ");
                            }
                            else {
                                console.log("Your loan is approved ");
                            }
                        }
                    }
                    break;
                case 3:
                    console.log(" *** Pay Loan *** ");
                    do {
                        check = true;
                        for (var i = 0; i < customerDetails.length; i++) {
                            if (customerDetails[i].username == userInputName && customerDetails[i].password == userInputPass) {
                                var paidAmount = Number(parseInt(prompt(InputDetailEnum_1.detail.loanAmount)));
                                if (Number.isNaN(paidAmount) || paidAmount < 1) {
                                    console.log("Please enter valid amount");
                                    check = false;
                                }
                                else if (customerDetails[i].loanAmount < paidAmount) {
                                    console.log("You are entering an amount greater than the loan amount.");
                                }
                                else {
                                    console.log("You successfully paid the loan.");
                                    customerDetails[i].loanAmount -= paidAmount;
                                    customerDetails[i].loanLimit += paidAmount;
                                    fs.writeFileSync(path.resolve(__dirname, InputDetailEnum_1.detail.bankDB), JSON.stringify(customerDetails, null, 2));
                                    if (customerDetails[i].loanLimit > 0) {
                                        customerDetails[i].loanApplicable = true;
                                        fs.writeFileSync(path.resolve(__dirname, InputDetailEnum_1.detail.bankDB), JSON.stringify(customerDetails, null, 2));
                                    }
                                }
                            }
                        }
                    } while (check == false);
                    break;
                case 4:
                    console.log("  *** Your loan amount *** ");
                    for (var i = 0; i < customerDetails.length; i++) {
                        if (customerDetails[i].username == userInputName && customerDetails[i].password == userInputPass) {
                            var viewBalance = customerDetails[i].loanAmount;
                            console.log("You have taken a Rs.".concat(viewBalance, " loan from the bank"));
                        }
                    }
                    break;
                default:
                    break;
            }
        } while (loanResponse != 5);
    };
    Bank.prototype.moneyTransfer = function () {
        var userInputName = prompt(InputDetailEnum_1.detail.userInput);
        var userInputPass = prompt(InputDetailEnum_1.detail.userPass);
        for (var i = 0; i < customerDetails.length; i++) {
            if (customerDetails[i].username == userInputName && customerDetails[i].password == userInputPass) {
                var transferAmount = parseInt(prompt(InputDetailEnum_1.detail.moneyTransfer));
                var receiverAccountNumber = parseInt(prompt(InputDetailEnum_1.detail.receiverAccountNo));
                if (!transferAmount || !receiverAccountNumber || receiverAccountNumber.toString().length != 4 || transferAmount < 1) {
                    console.log("Please enter valid input");
                }
                else if (transferAmount > customerDetails[i].amount) {
                    console.log("Your account has insufficient balance.");
                }
                else {
                    for (var i_1 = 0; i_1 < customerDetails.length; i_1++) {
                        if (customerDetails[i_1].accountNo === receiverAccountNumber) {
                            customerDetails[i_1].amount += transferAmount;
                            fs.writeFileSync(path.resolve(__dirname, InputDetailEnum_1.detail.bankDB), JSON.stringify(customerDetails, null, 2));
                            console.log("The money was transferred successfully.");
                            if (customerDetails[i_1].amount > 100000) {
                                customerDetails[i_1].accountType = InputDetailEnum_1.detail.currentAccount;
                                fs.writeFileSync(path.resolve(__dirname, InputDetailEnum_1.detail.bankDB), JSON.stringify(customerDetails, null, 2));
                            }
                        }
                    }
                    customerDetails[i].amount = customerDetails[i].amount - transferAmount;
                    fs.writeFileSync(path.resolve(__dirname, InputDetailEnum_1.detail.bankDB), JSON.stringify(customerDetails, null, 2));
                    if (customerDetails[i].amount <= 100000) {
                        customerDetails[i].accountType = InputDetailEnum_1.detail.savingAccount;
                        fs.writeFileSync(path.resolve(__dirname, InputDetailEnum_1.detail.bankDB), JSON.stringify(customerDetails, null, 2));
                    }
                }
            }
        }
    };
    return Bank;
}());
exports.Bank = Bank;
