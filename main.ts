import { detail } from "./Enum.js";

// Banking management system 
const ps = require("prompt-sync")
const prompt = ps()

// We Have created on user class 
class User {

    createAccount = () => {
        let check
        // Input details for name
        do {
            check = true;
            var name: string = String(prompt(detail.name));
            let temp = Number(name);
            if (!(Number.isNaN(temp))) {
                console.log("Please enter valid name");
                check = false;
            }
        } while (check == false);

        // Input details for age 
        do {
            check = true;
            var age = parseInt(prompt(detail.age));
            if (isNaN(age) || age < 18 || age > 80) {
                console.log("The age must be a number between 18 and 80");
                check = false
            }
        } while (check == false);

        // input details for Mobile number 

        do {
            check = true;
            var mobileNumber = parseInt(prompt(detail.contactNo));
            if (!mobileNumber || mobileNumber.toString().length != 10) {
                console.log("Please provide 10 Digit numeric value");
                check = false;
            }
        } while (check == false);

        // input details  for email
        do {
            var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            check = true;
            var email = prompt(detail.email);
            if (email.match(pattern) === null) {
                console.log("Please enter valid email");
                check = false;
            }

        } while (check == false);

        // Input details for date of Birth 

        do {
            var dateReg = /^\d{2}([./-])\d{2}\1\d{4}$/
            check = true;
            var birth = prompt(detail.dateOfBirth);
            var ageMS = Date.parse(Date()) - Date.parse(birth);
            let age = new Date();
            age.setTime(ageMS);
            let ageYear = age.getFullYear() - 1970;
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
            let temp = Number(username);
            if (!(Number.isNaN(temp))) {
                console.log("Please enter valid Input ");
                check = false;
            }
        } while (check == false);
        // Intial  amount

        var amount = 0;
        // input details for password 
        var password: string = prompt(detail.password);

        // Auto generated Account number .

        var accountNo: number = Math.floor((Math.random() * 10000) + 1); // 4 Digit account number 

        // let set flag for authorization 

        let flag = true;

        // default account type will be Saving

        let accountType = "Saving";

        // Loan section 

        let LoanApprove = false;

        // Loan Amount 

        let Loanamount = 0;

        // return the all input 

        return { name, age, mobileNumber, email, birth, accountNo, accountType, username, password, amount, LoanApprove, Loanamount, flag };
    }

    // Details of the customer 

    showDetails = (userData) => {
        let check: boolean;
        let no = 0;
        var userInputName;
        var userInputPass
        check = true
        while (check != false) {
            userInputName = prompt(detail.userInput)
            userInputPass = prompt(detail.userPass);

            for (let i = 0; i < userData.length; i++) {
                if (userData[i].username == userInputName && userData[i].password == userInputPass) {
                    check = false
                    no = i;
                }
            }
        }
        if (check === false) {
            console.table(userData[no])
        }
    }
}
// Admin class for view user details , authorize to the user .  


