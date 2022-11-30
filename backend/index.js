
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const app = express()
const PythonShell = require('python-shell').PythonShell
app.use(cors())
app.use(express.json())

app.get("/" , (req,res) => {
    res.send("hello World")
})

 app.post("/python" , (req,res) =>{
  const {testCases} = req.body;
     fs.writeFileSync("test.py", req.body.boilerPlate)
    //  const testCases = {
    //   one: [1, 2, 3],
    //   two: [2, 2, 4],
    //   three: [2, -2, 0],
    // };
  
    const promises = [];
    const testCaseResults = [];
  
    Object.keys(testCases).map((key) => {
      promises.push(
        new Promise((resolve, reject) => {
          PythonShell.run(
            "test.py",
            {
              mode: "text",
              pythonOptions: ["-u"],
              args: testCases[key],
            },
            function (err, results) {
              if (err) {
                reject();
                throw err;
              }
              console.log(results);
              testCaseResults.push(results[0]);
              resolve(true);
            }
          );
        })
      );
    });
  
    Promise.all(promises).then(() => {
      res.json({ testCaseResults });
    });
  });

app.listen(4000, () => {
    console.log("running on port 4000")
})