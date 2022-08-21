import { detail } from "./Enum.js";

// Banking management system 
const ps = require("prompt-sync")
const prompt = ps()



let fs = require('fs');
let path = require('path');
let customerData = fs.readFileSync('user.json');
let customerDetails = JSON.parse(customerData);
let adminData = fs.readFileSync('admin.json');
let adminDetails = JSON.parse(adminData)

interface userDetailsJSON {
    name: string,
    age: number,
    mobileNumber: number,
    email: string,
    birth: string,
    accountNo: number,
    accountType: string,
    username: string,
    password: string,
    amount: number,
    LoanApprove: boolean,
    Loanamount: number
}

// We Have created on user class 
class User implements userDetailsJSON {
    name: string;
    age: number;
    mobileNumber: number;
    email: string;
    birth: string;
    accountNo: number;
    accountType: string;
    username: string;
    password: string;
    amount: number;
    LoanApprove: boolean;
    Loanamount: number

    createAccount = () => {
        let check: boolean;
        // Input details for name
        do {
            check = true;
            var name: string = String(prompt(detail.name));
            let temp: number = Number(name);
            if (!(Number.isNaN(temp))) {
                console.log("Please enter valid name");
                check = false;
            }
        } while (check == false);

        // Input details for age 
        do {
            check = true;
            var age: number = parseInt(prompt(detail.age));
            if (isNaN(age) || age < 18 || age > 80) {
                console.log("The age must be a number between 18 and 80");
                check = false
            }
        } while (check == false);

        // input details for Mobile number 

        do {
            check = true;
            var mobileNumber: number = parseInt(prompt(detail.contactNo));
            if (!mobileNumber || mobileNumber.toString().length != 10) {
                console.log("Please provide 10 Digit numeric value");
                check = false;
            }
        } while (check == false);

        // input details  for email
        do {
            var pattern: RegExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            check = true;
            var email: string = prompt(detail.email);
            if (email.match(pattern) === null) {
                console.log("Please enter valid email");
                check = false;
            }

        } while (check == false);

        // Input details for date of Birth 

        do {
            var dateReg: RegExp = /^\d{2}([./-])\d{2}\1\d{4}$/
            check = true;
            var birth: string = prompt(detail.dateOfBirth);
            var ageMS: number = Date.parse(Date()) - Date.parse(birth);
            let age: Date = new Date();
            age.setTime(ageMS);
            let ageYear: number = age.getFullYear() - 1970;
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
            var username: string = String(prompt(detail.username));
            let temp: number = Number(username);
            if (!(Number.isNaN(temp))) {
                console.log("Please enter valid Input ");
                check = false;
            }
        } while (check == false);
        // Intial  amount

        var amount: number = 0;
        // input details for password 
        var password: string = prompt(detail.password);

        // Auto generated Account number .

        var accountNo: number = Math.floor((Math.random() * 10000) + 1); // 4 Digit account number 

        // default account type will be Saving

        let accountType: string = "Saving";

        // Loan Applicable

        let loanApplicable: boolean = true;

        // Loan Amount 

        let Loanamount: number = 0;

        //  Loan Limit


        let loanLimit = 500000;


        // Loan Taken 

        let loanTaken = 0 ;


        // loan application 

        let loanApplied: boolean = false;

        // return the all input 

        return { name, age, mobileNumber, email, birth, accountNo, accountType, username, password, amount, loanApplicable, loanTaken,  Loanamount, loanLimit, loanApplied };
    }

    // Details of the customer 

    showDetails = (customerDetails): void => {
        let check: boolean;
        let no: number = 0;
        var userInputName: string;
        var userInputPass: string
        check = true
        while (check != false) {
            userInputName = prompt(detail.userInput)
            userInputPass = prompt(detail.userPass);
            for (let i = 0; i < customerDetails.length; i++) {
                if (customerDetails[i].username == userInputName && customerDetails[i].password == userInputPass) {
                    check = false
                    no = i;
                }
            }
        }
        if (check === false) {
            console.table(customerDetails[no])
        }
    }
}
// Admin class for view user details .

