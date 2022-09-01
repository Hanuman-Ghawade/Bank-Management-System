
import { detail } from "../Constants/InputDetailEnum";
var sqlite3 = require(detail.sqlite).verbose();
var db = new sqlite3.Database(detail.database);

export class Data {

    constructor(){
    }
    createTable = () => {
            db.serialize(function () {
                db.run(detail.createAdminTableQuery);
                console.log("Table created");
            });
    };
    insertData = (users) => {
        var insertQuery = db.prepare(detail.insertAdminQuery);
        // insertQuery.run("Admin",25,9503034025,"admin@gmail.com","10-11-1994","admin","admin")
        insertQuery.run(users.name,users.age,users.mobileNumber,users.email,users.birth,users.accountNo,users.accountType,users.username,users.password,users.amount,users.loanApplicable,users.loanTaken,users.loanAmount,users.loanLimit,users.loanApplied);
        console.log("Data inserted successfully...");
        insertQuery.finalize();
        db.close();
    }

    // accessData = () => {
    //     const sql = detail.selectQuery;
    //     db.all(sql,[],(err:{message:string},rows : any[]) => {
    //         if(err) return console.log(err.message);
    //         rows.forEach((row) => {
    //             console.log(row)
    //         })
    //     })
    // }
    
    deleteData = (name:string) => {
    db.run("DELETE FROM user WHERE name=?", name, err => {
        if (err) return console.log(err.message);
        console.log(`${name} deleted successfully...`);
    });
}
};

