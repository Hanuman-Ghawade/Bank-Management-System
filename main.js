"use strict";
exports.__esModule = true;
var Enum_js_1 = require("./Constant/Enum.js");
// Banking management system 
var ps = require(Enum_js_1.detail.prompt);
var prompt = ps();
var fs = require(Enum_js_1.detail.fs);
var path = require(Enum_js_1.detail.path);
var customerData = fs.readFileSync(Enum_js_1.detail.userDB);
var customerDetails = JSON.parse(customerData);
var adminData = fs.readFileSync(Enum_js_1.detail.adminDB);
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
                if (birth.match(dateReg) == null) {
                    console.log("Please enter valid date ");
                    check = false;
                }
                else if (ageYear < 18 || ageYear > 80) {
                    console.log("The age range should be between 18 and 80.");
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
            // default account type will be Saving
            var accountType = Enum_js_1.detail.savingAccount;
            // Loan Applicable
            var loanApplicable = true;
            // Loan Amount 
            var LoanAmount = 0;
            //  Loan Limit
            var loanLimit = 500000;
            // Loan Taken 
            var loanTaken = 0;
            // loan application 
            var loanApplied = false;
            // return the all input 
            return { name: name, age: age, mobileNumber: mobileNumber, email: email, birth: birth, accountNo: accountNo, accountType: accountType, username: username, password: password, amount: amount, loanApplicable: loanApplicable, loanTaken: loanTaken, LoanAmount: LoanAmount, loanLimit: loanLimit, loanApplied: loanApplied };
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
// Admin class for view user details .
var Admin = /** @class */ (function () {
    function Admin() {
    }
    Admin.prototype.userDetails = function () {
        console.table(customerDetails);
    };
    Admin.prototype.accountHolderBasedOnAmount = function () {
        var response;
        do {
            response = parseInt(prompt(Enum_js_1.detail.amountHolder));
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
        fs.writeFileSync(path.resolve(__dirname, Enum_js_1.detail.userDB), JSON.stringify(customerDetails, null, 2));
        console.log("Account deleted Successfully");
    };
    Admin.prototype.SavingAccount = function () {
        var authorizedUser = customerDetails.filter(function (ele) {
            return ele.accountType == Enum_js_1.detail.savingAccount;
        });
        console.table(authorizedUser);
    };
    Admin.prototype.CurrentAccount = function () {
        var currentaccount = customerDetails.filter(function (ele) {
            return ele.accountType == Enum_js_1.detail.currentAccount;
        });
        console.table(currentaccount);
    };
    Admin.prototype.ApproveLoan = function () {
        for (var i = 0; i < customerDetails.length; i++) {
            if (customerDetails[i].loanApplied == true) {
                customerDetails[i].loanApplied = false;
                customerDetails[i].amount += customerDetails[i].loanTaken;
                customerDetails[i].loanTaken = 0;
                fs.writeFileSync(path.resolve(__dirname, Enum_js_1.detail.userDB), JSON.stringify(customerDetails, null, 2));
                if (customerDetails[i].amount > 100000) {
                    customerDetails[i].accountType = Enum_js_1.detail.currentAccount;
                    fs.writeFileSync(path.resolve(__dirname, Enum_js_1.detail.userDB), JSON.stringify(customerDetails, null, 2));
                }
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
        var count = 0;
        for (var i = 0; i < customerDetails.length; i++) {
            BankCash += customerDetails[i].amount;
            LoanCash += customerDetails[i].LoanAmount;
            count++;
        }
        console.log("The total amount in your bank is  Rs.".concat(BankCash, "."));
        console.log("The total amount lent to the customer is Rs.".concat(LoanCash, "."));
        console.log(" The total number of customers is ".concat(count, "."));
    };
    return Admin;
}());
// Bank class  for the deposit , withdraw & show balance 
var Bank = /** @class */ (function () {
    function Bank() {
        this.withdraw = function (customerDetails) {
            var check;
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
                            fs.writeFileSync(path.resolve(__dirname, Enum_js_1.detail.userDB), JSON.stringify(customerDetails, null, 2));
                            console.log("The remaining balance in your account is ".concat(balance));
                            if (customerDetails[i].amount <= 100000) {
                                customerDetails[i].accountType = Enum_js_1.detail.currentAccount;
                                fs.writeFileSync(path.resolve(__dirname, Enum_js_1.detail.userDB), JSON.stringify(customerDetails, null, 2));
                            }
                        }
                        break;
                    }
                }
            } while (check == false);
        };
    }
    Bank.prototype.deposit = function (customerDetails) {
        var check;
        do {
            check = true;
            var userInputName = prompt(Enum_js_1.detail.userInput);
            var userInputPass = prompt(Enum_js_1.detail.userPass);
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
                        fs.writeFileSync(path.resolve(__dirname, Enum_js_1.detail.userDB), JSON.stringify(customerDetails, null, 2));
                        console.log("You have deposited Rs ".concat(amount, " in your account ."));
                        if (customerDetails[i].amount > 100000) {
                            customerDetails[i].accountType = Enum_js_1.detail.currentAccount;
                            fs.writeFileSync(path.resolve(__dirname, Enum_js_1.detail.userDB), JSON.stringify(customerDetails, null, 2));
                        }
                        check = true;
                    }
                }
            }
        } while (check == false);
    };
    Bank.prototype.view_balance = function (customerDetails) {
        var check;
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
        var loanResponse;
        var userInputName = prompt(Enum_js_1.detail.userInput);
        var userInputPass = prompt(Enum_js_1.detail.userPass);
        do {
            loanResponse = parseInt(prompt(Enum_js_1.detail.loanSection));
            console.clear();
            var check = void 0;
            switch (loanResponse) {
                case 1:
                    console.log(" *** Loan Application  *** ");
                    do {
                        check = true;
                        for (var i = 0; i < customerDetails.length; i++) {
                            if (customerDetails[i].username == userInputName && customerDetails[i].password == userInputPass) {
                                var loanBalance = Number(parseInt(prompt(Enum_js_1.detail.loanAmount)));
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
                                    customerDetails[i].Loanamount += loanBalance;
                                    customerDetails[i].loanTaken += loanBalance;
                                    customerDetails[i].loanLimit = customerDetails[i].loanLimit - loanBalance;
                                    customerDetails[i].loanApplied = true;
                                    fs.writeFileSync(path.resolve(__dirname, Enum_js_1.detail.userDB), JSON.stringify(customerDetails, null, 2));
                                    console.log("You successfully applied for a loan.");
                                    if (customerDetails[i].loanLimit < 1) {
                                        customerDetails[i].loanApplicable = false;
                                        fs.writeFileSync(path.resolve(__dirname, Enum_js_1.detail.userDB), JSON.stringify(customerDetails, null, 2));
                                    }
                                    else {
                                        customerDetails[i].loanApplicable = true;
                                        fs.writeFileSync(path.resolve(__dirname, Enum_js_1.detail.userDB), JSON.stringify(customerDetails, null, 2));
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
                                var paidAmount = Number(parseInt(prompt(Enum_js_1.detail.loanAmount)));
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
                                    fs.writeFileSync(path.resolve(__dirname, Enum_js_1.detail.userDB), JSON.stringify(customerDetails, null, 2));
                                    if (customerDetails[i].loanLimit > 0) {
                                        customerDetails[i].loanApplicable = true;
                                        fs.writeFileSync(path.resolve(__dirname, Enum_js_1.detail.userDB), JSON.stringify(customerDetails, null, 2));
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
                            fs.writeFileSync(path.resolve(__dirname, Enum_js_1.detail.userDB), JSON.stringify(customerDetails, null, 2));
                            console.log("The money was transferred successfully.");
                            if (customerDetails[i_1].amount > 100000) {
                                customerDetails[i_1].accountType = Enum_js_1.detail.currentAccount;
                                fs.writeFileSync(path.resolve(__dirname, Enum_js_1.detail.userDB), JSON.stringify(customerDetails, null, 2));
                            }
                        }
                    }
                    customerDetails[i].amount = customerDetails[i].amount - transferAmount;
                    fs.writeFileSync(path.resolve(__dirname, Enum_js_1.detail.userDB), JSON.stringify(customerDetails, null, 2));
                    if (customerDetails[i].amount <= 100000) {
                        customerDetails[i].accountType = Enum_js_1.detail.savingAccount;
                        fs.writeFileSync(path.resolve(__dirname, Enum_js_1.detail.userDB), JSON.stringify(customerDetails, null, 2));
                    }
                }
            }
        }
    };
    return Bank;
}());
console.log(" ****** Welcome to the bank management system.****** ");
var userDetails;
var initialAmount;
var response;
var adminResponse;
var user = new User();
var bank = new Bank();
var admin = new Admin();
do {
    response = parseInt(prompt(Enum_js_1.detail.bankLogin));
    console.clear();
    if (response === 1) {
        console.clear();
        var userResponse = void 0;
        do {
            console.log("******* User Login *****");
            userResponse = parseInt(prompt(Enum_js_1.detail.userLogin));
            console.clear();
            switch (userResponse) {
                case 1:
                    console.clear();
                    console.log("**** New Account registrations ****");
                    userDetails = user.createAccount();
                    customerDetails.push(userDetails);
                    fs.writeFileSync(path.resolve(__dirname, Enum_js_1.detail.userDB), JSON.stringify(customerDetails, null, 2));
                    console.log("Account created successfully");
                    break;
                case 2:
                    console.clear();
                    console.log("**** Customers Details ****");
                    user.showDetails(customerDetails);
                    break;
                case 3:
                    console.clear();
                    console.log("**** Deposit Amount ****");
                    initialAmount = bank.deposit(customerDetails);
                    break;
                case 4:
                    console.clear();
                    console.log("**** Withdraw Amount ****");
                    bank.withdraw(customerDetails);
                    break;
                case 5:
                    console.clear();
                    console.log("**** View Balance ****");
                    bank.view_balance(customerDetails);
                    break;
                case 6:
                    console.clear();
                    console.log("**** Loan Section ****");
                    bank.LoanSection();
                    break;
                case 7:
                    console.clear();
                    console.log("**** Money Transfer ****");
                    bank.moneyTransfer();
                default:
                    break;
            }
        } while (userResponse != 8);
    }
    else if (response === 2) {
        console.clear();
        console.log("******* Admin Login *****");
        var userInputName = prompt(Enum_js_1.detail.userInput);
        var userInputPass = prompt(Enum_js_1.detail.userPass);
        console.clear();
        if (adminDetails[0].adminUserName == userInputName && adminDetails[0].adminPass == userInputPass) {
            console.log("Admin login successfully done");
            console.clear();
            do {
                adminResponse = parseInt(prompt(Enum_js_1.detail.adminLogin));
                console.clear();
                switch (adminResponse) {
                    case 1:
                        console.clear();
                        console.log(" *** All customers details. ***");
                        admin.userDetails();
                        break;
                    case 2:
                        console.clear();
                        console.log(" *** Customers details based on amount ***");
                        admin.accountHolderBasedOnAmount();
                        break;
                    case 3:
                        console.clear();
                        console.log("*** The number of people who have a savings account. ***");
                        admin.SavingAccount();
                        break;
                    case 4:
                        console.clear();
                        console.log("*** The number of people who have a current account. *** ");
                        admin.CurrentAccount();
                        break;
                    case 5:
                        console.clear();
                        console.log("*** Delete the account with zero balance.  *** ");
                        admin.deleteAccount();
                        break;
                    case 6:
                        console.clear();
                        console.log("*** Loan approve  *** ");
                        admin.ApproveLoan();
                        break;
                    case 7:
                        console.clear();
                        console.log("*** Loan Holder *** ");
                        admin.LoanHolder();
                        break;
                    case 8:
                        console.clear();
                        console.log("*** Total bank statement *** ");
                        admin.BankAmount();
                        break;
                    default:
                        console.clear();
                        break;
                }
            } while (adminResponse != 9);
        }
        else {
            console.log("Please enter valid input ");
        }
    }
} while (response != 8);