class Admin implements userDetailsJSON {
    name: string;
    age: number;
    mobileNumber: number;
    email: string;
    birth: string;
    accountNo: number;
    accountType: string;
    username: string;
    password: string;
    amount: number;
    LoanApprove: boolean;
    Loanamount: number

    userDetails(): void {
        console.table(customerDetails)

    }
    accountHolderBasedOnAmount(): void {
        let response: number
        do {
            response = parseInt(prompt(`Please choose  one option 
    1. Rs.0 amount Holder
    2. Rs. < 1 Lakh amount Holder
    3. Rs. > 1 Lakh amount Holder
    4. Exit
    `))
            console.clear()
            switch (response) {
                case 1:
                    var zeroBalanceData = customerDetails.filter(function (ele) {
                        return ele.amount == 0;
                    })
                    console.table(zeroBalanceData)
                    break
                case 2:

                    var oneLakh = customerDetails.filter(function (ele) {
                        return ele.amount > 0 && ele.amount < 100000;
                    })
                    console.table(oneLakh)
                    break
                case 3:
                    var more_than_oneLakh = customerDetails.filter(function (ele) {
                        return ele.amount >= 100000;
                    })
                    console.table(more_than_oneLakh);
                    break
                default:
                    break


            }
        } while (response != 4)
    }
    deleteAccount(): void {

        var removeAmount = (customerDetails, amount: number) => {
            const requiredIndex = customerDetails.findIndex(el => {
                return el.amount === Number(amount);
            });
            if (requiredIndex === -1) {
                return true;
            };
            return !!customerDetails.splice(requiredIndex, 1);
        };
        removeAmount(customerDetails, 0)

        fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(customerDetails, null, 2));
        console.log("Account deleted Successfully")
    }
    SavingAccount(): void {

        var authorizedUser = customerDetails.filter(function (ele) {
            return ele.accountType == "Saving";
        })
        console.table(authorizedUser);
    }
    CurrentAccount(): void {

        var currentaccount: string = customerDetails.filter(function (ele) {
            return ele.accountType == "Current";
        })
        console.table(currentaccount);

    }
    ApproveLoan(): void {
        for (let i = 0; i < customerDetails.length; i++) {
            if (customerDetails[i].loanApplied == true) {
                customerDetails[i].loanApplied = false
                customerDetails[i].amount += customerDetails[i].loanTaken
                customerDetails[i].loanTaken = 0
                fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(customerDetails, null, 2));
                if (customerDetails[i].amount > 100000) {
                    customerDetails[i].accountType = "Current";
                    fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(customerDetails, null, 2));
                }

            }
        }
        console.log("The loan was approved successfully.")
    }

    LoanHolder(): void {

        var loanUser = customerDetails.filter(function (ele) {
            return ele.Loanamount > 0;
        })
        console.table(loanUser);


    }
    BankAmount(): void {
        let BankCash: number = 0;
        let LoanCash: number = 0;
        let count = 0
        for (let i = 0; i < customerDetails.length; i++) {
            BankCash += customerDetails[i].amount
            LoanCash += customerDetails[i].Loanamount
            count++
        }
        console.log(`The total amount in your bank is  Rs.${BankCash}.`)
        console.log(`The total amount lent to the customer is Rs.${LoanCash}.`)
        console.log(` The total number of customers is ${count}.`)
    }
}
// Bank class  for the deposit , withdraw & show balance 


class Bank implements userDetailsJSON {
    name: string;
    age: number;
    mobileNumber: number;
    email: string;
    birth: string;
    accountNo: number;
    accountType: string;
    username: string;
    password: string;
    amount: number;
    LoanApprove: boolean;
    Loanamount: number

