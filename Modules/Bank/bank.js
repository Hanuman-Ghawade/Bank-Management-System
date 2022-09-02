"use strict";
exports.__esModule = true;
exports.Bank = void 0;
var InputDetailEnum_1 = require("../../Constants/InputDetailEnum");
var bank_1 = require("../../bank");
var sqlite3 = require(InputDetailEnum_1.detail.sqlite).verbose();
var db = new sqlite3.Database(InputDetailEnum_1.detail.database);
var ps = require(InputDetailEnum_1.detail.prompt);
var prompt = ps();
var Bank = /** @class */ (function () {
    function Bank() {
        this.insertData = function (users) {
            var insertQuery = db.prepare(InputDetailEnum_1.detail.insertDataQuery);
            // insertQuery.run("Admin",25,9503034025,"admin@gmail.com","10-06-2000","admin","admin")
            insertQuery.run(users.name, users.age, users.mobileNumber, users.email, users.birth, users.accountNo, users.accountType, users.username, users.password, users.amount, users.loanApplicable, users.loanTaken, users.loanAmount, users.loanLimit, users.loanApplied);
            console.log("Data inserted successfully...");
            insertQuery.finalize();
            db.close();
        };
        this.deposit = function () {
            var balanceAmount;
            var totalBalance;
            var depositQuery = "SELECT * FROM user WHERE username = '".concat(bank_1.userInputName, "' AND password = '").concat(bank_1.userInputPass, "'");
            db.all(depositQuery, [], function (err, rows) {
                if (err)
                    return console.log(err.message);
                if (rows.length == 0) {
                    "";
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
                    var updateDepositQuery = "UPDATE user\n                               SET amount = ".concat(totalBalance, "\n                               WHERE username = '").concat(bank_1.userInputName, "' AND password = '").concat(bank_1.userInputPass, "'");
                    db.run(updateDepositQuery, function (err) {
                        if (err) {
                            return console.error(err.message);
                        }
                        console.log("The funds have been successfully deposited into your account.");
                        console.log("Updated balance in your account is ".concat(totalBalance));
                    });
                    var accountTypeQuery = "UPDATE user\n                               SET accountType = \"Current\"\n                               WHERE username = '".concat(bank_1.userInputName, "' AND password = '").concat(bank_1.userInputPass, "' AND amount > 100000");
                    db.run(accountTypeQuery, function (err) {
                        if (err) {
                            return console.error(err.message);
                        }
                        rows.forEach(function (row) {
                        });
                    });
                });
            });
        };
        this.withdraw = function () {
            var balanceAmount;
            var totalBalance;
            var withdrawQuery = "SELECT * FROM user WHERE username = '".concat(bank_1.userInputName, "' AND password = '").concat(bank_1.userInputPass, "'");
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
                        var withdrawBalanceQuery = "UPDATE user\n                               SET amount = ".concat(totalBalance, "\n                               WHERE username = '").concat(bank_1.userInputName, "' AND password = '").concat(bank_1.userInputPass, "'");
                        db.run(withdrawBalanceQuery, function (err) {
                            if (err) {
                                return console.error(err.message);
                            }
                            console.log(" The funds have been successfully withdrawn from your account.");
                            console.log("The remaining balance in your account is ".concat(totalBalance));
                        });
                        // Account type checking
                        var accountTypeQuery = "UPDATE user\n                               SET accountType = \"Saving\"\n                               WHERE username = '".concat(bank_1.userInputName, "' AND password = '").concat(bank_1.userInputPass, "' AND amount <= 100000");
                        db.run(accountTypeQuery, function (err) {
                            if (err) {
                                return console.error(err.message);
                            }
                            rows.forEach(function (row) {
                            });
                        });
                    }
                });
            });
        };
        this.viewBalance = function () {
            var ViewBalanceQuery = "SELECT * FROM user WHERE username = '".concat(bank_1.userInputName, "' AND password = '").concat(bank_1.userInputPass, "'");
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
        this.accessData = function () {
            var check;
            var _loop_1 = function () {
                var check_1 = true;
                var selectQuery = "SELECT * FROM user WHERE username = '".concat(bank_1.userInputName, "' AND password = '").concat(bank_1.userInputPass, "'");
                db.all(selectQuery, [], function (err, rows) {
                    if (err)
                        return console.log(err.message);
                    if (rows.length == 0) {
                        console.log("Invalid username or password");
                        check_1 = false;
                    }
                    rows.forEach(function (row) {
                        console.table("\n                         Name: ".concat(row.Name, " ,\n                         Mobile Number : ").concat(row.mobileNumber, ", \n                         Email : ").concat(row.email, ",\n                         Account Number : ").concat(row.accountNo, ",\n                         Balance Amount : Rs.").concat(row.amount, ",\n                         Loan Amount : Rs.").concat(row.loanAmount, "\n                         "));
                    });
                });
            };
            do {
                _loop_1();
            } while (check == false);
        };
        this.loanSection = function () {
            var loanQuery = "SELECT * FROM user WHERE username = '".concat(bank_1.userInputName, "' AND password = '").concat(bank_1.userInputPass, "'");
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
                            // query for check previous loan amount
                            var loanAmountQuery = "SELECT * FROM user WHERE username = '".concat(bank_1.userInputName, "' AND password = '").concat(bank_1.userInputPass, "'");
                            db.all(loanAmountQuery, [], function (err, rows) {
                                if (err)
                                    return console.log(err.message);
                                rows.forEach(function (row) {
                                    var loanTakenAmount = row.loanAmount;
                                    var totalLoanTaken = loanBalance + loanTakenAmount;
                                    var updatedLoanLimit = row.loanLimit - loanBalance;
                                    // loan amount updating in loan amount column
                                    var LoanApplyQuery = "UPDATE user\n                                   SET loanAmount = ".concat(totalLoanTaken, " ,loanTaken = ").concat(loanBalance, " , loanLimit = ").concat(updatedLoanLimit, "\n                                   WHERE username = '").concat(bank_1.userInputName, "' AND password = '").concat(bank_1.userInputPass, "'");
                                    db.run(LoanApplyQuery, function (err) {
                                        if (err) {
                                            return console.error(err.message);
                                        }
                                        console.log("You successfully applied for a loan.");
                                    });
                                    // loan applied become true 
                                    var loanAppliedQuery = "UPDATE user\n                               SET \tloanApplied = '".concat(1, "'\n                               WHERE username = '").concat(bank_1.userInputName, "' AND password = '").concat(bank_1.userInputPass, "'");
                                    db.run(loanAppliedQuery, function (err) {
                                        if (err) {
                                            return console.error(err.message);
                                        }
                                    });
                                });
                            });
                            break;
                        case 2:
                            var loanApprovedQuery = "SELECT * FROM user WHERE username = '".concat(bank_1.userInputName, "' AND password = '").concat(bank_1.userInputPass, "' AND loanTaken >= 0 ");
                            db.all(loanApprovedQuery, [], function (err, rows) {
                                rows.forEach(function (row) {
                                    console.log("Your loan is not approved");
                                });
                                if (err)
                                    return console.log(err.message);
                                else {
                                    console.log("You Loan is approved ");
                                }
                            });
                            break;
                        case 3:
                            var totalLoanAmount;
                            var balanceLoan;
                            var loanLimitAfterPaid;
                            var paidLoanAmount = parseInt(prompt(InputDetailEnum_1.detail.paidLoan));
                            var loanLimitQuery = "SELECT * FROM user WHERE username = '".concat(bank_1.userInputName, "' AND password = '").concat(bank_1.userInputPass, "'");
                            db.all(loanLimitQuery, [], function (err, rows) {
                                if (err)
                                    return console.log(err.message);
                                rows.forEach(function (row) {
                                    if (paidLoanAmount > row.loanAmount) {
                                        console.log("You are entering an amount greater than the loan amount.");
                                    }
                                    var paidLoanQuery = "SELECT * FROM user WHERE username = '".concat(bank_1.userInputName, "' AND password = '").concat(bank_1.userInputPass, "'");
                                    db.all(paidLoanQuery, [], function (err, rows) {
                                        if (err)
                                            return console.log(err.message);
                                        rows.forEach(function (row) {
                                            totalLoanAmount = row.loanAmount;
                                            balanceLoan = totalLoanAmount - paidLoanAmount;
                                            loanLimitAfterPaid = row.loanLimit + paidLoanAmount;
                                        });
                                        var updateLoanQuery = "UPDATE user\n                               SET \tloanAmount = '".concat(balanceLoan, "', loanLimit = ").concat(loanLimitAfterPaid, "\n                               WHERE username = '").concat(bank_1.userInputName, "' AND password = '").concat(bank_1.userInputPass, "'");
                                        db.run(updateLoanQuery, function (err) {
                                            if (err)
                                                return console.error(err.message);
                                            console.log("The loan was successfully repaid. ");
                                        });
                                    });
                                });
                            });
                            break;
                        case 4:
                            var loanAmountCheckQuery = "SELECT * FROM user WHERE username = '".concat(bank_1.userInputName, "' AND password = '").concat(bank_1.userInputPass, "'");
                            db.all(loanAmountCheckQuery, [], function (err, rows) {
                                if (err)
                                    return console.log(err.message);
                                rows.forEach(function (row) {
                                    console.log("You have borrowed Rs.".concat(row.loanAmount, " from the bank."));
                                });
                            });
                    }
                });
            });
        };
        this.moneyTransfer = function () {
            var balanceAmount;
            // Query for user authentication
            var moneyTransfer = "SELECT * FROM user WHERE username = '".concat(bank_1.userInputName, "' AND password = '").concat(bank_1.userInputPass, "'");
            db.all(moneyTransfer, [], function (err, rows) {
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
                        var transferQuery = "UPDATE user\n                               SET amount = ".concat(balanceAfterTransfer_1, "\n                               WHERE username = '").concat(bank_1.userInputName, "' AND password = '").concat(bank_1.userInputPass, "'");
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
