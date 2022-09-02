import { detail } from "../../Constants/InputDetailEnum";
import {  userDetail} from "../../Constants/UserDetails";

var sqlite3 = require(detail.sqlite).verbose();
var db = new sqlite3.Database(detail.database);

const ps = require(detail.prompt)
const prompt = ps()

let fs = require(detail.fs);
let path = require(detail.path);
let customerData = fs.readFileSync(detail.userDB);
let customerDetails = JSON.parse(customerData);
let adminData = fs.readFileSync(detail.adminDB);
let adminDetails = JSON.parse(adminData)

export { fs, path, customerDetails,adminDetails }

export class Admin implements userDetail{
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
    loanApplicable: boolean;
    loanTaken: number;
    loanAmount: number;
    loanLimit: number
    loanApplied: boolean;

    customerDetails = (): void => {

        const userDetailsQuery: string = `SELECT * FROM user `;
        db.all(userDetailsQuery, [], (err: { message: string }, rows: any[]) => {
            if (err) return console.log(err.message);
            rows.forEach((row) => {
                console.log(` Name : ${row.Name}, Age : ${row.Age}, Mobile Number : ${row.mobileNumber}, Balance : Rs.${row.amount}, Loan Amount : Rs.${row.loanAmount}`)
             
            })
        })
    }

   deactivateAccount = (accountNumber: string) :void => {
       const deleteAccountQuery: string = `SELECT username, password FROM user WHERE accountNo = '${accountNumber}' `;
            db.all(deleteAccountQuery, [], (err: { message: string }, rows: any[]) => {
                if (err) return console.log(err.message);
                if (rows.length == 0) {
                    console.log("Invalid account number");
                }
                rows.forEach((row) => {
                    console.log(`${accountNumber} account number successfully deleted.`)
    })
    })
}
    savingAccount = (): void => {

        const savingAccountQuery: string = `SELECT * FROM user WHERE accountType = 'Saving'`;
        db.all(savingAccountQuery, [], (err: { message: string }, rows: any[]) => {
            if (err) return console.log(err.message);
            rows.forEach((row) => {
                console.log(` Name : ${row.Name}, Age : ${row.Age}, Mobile Number : ${row.mobileNumber}, Amount : ${row.amount}`)

            })
        })
    }
    currentAccount = (): void => {

        const currentAccountQuery: string = `SELECT * FROM user WHERE accountType = 'Current'`;
        db.all(currentAccountQuery, [], (err: { message: string }, rows: any[]) => {
            if (err) return console.log(err.message);
            rows.forEach((row) => {
                console.log(` Name : ${row.Name}, Age : ${row.Age}, Mobile Number : ${row.mobileNumber},  Amount : Rs.${row.amount}`)

            })
        })

    }
    approveLoan = (): void =>  {
       var totalUserAmount : number
        var CustomerAccountNumber: string = prompt(detail.accountNumber);
            const ViewBalanceQuery: string = `SELECT amount , loanTaken FROM user WHERE accountNo = ${CustomerAccountNumber}`;
            db.all(ViewBalanceQuery, [], (err: { message: string }, rows: any[]) => {
                if (err) return console.log(err.message);
                rows.forEach((row) => {
                    let userBalanceAmount : number = row.amount;
                    let userLoanAmount : number  = row.loanTaken;
                    totalUserAmount = userBalanceAmount + userLoanAmount
            })  
                let updateLoanQuery: string = `UPDATE user
                               SET amount = '${totalUserAmount}', loanTaken = 0,loanApplied = 0
                               WHERE accountNo = ${CustomerAccountNumber}`;
                db.run(updateLoanQuery, (err: { message: string }) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log("The loan was approved successfully..");

                })
    
                })
    }
    loanHolder = (): void => {
    
        const userDetailsQuery: string = `SELECT * FROM user WHERE loanAmount > 0`;
        db.all(userDetailsQuery, [], (err: { message: string }, rows: any[]) => {
            if (err) return console.log(err.message);
            rows.forEach((row) => {
                console.log(` Name : ${row.Name}, Age : ${row.Age}, Mobile Number : ${row.mobileNumber},  Loan Amount : Rs.${row.loanAmount}`)

            })
        })
    }
    bankAmount = (): void => {
        let bankCash: number = 0;
        let loanCash: number = 0;
        let count :number  = 0;
        const userDetailsQuery: string = `SELECT * FROM user`;
        db.all(userDetailsQuery, [], (err: { message: string }, rows: any[]) => {
            if (err) return console.log(err.message);
            rows.forEach((row) => {
                bankCash += row.amount;
                loanCash += row.loanAmount;
                count ++
            })
            console.log(`The total amount in your bank is  Rs.${bankCash}.`);
            console.log(`The total amount lent to the customer is Rs.${loanCash}.`);
            console.log(`The total number of customers is ${count}.`);
        })   
    }
}