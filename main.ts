import { detail } from "./Constants/InputDetailEnum";
import {fs,path,customerDetails ,adminDetails } from "./Modules/User/user";
import {User} from "./Modules/User/user.js"
import { Admin } from "./Modules/Admin/admin.js";
import { Bank } from "./Modules/Bank/bank.js";

// Banking management system  Project

const ps = require(detail.prompt)
const prompt = ps()

console.log(" ****** Welcome to the bank management system.****** ")

let user: User = new User();
let bank: Bank = new Bank();
let admin: Admin = new Admin()

do {
    var response :number = parseInt(prompt(detail.bankLogin))
    console.clear();
    if (response === 1) {
        console.clear();
        do {
            console.log("******* User Login *****")
            var userResponse :number = parseInt(prompt(detail.userLogin))
            console.clear()
            switch (userResponse) {
                case 1:
                    console.log("**** New Account registrations ****")
                   var userDetails :object = user.createAccount()
                    customerDetails.push(userDetails)
                    fs.writeFileSync(path.resolve(__dirname, detail.userDB), JSON.stringify(customerDetails, null, 2));
                    console.log("Account created successfully")
                    break
                case 2:
                    console.log("**** Customers Details ****")
                    user.showDetails()
                    break
                case 3:
                    console.log("**** Deposit Amount ****")
                    bank.deposit()
                    break
                case 4:
                    console.log("**** Withdraw Amount ****")
                    bank.withdraw()
                    break
                case 5:
                    console.log("**** View Balance ****")
                    bank.view_balance()
                    break
                case 6:
                    console.log("**** Loan Section ****")
                    bank.LoanSection()
                    break
                case 7:
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
                var adminResponse :number = parseInt(prompt(detail.adminLogin))
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
                        console.log("*** Loan approve  *** ")
                        admin.ApproveLoan()
                        break
                    case 6:
                        console.clear()
                        console.log("*** Loan Holder *** ")
                        admin.LoanHolder()
                        break
                    case 7:
                        console.clear()
                        console.log("*** Total bank statement *** ")
                        admin.BankAmount()
                        break
                    default:
                        console.clear()
                        break
                }
            } while (adminResponse != 8)
        } else {
            console.log("Please enter valid input ")
        }
    }
} while (response != 8)

export { }
