"use strict";
exports.__esModule = true;
exports.User = void 0;
var InputDetailEnum_1 = require("../../Constants/InputDetailEnum");
var sqlite3 = require(InputDetailEnum_1.detail.sqlite).verbose();
var db = new sqlite3.Database(InputDetailEnum_1.detail.database);
var ps = require(InputDetailEnum_1.detail.prompt);
var prompt = ps();
var User = /** @class */ (function () {
    function User() {
        this.createAccount = function () {
            var check;
            // Input details for name
            do {
                check = true;
                var name = String(prompt(InputDetailEnum_1.detail.name));
                var temp = Number(name);
                if (!(Number.isNaN(temp))) {
                    console.log("Please enter valid name");
                    check = false;
                }
            } while (check == false);
            // Input details for age 
            do {
                check = true;
                var age = parseInt(prompt(InputDetailEnum_1.detail.age));
                if (isNaN(age) || age < 18 || age > 80) {
                    console.log("The age must be a number between 18 and 80");
                    check = false;
                }
            } while (check == false);
            // input details for Mobile number 
            do {
                check = true;
                var mobileNumber = parseInt(prompt(InputDetailEnum_1.detail.contactNo));
                if (!mobileNumber || mobileNumber.toString().length != 10) {
                    console.log("Please provide 10 Digit numeric value");
                    check = false;
                }
            } while (check == false);
            // input details  for email
            do {
                check = true;
                var emailPattern = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
                var email = prompt(InputDetailEnum_1.detail.email);
                if (email.match(emailPattern) === null) {
                    console.log("Please enter valid email");
                    check = false;
                }
            } while (check == false);
            // Input details for date of Birth 
            do {
                check = true;
                var datePattern = /^\d{2}([./-])\d{2}\1\d{4}$/;
                var birth = prompt(InputDetailEnum_1.detail.dateOfBirth);
                var ageMS = Date.parse(Date()) - Date.parse(birth);
                var age_1 = new Date();
                age_1.setTime(ageMS);
                var ageYear = age_1.getFullYear() - 1970;
                if (birth.match(datePattern) == null) {
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
                var username = String(prompt(InputDetailEnum_1.detail.username));
                var temp = Number(username);
                if (!(Number.isNaN(temp))) {
                    console.log("Please enter valid Input ");
                    check = false;
                }
            } while (check == false);
            // Initial  amount
            var amount = 0;
            // input details for password 
            var password = prompt(InputDetailEnum_1.detail.password);
            // Auto generated Account number .
            var accountNo = Math.floor((Math.random() * 10000) + 1); // 4 Digit account number 
            // default account type will be Saving
            var accountType = InputDetailEnum_1.detail.savingAccount;
            // Loan Applicable
            var loanApplicable = true;
            // Loan Amount 
            var loanAmount = 0;
            //  Loan Limit
            var loanLimit = 500000;
            // Loan Taken 
            var loanTaken = 0;
            // loan application 
            var loanApplied = false;
            // return the all input 
            return { name: name, age: age, mobileNumber: mobileNumber, email: email, birth: birth, accountNo: accountNo, accountType: accountType, username: username, password: password, amount: amount, loanApplicable: loanApplicable, loanTaken: loanTaken, loanAmount: loanAmount, loanLimit: loanLimit, loanApplied: loanApplied };
        };
    }
    return User;
}());
exports.User = User;