class Admin {
    userDetails() {
        const fss = require('fs');
        console.table(JSON.parse(fss.readFileSync('user.json')))

    }
    accountHolderBasedOnAmount() {
        let response = parseInt(prompt(`Please choose  one option 
    1. Rs.0 amount Holder
    2. Rs. < 1 Lakh amount Holder
    3. Rs. > 1 Lakh amount Holder
    `))
        console.clear()
        switch (response) {
            case 1:
                let fs = require('fs');
                let zeroBalance = JSON.parse(fs.readFileSync('user.json'));
                var zeroBalanceData = zeroBalance.filter(function (ele) {
                    return ele.amount == 0;
                })
                console.table(zeroBalanceData)
                break
            case 2:
                const fz = require('fs');
                let one_Lakh_Holder = JSON.parse(fz.readFileSync('user.json'));
                var oneLakh = one_Lakh_Holder.filter(function (ele) {
                    return ele.amount > 0 && ele.amount < 100000;
                })
                console.table(oneLakh)
                break
            case 3:
                const fc = require('fs');
                let zero = JSON.parse(fc.readFileSync('user.json'));
                var more_than_oneLakh = zero.filter(function (ele) {
                    return ele.amount >= 100000;
                })
                console.table(more_than_oneLakh);


        }
    }
    deleteAccount() {
        const fz = require('fs');
        let zero = JSON.parse(fz.readFileSync('user.json'));
        const path = require('path');
        var removeAmount = (zero, amount) => {
            const requiredIndex = zero.findIndex(el => {
                return el.amount === Number(amount);
            });
            if (requiredIndex === -1) {
                return true;
            };
            return !!zero.splice(requiredIndex, 1);
        };
        removeAmount(zero, 0)

        fz.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(zero, null, 2));
        console.log("Account deleted Successfully")
    }
    SavingAccount() {
        const fz = require('fs');
        let data = fz.readFileSync('user.json');
        let zero = JSON.parse(data);
        var authorizedUser = zero.filter(function (ele) {
            return ele.accountType == "Saving";
        })
        console.table(authorizedUser);
    }
    CurrentAccount() {
        const fz = require('fs');
        let data = fz.readFileSync('user.json');
        let zero = JSON.parse(data);
        var currentaccount = zero.filter(function (ele) {
            return ele.accountType == "Current";
        })
        console.table(currentaccount);

    }

    AccountConvert() {
        const fz = require('fs');
        let data = fz.readFileSync('user.json');
        let accountTypeCheck = JSON.parse(data);
        const path = require('path');
        for (let i = 0; i < accountTypeCheck.length; i++) {
            if (accountTypeCheck[i].amount > 100000) {
                accountTypeCheck[i].accountType = "Current"
                fz.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(accountTypeCheck, null, 2));

            } else {
                accountTypeCheck[i].accountType = "Saving"
                fz.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(accountTypeCheck, null, 2));

            }

        }
        console.log("The account type changed successfully.")
    }

    ApproveLoan() {
        const fz = require('fs');
        let data = fz.readFileSync('user.json');
        let ApproveLoan = JSON.parse(data);
        const path = require('path');
        for (let i = 0; i < ApproveLoan.length; i++) {
            if (ApproveLoan[i].Loanamount > 1 && ApproveLoan[i].LoanApprove == false) {
                ApproveLoan[i].LoanApprove = true
                ApproveLoan[i].amount = ApproveLoan[i].amount + ApproveLoan[i].Loanamount
                fz.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(ApproveLoan, null, 2));

            } else if (ApproveLoan[i].Loanamount < 1 && ApproveLoan[i].LoanApprove == true) {
                ApproveLoan[i].LoanApprove = false;
                fz.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(ApproveLoan, null, 2));


            }

        }
        console.log("The loan was approved successfully.")
    }

    LoanHolder() {
        const fz = require('fs');
        let data = fz.readFileSync('user.json');
        let zero = JSON.parse(data);
        var loanUser = zero.filter(function (ele) {
            return ele.Loanamount > 0;
        })
        console.table(loanUser);


    }
    BankAmount() {
        const fz = require('fs');
        let data = fz.readFileSync('user.json');
        let BankAmount = JSON.parse(data);
        const path = require('path');
        let BankCash = 0;
        let LoanCash = 0;
        for (let i = 0; i < BankAmount.length; i++) {
            BankCash += BankAmount[i].amount
            LoanCash += BankAmount[i].Loanamount
        }
        console.log(`The total amount in your bank is  Rs.${BankCash}`)
        console.log(`The total amount lent to the customer is Rs.${LoanCash}`)
    }
}
// Bank class  for the deposit , withdraw & show balance 

class Bank {

