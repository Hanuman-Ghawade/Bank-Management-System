import { detail } from "../../Constants/InputDetailEnum";
// import {regularExpression} from "../RegularExpression/regExp";
import { userDetail} from "../../Constants/UserDetails";

const ps = require(detail.prompt)
const prompt = ps()

let fs = require(detail.fs);
let path = require(detail.path);
let customerData = fs.readFileSync(detail.userDB);
let customerDetails = JSON.parse(customerData);
let adminData = fs.readFileSync(detail.adminDB);
let adminDetails = JSON.parse(adminData)

export {fs,path , customerDetails,adminDetails}

export class User implements userDetail{
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
    createAccount () {
        let check: boolean;
        // Input details for name
        do {
            check = true;
            var name: string = String(prompt(detail.name));
            let temp: number = Number(name);
            if (!(Number.isNaN(temp))) {
                console.log("Please enter valid name");
                check = false;
            }
        } while (check == false);

        // Input details for age 
        do {
            check = true;
            var age: number = parseInt(prompt(detail.age));
            if (isNaN(age) || age < 18 || age > 80) {
                console.log("The age must be a number between 18 and 80");
                check = false
            }
        } while (check == false);

        // input details for Mobile number 

        do {
            check = true;
            var mobileNumber: number = parseInt(prompt(detail.contactNo));
            if (!mobileNumber || mobileNumber.toString().length != 10) {
                console.log("Please provide 10 Digit numeric value");
                check = false;
            }
        } while (check == false);

        // input details  for email
        do {
            check = true;
            let emailPattern :RegExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            var email: string = prompt(detail.email);
            if (email.match(emailPattern) === null) {
                console.log("Please enter valid email");
                check = false;
            }

        } while (check == false);

        // Input details for date of Birth 

        do {
            check = true;
            let datePattern : RegExp = /^\d{2}([./-])\d{2}\1\d{4}$/ ;
            var birth: string = prompt(detail.dateOfBirth);

            let ageMS: number = Date.parse(Date()) - Date.parse(birth);

            let age: Date = new Date();

            age.setTime(ageMS);

            var ageYear: number = age.getFullYear() - 1970;

            if (birth.match(datePattern) == null) {
                console.log("Please enter valid date ");
                check = false;
            }
            else if (ageYear < 18 || ageYear > 80) {
                console.log("The age range should be between 18 and 80.");
                check = false;
            }

        } while (check == false);

        // input details for username

        do {
            check = true;
            var username: string = String(prompt(detail.username));
            let temp: number = Number(username);
            if (!(Number.isNaN(temp))) {
                console.log("Please enter valid Input ");
                check = false;
            }
        } while (check == false);
        // Intial  amount

        let amount: number = 0;
        // input details for password 
        let password: string = prompt(detail.password);

        // Auto generated Account number .

        let accountNo: number = Math.floor((Math.random() * 10000) + 1); // 4 Digit account number 

        // default account type will be Saving

        let accountType: string = detail.savingAccount;

        // Loan Applicable

        let loanApplicable: boolean = true;

        // Loan Amount 

        let loanAmount: number = 0;

        //  Loan Limit


        let loanLimit = 500000;


        // Loan Taken 

        let loanTaken = 0;


        // loan application 

        let loanApplied: boolean = false;

        // return the all input 

        return { name, age, mobileNumber, email, birth, accountNo, accountType, username, password, amount, loanApplicable, loanTaken, loanAmount, loanLimit, loanApplied };
    }

    // Details of the customer 

    showDetails () : void {
        let check: boolean;
        let no: number = 0;
        var userInputName: string;
        var userInputPass: string
        check = true
        while (check != false) {
            userInputName = prompt(detail.userInput)
            userInputPass = prompt(detail.userPass);
            for (let i = 0; i < customerDetails.length; i++) {
                if (customerDetails[i].username == userInputName && customerDetails[i].password == userInputPass) {
                    check = false
                    no = i;
                }
            }
        }
        if (check === false) {
            console.table(customerDetails[no])
        }
    }
}

