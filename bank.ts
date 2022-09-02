import { detail } from "./Constants/InputDetailEnum";
import { User ,} from "./Modules/User/user.js";
import { Admin } from "./Modules/Admin/admin.js";
import { Bank } from "./Modules/Bank/bank.js";
import { Data } from "./DB/database";
var sqlite3 = require(detail.sqlite).verbose();
var db = new sqlite3.Database(detail.database);

let database = new  Data();

// Banking management system  Project

const ps  = require(detail.prompt);
const prompt = ps();

console.log(" ****** Welcome to the bank management system.****** ");

let user: User = new User();
let bank: Bank = new Bank();
let admin: Admin = new Admin();


export let userInputName: string 
export let userInputPass: string 



// do {
    var response: number = parseInt(prompt(detail.bankLogin));
    console.clear();
    if(response === 1){
        console.log("New account registration form");
        let users: object = user.createAccount();
        bank.insertData(users);
        console.log("Account has been successfully registered. ");

    }

    if (response === 2) {
        console.log("******* User Login *****");
        userInputName = prompt(detail.userInput);
        userInputPass = prompt(detail.userPass);
    //    do {
           var userResponse: number = parseInt(prompt(detail.userLogin));
            console.clear()
            switch (userResponse) {
                case 1:
                    console.log("**** Customers Details ****");
                    bank.accessData();
                    break;
                case 2:
                    console.log("**** Deposit Amount ****");
                    bank.deposit();
                    break;
                case 3:
                    console.log("**** Withdraw Amount ****");
                    bank.withdraw();
                    break;
                case 4:
                    console.log("**** View Balance ****");
                    bank.viewBalance();
                    break;
                case 5:
                    console.log("**** Loan Section ****");
                    bank.loanSection();
                    break;
                case 6:
                    console.log("**** Money Transfer ****");
                    bank.moneyTransfer();
                default:
                    break;
            }
        // } while (userResponse != 7);
    }
    else if (response === 3) {
        console.clear();
        console.log("******* Admin Login *****");
        let adminInputName: string = prompt(detail.userInput);
        let adminInputPass: string = prompt(detail.userPass);

        const depositQuery: string = `SELECT username , password FROM admin WHERE username = '${adminInputName}' AND password = '${adminInputPass}'`;
        db.all(depositQuery, [], (err: { message: string }, rows: any[]) => {
            if (err) return console.log(err.message);
            if (rows.length == 0) {
                ``
                console.log("Invalid username or password");
            }
            rows.forEach((row) => {

                console.clear();
                console.log("Admin login successfully done");
                console.clear();
                do {
                    var adminResponse: number = parseInt(prompt(detail.adminLogin));
                    console.clear();
                    switch (adminResponse) {
                        case 1:
                            console.clear();
                            console.log(" *** All customers details. ***");
                            admin.customerDetails();
                            break;
                        case 2:
                            console.clear();
                            console.log(" *** Account Deactivation ***");
                            let account_number: string = prompt(detail.deactivateAccountNumber);
                            admin.deactivateAccount(account_number);
                            break;
                        case 3:
                            console.clear();
                            console.log("*** The number of people who have a savings account. ***");
                            admin.savingAccount();
                            break;
                        case 4:
                            console.clear();
                            console.log("*** The number of people who have a current account. *** ");
                            admin.currentAccount();
                            break;
                        case 5:
                            console.clear();
                            console.log("*** Loan approve  *** ");
                            admin.approveLoan();
                            break;
                        case 6:
                            console.clear();
                            console.log("*** Loan Holder *** ");
                            admin.loanHolder();
                            break;
                        case 7:
                            console.clear();
                            console.log("*** Total bank statement *** ");
                            admin.bankAmount();
                            break;
                        default:
                            console.clear();
                            break;
                    }
                } while (adminResponse != 8);
            })
        })
        }
    else if (response === 4){
        process.exit(1)
    }
// } while (response != 8);
