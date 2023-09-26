const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const request = require("request");
const { createProxyMiddleware } = require("http-proxy-middleware");

const cron = require("node-cron");
const sendEmail = require("./routes/sendmail");
const sendEmailTask = require("./routes/emailScheduler");
const moment = require("moment");
const dataImport  = require("./zipmap");
const  Facility =require('./routes/zipmap')

function getDirPath() {
  if (process.pkg) {
    return path.resolve(process.execPath + "/..");
  } else {
    return path.join(require.main ? require.main.path : process.cwd());
  }
}

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(
  "/connect/token",
  createProxyMiddleware({
    target: "https://auth.flexbooker.com",
    changeOrigin: true,
  })
);

app.use(
  "/Account",
  createProxyMiddleware({
    target: "https://merchant-api.flexbooker.com",
    changeOrigin: true,
  })
);

app.use(
  "/api/Customers",
  createProxyMiddleware({
    target: "https://merchant-api.flexbooker.com",
    changeOrigin: true,
  })
);

app.use(
  "/api/CalendarFeed",
  createProxyMiddleware({
    target: "https://merchant-api.flexbooker.com",
    changeOrigin: true,
  })
);

app.use(
  "/Appointment/GetByGuid",
  createProxyMiddleware({
    target: "https://merchant-api.flexbooker.com",
    changeOrigin: true,
  })
);

app.use(
  "/Appointment",
  createProxyMiddleware({
    target: "https://merchant-api.flexbooker.com",
    changeOrigin: true,
  })
);

app.use(
  "/Appointments",
  createProxyMiddleware({
    target: "https://merchant-api.flexbooker.com",
    changeOrigin: true,
  })
);

app.post("/updateappoitment", (req, res) => {
  console.log(req.body);
  var options = {
    method: "PUT",
    url: "https://merchant-api.flexbooker.com/Appointment?allowOverbooking=true",
    headers: {
      Authorization: req.body.accesstoken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body.data),
  };

  request(options, function (error, response) {
    if (error) res.send(error);
    res.send(response.body);
  });
});

//code by uzair starts

app.use("/send-email", sendEmail);

let i = 1;
// Schedule the email to be sent after 48 hours "0 0 */2 * *"
// cron.schedule('* * * * *', () => {

//   console.log(`${i} minute passed`);
//    i++;
//     // sendEmailTask();

// });

//code by uzair ends
async function   abc() {
  try {
    const excelFilePath = "CList.xlsx";
    const data = await dataImport.readExcelData(excelFilePath);
  
   const specificFields = data.map((data) => {
     return {
       facilityName: data["Facility Name"],
       address: data["Address"],
       city: data["City"],
       state: data["State"],
       zip: data["Zip"],
       phone: data["Phone"],
       assignedPhysician: data["Assigned Physician"],
     };
   });

  //  console.log(specificFields);

    // console.log(keyValueData);
  
    // await dataImport.saveDataToMongoDB(specificFields);
    
  } catch (err) {
    console.error("Error importing data:", err);
   
  }

}

abc();

// const uri = process.env.ATLAS_URI;
const localuri = process.env.localuri;

mongoose.connect(localuri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Database connected");
});

app.use("/api", Facility);

const users = require("./routes/user");

app.use("/users", users);

const api = require("./routes/api");

app.use("/api", api);

const notes = require("./routes/notes");

app.use("/notes", notes);

const zipdata = require("./routes/zipdata");

app.use("/zipdata", zipdata);

const invoice = require("./routes/invoice");

app.use("/invoice", invoice);

const jwtVerify = require("./routes/jwtAuth");

app.use("/jwtauth", jwtVerify);

const clinicData = require("./routes/closestclinic");
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.use("/clinic", clinicData);
let newData;
let newDataList = [];

