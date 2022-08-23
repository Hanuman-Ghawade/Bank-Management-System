
export enum detail {
    name = "Please enter your name. :  " ,
    age = "Please enter your age. :  " ,
    contactNo  = "Please enter your contact number.:  ",
    email = "Please enter your email.:  ",
    dateOfBirth = "Please enter your date of birth (DD-MM-YEAR):  ",
    accountNo = "Auto Generated : ",
    username = "Please create your user Id.:  " ,
    password = "Please create a password :  ",
    deposit = "Please enter the amount of the deposit:  ",
    withdraw = "Please enter the amount to withdraw.:  ",
    loanAmount = "Please enter the amount.:  ",
    userInput = "Please enter your user Id.:  ",
    userPass = "Please enter your password.:  ",
    moneyTransfer = "Please enter amount to transfer:  " ,
    receiverAccountNo = "Please enter the account number of the receiver:  ",
    savingAccount = "Saving",
    currentAccount = "Current",
    userDB = './DB/user.json',
    bankDB = '../DB/user.json',
    adminDB = './DB/admin.json',
    adminDb = '../DB/admin.json',
    fs = 'fs',
    path = 'path',
    prompt =  'prompt-sync',
    amountHolder = `Please choose  one option 
    1. Rs.0 amount Holder
    2. Rs. < 1 Lakh amount Holder
    3. Rs. > 1 Lakh amount Holder
    4. Exit
    `,
    loanSection = `Please choose  one option 
    1. Apply for Loan (Upto 5 Lakh)
    2. Loan Status 
    3. Paid Loan
    4. Loan Amount
    5. Exit   
    `,
    bankLogin = `Please choose  one option 
    1. User Login
    2. Admin Login
    `,
    userLogin = `Please choose one  option :
    
     1. Create a New Account
     2. Show Details 
     3. Deposit (Upto 7 Digit Amount)
     4. Withdraw
     5. View Balance
     6. Loan Section 
     7. Money Transfer 
     8. Exit
     `,
    adminLogin = `Please choose option :
     1. User Details 
     2. Account Holder details Based On amount
     3. Saving Accounts  (Amount less than 1 Lakh)
     4. Current Accounts (Amount more than 1 Lakh)
     5. Approve Loan 
     6. Loan Holder
     7. Bank Statement 
     8. Exit
     `
}



