import { detail } from "./Constants/InputDetailEnum";
import { User ,} from "./Modules/User/user.js"
import { Admin } from "./Modules/Admin/admin.js";
import { Bank } from "./Modules/Bank/bank.js";

import { Data } from "./DB/database";


// 
let database = new  Data();

// Banking management system  Project

const ps = require(detail.prompt);
const prompt = ps();

console.log(" ****** Welcome to the bank management system.****** ");

var user: User = new User();
let bank: Bank = new Bank();
let admin: Admin = new Admin();
var userResponse

// do {
    var response: number = parseInt(prompt(detail.bankLogin));
    console.clear();
    if (response === 1) {
        console.clear();
     
      //  do {
            console.log("******* User Login *****")
            userResponse = parseInt(prompt(detail.userLogin));
            console.clear()
            switch (userResponse) {
                case 1:
                    console.log("**** New Account registrations ****");
                    var users = user.createAccount();
                    database.insertData(users);
                    console.log("Account created Successfully");
                    break;
                case 2:
                    console.log("**** Customers Details ****");
                    debugger;
                    user.accessData()
                    break;
                case 3:
                    console.log("**** Deposit Amount ****");
                    debugger;
                    bank.deposit();
                    break;
                case 4:
                    console.log("**** Withdraw Amount ****");
                    bank.withdraw();
                    break;
                case 5:
                    console.log("**** View Balance ****");
                    bank.viewBalance();
                    break;
                case 6:
                    console.log("**** Loan Section ****");
                    bank.loanSection();
                    break;
                case 7:
                    console.log("**** Money Transfer ****");
                    bank.moneyTransfer();
                default:
                    break
            }
        // } while (userResponse != 8);
    }
    else if (response === 2) {
        console.clear();
        console.log("******* Admin Login *****");
        var userInputName: number = prompt(detail.userInput);
        var userInputPass: number = prompt(detail.userPass);
        console.clear();
        // if (adminDetails[0].adminUserName == userInputName && adminDetails[0].adminPass == userInputPass) {
            console.log("Admin login successfully done");
            console.clear();
            do {
                var adminResponse: number = parseInt(prompt(detail.adminLogin));
                console.clear();
                switch (adminResponse) {
                    case 1:
                        console.clear();
                        console.log(" *** All customers details. ***");
                        admin.userDetails();
                        break
                    case 2:
                        console.clear();
                        console.log(" *** Customers details based on amount ***");
                        admin.accountHolderBasedOnAmount();
                        break
                    case 3:
                        console.clear();
                        console.log("*** The number of people who have a savings account. ***");
                        admin.savingAccount();
                        break
                    case 4:
                        console.clear();
                        console.log("*** The number of people who have a current account. *** ");
                        admin.currentAccount();
                        break
                    case 5:
                        console.clear();
                        console.log("*** Loan approve  *** ");
                        admin.approveLoan();
                        break
                    case 6:
                        console.clear();
                        console.log("*** Loan Holder *** ");
                        admin.loanHolder();
                        break
                    case 7:
                        console.clear();
                        console.log("*** Total bank statement *** ");
                        admin.bankAmount();
                        break
                    default:
                        console.clear();
                        break
                }
            } while (adminResponse != 8);
        }
    // }
    else if (response === 3){
        process.exit(1)
    }
// } while (response != 8);
