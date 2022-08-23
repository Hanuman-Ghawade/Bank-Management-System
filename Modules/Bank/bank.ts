import { detail } from "../../Constants/InputDetailEnum";
import { userDetail} from "../../Constants/UserDetails";
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
                        fs.writeFileSync(path.resolve(__dirname, detail.bankDB), JSON.stringify(customerDetails, null, 2));
                        console.log(`You have deposited Rs ${amount} in your account .`)
                        if (customerDetails[i].amount > 100000) {
                            customerDetails[i].accountType = detail.currentAccount;
                            fs.writeFileSync(path.resolve(__dirname,detail.bankDB), JSON.stringify(customerDetails, null, 2));
                        }
                    }
                }
            }
        } while (check == false)
    }
    withdraw (): void {
        let check: boolean
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
                        fs.writeFileSync(path.resolve(__dirname, detail.bankDB), JSON.stringify(customerDetails, null, 2));
                        console.log(`The remaining balance in your account is ${balance}`)
                        if (customerDetails[i].amount <= 100000) {
                            customerDetails[i].accountType = detail.savingAccount;
                            fs.writeFileSync(path.resolve(__dirname, detail.bankDB), JSON.stringify(customerDetails, null, 2));
                        }
                    }
                    break
                }
            }
        } while (check == false)
    }

    view_balance(): void {
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
