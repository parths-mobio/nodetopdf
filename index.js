const mysql = require("mysql");
const excel = require("exceljs");

// Create a connection to the database
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

// Open the MySQL connection
con.connect((err) => {
  if (err) throw err;

  // -> Query data from MySQL
  con.query("SELECT * FROM item", function (err, customers, fields) {
    const jsonCustomers = JSON.parse(JSON.stringify(customers));
    console.log(jsonCustomers);
    

    let workbook = new excel.Workbook(); //creating workbook
    let worksheet = workbook.addWorksheet("Customers"); //creating worksheet

    //  WorkSheet Header
    worksheet.columns = [
      { header: "Id", key: "id", width: 10 },
      { header: "Name", key: "name", width: 30 },
      { header: "Description", key: "description", width: 30 },
      { header: "Quantity", key: "quantity", width: 10, outlineLevel: 1 },
      { header: "Amount", key: "amount", width: 30 },
    ];

    // Add Array Rows
    worksheet.addRows(jsonCustomers);

    // Write to File
    workbook.xlsx.writeFile("item.xlsx").then(function () {
      console.log("file saved!");
    });

    // -> Close MySQL connection
    con.end(function (err) {
      if (err) {
        return console.log("error:" + err.message);
      }
      console.log("Close the database connection.");
    });


  });
});