    public deposit(customerDetails): void {
        let check: boolean
        do {
            check = true;
            var userInputName: string = prompt(detail.userInput)
            var userInputPass: string = prompt(detail.userPass)
            for (let i = 0; i < customerDetails.length; i++) {
                if (customerDetails[i].username == userInputName && customerDetails[i].password == userInputPass) {
                    let amount: number = Number(parseInt(prompt(detail.deposit)))
                    let balance: number = Number(customerDetails[i].amount);
                    if (Number.isNaN(amount) || amount < 1 || String(amount).length >= 7) {
                        console.log("Please enter valid amount")
                        check = false;
                    }
                    else {
                        balance = balance + amount
                        customerDetails[i].amount = balance;
                        fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(customerDetails, null, 2));
                        console.log(`You have deposited Rs ${amount} in your account .`)
                        if (customerDetails[i].amount > 100000) {
                            customerDetails[i].accountType = "Current"
                            fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(customerDetails, null, 2));
                        }
                        check = true
                    }
                }
            }
        } while (check == false)
    }
    withdraw = (customerDetails): void => {
        let check: boolean
        const path = require('path');
        var userInputName: number = prompt(detail.userInput)
        var userInputPass: number = prompt(detail.userPass)
        do {
            check = true;
            for (let i = 0; i < customerDetails.length; i++) {
                if (customerDetails[i].username == userInputName && customerDetails[i].password == userInputPass) {
                    var withDraw: number = Number(parseInt(prompt(detail.withdraw)))
                    if (Number.isNaN(withDraw) || withDraw < 1) {
                        console.log("Please enter valid amount")
                        check = false
                    }
                    else if (withDraw > customerDetails[i].amount) {
                        console.log(`Insufficient fund`);
                    } else {
                        console.log("The amount was withdrawn successfully.")
                        let balance: number = customerDetails[i].amount - withDraw;
                        customerDetails[i].amount = balance;
                        fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(customerDetails, null, 2));
                        console.log(`The remaining balance in your account is ${balance}`)
                        if (customerDetails[i].amount <= 100000) {
                            customerDetails[i].accountType = "Saving";
                            fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(customerDetails, null, 2));
                        }
                    }
                    break
                }
            }
        } while (check == false)
    }

    view_balance(customerDetails): void {
        var userInputName: string = prompt(detail.userInput)
        var userInputPass: string = prompt(detail.userPass);
        for (let i = 0; i < customerDetails.length; i++) {
            if (customerDetails[i].username == userInputName && customerDetails[i].password == userInputPass) {
                let viewBalance = customerDetails[i].amount
                console.log(`The amount in your account ${viewBalance}`)
            }
        }
    }
    LoanSection(): void {
        let loanResponse: number;
        var userInputName: string = prompt(detail.userInput)
        var userInputPass: string = prompt(detail.userPass)
        do {
            loanResponse = parseInt(prompt(`Please choose  one option 
    1. Apply for Loan (Upto 5 Lakh)
    2. Loan Status 
    3. Paid Loan
    4. Loan Amount
    5. Exit
    `))
            console.clear()
            let check: boolean;
            switch (loanResponse) {
                case 1:
                    console.log(" *** Loan Application  *** ")
                    do {
                        check = true
                        for (let i = 0; i < customerDetails.length; i++) {
                            if (customerDetails[i].username == userInputName && customerDetails[i].password == userInputPass) {
                                var LoanAmount: number = Number(parseInt(prompt(detail.loanAmount)))
                                if (customerDetails[i].loanApplied == true) {
                                    console.log(" Your previous loan was not approved.")

                                }
                                else if (Number.isNaN(LoanAmount) || LoanAmount < 1) {
                                    console.log("Please enter valid amount")
                                    check = false
                                } else if (customerDetails[i].loanApplicable == false) {
                                    console.log(" Your loan limit has exceeded.")
                                }
                                else if (customerDetails[i].loanLimit < LoanAmount) {
                                    console.log("You have entered an amount that is greater than the loan limit.")
                                    check = false
                                }

                                else {
                                    customerDetails[i].Loanamount += LoanAmount;
                                    customerDetails[i].loanTaken += LoanAmount;
                                    customerDetails[i].loanLimit = customerDetails[i].loanLimit - LoanAmount
                                    customerDetails[i].loanApplied = true;
                                    fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(customerDetails, null, 2));
                                    console.log("You successfully applied for a loan.")
                                    if (customerDetails[i].loanLimit < 1) {
                                        customerDetails[i].loanApplicable = false
                                        fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(customerDetails, null, 2));
                                    }
                                    else {
                                        customerDetails[i].loanApplicable = true;
                                        fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(customerDetails, null, 2));
                                    }
                                }
                            }
                        }
                    } while (check == false)
                    break
                case 2:
                    console.log("  *** Loan Status *** ")
                    for (let i = 0; i < customerDetails.length; i++) {
                        if (customerDetails[i].username == userInputName && customerDetails[i].password == userInputPass) {
                            if (customerDetails[i].loanApplied == true) {
                                console.log("Your loan is not approved. ")
                            }
                            else {
                                console.log("Your loan is approved ")
                            }
                        }
                    }
                    break
                case 3:
                    console.log(" *** Pay Loan *** ")
                    do {
                        check = true
                        for (let i = 0; i < customerDetails.length; i++) {
                            if (customerDetails[i].username == userInputName && customerDetails[i].password == userInputPass) {
                                var paidAmount: number = Number(parseInt(prompt(detail.loanAmount)))
                                if (Number.isNaN(paidAmount) || paidAmount < 1) {
                                    console.log("Please enter valid amount")
                                    check = false
                                }
                                else if (customerDetails[i].Loanamount < paidAmount) {
                                    console.log("You are entering an amount greater than the loan amount.")

                                }

                                else {
                                    console.log("You successfully paid the loan.")
                                    customerDetails[i].Loanamount -= paidAmount;
                                    customerDetails[i].loanLimit += paidAmount
                                    fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(customerDetails, null, 2)) ;
                                    if (customerDetails[i].loanLimit > 0) {
                                        customerDetails[i].loanApplicable = true
                                        fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(customerDetails, null, 2));                                        
                                    }

                                }


                            }
                        }
                    } while (check == false)
                    break
                case 4:
                    console.log("  *** Your loan amount *** ")

                    for (let i = 0; i < customerDetails.length; i++) {
                        if (customerDetails[i].username == userInputName && customerDetails[i].password == userInputPass) {
                            let viewBalance = customerDetails[i].Loanamount
                            console.log(`You have taken a Rs.${viewBalance} loan from the bank`)
                        }
                    }
                    break
                default:
                    break
            }
        } while (loanResponse != 5)
    }
    moneyTransfer(): void {
        var userInputName: string = prompt(detail.userInput)
        var userInputPass: string = prompt(detail.userPass);
        for (let i = 0; i < customerDetails.length; i++) {
            if (customerDetails[i].username == userInputName && customerDetails[i].password == userInputPass) {
                var transferAmount: number = parseInt(prompt(detail.moneyTransfer));
                var receiverAccountNumber: number = parseInt(prompt(detail.receiverAccountNo));
                if (!transferAmount || !receiverAccountNumber || receiverAccountNumber.toString().length != 4 || transferAmount < 1) {
                    console.log("Please enter valid input")

                } else if (transferAmount > customerDetails[i].amount) {
                    console.log("Your account has insufficient balance.")
                }
                else {
                    for (let i = 0; i < customerDetails.length; i++) {
                        if (customerDetails[i].accountNo === receiverAccountNumber) {
                            customerDetails[i].amount += transferAmount
                            fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(customerDetails, null, 2))
                            console.log("The money was transferred successfully.")
                            if (customerDetails[i].amount > 100000) {
                                customerDetails[i].accountType = "Current";
                                fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(customerDetails, null, 2))


                            }
                        }
                    }
                    customerDetails[i].amount = customerDetails[i].amount - transferAmount
                    fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(customerDetails, null, 2))
                    if (customerDetails[i].amount <= 100000) {
                        customerDetails[i].accountType = "Saving";
                        fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(customerDetails, null, 2))


                    }
                }
            }
        }
    }
}

