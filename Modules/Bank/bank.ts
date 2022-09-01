import { detail } from "../../Constants/InputDetailEnum";
import { userDetail} from "../../Constants/UserDetails";
var sqlite3 = require(detail.sqlite).verbose();
var db = new sqlite3.Database(detail.database);

const ps = require(detail.prompt)
const prompt = ps()

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

    deposit = (): void => {
        let balanceAmount : number;
        let totalBalance : number
        let userInputName: string = prompt(detail.userInput);
        let userInputPass: string = prompt(detail.userPass);
        const depositQuery :string = `SELECT * FROM user WHERE username = '${userInputName}' AND password = '${userInputPass}'`;
        db.all(depositQuery, [], (err: { message: string }, rows: any[]) => {
            if (err) return console.log(err.message);
            if (rows.length == 0) {
                console.log("Invalid username or password");
            }
            rows.forEach((row) => {
            balanceAmount = row.amount;
                do {
                    var deposit: number = Number(parseInt(prompt(detail.deposit)));
                    if ((Number.isNaN(deposit)) || deposit < 1) {
                        console.log("Please enter valid amount");

                    }
                } while ((Number.isNaN(deposit)) || deposit < 1);   
                totalBalance = balanceAmount + deposit;
                let updateDepositQuery : string = `UPDATE user
                               SET amount = ${totalBalance}
                               WHERE username = '${userInputName}'`;

                db.run(updateDepositQuery, (err: { message: string }) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log(`The funds have been successfully deposited into your account.`);
                    console.log(`Updated balance in your account is ${totalBalance}`);
                })
            })
        })         
    }
    withdraw  = (): void => {
        let balanceAmount: number;
        let totalBalance: number;
        var userInputName: string = prompt(detail.userInput);
        var userInputPass: string = prompt(detail.userPass);
        const withdrawQuery  : string = `SELECT * FROM user WHERE username = '${userInputName}' AND password = '${userInputPass}'`;
        db.all(withdrawQuery, [], (err: { message: string }, rows: any[]) => {
            if (err) return console.log(err.message);
            if (rows.length == 0) {
                console.log("Invalid username or password");
            }
            rows.forEach((row) => {
                balanceAmount = row.amount;

                do {
                    var withdrawAmount: number = Number(parseInt(prompt(detail.withdraw)));
                    if ((Number.isNaN(withdrawAmount)) || withdrawAmount < 1) {
                        console.log("Please enter valid amount");

                    }
                } while ((Number.isNaN(withdrawAmount)) || withdrawAmount < 1);  
               
                if (withdrawAmount > balanceAmount){
                    console.log("Insufficient funds");
                }else{
                    totalBalance = balanceAmount - withdrawAmount;
                    let withdrawBalanceQuery : string = `UPDATE user
                               SET amount = ${totalBalance}
                               WHERE username = '${userInputName}'`;
                    db.run(withdrawBalanceQuery, function (err: { message: string }) {
                        if (err) {
                            return console.error(err.message);
                        }
                        console.log(" The funds have been successfully withdrawn from your account.");
                        console.log(`The remaining balance in your account is ${totalBalance}`);
                    })
                }   
            })
        }) 
    }

    viewBalance = (): void => {
        var userInputName: string = prompt(detail.userInput);
        var userInputPass: string = prompt(detail.userPass);
        const ViewBalanceQuery : string = `SELECT * FROM user WHERE username = '${userInputName}' AND password = '${userInputPass}'`;
        db.all(ViewBalanceQuery, [], (err: { message: string }, rows: any[]) => {
            if (err) return console.log(err.message);
            if (rows.length == 0) {
                console.log("Invalid username or password");
            }
            rows.forEach((row) => {
                console.log(`Available balance in your account is ${row.amount}`);
            })
        })   
    }
    loanSection = (): void => {
        let userInputName: string = prompt(detail.userInput);
        let userInputPass: string = prompt(detail.userPass);
        const loanQuery: string = `SELECT * FROM user WHERE username = '${userInputName}' AND password = '${userInputPass}'`;
        db.all(loanQuery, [], (err: { message: string }, rows: any[]) => {
            if (err) return console.log(err.message);
            if (rows.length == 0) {
                console.log("Invalid username or password");
            }
            rows.forEach((row) => {
                let loanResponse : number = parseInt((prompt(detail.loanSection)));
                switch(loanResponse){
                    case 1:

                        // checking the loan availability 

                        do{
                       var loanBalance: number = parseInt(prompt(detail.loanAmount)); 
                        if ((Number.isNaN(loanBalance)) || loanBalance < 1) {
                            console.log("Please enter valid amount");
                            
                        }
                    } while ((Number.isNaN(loanBalance)) || loanBalance < 1);       
                    
                    // Query for checking loan status 

                    const loanApplicableQuery: string = `SELECT * FROM user WHERE username = '${userInputName}' AND loanApplied = '1' `;
                       db.all(loanApplicableQuery, [], (err: { message: string }, rows: any[]) => {
                            if (err) return console.log(err.message);
                                console.log("Your loan is not approved");                     
                            // query for check previous loan amount

                            const loanAmountQuery: string = `SELECT * FROM user WHERE username = '${userInputName}' AND password = '${userInputPass}'`;
                            db.all(loanAmountQuery, [], (err: { message: string }, rows: any[]) => {
                                if (err) return console.log(err.message);
                                rows.forEach((row) => {
                                    let loanTakenAmount :number = row.loanAmount;
                                    let totalLoanTaken = loanBalance + loanTakenAmount;

                                    // loan amount updating in loan amount column

                                    let LoanApplyQuery: string = `UPDATE user
                                   SET loanAmount = ${totalLoanTaken} ,loanTaken = ${loanBalance}
                                   WHERE username = '${userInputName}'`;
                                    db.run(LoanApplyQuery, function (err: { message: string }) {
                                        if (err) {
                                            return console.error(err.message);
                                        }
                                        console.log("You successfully applied for a loan.");
                                    });

                                    // loan applied become true 

                                    let loanAppliedQuery: string = `UPDATE user
                               SET 	loanApplied = '${1}'
                               WHERE username = '${userInputName}'`;
                                    db.run(loanAppliedQuery, function (err: { message: string }) {
                                        if (err) {
                                            return console.error(err.message);
                                        }
                                    })
                                })
                            }) 
                    })

                    case 2:
                        const loanAmountQuery: string = `SELECT * FROM user WHERE username = '${userInputName}' AND password = '${userInputPass}' AND loanApplied = '1' `;
                        db.all(loanAmountQuery, [], (err: { message: string }, rows: any[]) => {
                            if (err) return console.log(err.message);
                            rows.forEach((row) => {
                                console.log("Your loan is not approved")
                            })
                        })
                    }  
            })
        })       
    }
    moneyTransfer = (): void => {
        var userInputName: string = prompt(detail.userInput);
        var userInputPass: string = prompt(detail.userPass);
        let balanceAmount: number;

        // Query for user authentication

        const sqlOne = `SELECT * FROM user WHERE username = '${userInputName}' AND password = '${userInputPass}'`;
        db.all(sqlOne, [], (err: { message: string }, rows: any[]) => {
            if (err) return console.log(err.message);
            if (rows.length == 0) {
                console.log("Invalid username or password");
            }
            rows.forEach((row) => {
                balanceAmount = row.amount
                let transferAmount: number = Number(parseInt(prompt(detail.moneyTransfer)));
                let receiverAccountNumber : number = Number(parseInt(prompt(detail.receiverAccountNo)));
                

                if (transferAmount > balanceAmount) {
                    console.log("Insufficient funds to transfer");
                } else {

                    // Query for updated sender balance amount 

                    let balanceAfterTransfer :number = balanceAmount - transferAmount;
                    let transferQuery :string = `UPDATE user
                               SET amount = ${balanceAfterTransfer}
                               WHERE username = '${userInputName}'`;
                    db.run(transferQuery, function (err: { message: string }) {
                        if (err) {
                            return console.error(err.message);
                        }
                    })

                    // Query for check receiver's account balance

                    var receiverBalance :number;
                        let receiverQuery :string = `SELECT * FROM user WHERE accountNo = '${receiverAccountNumber}'`;
                        db.all(receiverQuery, [], (err: { message: string }, rows: any[]) => {
                            if (err) return console.log(err.message);
                            rows.forEach((row) => {
                            receiverBalance  = row.amount;
                                let totalBalance :number = transferAmount + receiverBalance;

                             // Update the receiver's account balance

                                let updateQuery :string = `UPDATE user
                               SET amount = ${totalBalance}
                               WHERE accountNo = '${receiverAccountNumber}'`;
                                db.run(updateQuery, function (err: { message: string }) {
                                    if (err) {
                                        return console.error(err.message);
                                    }
                                    console.log("The amount was successfully transferred to the receiver account.");
                                    console.log(`The remaining balance in your account is ${balanceAfterTransfer}`)
                                })
                            })

                        })
                }
            })
        })       
    }
}