//
//
 
   var options = {
     method: "POST",
     url: "https://auth.flexbooker.com/connect/token",
     headers: {},
     formData: {
       grant_type: "client_credentials",
       scope: "flexbookerApi",
       client_id: "lhppg6lr78",
       client_secret: "rt9ay86q975y4nusweced1l3uoe8w71hxzhw7lpvw0sd0wmb4x",
     },
   };

   request(options, function (error, response) {
     if (error) throw new Error(error);
     console.log(`Bearer ${JSON.parse(response.body).access_token}`);
     var accessToken = `Bearer ${JSON.parse(response.body).access_token}`;
     var options = {
       method: "GET",
       // url: 'https://merchant-api.flexbooker.com/api/CalendarFeed?employeeIds=75222&start=2023-06-1&end=2023-06-18',
       url: "https://merchant-api.flexbooker.com/Account",
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${JSON.parse(response.body).access_token}`,
       },
     };

     request(options, async function (error, response) {
       if (error) throw new Error(error);
       // console.log("Account Responce");
       // console.log(`${JSON.parse(response.body).employees}`);
       var employees = JSON.parse(response.body).employees;
       // console.log(employees);

       for (const employee of employees) {
         const emp_id = employee.id;
         // employees.map(async (varr) => {
         console.log(emp_id);
         // var emp_id = varr.id;
         // var emp_email = varr.email;
         const currentDate = new Date();
         currentDate.setDate(currentDate.getDate() + 2);
         const formattedDate = moment(currentDate).format("YYYY-MM-DD");
         console.log(formattedDate);

         // Add two days

         // console.log(employees);
         var options = {
           method: "GET",
           url: `https://merchant-api.flexbooker.com/api/CalendarFeed?employeeIds=${emp_id}&start=2023-06-18&end=2023-07-1`,
           //'url': 'https://merchant-api.flexbooker.com/Account',
           headers: {
             "Content-Type": "application/json",
             Authorization: `${accessToken}`,
           },
         }; 

         // request(options, function (error, response) {
         // if (error) throw new Error(error);

         // if (response.body.length > 2) {
         //   console.log(JSON.parse(response.body));
         request(options, function (error, response) {
           if (error) throw new Error(error);

           if (response.body.length > 2) {
             // console.log(emp_id);
             // console.log(emp_email);
             const data = JSON.parse(response.body);

             const mapped_objects = data.map(async (obj) => {
               const confirmationGuid = obj.url.split("/")[1];

               const options = {
                 method: "GET",
                 url: `http://platinummedapp.com/Appointment/GetByGuid?confirmationGuid=${confirmationGuid}`,
                 headers: {
                   "Content-Type": "application/json",
                   Authorization: `${accessToken}`,
                 },
               };

               // console.log(mapped_objects);
               request(options, function (error, response) {
                 if (error) throw new Error(error);
                 if (response.body.length > 2) {
                   const data = JSON.parse(response.body);
                   // console.log(data);
                   const {
                     firstName,
                     lastName,
                     email,
                     phone,
                     appointmentDateTime,
                     duration,
                     customBookingFields,
                   } = data;

                   newData = {
                     name: firstName + " " + lastName,
                     email: email,
                     phone: phone,
                     newtime: appointmentDateTime,
                     duration: duration,
                     dbqList: customBookingFields,
                   };
                   // console.log(newData);
                   newDataList.push(newData);
                 }
               });
             });
           }
         });
         console.log("Sending emails..");
         await delay(6000);
        //  cron.schedule("* * * * *", () => {
        //           console.log(newDataList);   
        //  if (newDataList.length > 2) {
        //     sendEmailTask(newDataList, employee.name, formattedDate);
        //  } 

        //  });
         
       }
       // }
       // });
     });
   });
 
//here

// });
//

//server production assests
if (process.env.NODE_ENV === "production") {
  console.log("Running in production!");
  app.use(express.static(path.join("./build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(getDirPath(), "build", "index.html"));
  });
}

// //server production assests

app.listen(port, () => {
  console.log(`Server is Running on port: ${port}`);
});