console.log(" ****** Welcome to the bank management system.****** ")
let userDetails: object;
let initialAmount
let response: number;
let adminResponse: number;
let user: User = new User();
let bank: Bank = new Bank();
let admin: Admin = new Admin()

do {
    response = parseInt(prompt(`Please choose  one option 
    1. User Login
    2. Admin Login
    `))
    console.clear();
    if (response === 1) {
        console.clear();
        let userResponse: number;
        do {
            console.log("******* User Login *****")
            userResponse = parseInt(prompt(`Please choose one  option :
    
     1. Create a New Account
     2. Show Details 
     3. Deposit (Upto 7 Digit Amount)
     4. Withdraw
     5. View Balance
     6. Loan Section 
     7. Money Transfer 
     8. Exit
     `))
            console.clear()
            switch (userResponse) {
                case 1:
                    console.clear()
                    console.log("**** New Account registrations ****")
                    userDetails = user.createAccount()
                    customerDetails.push(userDetails)
                    fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(customerDetails, null, 2));
                    console.log("Account created successfully")
                    break
                case 2:
                    console.clear()
                    console.log("**** Customers Details ****")
                    user.showDetails(customerDetails)
                    break
                case 3:
                    console.clear()
                    console.log("**** Deposit Amount ****")
                    initialAmount = bank.deposit(customerDetails)
                    break
                case 4:
                    console.clear()
                    console.log("**** Withdraw Amount ****")
                    bank.withdraw(customerDetails)
                    break
                case 5:
                    console.clear()
                    console.log("**** View Balance ****")
                    bank.view_balance(customerDetails)
                    break
                case 6:
                    console.clear()
                    console.log("**** Loan Section ****")
                    bank.LoanSection()
                    break
                case 7:
                    console.clear()
                    console.log("**** Money Transfer ****")
                    bank.moneyTransfer()
                default:
                    break
            }
        } while (userResponse != 8)
    }
    else if (response === 2) {
        console.clear()
        console.log("******* Admin Login *****")
        var userInputName: number = prompt(detail.userInput)
        var userInputPass: number = prompt(detail.userPass);
        console.clear()
        if (adminDetails[0].adminUserName == userInputName && adminDetails[0].adminPass == userInputPass) {
            console.log("Admin login successfully done")
            console.clear()
            do {
                adminResponse = parseInt(prompt(`Please choose option :
     1. User Details 
     2. Account Holder details Based On amount
     3. Saving Accounts  (Amount less than 1 Lakh)
     4. Current Accounts (Amount more than 1 Lakh)
     5. Delete Account   (Zero Balance Holder)
     6. Approve Loan 
     7. Loan Holder
     8. Bank Statement 
     9. Exit
     `))
                console.clear()
                switch (adminResponse) {
                    case 1:
                        console.clear()
                        console.log(" *** All customers details. ***")
                        admin.userDetails()
                        break
                    case 2:
                        console.clear()
                        console.log(" *** Customers details based on amount ***")
                        admin.accountHolderBasedOnAmount()
                        break
                    case 3:
                        console.clear()
                        console.log("*** The number of people who have a savings account. ***")
                        admin.SavingAccount()
                        break
                    case 4:
                        console.clear()
                        console.log("*** The number of people who have a current account. *** ")
                        admin.CurrentAccount()
                        break
                    case 5:
                        console.clear()
                        console.log("*** Delete the account with zero balance.  *** ")
                        admin.deleteAccount()
                        break
                    case 6:
                        console.clear()
                        console.log("*** Loan approve  *** ")
                        admin.ApproveLoan()
                        break
                    case 7:
                        console.clear()
                        console.log("*** Loan Holder *** ")
                        admin.LoanHolder()
                        break
                    case 8:
                        console.clear()
                        console.log("*** Total bank statement *** ")
                        admin.BankAmount()
                        break
                    default:
                        console.clear()
                        break
                }
            } while (adminResponse != 9)
        } else {
            console.log("Please enter valid input ")
        }
    }
} while (response != 8)

export { }
