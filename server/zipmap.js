
const xlsx = require("xlsx");
const Facility = require("./models/Map");

 // Replace with the path to your Excel file

async function readExcelData(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
  const worksheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(worksheet, { raw: true });
}

async function saveDataToMongoDB(data) {
  
   try {
    console.log(data);
     const result = await Facility.insertMany(data);
     console.log(`${result.length} records inserted into MongoDB.`);
   } catch (err) {
     console.error("Error saving data to MongoDB:", err);
   }
}

module.exports = { readExcelData, saveDataToMongoDB };

