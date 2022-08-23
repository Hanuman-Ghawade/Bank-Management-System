import { detail } from "../../Constants/InputDetailEnum";
import {  userDetail} from "../../Constants/UserDetails";

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

    userDetails(): void {
        console.table(customerDetails)

    }
    accountHolderBasedOnAmount(): void {
        do {
           var  response :number = parseInt(prompt(detail.amountHolder))
            console.clear()
            switch (response) {
                case 1:
                    const zeroBalanceData = customerDetails.filter( (ele :{amount :number}) => {
                        return ele.amount == 0;
                    })
                    console.table(zeroBalanceData)
                    break
                case 2:

                    const oneLakh = customerDetails.filter((ele:{amount :number}) =>{
                        return ele.amount > 0 && ele.amount < 100000;
                    })
                    console.table(oneLakh)
                    break
                case 3:
                    const more_than_oneLakh = customerDetails.filter((ele: { amount: number }) => {
                        return ele.amount >= 100000;
                    })
                    console.table(more_than_oneLakh);
                    break
                default:
                    break


            }
        } while (response != 4)
    }

    SavingAccount(): void {

        const authorizedUser = customerDetails.filter((ele: { accountType: string }) => {
            return ele.accountType == detail.savingAccount;
        })
        console.table(authorizedUser);
    }
    CurrentAccount(): void {

        const currentAccount: string = customerDetails.filter((ele: { accountType: string }) => {
            return ele.accountType == detail.currentAccount;
        })
        console.table(currentAccount);

    }
    ApproveLoan(): void {
        for (let i = 0; i < customerDetails.length; i++) {
            if (customerDetails[i].loanApplied == true) {
                customerDetails[i].loanApplied = false
                customerDetails[i].amount += customerDetails[i].loanTaken
                customerDetails[i].loanTaken = 0
                fs.writeFileSync(path.resolve(__dirname, detail.bankDB), JSON.stringify(customerDetails, null, 2));
                if (customerDetails[i].amount > 100000) {
                    customerDetails[i].accountType = detail.currentAccount;
                    fs.writeFileSync(path.resolve(__dirname, detail.bankDB), JSON.stringify(customerDetails, null, 2));
                }

            }
        }
        console.log("The loan was approved successfully.")
    }

    LoanHolder(): void {

        const loanUser = customerDetails.filter((ele:{loanAmount:number}) => {
            return ele.loanAmount > 0;
        })
        console.table(loanUser);


    }
    BankAmount(): void {
        let BankCash: number = 0;
        let LoanCash: number = 0;
        let count :number  = 0
        for (let i = 0; i < customerDetails.length; i++) {
            BankCash += customerDetails[i].amount
            LoanCash += customerDetails[i].loanAmount
            count++
        }
        console.log(`The total amount in your bank is  Rs.${BankCash}.`)
        console.log(`The total amount lent to the customer is Rs.${LoanCash}.`)
        console.log(` The total number of customers is ${count}.`)
    }
}