    public deposit(depositId, ff) {
        let check: boolean
        const path = require('path');
        var userInputName: string = prompt(detail.userInput)
        var userInputPass: string = prompt(detail.userPass)
        do {
            check = true;
            for (let i = 0; i < depositId.length; i++) {
                if (depositId[i].username == userInputName && depositId[i].password == userInputPass) {
                    let amount = Number(parseInt(prompt(detail.deposit)))
                    let balance = Number(depositId[i].amount);
                    if (Number.isNaN(amount) || amount < 1 || String(amount).length >= 7) {
                        console.log("Please enter valid amount")
                        check = false;
                    } else {
                        balance = balance + amount;
                        depositId[i].amount = balance;
                        ff.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(depositId, null, 2));
                        console.log(`You have deposited Rs ${amount} in your account .`)
                        check = true

                    }

                }
            }
        } while (check == false)
    }
    withdraw = (withdawId, fc) => {
        let check: boolean
        const path = require('path');
        var userInputName: number = prompt(detail.userInput)
        var userInputPass: number = prompt(detail.userPass)
        do {
            check = true;
            for (let i = 0; i < withdawId.length; i++) {
                if (withdawId[i].username == userInputName && withdawId[i].password == userInputPass) {
                    var withDraw: number = Number(parseInt(prompt(detail.withdraw)))
                    if (Number.isNaN(withDraw) || withDraw < 1) {
                        console.log("Please enter valid amount")
                        check = false
                    }
                    else if (withDraw > withdawId[i].amount) {
                        console.log(`Insufficient fund`);
                    } else {
                        console.log("The amount was withdrawn successfully.")
                        let balance: number = withdawId[i].amount - withDraw;
                        withdawId[i].amount = balance;
                        fc.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(withdawId, null, 2));

                        console.log(`The remaining balance in your account is ${balance}`)
                    }
                    break
                }

            }
        } while (check == false)
    }
    view_balance(viewBalanceId) {
        var userInputName: number = prompt(detail.userInput)
        var userInputPass: number = prompt(detail.userPass);
        for (let i = 0; i < viewBalanceId.length; i++) {
            if (viewBalanceId[i].username == userInputName && viewBalanceId[i].password == userInputPass) {
                let viewBalance = viewBalanceId[i].amount
                console.log(`The amount in your account ${viewBalance}`)
            }
        }
    }
    LoanSection() {
        console.log(" Welcome to the loan Section ")
        let fs = require('fs');
        let path = require('path');
        let loanData = fs.readFileSync('user.json');
        let loanInformation = JSON.parse(loanData)
        let loanResponse = parseInt(prompt(`Please choose  one option 
    1. Apply for Loan (Upto 5 Lakh)
    2. Loan Status 
    3. Paid Loan
    4. Loan Amount
    5. Exit
    `))
        console.clear()
        let check
        switch (loanResponse) {
            case 1:
                var userInputName: number = prompt(detail.userInput)
                var userInputPass: number = prompt(detail.userPass)
                do {
                    check = true
                    for (let i = 0; i < loanInformation.length; i++) {
                        if (loanInformation[i].username == userInputName && loanInformation[i].password == userInputPass) {
                            var LoanAmount: number = Number(parseInt(prompt(detail.loanAmount)))
                            if (Number.isNaN(LoanAmount) || LoanAmount < 1 || LoanAmount > 500000) {
                                console.log("Please enter valid amount")
                                check = false
                            } else if (loanInformation[i].LoanApprove == true) {
                                console.log("You have already taken the loan.")
                                break

                            }
                            else {
                                console.log("You successfully applied for a loan.")
                                loanInformation[i].Loanamount = LoanAmount

                                fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(loanInformation, null, 2));

                                console.log(`Your Loan  balance is ${loanInformation[i].Loanamount}`)
                            }


                        }
                    }
                } while (check == false)
                break


            case 2:
                var userInputName: number = prompt(detail.userInput)
                var userInputPass: number = prompt(detail.userPass)
                for (let i = 0; i < loanInformation.length; i++) {
                    if (loanInformation[i].username == userInputName && loanInformation[i].password == userInputPass) {
                        if (loanInformation[i].LoanApprove == false) {
                            console.log("Your loan is not approved. ")
                        }
                        else {
                            console.log("Your loan is approved ")
                        }

                    }
                }
                break

            case 3:
                var userInputName: number = prompt(detail.userInput)
                var userInputPass: number = prompt(detail.userPass)
                do {
                    check = true
                    for (let i = 0; i < loanInformation.length; i++) {
                        if (loanInformation[i].username == userInputName && loanInformation[i].password == userInputPass) {
                            var paidAmount: number = Number(parseInt(prompt(detail.loanAmount)))
                            if (Number.isNaN(paidAmount) || paidAmount < 1) {
                                console.log("Please enter valid amount")
                                check = false
                            }
                            else if (loanInformation[i].Loanamount < paidAmount) {
                                console.log("You are entering an amount greater than the loan amount.")

                            }

                            else {
                                console.log("You successfully paid the loan.")
                                let balance: number = loanInformation[i].Loanamount - paidAmount;
                                loanInformation[i].Loanamount = balance;
                                if (balance === 0) {
                                    loanInformation[i].LoanApprove = false;
                                }
                                fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(loanInformation, null, 2))

                            }


                        }
                    }
                } while (check == false)
                break

            case 4:
                var userInputName: number = prompt(detail.userInput)
                var userInputPass: number = prompt(detail.userPass);
                for (let i = 0; i < loanInformation.length; i++) {
                    if (loanInformation[i].username == userInputName && loanInformation[i].password == userInputPass) {
                        let viewBalance = loanInformation[i].Loanamount
                        console.log(`You have taken a Rs.${viewBalance} loan from the bank`)
                    }
                }

                break

            default:
                break
        }

    }
}
console.log("Welcome to the bank management system. ")
let userDetails;
let initialAmount;
let input;
let adminResponse
let user = new User();
let bank = new Bank();
let admin = new Admin()

