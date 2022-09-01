"use strict";
exports.__esModule = true;
exports.Bank = void 0;
var InputDetailEnum_1 = require("../../Constants/InputDetailEnum");
var sqlite3 = require(InputDetailEnum_1.detail.sqlite).verbose();
var db = new sqlite3.Database(InputDetailEnum_1.detail.database);
var ps = require(InputDetailEnum_1.detail.prompt);
var prompt = ps();
var Bank = /** @class */ (function () {
    function Bank() {
        this.deposit = function () {
            var balanceAmount;
            var totalBalance;
            var userInputName = prompt(InputDetailEnum_1.detail.userInput);
            var userInputPass = prompt(InputDetailEnum_1.detail.userPass);
            var depositQuery = "SELECT * FROM user WHERE username = '".concat(userInputName, "' AND password = '").concat(userInputPass, "'");
            db.all(depositQuery, [], function (err, rows) {
                if (err)
                    return console.log(err.message);
                if (rows.length == 0) {
                    console.log("Invalid username or password");
                }
                rows.forEach(function (row) {
                    balanceAmount = row.amount;
                    do {
                        var deposit = Number(parseInt(prompt(InputDetailEnum_1.detail.deposit)));
                        if ((Number.isNaN(deposit)) || deposit < 1) {
                            console.log("Please enter valid amount");
                        }
                    } while ((Number.isNaN(deposit)) || deposit < 1);
                    totalBalance = balanceAmount + deposit;
                    var updateDepositQuery = "UPDATE user\n                               SET amount = ".concat(totalBalance, "\n                               WHERE username = '").concat(userInputName, "'");
                    db.run(updateDepositQuery, function (err) {
                        if (err) {
                            return console.error(err.message);
                        }
                        console.log("The funds have been successfully deposited into your account.");
                        console.log("Updated balance in your account is ".concat(totalBalance));
                    });
                });
            });
        };
        this.withdraw = function () {
            var balanceAmount;
            var totalBalance;
            var userInputName = prompt(InputDetailEnum_1.detail.userInput);
            var userInputPass = prompt(InputDetailEnum_1.detail.userPass);
            var withdrawQuery = "SELECT * FROM user WHERE username = '".concat(userInputName, "' AND password = '").concat(userInputPass, "'");
            db.all(withdrawQuery, [], function (err, rows) {
                if (err)
                    return console.log(err.message);
                if (rows.length == 0) {
                    console.log("Invalid username or password");
                }
                rows.forEach(function (row) {
                    balanceAmount = row.amount;
                    do {
                        var withdrawAmount = Number(parseInt(prompt(InputDetailEnum_1.detail.withdraw)));
                        if ((Number.isNaN(withdrawAmount)) || withdrawAmount < 1) {
                            console.log("Please enter valid amount");
                        }
                    } while ((Number.isNaN(withdrawAmount)) || withdrawAmount < 1);
                    if (withdrawAmount > balanceAmount) {
                        console.log("Insufficient funds");
                    }
                    else {
                        totalBalance = balanceAmount - withdrawAmount;
                        var withdrawBalanceQuery = "UPDATE user\n                               SET amount = ".concat(totalBalance, "\n                               WHERE username = '").concat(userInputName, "'");
                        db.run(withdrawBalanceQuery, function (err) {
                            if (err) {
                                return console.error(err.message);
                            }
                            console.log(" The funds have been successfully withdrawn from your account.");
                            console.log("The remaining balance in your account is ".concat(totalBalance));
                        });
                    }
                });
            });
        };
        this.viewBalance = function () {
            var userInputName = prompt(InputDetailEnum_1.detail.userInput);
            var userInputPass = prompt(InputDetailEnum_1.detail.userPass);
            var ViewBalanceQuery = "SELECT * FROM user WHERE username = '".concat(userInputName, "' AND password = '").concat(userInputPass, "'");
            db.all(ViewBalanceQuery, [], function (err, rows) {
                if (err)
                    return console.log(err.message);
                if (rows.length == 0) {
                    console.log("Invalid username or password");
                }
                rows.forEach(function (row) {
                    console.log("Available balance in your account is ".concat(row.amount));
                });
            });
        };
        this.loanSection = function () {
            var userInputName = prompt(InputDetailEnum_1.detail.userInput);
            var userInputPass = prompt(InputDetailEnum_1.detail.userPass);
            var loanQuery = "SELECT * FROM user WHERE username = '".concat(userInputName, "' AND password = '").concat(userInputPass, "'");
            db.all(loanQuery, [], function (err, rows) {
                if (err)
                    return console.log(err.message);
                if (rows.length == 0) {
                    console.log("Invalid username or password");
                }
                rows.forEach(function (row) {
                    var loanResponse = parseInt((prompt(InputDetailEnum_1.detail.loanSection)));
                    switch (loanResponse) {
                        case 1:
                            // checking the loan availability 
                            do {
                                var loanBalance = parseInt(prompt(InputDetailEnum_1.detail.loanAmount));
                                if ((Number.isNaN(loanBalance)) || loanBalance < 1) {
                                    console.log("Please enter valid amount");
                                }
                            } while ((Number.isNaN(loanBalance)) || loanBalance < 1);
                            // Query for checking loan status 
                            var loanApplicableQuery = "SELECT * FROM user WHERE username = '".concat(userInputName, "' AND loanApplied = '1' ");
                            db.all(loanApplicableQuery, [], function (err, rows) {
                                if (err)
                                    return console.log(err.message);
                                console.log("Your loan is not approved");
                                // query for check previous loan amount
                                var loanAmountQuery = "SELECT * FROM user WHERE username = '".concat(userInputName, "' AND password = '").concat(userInputPass, "'");
                                db.all(loanAmountQuery, [], function (err, rows) {
                                    if (err)
                                        return console.log(err.message);
                                    rows.forEach(function (row) {
                                        var loanTakenAmount = row.loanAmount;
                                        var totalLoanTaken = loanBalance + loanTakenAmount;
                                        // loan amount updating in loan amount column
                                        var LoanApplyQuery = "UPDATE user\n                                   SET loanAmount = ".concat(totalLoanTaken, " ,loanTaken = ").concat(loanBalance, "\n                                   WHERE username = '").concat(userInputName, "'");
                                        db.run(LoanApplyQuery, function (err) {
                                            if (err) {
                                                return console.error(err.message);
                                            }
                                            console.log("You successfully applied for a loan.");
                                        });
                                        // loan applied become true 
                                        var loanAppliedQuery = "UPDATE user\n                               SET \tloanApplied = '".concat(1, "'\n                               WHERE username = '").concat(userInputName, "'");
                                        db.run(loanAppliedQuery, function (err) {
                                            if (err) {
                                                return console.error(err.message);
                                            }
                                        });
                                    });
                                });
                            });
                        case 2:
                            var loanAmountQuery = "SELECT * FROM user WHERE username = '".concat(userInputName, "' AND password = '").concat(userInputPass, "' AND loanApplied = '1' ");
                            db.all(loanAmountQuery, [], function (err, rows) {
                                if (err)
                                    return console.log(err.message);
                                rows.forEach(function (row) {
                                    console.log("Your loan is not approved");
                                });
                            });
                    }
                });
            });
        };
        this.moneyTransfer = function () {
            var userInputName = prompt(InputDetailEnum_1.detail.userInput);
            var userInputPass = prompt(InputDetailEnum_1.detail.userPass);
            var balanceAmount;
            // Query for user authentication
            var sqlOne = "SELECT * FROM user WHERE username = '".concat(userInputName, "' AND password = '").concat(userInputPass, "'");
            db.all(sqlOne, [], function (err, rows) {
                if (err)
                    return console.log(err.message);
                if (rows.length == 0) {
                    console.log("Invalid username or password");
                }
                rows.forEach(function (row) {
                    balanceAmount = row.amount;
                    var transferAmount = Number(parseInt(prompt(InputDetailEnum_1.detail.moneyTransfer)));
                    var receiverAccountNumber = Number(parseInt(prompt(InputDetailEnum_1.detail.receiverAccountNo)));
                    if (transferAmount > balanceAmount) {
                        console.log("Insufficient funds to transfer");
                    }
                    else {
                        // Query for updated sender balance amount 
                        var balanceAfterTransfer_1 = balanceAmount - transferAmount;
                        var transferQuery = "UPDATE user\n                               SET amount = ".concat(balanceAfterTransfer_1, "\n                               WHERE username = '").concat(userInputName, "'");
                        db.run(transferQuery, function (err) {
                            if (err) {
                                return console.error(err.message);
                            }
                        });
                        // Query for check receiver's account balance
                        var receiverBalance;
                        var receiverQuery = "SELECT * FROM user WHERE accountNo = '".concat(receiverAccountNumber, "'");
                        db.all(receiverQuery, [], function (err, rows) {
                            if (err)
                                return console.log(err.message);
                            rows.forEach(function (row) {
                                receiverBalance = row.amount;
                                var totalBalance = transferAmount + receiverBalance;
                                // Update the receiver's account balance
                                var updateQuery = "UPDATE user\n                               SET amount = ".concat(totalBalance, "\n                               WHERE accountNo = '").concat(receiverAccountNumber, "'");
                                db.run(updateQuery, function (err) {
                                    if (err) {
                                        return console.error(err.message);
                                    }
                                    console.log("The amount was successfully transferred to the receiver account.");
                                    console.log("The remaining balance in your account is ".concat(balanceAfterTransfer_1));
                                });
                            });
                        });
                    }
                });
            });
        };
    }
    return Bank;
}());
exports.Bank = Bank;
