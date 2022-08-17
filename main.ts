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
            if ((Number.isNaN(age))) {
                console.log("Please enter valid age");
                check = false;
            }
            // else if (age < 18 && age > 85 ) {
            //     console.log("You are not eligible for account creation.");
            //     check = false;
            // }

        } while (check == false);

        // input details for contact number 

        do {
            check = true;
            var contactNo = parseInt(prompt(detail.contactNo));
            let temp = Number(contactNo);
            if (String(contactNo).length < 10) {
                console.log("Please Enter 10 digit number ")
                check = false;
                if ((Number.isNaN(temp))) {
                    console.log("Please enter valid Mobile number");
                    check = false;
                }
            }
        } while (check == false);

        // input details  for email
        do {
            var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            check = true;
            var email = prompt(detail.email);
            if (email.match(pattern) === null) {
                check = false
                console.log("Please enter valid email")
            }

        } while (check == false);

        // Input details for date of Birth 

        do {
            var dateReg = /^\d{2}([./-])\d{2}\1\d{4}$/
            check = true;
            var dateOfbirth = prompt(detail.dateOfBirth);
            if (dateOfbirth.match(dateReg) == null) {
                console.log("Please enter valid date ");
                check = false;
            }
        } while (check == false);

        // input details for username

        do {
            check = true;
            var username: string = prompt(detail.username);
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

        // return the all input 

        return { name, age, contactNo, email, dateOfbirth, accountNo, username, password, amount, flag };
    }

    // Details of the customer 

    showDetails = (userData) => {
        let check
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
    zeroBalanceHolder() {
        const fz = require('fs');
        let zero = JSON.parse(fz.readFileSync('user.json'));
        var zeroBalance = zero.filter(function (ele) {
            return ele.amount == 0;
        })
        console.table(zeroBalance)
    }
    one_Lakh_Holder() {
        const fz = require('fs');
        let zero = JSON.parse(fz.readFileSync('user.json'));
        var oneLakh = zero.filter(function (ele) {
            return ele.amount > 0 && ele.amount < 100000;
        })
        console.table(oneLakh)
    }

    more_Than_1lakh() {
        const fz = require('fs');
        let zero = JSON.parse(fz.readFileSync('user.json'));
        var more_than_oneLakh = zero.filter(function (ele) {
            return ele.amount >= 100000;
        })
        console.table(more_than_oneLakh);
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
    isAuthenticate() {
        const fz = require('fs');
        let data = fz.readFileSync('user.json');
        let auth = JSON.parse(data);
        const path = require('path');
        for (let i = 0; i < auth.length; i++) {
            if (auth[i].amount === 0) {
                auth[i].flag = false
                fz.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(auth, null, 2));

            } else {
                auth[i].flag = true
                fz.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(auth, null, 2));

            }

        }
        console.log("All accounts authenticated successfully ")
    }
    authorizeUsers() {
        const fz = require('fs');
        let data = fz.readFileSync('user.json');
        let zero = JSON.parse(data);
        var authorizedUser = zero.filter(function (ele) {
            return ele.flag == true;
        })
        console.table(authorizedUser);
    }
    unauthorizeUsers() {
        const fz = require('fs');
        let data = fz.readFileSync('user.json');
        let zero = JSON.parse(data);
        var unauthorizedUser = zero.filter(function (ele) {
            return ele.flag == false;
        })
        console.table(unauthorizedUser);

    }
}

// Bank class  for the deposit , withdraw & show balance 

class Bank {

    public deposit(depositId, ff) {
        const path = require('path');
        var userInputName: string = prompt(detail.userInput)
        var userInputPass: number = prompt(detail.userPass)
        for (let i = 0; i < depositId.length; i++) {
            if (depositId[i].username == userInputName && depositId[i].password == userInputPass) {
                let amount: number = Number(prompt(detail.deposit))
                let balance = Number(depositId[i].amount)
                balance = balance + amount;
                depositId[i].amount = balance;
                ff.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(depositId, null, 2));
                console.log(`You have deposited Rs ${amount} in your account .`)
            }
        }
    }
    withdraw = (withdawId, fc) => {
        const path = require('path');
        var userInputName: number = prompt(detail.userInput)
        var userInputPass: number = prompt(detail.userPass)
        for (let i = 0; i < withdawId.length; i++) {
            if (withdawId[i].username == userInputName && withdawId[i].password == userInputPass) {
                var withDraw: number = parseInt(prompt(detail.withdraw))
                if (withDraw < 1) {
                    console.log("Please enter valid amount")
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
    1. User Class 
    2. Admin Class 
    `))
    console.clear()
    if (response === 1) {
        console.clear()
        console.log("******* User Login *****")
        let userResponse: number = parseInt(prompt(`Please select  option :
    
     1. Create a New Account
     2. Show Details 
     3. Deposit 
     4. Withdraw
     5. View Balance
     6. Exit

     `))
        console.clear()
        switch (userResponse) {
            case 1:
                userDetails = user.createAccount()
                const fs = require('fs');
                const path = require('path');
                let exitingData = fs.readFileSync('user.json');
                let userDatas = JSON.parse(exitingData)
                userDatas.push(userDetails)
                fs.writeFileSync(path.resolve(__dirname, 'user.json'), JSON.stringify(userDatas, null, 2));
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

     1. UserDetails 
     2. Rs.0 Balance Holder User
     3. < 1L Amount holder User
     4. > 1L Amount holder User
     5. User Authentication
     6. Authorized User  
     7. Unauthorized User (
     8. Delete Account
     9.exit

     `))
                console.clear()
                switch (adminResponse) {
                    case 1:
                        admin.userDetails()
                        break
                    case 2:
                        admin.zeroBalanceHolder()
                        break

                    case 3:
                        admin.one_Lakh_Holder()
                        break

                    case 4:
                        admin.more_Than_1lakh()
                        break
                    case 5:
                        admin.isAuthenticate()
                        break
                    case 6:
                        admin.authorizeUsers()
                        break
                    case 7:
                        admin.unauthorizeUsers()
                        break
                    case 8:
                        admin.deleteAccount()
                    default:
                        break
                }
            } while (adminResponse != 9)
        } else {
            console.log("Please enter valid input ")
        }
    }

} while (input != 6)

export { }