do {

    let response = parseInt(prompt(`Please choose  one option 
    1. User Login
    2. Admin Login
    `))
    console.clear()
    if (response === 1) {
        console.clear()
        console.log("******* User Login *****")
        let userResponse: number = parseInt(prompt(`Please select  option :
    
     1. Create a New Account
     2. Show Details 
     3. Deposit (Upto 7 Digit Amount)
     4. Withdraw
     5. View Balance
     6. Loan Section 
     7. Exit

     `))
        console.clear()
        switch (userResponse) {
            case 1:
                userDetails = user.createAccount()
                const fs = require('fs');
                const path = require('path');
                let exitingData = fs.readFileSync('user.json');
                let userInformation = JSON.parse(exitingData)
                userInformation.push(userDetails)
                fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(userInformation, null, 2));
                console.log("Account created successfully")
                break

            case 2:
                const fss = require('fs');
                let rawdata = fss.readFileSync('user.json');
                let userData = JSON.parse(rawdata);
                user.showDetails(userData)

                break
            case 3:
                const ff = require('fs');
                let depositFIle = ff.readFileSync('user.json');
                let depositId = JSON.parse(depositFIle);
                initialAmount = bank.deposit(depositId, ff)

                break
            case 4:
                const fc = require('fs');
                let withdrawFile = fc.readFileSync('user.json');
                let withdrawId = JSON.parse(withdrawFile);
                bank.withdraw(withdrawId, fc)
                break
            case 5:
                const fa = require('fs');
                let balanceFile = fa.readFileSync('user.json');
                let viewBalanceId = JSON.parse(balanceFile);
                bank.view_balance(viewBalanceId)
                break
            case 6:
                bank.LoanSection()
                break

            default:
                break
        }
    } else if (response === 2) {
        console.clear()
        console.log("******* Admin Login *****")
        const AC = require('fs');
        let adminFile = AC.readFileSync('admin.json');
        let adminDetailsId = JSON.parse(adminFile);
        var userInputName: number = prompt(detail.userInput)
        var userInputPass: number = prompt(detail.userPass);
        if (adminDetailsId[0].adminUserName == userInputName && adminDetailsId[0].adminPass == userInputPass) {
            console.log("Admin login successfully done")
            do {
                adminResponse = parseInt(prompt(`Please choose option :

     1. User Details 
     2. Account Holder details Based On amount
     3. Saving Accounts  (Amount less than 1 Lakh)
     4. Current Accounts (Amount more than 1 Lakh)
     5. Account Convert  (Saving >< Current )
     6. Delete Account   (Zero Balance Holder)
     7. Approve Loan 
     8. Loan Holder
     9. Bank Statement 
    10. Exit

     `))
                console.clear()
                switch (adminResponse) {
                    case 1:
                        admin.userDetails()
                        break
                    case 2:
                        admin.accountHolderBasedOnAmount()
                        break
                    case 3:
                        admin.SavingAccount()
                        break
                    case 4:
                        admin.CurrentAccount()
                        break
                    case 5:
                        admin.AccountConvert()
                    case 6:
                        admin.deleteAccount()
                    case 7:
                        admin.ApproveLoan()
                    case 8:
                        admin.LoanHolder()
                        break
                    case 9:
                        admin.BankAmount()
                        break
                    default:
                        break
                }
            } while (adminResponse != 10)
        } else {
            console.log("Please enter valid input ")
        }
    }

} while (input != 7)

export { }
