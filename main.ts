import { detail } from "./Enum.js";
// Banking management system 
const ps = require("prompt-sync")
const prompt = ps()

// We Have created on user class 
class User {

    createAccount = () => {
        let check
        // Input for Name
        do {
            check = true;
            var name: string = String(prompt(detail.name));
            let temp = Number(name);
            if (!(Number.isNaN(temp))) {
                console.log("Please enter valid name");
                check = false;
            }
        } while (check == false);

        // Input for age 
        do {
            check = true;
            var age = parseInt(prompt(detail.age));
            if ((Number.isNaN(age))) {
                console.log("Please enter valid age");
                check = false;
            }

        } while (check == false);
        // input for contact number 

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

        // input for email
        do {
            check = true;
            var email: string = prompt(detail.email);
            let temp = Number(email);
            if (!(Number.isNaN(temp))) {
                console.log("Please enter valid Input ");
                check = false;
            }
        } while (check == false);

        // Input for date of Birth 
        do {
            check = true;
            var dateOfbirth: string = prompt(detail.dateOfBirth);
            let temp = Number(email);
            if (!(Number.isNaN(temp))) {
                console.log("Please enter valid Input ");
                check = false;
            }
        } while (check == false);

        // input for username
        do {
            check = true;
            var username: string = prompt(detail.username);
            let temp = Number(username);
            if (!(Number.isNaN(temp))) {
                console.log("Please enter valid Input ");
                check = false;
            }
        } while (check == false);
        var amount = 0 ;
        var password: string = prompt(detail.password);
        var accountNo: number = Math.floor((Math.random() * 10000) + 1); // 4 Digit account number 
        return { name, age, contactNo, email, dateOfbirth, accountNo, username, password ,amount};
    }
    showDetails = (userData) => {
        var  check = true
        do {
            var userInputName: number = prompt(detail.userInput)
            var userInputPass: number = prompt(detail.userPass);
            for (let i = 0; i < userData.length; i++) {
                if (userData[i].username == userInputName && userData[i].password == userInputPass) {
                    console.log(" User name is ", userData[i].name,
                        "Age of user is ", userData[i].age,
                        "The account number of user is ", userData[i].accountNo,
                        "Date of birth user is ", userData[i].dateOfbirth,
                        "The amount in account is ", userData[i].amount
                    ) ; check = true 
                }
                else{
                    check = false
                }
            }
        } while (check = false)      
    }
}
class Bank extends User {

    public deposit(depositId,ff) {
            const path = require('path');
            var userInputName: string = prompt(detail.userInput)
            var userInputPass: number = prompt(detail.userPass)
            for (let i = 0; i < depositId.length; i++) {
                if (depositId[i].username == userInputName && depositId[i].password == userInputPass) {
                    let amount: number = Number(prompt(detail.deposit))
                    let balance = Number(depositId[i].amount)
                    balance = balance + amount;
                    depositId[i].amount = balance;
                    ff.writeFileSync(path.resolve(__dirname, 'test.json'), JSON.stringify(depositId, null, 2));
                    console.log(`You have deposited Rs ${amount} in your account .`)
                }
        }
    }
    withdraw = (withdawId,fc) => {
        const path = require('path');
             var userInputName: number = prompt(detail.userInput)
             var userInputPass: number = prompt(detail.userPass)
        for (let i = 0; i < withdawId.length; i++) {
            if (withdawId[i].username == userInputName && withdawId[i].password  == userInputPass) {
                var withDraw: number = parseInt(prompt(detail.withdraw))
                console.log(withdawId[i].amount)
                if (withDraw > withdawId[i].amount) {
                    console.log(`Insuffient fund`);
                } else {
                    console.log("The amount was withdrawn successfully.")
                    let balance: number = withdawId[i].amount - withDraw;
                    withdawId[i].amount = balance ;
                    fc.writeFileSync(path.resolve(__dirname, 'test.json'), JSON.stringify(withdawId, null, 2));
  
                    console.log(`The remaining balance in your account is ${balance}`)
                }
                break   
        }
        // while (n < 3) {
            
        //     } else if (n < 2) {
        //         console.log("Please enter correct details")
        //     }
        //     n++
            // if (n >= 3) {
            //     console.log("You have tried many times. Please try after some time .")
            // }
        }
    }
    view_balance(viewBalanceId) {
        var userInputName: number = prompt(detail.userInput)
        var userInputPass: number = prompt(detail.userPass) ;
        for (let i = 0; i < viewBalanceId.length; i++) {
            if (viewBalanceId[i].username == userInputName && viewBalanceId[i].password  == userInputPass) {
                let viewBalance = viewBalanceId[i].amount
                console.log(`The Balance in your Account ${viewBalance}`)
            }   
        }
    }
}

console.log("Welcome to the bank management system ")
let userDetails;
let initialAmount;
let input;
let user = new User();
let bank = new Bank();

do {
    let userResponse: number = prompt(`Please select  Option :
     1. Create New Account 
     2. Show Details 
     3. deposit 
     4.withdraw
     5.view Balance
     6.exit
     `)
    input = Number(userResponse)
    switch (input) {
        case 1:
            userDetails = user.createAccount()
            const fs = require('fs');
            const path = require('path');
            let exitingData = fs.readFileSync('test.json');
            let userDatas = JSON.parse(exitingData)
            userDatas.push(userDetails)
            fs.writeFileSync(path.resolve(__dirname, 'test.json'), JSON.stringify(userDatas, null, 2));
            console.log("Account created successfully")
            break

        case 2:
            const fss = require('fs');
            let rawdata = fss.readFileSync('test.json');
            let userData = JSON.parse(rawdata);
            user.showDetails(userData)

            break
        case 3:
            const ff = require('fs');
            let depositFIle = ff.readFileSync('test.json');
            let depositId = JSON.parse(depositFIle);
            initialAmount = bank.deposit(depositId,ff)

            break
        case 4:
            const fc = require('fs');
            let withdrawFile = fc.readFileSync('test.json');
            let withdrawId = JSON.parse(withdrawFile);
            bank.withdraw(withdrawId,fc)
            break
        case 5:
            const fa = require('fs');
            let balanceFile = fa.readFileSync('test.json');
            let viewBalanceId = JSON.parse(balanceFile);
            bank.view_balance(viewBalanceId)
            break
        default:
            break
    }
} while (input != 6)

export { }
