"use strict";
exports.__esModule = true;
var InputDetailEnum_1 = require("./Constants/InputDetailEnum");
var user_1 = require("./Modules/User/user");
var user_js_1 = require("./Modules/User/user.js");
var admin_js_1 = require("./Modules/Admin/admin.js");
var bank_js_1 = require("./Modules/Bank/bank.js");
// Banking management system  Project
var ps = require(InputDetailEnum_1.detail.prompt);
var prompt = ps();
console.log(" ****** Welcome to the bank management system.****** ");
var user = new user_js_1.User();
var bank = new bank_js_1.Bank();
var admin = new admin_js_1.Admin();
do {
    var response = parseInt(prompt(InputDetailEnum_1.detail.bankLogin));
    console.clear();
    if (response === 1) {
        console.clear();
        do {
            console.log("******* User Login *****");
            var userResponse = parseInt(prompt(InputDetailEnum_1.detail.userLogin));
            console.clear();
            switch (userResponse) {
                case 1:
                    console.log("**** New Account registrations ****");
                    var userDetails = user.createAccount();
                    user_1.customerDetails.push(userDetails);
                    user_1.fs.writeFileSync(user_1.path.resolve(__dirname, InputDetailEnum_1.detail.userDB), JSON.stringify(user_1.customerDetails, null, 2));
                    console.log("Account created successfully");
                    break;
                case 2:
                    console.log("**** Customers Details ****");
                    user.showDetails();
                    break;
                case 3:
                    console.log("**** Deposit Amount ****");
                    bank.deposit();
                    break;
                case 4:
                    console.log("**** Withdraw Amount ****");
                    bank.withdraw();
                    break;
                case 5:
                    console.log("**** View Balance ****");
                    bank.view_balance();
                    break;
                case 6:
                    console.log("**** Loan Section ****");
                    bank.LoanSection();
                    break;
                case 7:
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
        var userInputName = prompt(InputDetailEnum_1.detail.userInput);
        var userInputPass = prompt(InputDetailEnum_1.detail.userPass);
        console.clear();
        if (user_1.adminDetails[0].adminUserName == userInputName && user_1.adminDetails[0].adminPass == userInputPass) {
            console.log("Admin login successfully done");
            console.clear();
            do {
                var adminResponse = parseInt(prompt(InputDetailEnum_1.detail.adminLogin));
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
                        console.log("*** Loan approve  *** ");
                        admin.ApproveLoan();
                        break;
                    case 6:
                        console.clear();
                        console.log("*** Loan Holder *** ");
                        admin.LoanHolder();
                        break;
                    case 7:
                        console.clear();
                        console.log("*** Total bank statement *** ");
                        admin.BankAmount();
                        break;
                    default:
                        console.clear();
                        break;
                }
            } while (adminResponse != 8);
        }
        else {
            console.log("Please enter valid input ");
        }
    }
} while (response != 8);
