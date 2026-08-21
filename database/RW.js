const path = require('path')
const fs = require('fs')
const PathToFile = path.join(__dirname, "data.json")

async function WriteDate(data) {

    await fs.appendFile(PathToFile, data, () => {

        console.log("Data added");


    })
}

 function ReadData() {
    
    const data =  fs.readFile(PathToFile, "utf8")

    return JSON.parse(data);

}

module.exports = {
    WriteDate, 
    ReadData
}
