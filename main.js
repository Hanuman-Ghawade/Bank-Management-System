"use strict";
exports.__esModule = true;
var Enum_js_1 = require("./Enum.js");
// Banking management system 
var ps = require("prompt-sync");
var prompt = ps();
var fs = require('fs');
var path = require('path');
var customerData = fs.readFileSync('user.json');
var customerDetails = JSON.parse(customerData);
var adminData = fs.readFileSync('admin.json');
var adminDetails = JSON.parse(adminData);
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
                if (isNaN(age) || age < 18 || age > 80) {
                    console.log("The age must be a number between 18 and 80");
                    check = false;
                }
            } while (check == false);
            // input details for Mobile number 
            do {
                check = true;
                var mobileNumber = parseInt(prompt(Enum_js_1.detail.contactNo));
                if (!mobileNumber || mobileNumber.toString().length != 10) {
                    console.log("Please provide 10 Digit numeric value");
                    check = false;
                }
            } while (check == false);
            // input details  for email
            do {
                var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
                check = true;
                var email = prompt(Enum_js_1.detail.email);
                if (email.match(pattern) === null) {
                    console.log("Please enter valid email");
                    check = false;
                }
            } while (check == false);
            // Input details for date of Birth 
            do {
                var dateReg = /^\d{2}([./-])\d{2}\1\d{4}$/;
                check = true;
                var birth = prompt(Enum_js_1.detail.dateOfBirth);
                var ageMS = Date.parse(Date()) - Date.parse(birth);
                var age_1 = new Date();
                age_1.setTime(ageMS);
                var ageYear = age_1.getFullYear() - 1970;
                if (ageYear < 18 || ageYear > 80) {
                    console.log("The age range should be between 18 and 80.");
                    check = false;
                }
                else if (birth.match(dateReg) == null) {
                    console.log("Please enter valid date ");
                    check = false;
                }
            } while (check == false);
            // input details for username
            do {
                check = true;
                var username = String(prompt(Enum_js_1.detail.username));
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
            // default account type will be Saving
            var accountType = "Saving";
            // Loan section 
            var LoanApprove = false;
            // Loan Amount 
            var Loanamount = 0;
            // return the all input 
            return { name: name, age: age, mobileNumber: mobileNumber, email: email, birth: birth, accountNo: accountNo, accountType: accountType, username: username, password: password, amount: amount, LoanApprove: LoanApprove, Loanamount: Loanamount, flag: flag };
        };
        // Details of the customer 
        this.showDetails = function (customerDetails) {
            var check;
            var no = 0;
            var userInputName;
            var userInputPass;
            check = true;
            while (check != false) {
                userInputName = prompt(Enum_js_1.detail.userInput);
                userInputPass = prompt(Enum_js_1.detail.userPass);
                for (var i = 0; i < customerDetails.length; i++) {
                    if (customerDetails[i].username == userInputName && customerDetails[i].password == userInputPass) {
                        check = false;
                        no = i;
                    }
                }
            }
            if (check === false) {
                console.table(customerDetails[no]);
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
        console.table(customerDetails);
    };
    Admin.prototype.accountHolderBasedOnAmount = function () {
        var response = parseInt(prompt("Please choose  one option \n    1. Rs.0 amount Holder\n    2. Rs. < 1 Lakh amount Holder\n    3. Rs. > 1 Lakh amount Holder\n    4. Exit\n    "));
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
    };
    Admin.prototype.deleteAccount = function () {
        var removeAmount = function (customerDetails, amount) {
            var requiredIndex = customerDetails.findIndex(function (el) {
                return el.amount === Number(amount);
            });
            if (requiredIndex === -1) {
                return true;
            }
            ;
            return !!customerDetails.splice(requiredIndex, 1);
        };
        removeAmount(customerDetails, 0);
        fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(customerDetails, null, 2));
        console.log("Account deleted Successfully");
    };
    Admin.prototype.SavingAccount = function () {
        var authorizedUser = customerDetails.filter(function (ele) {
            return ele.accountType == "Saving";
        });
        console.table(authorizedUser);
    };
    Admin.prototype.CurrentAccount = function () {
        var currentaccount = customerDetails.filter(function (ele) {
            return ele.accountType == "Current";
        });
        console.table(currentaccount);
    };
    Admin.prototype.AccountConvert = function () {
        for (var i = 0; i < customerDetails.length; i++) {
            if (customerDetails[i].amount > 100000) {
                customerDetails[i].accountType = "Current";
                fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(customerDetails, null, 2));
            }
            else {
                customerDetails[i].accountType = "Saving";
                fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(customerDetails, null, 2));
            }
        }
        console.log("The account type changed successfully.");
    };
    Admin.prototype.ApproveLoan = function () {
        for (var i = 0; i < customerDetails.length; i++) {
            if (customerDetails[i].Loanamount > 1 && customerDetails[i].LoanApprove == false) {
                customerDetails[i].LoanApprove = true;
                customerDetails[i].amount = customerDetails[i].amount + customerDetails[i].Loanamount;
                fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(customerDetails, null, 2));
            }
        }
        console.log("The loan was approved successfully.");
    };
    Admin.prototype.LoanHolder = function () {
        var loanUser = customerDetails.filter(function (ele) {
            return ele.Loanamount > 0;
        });
        console.table(loanUser);
    };
    Admin.prototype.BankAmount = function () {
        var BankCash = 0;
        var LoanCash = 0;
        for (var i = 0; i < customerDetails.length; i++) {
            BankCash += customerDetails[i].amount;
            LoanCash += customerDetails[i].Loanamount;
        }
        console.log("The total amount in your bank is  Rs.".concat(BankCash));
        console.log("The total amount lent to the customer is Rs.".concat(LoanCash));
    };
    return Admin;
}());
// Bank class  for the deposit , withdraw & show balance 
var Bank = /** @class */ (function () {
    function Bank() {
        this.withdraw = function (customerDetails) {
            var check;
            var path = require('path');
            var userInputName = prompt(Enum_js_1.detail.userInput);
            var userInputPass = prompt(Enum_js_1.detail.userPass);
            do {
                check = true;
                for (var i = 0; i < customerDetails.length; i++) {
                    if (customerDetails[i].username == userInputName && customerDetails[i].password == userInputPass) {
                        var withDraw = Number(parseInt(prompt(Enum_js_1.detail.withdraw)));
                        if (Number.isNaN(withDraw) || withDraw < 1) {
                            console.log("Please enter valid amount");
                            check = false;
                        }
                        else if (withDraw > customerDetails[i].amount) {
                            console.log("Insufficient fund");
                        }
                        else {
                            console.log("The amount was withdrawn successfully.");
                            var balance = customerDetails[i].amount - withDraw;
                            customerDetails[i].amount = balance;
                            fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(customerDetails, null, 2));
                            console.log("The remaining balance in your account is ".concat(balance));
                        }
                        break;
                    }
                }
            } while (check == false);
        };
    }
    Bank.prototype.deposit = function (customerDetails) {
        var check;
        var userInputName = prompt(Enum_js_1.detail.userInput);
        var userInputPass = prompt(Enum_js_1.detail.userPass);
        do {
            check = true;
            for (var i = 0; i < customerDetails.length; i++) {
                if (customerDetails[i].username == userInputName && customerDetails[i].password == userInputPass) {
                    var amount = Number(parseInt(prompt(Enum_js_1.detail.deposit)));
                    var balance = Number(customerDetails[i].amount);
                    if (Number.isNaN(amount) || amount < 1 || String(amount).length >= 7) {
                        console.log("Please enter valid amount");
                        check = false;
                    }
                    else {
                        balance = balance + amount;
                        customerDetails[i].amount = balance;
                        fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(customerDetails, null, 2));
                        console.log("You have deposited Rs ".concat(amount, " in your account ."));
                        check = true;
                    }
                }
            }
        } while (check == false);
    };
    Bank.prototype.view_balance = function (customerDetails) {
        var userInputName = prompt(Enum_js_1.detail.userInput);
        var userInputPass = prompt(Enum_js_1.detail.userPass);
        for (var i = 0; i < customerDetails.length; i++) {
            if (customerDetails[i].username == userInputName && customerDetails[i].password == userInputPass) {
                var viewBalance = customerDetails[i].amount;
                console.log("The amount in your account ".concat(viewBalance));
            }
        }
    };
    Bank.prototype.LoanSection = function () {
        console.log(" *****  Welcome to the loan Section ***** ");
        var loanResponse = parseInt(prompt("Please choose  one option \n    1. Apply for Loan (Upto 5 Lakh)\n    2. Loan Status \n    3. Paid Loan\n    4. Loan Amount\n    5. Exit\n    "));
        console.clear();
        var check;
        switch (loanResponse) {
            case 1:
                var userInputName = prompt(Enum_js_1.detail.userInput);
                var userInputPass = prompt(Enum_js_1.detail.userPass);
                do {
                    check = true;
                    for (var i = 0; i < customerDetails.length; i++) {
                        if (customerDetails[i].username == userInputName && customerDetails[i].password == userInputPass) {
                            var LoanAmount = Number(parseInt(prompt(Enum_js_1.detail.loanAmount)));
                            if (Number.isNaN(LoanAmount) || LoanAmount < 1 || LoanAmount > 500000) {
                                console.log("Please enter valid amount");
                                check = false;
                            }
                            else if (customerDetails[i].LoanApprove == true || customerDetails[i].Loanamount > 0) {
                                console.log("You have already taken the loan.");
                                break;
                            }
                            else {
                                console.log("You successfully applied for a loan.");
                                customerDetails[i].Loanamount = LoanAmount;
                                fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(customerDetails, null, 2));
                                console.log("Your Loan  balance is ".concat(customerDetails[i].Loanamount));
                            }
                        }
                    }
                } while (check == false);
                break;
            case 2:
                var userInputName = prompt(Enum_js_1.detail.userInput);
                var userInputPass = prompt(Enum_js_1.detail.userPass);
                for (var i = 0; i < customerDetails.length; i++) {
                    if (customerDetails[i].username == userInputName && customerDetails[i].password == userInputPass) {
                        if (customerDetails[i].LoanApprove == false) {
                            console.log("Your loan is not approved. ");
                        }
                        else {
                            console.log("Your loan is approved ");
                        }
                    }
                }
                break;
            case 3:
                var userInputName = prompt(Enum_js_1.detail.userInput);
                var userInputPass = prompt(Enum_js_1.detail.userPass);
                do {
                    check = true;
                    for (var i = 0; i < customerDetails.length; i++) {
                        if (customerDetails[i].username == userInputName && customerDetails[i].password == userInputPass) {
                            var paidAmount = Number(parseInt(prompt(Enum_js_1.detail.loanAmount)));
                            if (Number.isNaN(paidAmount) || paidAmount < 1) {
                                console.log("Please enter valid amount");
                                check = false;
                            }
                            else if (customerDetails[i].Loanamount < paidAmount) {
                                console.log("You are entering an amount greater than the loan amount.");
                            }
                            else {
                                console.log("You successfully paid the loan.");
                                var balance = customerDetails[i].Loanamount - paidAmount;
                                customerDetails[i].Loanamount = balance;
                                if (balance === 0) {
                                    customerDetails[i].LoanApprove = false;
                                }
                                fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(customerDetails, null, 2));
                            }
                        }
                    }
                } while (check == false);
                break;
            case 4:
                var userInputName = prompt(Enum_js_1.detail.userInput);
                var userInputPass = prompt(Enum_js_1.detail.userPass);
                for (var i = 0; i < customerDetails.length; i++) {
                    if (customerDetails[i].username == userInputName && customerDetails[i].password == userInputPass) {
                        var viewBalance = customerDetails[i].Loanamount;
                        console.log("You have taken a Rs.".concat(viewBalance, " loan from the bank"));
                    }
                }
                break;
            default:
                break;
        }
    };
    Bank.prototype.moneyTransfer = function () {
        console.log("***** Money Transfer Section ****** ");
        var userInputName = prompt(Enum_js_1.detail.userInput);
        var userInputPass = prompt(Enum_js_1.detail.userPass);
        for (var i = 0; i < customerDetails.length; i++) {
            if (customerDetails[i].username == userInputName && customerDetails[i].password == userInputPass) {
                var transferAmount = parseInt(prompt(Enum_js_1.detail.moneyTransfer));
                var receiverAccountNumber = parseInt(prompt(Enum_js_1.detail.receiverAccountNo));
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
                            fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(customerDetails, null, 2));
                            console.log("The money was transferred successfully.");
                        }
                    }
                    customerDetails[i].amount = customerDetails[i].amount - transferAmount;
                    fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(customerDetails, null, 2));
                }
            }
        }
    };
    return Bank;
}());
console.log(" ****** Welcome to the bank management system.****** ");
var userDetails;
var initialAmount;
var input;
var adminResponse;
var user = new User();
var bank = new Bank();
var admin = new Admin();
do {
    var response = parseInt(prompt("Please choose  one option \n    1. User Login\n    2. Admin Login\n    "));
    console.clear();
    if (response === 1) {
        console.clear();
        console.log("******* User Login *****");
        var userResponse = parseInt(prompt("Please choose one  option :\n    \n     1. Create a New Account\n     2. Show Details \n     3. Deposit (Upto 7 Digit Amount)\n     4. Withdraw\n     5. View Balance\n     6. Loan Section \n     7. Money Transfer \n     8. Exit\n\n     "));
        console.clear();
        switch (userResponse) {
            case 1:
                userDetails = user.createAccount();
                customerDetails.push(userDetails);
                fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(customerDetails, null, 2));
                console.log("Account created successfully");
                break;
            case 2:
                user.showDetails(customerDetails);
                break;
            case 3:
                initialAmount = bank.deposit(customerDetails);
                break;
            case 4:
                bank.withdraw(customerDetails);
                break;
            case 5:
                bank.view_balance(customerDetails);
                break;
            case 6:
                bank.LoanSection();
                break;
            case 7:
                bank.moneyTransfer();
            default:
                break;
        }
    }
    else if (response === 2) {
        console.clear();
        console.log("******* Admin Login *****");
        var userInputName = prompt(Enum_js_1.detail.userInput);
        var userInputPass = prompt(Enum_js_1.detail.userPass);
        console.clear();
        if (adminDetails[0].adminUserName == userInputName && adminDetails[0].adminPass == userInputPass) {
            console.log("Admin login successfully done");
            do {
                adminResponse = parseInt(prompt("Please choose option :\n\n     1. User Details \n     2. Account Holder details Based On amount\n     3. Saving Accounts  (Amount less than 1 Lakh)\n     4. Current Accounts (Amount more than 1 Lakh)\n     5. Account Convert  (Saving >< Current )\n     6. Delete Account   (Zero Balance Holder)\n     7. Approve Loan \n     8. Loan Holder\n     9. Bank Statement \n    10. Exit\n\n     "));
                console.clear();
                switch (adminResponse) {
                    case 1:
                        admin.userDetails();
                        break;
                    case 2:
                        admin.accountHolderBasedOnAmount();
                        break;
                    case 3:
                        admin.SavingAccount();
                        break;
                    case 4:
                        admin.CurrentAccount();
                        break;
                    case 5:
                        admin.AccountConvert();
                        break;
                    case 6:
                        admin.deleteAccount();
                        break;
                    case 7:
                        admin.ApproveLoan();
                        break;
                    case 8:
                        admin.LoanHolder();
                        break;
                    case 9:
                        admin.BankAmount();
                        break;
                    default:
                        break;
                }
            } while (adminResponse != 10);
        }
        else {
            console.log("Please enter valid input ");
        }
    }
} while (input != 8);
