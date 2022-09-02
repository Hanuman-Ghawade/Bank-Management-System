import { detail } from "../../Constants/InputDetailEnum";
import { userDetail} from "../../Constants/UserDetails";
import { userInputName, userInputPass } from "../../bank";
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

    insertData = (users) => {
        var insertQuery = db.prepare(detail.insertDataQuery);
        // insertQuery.run("Admin",25,9503034025,"admin@gmail.com","10-06-2000","admin","admin")
        insertQuery.run(users.name, users.age, users.mobileNumber, users.email, users.birth, users.accountNo, users.accountType, users.username, users.password, users.amount, users.loanApplicable, users.loanTaken, users.loanAmount, users.loanLimit, users.loanApplied);
        console.log("Data inserted successfully...");
        insertQuery.finalize();
        db.close();
    }

    deposit = (): void => {
        let balanceAmount : number;
        let totalBalance : number
        const depositQuery :string = `SELECT * FROM user WHERE username = '${userInputName}' AND password = '${userInputPass}'`;
        db.all(depositQuery, [], (err: { message: string }, rows: any[]) => {
            if (err) return console.log(err.message);
            if (rows.length == 0) {``
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
                const updateDepositQuery : string = `UPDATE user
                               SET amount = ${totalBalance}
                               WHERE username = '${userInputName}' AND password = '${userInputPass}'`;

                db.run(updateDepositQuery, (err: { message: string }) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log(`The funds have been successfully deposited into your account.`);
                    console.log(`Updated balance in your account is ${totalBalance}`);
                    

                })
                const accountTypeQuery: string = `UPDATE user
                               SET accountType = "Current"
                               WHERE username = '${userInputName}' AND password = '${userInputPass}' AND amount > 100000`;

                db.run(accountTypeQuery, (err: { message: string }) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    rows.forEach((row) => {
                    })
                })

         
            })
        })         
    }
    withdraw  = (): void => {
        let balanceAmount: number;
        let totalBalance: number;
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
                    const withdrawBalanceQuery : string = `UPDATE user
                               SET amount = ${totalBalance}
                               WHERE username = '${userInputName}' AND password = '${userInputPass}'`;
                    db.run(withdrawBalanceQuery, function (err: { message: string }) {
                        if (err) {
                            return console.error(err.message);
                        }
                        console.log(" The funds have been successfully withdrawn from your account.");
                        console.log(`The remaining balance in your account is ${totalBalance}`);
                    })

                    // Account type checking

                    const accountTypeQuery: string = `UPDATE user
                               SET accountType = "Saving"
                               WHERE username = '${userInputName}' AND password = '${userInputPass}' AND amount <= 100000`;

                    db.run(accountTypeQuery, (err: { message: string }) => {
                        if (err) {
                            return console.error(err.message);
                        }
                        rows.forEach((row) => {
                        })
                    })
                }   
            })
        }) 
    }

    viewBalance = (): void => {
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
    accessData = (): void => {
        let check: boolean;
        do {
            let check = true;
            const selectQuery: string = `SELECT * FROM user WHERE username = '${userInputName}' AND password = '${userInputPass}'`;
            db.all(selectQuery, [], (err: { message: string }, rows: any[]) => {
                if (err) return console.log(err.message);
                if (rows.length == 0) {
                    console.log("Invalid username or password");
                    check = false;
                }
                rows.forEach((row) => {
                    console.table(`
                         Name: ${row.Name} ,
                         Mobile Number : ${row.mobileNumber}, 
                         Email : ${row.email},
                         Account Number : ${row.accountNo},
                         Balance Amount : Rs.${row.amount},
                         Loan Amount : Rs.${row.loanAmount}
                         `);
                })
            })
        } while (check == false)
    }

    loanSection = (): void => {
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
                    
                            // query for check previous loan amount

                            const loanAmountQuery: string = `SELECT * FROM user WHERE username = '${userInputName}' AND password = '${userInputPass}'`;
                            db.all(loanAmountQuery, [], (err: { message: string }, rows: any[]) => {
                                if (err) return console.log(err.message);
                                rows.forEach((row) => {
                                    let loanTakenAmount : number = row.loanAmount;
                                    let totalLoanTaken : number = loanBalance + loanTakenAmount;
                                    let updatedLoanLimit : number = row.loanLimit - loanBalance


                                    // loan amount updating in loan amount column

                                    const LoanApplyQuery: string = `UPDATE user
                                   SET loanAmount = ${totalLoanTaken} ,loanTaken = ${loanBalance} , loanLimit = ${updatedLoanLimit}
                                   WHERE username = '${userInputName}' AND password = '${userInputPass}'`;
                                    db.run(LoanApplyQuery, function (err: { message: string }) {
                                        if (err) {
                                            return console.error(err.message);
                                        }
                                        console.log("You successfully applied for a loan.");
                                    });

                                    // loan applied become true 

                                    const loanAppliedQuery: string = `UPDATE user
                               SET 	loanApplied = '${1}'
                               WHERE username = '${userInputName}' AND password = '${userInputPass}'`;
                                    db.run(loanAppliedQuery, function (err: { message: string }) {
                                        if (err) {
                                            return console.error(err.message);
                                        }
                                    })
                                })
                            })
                        break;     
                    case 2:
                        const loanApprovedQuery: string = `SELECT * FROM user WHERE username = '${userInputName}' AND password = '${userInputPass}' AND loanTaken >= 0 `;
                        db.all(loanApprovedQuery, [], (err: { message: string }, rows: any[]) => {
                            rows.forEach((row) => {
                                console.log("Your loan is not approved")

                            })
                            if (err) return console.log(err.message);
                            else{
                                console.log("You Loan is approved ")
                            }     
                        })
                        break;
                    case 3:
                        var totalLoanAmount : number;
                        var balanceLoan : number;
                        var loanLimitAfterPaid : number

                        var paidLoanAmount: number = parseInt(prompt(detail.paidLoan)); 

                        const loanLimitQuery: string = `SELECT * FROM user WHERE username = '${userInputName}' AND password = '${userInputPass}'`;
                        db.all(loanLimitQuery, [], (err: { message: string }, rows: any[]) => {
                            if (err) return console.log(err.message);

                            rows.forEach((row) => {
                                if(paidLoanAmount > row.loanAmount){
                                    console.log("You are entering an amount greater than the loan amount.")
                                }

                            })
                
                        })
                        const paidLoanQuery: string = `SELECT * FROM user WHERE username = '${userInputName}' AND password = '${userInputPass}'`;
                        db.all(paidLoanQuery, [], (err: { message: string }, rows: any[]) => {
                            if (err) return console.log(err.message);
                            
                            rows.forEach((row) => {
                                totalLoanAmount = row.loanAmount;
                                balanceLoan = totalLoanAmount - paidLoanAmount
                                loanLimitAfterPaid = row.loanLimit + paidLoanAmount

                            })
                            const updateLoanQuery: string = `UPDATE user
                               SET 	loanAmount = '${balanceLoan}', loanLimit = ${loanLimitAfterPaid}
                               WHERE username = '${userInputName}' AND password = '${userInputPass}'`;
                            db.run(updateLoanQuery, function (err: { message: string }) {
                                if (err) return console.error(err.message);
                                    console.log("The loan was successfully repaid. ")
                                
                            })
                        })
                        break;
                    case 4:
                        const loanAmountCheckQuery: string = `SELECT * FROM user WHERE username = '${userInputName}' AND password = '${userInputPass}'`;
                        db.all(loanAmountCheckQuery, [], (err: { message: string }, rows: any[]) => {
                            if (err) return console.log(err.message);
                            rows.forEach((row) => {
                                console.log(`You have borrowed Rs.${row.loanAmount} from the bank.`)

                            })
                        })   
                    }  
            })
        })       
    }
    moneyTransfer = (): void => {
        let balanceAmount: number;

        // Query for user authentication

        const moneyTransfer = `SELECT * FROM user WHERE username = '${userInputName}' AND password = '${userInputPass}'`;
        db.all(moneyTransfer, [], (err: { message: string }, rows: any[]) => {
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
                    const transferQuery :string = `UPDATE user
                               SET amount = ${balanceAfterTransfer}
                               WHERE username = '${userInputName}' AND password = '${userInputPass}'`;
                    db.run(transferQuery, function (err: { message: string }) {
                        if (err) {
                            return console.error(err.message);
                        }
                    })

                    // Query for check receiver's account balance

                    var receiverBalance :number;
                        const receiverQuery :string = `SELECT * FROM user WHERE accountNo = '${receiverAccountNumber}'`;
                        db.all(receiverQuery, [], (err: { message: string }, rows: any[]) => {
                            if (err) return console.log(err.message);
                            rows.forEach((row) => {
                            receiverBalance  = row.amount;
                                let totalBalance :number = transferAmount + receiverBalance;

                             // Update the receiver's account balance

                                const updateQuery :string = `UPDATE user
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
