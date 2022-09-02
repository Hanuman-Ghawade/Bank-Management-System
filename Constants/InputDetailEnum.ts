
export const userInputName: string = "prompt(detail.userInput)";
export const userInputPass: string = "prompt(detail.userPass)";

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
    paidLoan = "Please enter the amount to repay the loan.:  ",
    userInput = "Please enter your user Id.:  ",
    userPass = "Please enter your password.:  ",
    accountNumber = "Please enter customer account number.:  ",
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
    1. New Account Registration
    2. User Login
    3. Admin Login
    4. Exit
    `,
    userLogin = `Please choose one  option :
    
     1. Account Information 
     2. Deposit
     3. Withdraw
     4. View Balance
     5. Loan Section 
     6. Money Transfer 
     7. Exit
     `,
    adminLogin = `Please choose option :
     1. Customers Details 
     2. Deactivate Account Number
     3. Saving Accounts  (Amount less than 1 Lakh)
     4. Current Accounts (Amount more than 1 Lakh)
     5. Approve Loan 
     6. Loan Holder
     7. Bank Statement 
     8. Exit
     `,
     database = './DB/bank.db',
     sqlite = 'sqlite3',
    createTableQuery = "CREATE TABLE user (Name TEXT, Age INT, mobileNumber INTEGER, email TEXT, birth TEXT, accountNo INTEGER, accountType TEXT, username TEXT, password TEXT, amount INTEGER, loanApplicable NUMERIC, loanTaken INTEGER, loanAmount INTEGER, loanLimit INTEGER, loanApplied NUMERIC)",
    insertDataQuery = "INSERT INTO user VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    selectQuery = "SELECT * FROM user",
    user = "./Modules/User/user.js",
    createAdminTableQuery = "CREATE TABLE admin (Name TEXT, Age INT, mobileNumber INTEGER, email TEXT, birth TEXT, username TEXT, password TEXT)",
    insertAdminQuery = "INSERT INTO admin VALUES(?,?,?,?,?,?,?)",
    deactivateAccountNumber = "Please enter the account number:  "
    // depositQuery = `SELECT * FROM user WHERE username = '${userInputName}' AND password = '${userInputPass}'`,

}



