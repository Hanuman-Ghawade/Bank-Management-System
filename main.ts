import { detail } from "./Enum.js";
// Banking management system 
const ps = require("prompt-sync")
const prompt = ps()

// We Have created on user class 
class User {
    creteAccount = () => {
        let check
        // Input for Name
        var name: string = prompt(detail.name);
        this.check(name);
        // Input for age 
        do {
            check = true ;
            var age = prompt(detail.age) ;
            let temp = Number(age) ;
            if ((Number.isNaN(temp))){
                console.log("Please enter valid age") ;
                check = false;
            }
        } while (check == false) ;

        // input for contact number 

        do {
            check = true ;
            var contactNo: number = prompt(detail.contactNo) ;
            let temp = Number(contactNo) ;
            if ((Number.isNaN(temp))){
                console.log("Please enter valid Mobile number") ;
                check = false;
            }
        } while (check == false) ;

        // input for email
        do {
            check = true ;
            var email: string = prompt(detail.email) ;
            let temp = Number(email) ;
            if (!(Number.isNaN(temp))){
                console.log("Please enter valid Input ") ;
                check = false;
            }
        } while (check == false) ;

        // Input for date of Birth 
        do {
            check = true ;
            var dateOfbirth: string = prompt(detail.dateOfBirth) ;
            let temp = Number(email) ;
            if (!(Number.isNaN(temp))){
                console.log("Please enter valid Input ") ;
                check = false;
            }
        } while (check == false) ; 
        
        do {
            check = true ;
            var username: string = prompt(detail.username) ;
            let temp = Number(username) ;
            if (!(Number.isNaN(temp))){
                console.log("Please enter valid Input ") ;
                check = false;
            }
        } while (check == false) ;  
        var password: string = prompt(detail.password) ;
        var accountNo: number = Math.floor((Math.random() * 10000) + 1); // 4 Digit account number 
        return [{name, age, contactNo, email, dateOfbirth, accountNo, username, password }];
    }

    showDetails = (userData) => {
        const { name, contactNo, age, email, password, dateOfBirth, accountNo, username } = userData;

        console.log(`User name is ${userData[0].name} . Contact number is  ${username} .Account No is ${accountNo}`)
    }

    public check = (input: any) => {
        
    }
}
class Bank extends User {


    deposit() {
        let n = 0
        while (n < 3) {
            var userInputName: string = prompt(detail.userInput)
            var userInputPass: number = prompt(detail.userPass)
            if (userName == userInputName && userPass == userInputPass) {
                let balance: number = 0
                let amount: number = prompt(detail.deposit)
                balance = balance + amount;
                console.log(`You have deposited Rs ${amount} in your account .`)
                return amount

            } else if (n < 2) {
                console.log("Please Enter correct details")
            }
            n++;
            if (n >= 3) {
                console.log("You have tried many times. Please try after some time .")
            }
        }
    }

    withdraw = (initialAmount) => {
        let n = 0;
        while (n < 3) {
            var userInputName: number = prompt(detail.userInput)
            var userInputPass: number = prompt(detail.userPass)
            if (userName == userInputName && userPass == userInputPass) {

                var withDraw: number = prompt(detail.withdraw)
                if (withDraw > initialAmount) {
                    console.log(`Insuffient fund`);
                } else {
                    let balance: number = initialAmount - withDraw;
                    console.log(`The remaining balance in your account is ${balance}`)
                }
                break
            } else if (n < 2) {
                console.log("Please enter correct details")
            }
            n++
            if (n >= 3) {
                console.log("You have tried many times. Please try after some time .")
            }
        }
    }
    view_balance() {
        let balance
        console.log(`The amount in your account is ${balance}`);
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
      input  = Number(userResponse)
    switch (input) {
        case 1 : 
            userDetails = user.creteAccount()
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
            var userName = userData[0].username;
            user.showDetails(userData)

            var userPass = userData[0].password;
            break
        case 3:
            initialAmount = bank.deposit()
            break
        case 4:
            bank.withdraw(initialAmount)
            break
        case 5:
            bank.view_balance()
            break
        default :
        console.log("Please enter valid choice ")
    }
}while(input!=6)

export { }