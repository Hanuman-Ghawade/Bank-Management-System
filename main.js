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
    Admin.prototype.accountHolderBasedOnAmount = function () {
        var response = parseInt(prompt("Please choose  one option \n    1. Rs.0 amount Holder\n    2. Rs. < 1 Lakh amount Holder\n    3. Rs. > 1 Lakh amount Holder\n    "));
        console.clear();
        switch (response) {
            case 1:
                var fs = require('fs');
                var zeroBalance = JSON.parse(fs.readFileSync('user.json'));
                var zeroBalanceData = zeroBalance.filter(function (ele) {
                    return ele.amount == 0;
                });
                console.table(zeroBalanceData);
                break;
            case 2:
                var fz = require('fs');
                var one_Lakh_Holder = JSON.parse(fz.readFileSync('user.json'));
                var oneLakh = one_Lakh_Holder.filter(function (ele) {
                    return ele.amount > 0 && ele.amount < 100000;
                });
                console.table(oneLakh);
                break;
            case 3:
                var fc = require('fs');
                var zero = JSON.parse(fc.readFileSync('user.json'));
                var more_than_oneLakh = zero.filter(function (ele) {
                    return ele.amount >= 100000;
                });
                console.table(more_than_oneLakh);
        }
    };
    Admin.prototype.deleteAccount = function () {
        var fz = require('fs');
        var zero = JSON.parse(fz.readFileSync('user.json'));
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
    Admin.prototype.SavingAccount = function () {
        var fz = require('fs');
        var data = fz.readFileSync('user.json');
        var zero = JSON.parse(data);
        var authorizedUser = zero.filter(function (ele) {
            return ele.accountType == "Saving";
        });
        console.table(authorizedUser);
    };
    Admin.prototype.CurrentAccount = function () {
        var fz = require('fs');
        var data = fz.readFileSync('user.json');
        var zero = JSON.parse(data);
        var currentaccount = zero.filter(function (ele) {
            return ele.accountType == "Current";
        });
        console.table(currentaccount);
    };
    Admin.prototype.AccountConvert = function () {
        var fz = require('fs');
        var data = fz.readFileSync('user.json');
        var accountTypeCheck = JSON.parse(data);
        var path = require('path');
        for (var i = 0; i < accountTypeCheck.length; i++) {
            if (accountTypeCheck[i].amount > 100000) {
                accountTypeCheck[i].accountType = "Current";
                fz.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(accountTypeCheck, null, 2));
            }
            else {
                accountTypeCheck[i].accountType = "Saving";
                fz.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(accountTypeCheck, null, 2));
            }
        }
        console.log("The account type changed successfully.");
    };
    Admin.prototype.ApproveLoan = function () {
        var fz = require('fs');
        var data = fz.readFileSync('user.json');
        var ApproveLoan = JSON.parse(data);
        var path = require('path');
        for (var i = 0; i < ApproveLoan.length; i++) {
            if (ApproveLoan[i].Loanamount > 1 && ApproveLoan[i].LoanApprove == false) {
                ApproveLoan[i].LoanApprove = true;
                ApproveLoan[i].amount = ApproveLoan[i].amount + ApproveLoan[i].Loanamount;
                fz.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(ApproveLoan, null, 2));
            }
            else if (ApproveLoan[i].Loanamount < 1 && ApproveLoan[i].LoanApprove == true) {
                ApproveLoan[i].LoanApprove = false;
                fz.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(ApproveLoan, null, 2));
            }
        }
        console.log("The loan was approved successfully.");
    };
    Admin.prototype.LoanHolder = function () {
        var fz = require('fs');
        var data = fz.readFileSync('user.json');
        var zero = JSON.parse(data);
        var loanUser = zero.filter(function (ele) {
            return ele.Loanamount > 0;
        });
        console.table(loanUser);
    };
    Admin.prototype.BankAmount = function () {
        var fz = require('fs');
        var data = fz.readFileSync('user.json');
        var BankAmount = JSON.parse(data);
        var path = require('path');
        var BankCash = 0;
        var LoanCash = 0;
        for (var i = 0; i < BankAmount.length; i++) {
            BankCash += BankAmount[i].amount;
            LoanCash += BankAmount[i].Loanamount;
        }
        console.log("The total amount in your bank is  Rs.".concat(BankCash));
        console.log("The total amount lent to the customer is Rs.".concat(LoanCash));
    };
    return Admin;
}());
// Bank class  for the deposit , withdraw & show balance 
var Bank = /** @class */ (function () {
    function Bank() {
        this.withdraw = function (withdawId, fc) {
            var check;
            var path = require('path');
            var userInputName = prompt(Enum_js_1.detail.userInput);
            var userInputPass = prompt(Enum_js_1.detail.userPass);
            do {
                check = true;
                for (var i = 0; i < withdawId.length; i++) {
                    if (withdawId[i].username == userInputName && withdawId[i].password == userInputPass) {
                        var withDraw = Number(parseInt(prompt(Enum_js_1.detail.withdraw)));
                        if (Number.isNaN(withDraw) || withDraw < 1) {
                            console.log("Please enter valid amount");
                            check = false;
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
            } while (check == false);
        };
    }
    Bank.prototype.deposit = function (depositId, ff) {
        var check;
        var path = require('path');
        var userInputName = prompt(Enum_js_1.detail.userInput);
        var userInputPass = prompt(Enum_js_1.detail.userPass);
        do {
            check = true;
            for (var i = 0; i < depositId.length; i++) {
                if (depositId[i].username == userInputName && depositId[i].password == userInputPass) {
                    var amount = Number(parseInt(prompt(Enum_js_1.detail.deposit)));
                    var balance = Number(depositId[i].amount);
                    if (Number.isNaN(amount) || amount < 1 || String(amount).length >= 7) {
                        console.log("Please enter valid amount");
                        check = false;
                    }
                    else {
                        balance = balance + amount;
                        depositId[i].amount = balance;
                        ff.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(depositId, null, 2));
                        console.log("You have deposited Rs ".concat(amount, " in your account ."));
                        check = true;
                    }
                }
            }
        } while (check == false);
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
    Bank.prototype.LoanSection = function () {
        console.log(" Welcome to the loan Section ");
        var fs = require('fs');
        var path = require('path');
        var loanData = fs.readFileSync('user.json');
        var loanInformation = JSON.parse(loanData);
        var loanResponse = parseInt(prompt("Please choose  one option \n    1. Apply for Loan (Upto 5 Lakh)\n    2. Loan Status \n    3. Paid Loan\n    4. Loan Amount\n    5. Exit\n    "));
        console.clear();
        var check;
        switch (loanResponse) {
            case 1:
                var userInputName = prompt(Enum_js_1.detail.userInput);
                var userInputPass = prompt(Enum_js_1.detail.userPass);
                do {
                    check = true;
                    for (var i = 0; i < loanInformation.length; i++) {
                        if (loanInformation[i].username == userInputName && loanInformation[i].password == userInputPass) {
                            var LoanAmount = Number(parseInt(prompt(Enum_js_1.detail.loanAmount)));
                            if (Number.isNaN(LoanAmount) || LoanAmount < 1 || LoanAmount > 500000) {
                                console.log("Please enter valid amount");
                                check = false;
                            }
                            else if (loanInformation[i].LoanApprove == true) {
                                console.log("You have already taken the loan.");
                                break;
                            }
                            else {
                                console.log("You successfully applied for a loan.");
                                loanInformation[i].Loanamount = LoanAmount;
                                fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(loanInformation, null, 2));
                                console.log("Your Loan  balance is ".concat(loanInformation[i].Loanamount));
                            }
                        }
                    }
                } while (check == false);
                break;
            case 2:
                var userInputName = prompt(Enum_js_1.detail.userInput);
                var userInputPass = prompt(Enum_js_1.detail.userPass);
                for (var i = 0; i < loanInformation.length; i++) {
                    if (loanInformation[i].username == userInputName && loanInformation[i].password == userInputPass) {
                        if (loanInformation[i].LoanApprove == false) {
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
                    for (var i = 0; i < loanInformation.length; i++) {
                        if (loanInformation[i].username == userInputName && loanInformation[i].password == userInputPass) {
                            var paidAmount = Number(parseInt(prompt(Enum_js_1.detail.loanAmount)));
                            if (Number.isNaN(paidAmount) || paidAmount < 1) {
                                console.log("Please enter valid amount");
                                check = false;
                            }
                            else if (loanInformation[i].Loanamount < paidAmount) {
                                console.log("You are entering an amount greater than the loan amount.");
                            }
                            else {
                                console.log("You successfully paid the loan.");
                                var balance = loanInformation[i].Loanamount - paidAmount;
                                loanInformation[i].Loanamount = balance;
                                if (balance === 0) {
                                    loanInformation[i].LoanApprove = false;
                                }
                                fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(loanInformation, null, 2));
                            }
                        }
                    }
                } while (check == false);
                break;
            case 4:
                var userInputName = prompt(Enum_js_1.detail.userInput);
                var userInputPass = prompt(Enum_js_1.detail.userPass);
                for (var i = 0; i < loanInformation.length; i++) {
                    if (loanInformation[i].username == userInputName && loanInformation[i].password == userInputPass) {
                        var viewBalance = loanInformation[i].Loanamount;
                        console.log("You have taken a Rs.".concat(viewBalance, " loan from the bank"));
                    }
                }
                break;
            default:
                break;
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
    var response = parseInt(prompt("Please choose  one option \n    1. User Login\n    2. Admin Login\n    "));
    console.clear();
    if (response === 1) {
        console.clear();
        console.log("******* User Login *****");
        var userResponse = parseInt(prompt("Please select  option :\n    \n     1. Create a New Account\n     2. Show Details \n     3. Deposit (Upto 7 Digit Amount)\n     4. Withdraw\n     5. View Balance\n     6. Loan Section \n     7. Exit\n\n     "));
        console.clear();
        switch (userResponse) {
            case 1:
                userDetails = user.createAccount();
                var fs = require('fs');
                var path = require('path');
                var exitingData = fs.readFileSync('user.json');
                var userInformation = JSON.parse(exitingData);
                userInformation.push(userDetails);
                fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(userInformation, null, 2));
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
            case 6:
                bank.LoanSection();
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
                    case 6:
                        admin.deleteAccount();
                    case 7:
                        admin.ApproveLoan();
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
} while (input != 7);
