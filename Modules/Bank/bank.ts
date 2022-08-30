import { detail } from "../../Constants/InputDetailEnum";
import { userDetail} from "../../Constants/UserDetails";
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

export { fs, path, customerDetails ,adminDetails}
// Bank class  for the deposit , withdraw & show balance 

export class Bank implements userDetail{
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

    public deposit(): void {
        let balanceAmount :number;
        let totalBalance :number
        var userInputName: number = prompt(detail.userInput);
        var userInputPass: number = prompt(detail.userPass);
        const sqlOne = `SELECT * FROM user WHERE username = '${userInputName}' AND password = '${userInputPass}'`;
        db.all(sqlOne, [], (err: { message: string }, rows: any[]) => {
            if (err) return console.log(err.message);
            if (rows.length == 0) {
                console.log("Invalid username or password");
            }
            rows.forEach((row) => {
            balanceAmount = row.amount
                var deposit: number = Number(parseInt(prompt(detail.deposit)));
                totalBalance = balanceAmount + deposit;
                let updateQuery = `UPDATE user
                               SET amount = ${totalBalance}
                               WHERE username = '${userInputName}'`;

                db.run(updateQuery, function (err: { message: string }) {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log(" The funds have been successfully deposited into your account.");
                    console.log(`Updated balance is ${totalBalance}`)
                }); 
            })
        })
             
    }
    withdraw (): void {
        let balanceAmount: number;
        let totalBalance: number
        var userInputName: number = prompt(detail.userInput);
        var userInputPass: number = prompt(detail.userPass);
        const sqlOne = `SELECT * FROM user WHERE username = '${userInputName}' AND password = '${userInputPass}'`;
        db.all(sqlOne, [], (err: { message: string }, rows: any[]) => {
            if (err) return console.log(err.message);
            if (rows.length == 0) {
                console.log("Invalid username or password");
            }
            rows.forEach((row) => {
                balanceAmount = row.amount
                var withdrawAmount: number = Number(parseInt(prompt(detail.withdraw)));

                if (withdrawAmount > balanceAmount){
                    console.log("Insufficient funds")
                }else{
                    totalBalance = balanceAmount - withdrawAmount;
                    let updateQuery = `UPDATE user
                               SET amount = ${totalBalance}
                               WHERE username = '${userInputName}'`;
                    db.run(updateQuery, function (err: { message: string }) {
                        if (err) {
                            return console.error(err.message);
                        }
                        console.log(" The funds have been successfully deposited into your account.");
                        console.log(`Updated balance is ${totalBalance}`)
                    });
                }   
            })
        }) 
    }

    viewBalance(): void {
        var userInputName: string = prompt(detail.userInput)
        var userInputPass: string = prompt(detail.userPass);
        for (let i = 0; i < customerDetails.length; i++) {
            if (customerDetails[i].username == userInputName && customerDetails[i].password == userInputPass) {
                let viewBalance = customerDetails[i].amount
                console.log(`The amount in your account ${viewBalance}`)
            }
        }
    }
    loanSection(): void {
        let loanResponse: number;
        var userInputName: string = prompt(detail.userInput)
        var userInputPass: string = prompt(detail.userPass)
        do {
            loanResponse = parseInt(prompt(detail.loanSection))
            console.clear()
            let check: boolean;
            switch (loanResponse) {
                case 1:
                    console.log(" *** Loan Application  *** ")
                    do {
                        check = true
                        for (let i = 0; i < customerDetails.length; i++) {
                            if (customerDetails[i].username == userInputName && customerDetails[i].password == userInputPass) {
                                var loanBalance: number = Number(parseInt(prompt(detail.loanAmount)))
                                if (customerDetails[i].loanApplied == true) {
                                    console.log(" Your previous loan was not approved.")

                                }
                                else if (Number.isNaN(loanBalance) || loanBalance < 1) {
                                    console.log("Please enter valid amount")
                                    check = false
                                } else if (customerDetails[i].loanApplicable == false) {
                                    console.log(" Your loan limit has exceeded.")
                                }
                                else if (customerDetails[i].loanLimit < loanBalance) {
                                    console.log("You have entered an amount that is greater than the loan limit.")
                                    check = false
                                }

                                else {
                                    customerDetails[i].loanAmount += loanBalance;
                                    customerDetails[i].loanTaken += loanBalance;
                                    customerDetails[i].loanLimit = customerDetails[i].loanLimit - loanBalance
                                    customerDetails[i].loanApplied = true;
                                    fs.writeFileSync(path.resolve(__dirname, detail.bankDB), JSON.stringify(customerDetails, null, 2));
                                    console.log("You successfully applied for a loan.")
                                    if (customerDetails[i].loanLimit < 1) {
                                        customerDetails[i].loanApplicable = false
                                        fs.writeFileSync(path.resolve(__dirname, detail.bankDB), JSON.stringify(customerDetails, null, 2));
                                    }
                                    else {
                                        customerDetails[i].loanApplicable = true;
                                        fs.writeFileSync(path.resolve(__dirname, detail.bankDB), JSON.stringify(customerDetails, null, 2));
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
                                else if (customerDetails[i].loanAmount < paidAmount) {
                                    console.log("You are entering an amount greater than the loan amount.")

                                }
                                else {
                                    console.log("You successfully paid the loan.")
                                    customerDetails[i].loanAmount -= paidAmount;
                                    customerDetails[i].loanLimit += paidAmount
                                    fs.writeFileSync(path.resolve(__dirname, detail.bankDB), JSON.stringify(customerDetails, null, 2));
                                    if (customerDetails[i].loanLimit > 0) {
                                        customerDetails[i].loanApplicable = true
                                        fs.writeFileSync(path.resolve(__dirname, detail.bankDB), JSON.stringify(customerDetails, null, 2));
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
                            let viewBalance = customerDetails[i].loanAmount
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
                            fs.writeFileSync(path.resolve(__dirname, detail.bankDB), JSON.stringify(customerDetails, null, 2))
                            console.log("The money was transferred successfully.")
                            if (customerDetails[i].amount > 100000) {
                                customerDetails[i].accountType = detail.currentAccount;
                                fs.writeFileSync(path.resolve(__dirname, detail.bankDB), JSON.stringify(customerDetails, null, 2))
                            }
                        }
                    }
                    customerDetails[i].amount = customerDetails[i].amount - transferAmount
                    fs.writeFileSync(path.resolve(__dirname, detail.bankDB), JSON.stringify(customerDetails, null, 2))
                    if (customerDetails[i].amount <= 100000) {
                        customerDetails[i].accountType = detail.savingAccount;
                        fs.writeFileSync(path.resolve(__dirname, detail.bankDB), JSON.stringify(customerDetails, null, 2))
                    }
                }
            }
        }
    }
}
