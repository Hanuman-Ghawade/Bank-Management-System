// Banking management system 
const ps = require("prompt-sync")
const prompt = ps()


// We Have created on user class 
class User {
    name: string;
    age: number;
    contactNo: number;
    email: string;
    password: string;
    dateOfbirth: string;

    creteAccount = () => {
        let name: string = prompt("Please enter your name:  ")
        var age: number = prompt("Please enter your age:  ")
        var contactNo: number = prompt("Please enter your contact number:  ")
        var email: string = prompt("Please enter your email:  ")
        var password: string = prompt("Please enter your password:  ")
        var dateOfbirth: string = prompt("Please enter your dateOfBirth:  ")
        console.log("Account created successfully")
        return { name, age, contactNo, email, password, dateOfbirth };
    }

    showDetails = (details) => {
        const { name, contactNo, age, email, password, dateOfBirth } = details;

        console.log(`User name is ${name} . Contact number is  ${contactNo} .Email is ${email}`)
    }
}
class Bank extends User {
    balance: number;
    amount: number;

    deposit() {
        let balance
        let amount: number = prompt("Please enter the amount to the deposit ")
        balance = balance + amount;
        console.log(`You have deposited Rs ${amount} in your account .`)
    }

    withdraw() {
        let balance 
        let amount: number = prompt("Please enter the amount to the deposit ")
        amount = amount;
        if (amount > balance) {
            console.log(`Insuffient fund`);
        } else {
            balance = balance - amount;
            console.log(`The balance in your account is ${balance}`)
        }
    }

    view_balance() {
        let balance
        console.log(`The amount in your account is ${balance}`);
    }
}

console.log("Welcome to the bank management system ")
let details;
let user = new User();
let bank = new Bank();

while (true) {
    let userResponse: number = prompt(`Please select  Option :
     1. Create New Account 
     2. Show Details 
     3. deposit 
     4.withdraw
     5.view Balance
     6.exit
     `)


    let input: number = userResponse;
if (input == 1) {
    details = user.creteAccount()
}else if(input == 2){
    user.showDetails(details)

}else if(input == 3){
    bank.deposit()
}
else if(input == 4){
    bank.withdraw()

}
else if(input == 5){
    bank.view_balance()
}
else{
    break
}

}
export { }


