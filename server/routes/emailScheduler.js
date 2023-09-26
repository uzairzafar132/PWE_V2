const nodemailer = require("nodemailer");
const fs = require("fs");
const PDFDocument = require("pdfkit-table");
const moment2 = require("moment-timezone");
const moment = require("moment");





async function getUserAppointments(data,name,fordate) {
  const doc = new PDFDocument({ margin: 30, size: "A4" });
   try {
    const users = data;
    const times = Object.values(users).map((user) => user.newtime);
    const sortableTimes = times.map((time) => {
      const formattedTime = moment(time, "hh:mm A").format("HH:mm");
      return formattedTime;
    });

    // Sort the array of time values
    sortableTimes.sort();

    // Update the users object with sorted time values
    Object.keys(users).forEach((key, index) => {
      users[key].time = moment(sortableTimes[index], "HH:mm").format("hh:mm A");
    });

    console.log(users);
    //
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(timeZone);
    let timeformatMoment;
    
     

     for (const [key, value] of Object.entries(users)) {
       console.log(value.newtime);

       const timeformat = value.newtime;
       const currentTime = moment(); // Get the current time
       const timeZoneOffset = new Date().getTimezoneOffset();
       if (
         new Date().getTimezoneOffset() === 480 ||
         new Date().getTimezoneOffset() === 420
       ) {
         console.log("From USA");
         if (timeZone === "PST - Pacific Time")
           timeformat = timeformat
             .add(moment.duration("08:00:00"))
             .format("MM-DD-YYYY hh:mm A");
         else if (timeZone === "EST - Eastern Time")
           timeformat = timeformat
             .add(moment.duration("09:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
         else if (timeZone === "MST - Mountain Time")
           timeformat = timeformat
             .add(moment.duration("06:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
         else if (timeZone === "CST - Central Time")
           timeformat = timeformat
             .add(moment.duration("09:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
         else if (timeZone === "HST - Hawaiian Time")
           timeformat = timeformat
             .add(moment.duration("05:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
         else if (timeZone === "PHST - Philippine Time")
           timeformat = timeformat
             .subtract(moment.duration("08:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
         else
           timeformat = timeformat
             .subtract(moment.duration("05:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
       } else if (new Date().getTimezoneOffset() === 300) {
         console.log("From EST");
         if (timeZone === "PST - Pacific Time")
           timeformat = timeformat
             .add(moment.duration("05:00:00"))
             .format("MM-DD-YYYY hh:mm A");
         else if (timeZone === "EST - Eastern Time")
           timeformat = timeformat
             .add(moment.duration("07:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
         else if (timeZone === "MST - Mountain Time")
           timeformat = timeformat
             .add(moment.duration("04:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
         else if (timeZone === "CST - Central Time")
           timeformat = timeformat
             .add(moment.duration("07:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
         else if (timeZone === "HST - Hawaiian Time")
           timeformat = timeformat
             .add(moment.duration("03:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
         else if (timeZone === "PHST - Philippine Time")
           timeformat = timeformat
             .subtract(moment.duration("08:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
         else
           timeformat = timeformat
             .subtract(moment.duration("05:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
       } else if (new Date().getTimezoneOffset() === -480) {
         console.log("From Phlip");
         if (timeZone === "PST - Pacific Time")
           timeformat = timeformat
             .subtract(moment.duration("08:00:00"))
             .format("MM-DD-YYYY hh:mm A");
         else if (timeZone === "EST - Eastern Time")
           timeformat = timeformat
             .subtract(moment.duration("02:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
         else if (timeZone === "MST - Mountain Time")
           timeformat = timeformat
             .subtract(moment.duration("04:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
         else if (timeZone === "CST - Central Time")
           timeformat = timeformat
             .subtract(moment.duration("3:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
         else if (timeZone === "HST - Hawaiian Time")
           timeformat = timeformat
             .subtract(moment.duration("07:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
         else if (timeZone === "PHST - Philippine Time")
           timeformat = timeformat
             .subtract(moment.duration("08:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
         else
           timeformat = timeformat
             .subtract(moment.duration("05:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
       } else if (new Date().getTimezoneOffset() === 360) {
         console.log("From CST");
         if (timeZone === "PST - Pacific Time")
           timeformat = timeformat
             .add(moment.duration("06:00:00"))
             .format("MM-DD-YYYY hh:mm A");
         else if (timeZone === "EST - Eastern Time")
           timeformat = timeformat
             .add(moment.duration("09:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
         else if (timeZone === "MST - Mountain Time")
           timeformat = timeformat
             .add(moment.duration("05:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
         else if (timeZone === "CST - Central Time")
           timeformat = timeformat
             .add(moment.duration("08:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
         else if (timeZone === "HST - Hawaiian Time")
           timeformat = timeformat
             .add(moment.duration("04:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
         else if (timeZone === "PHST - Philippine Time")
           timeformat = timeformat
             .subtract(moment.duration("08:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
         else
           timeformat = timeformat
             .subtract(moment.duration("05:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
       } else if (new Date().getTimezoneOffset() === 600) {
         console.log("From Hawii Time");
         if (timeZone === "PST - Pacific Time")
           timeformat = timeformat
             .add(moment.duration("10:00:00"))
             .format("MM-DD-YYYY hh:mm A");
         else if (timeZone === "EST - Eastern Time")
           timeformat = timeformat
             .add(moment.duration("11:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
         else if (timeZone === "MST - Mountain Time")
           timeformat = timeformat
             .add(moment.duration("08:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
         else if (timeZone === "CST - Central Time")
           timeformat = timeformat
             .add(moment.duration("11:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
         else if (timeZone === "HST - Hawaiian Time")
           timeformat = timeformat
             .add(moment.duration("08:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
         else if (timeZone === "PHST - Philippine Time")
           timeformat = timeformat
             .subtract(moment.duration("08:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
         else
           timeformat = timeformat
             .subtract(moment.duration("05:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
       } else {
         console.log("From Pakistan");
         if (timeZone === "PST - Pacific Time")
           timeformat = timeformat
             .subtract(moment.duration("05:00:00"))
             .format("MM-DD-YYYY hh:mm A");
         else if (timeZone === "EST - Eastern Time")
           timeformat = timeformat
             .subtract(moment.duration("02:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
         else if (timeZone === "MST - Mountain Time")
           timeformat = timeformat
             .subtract(moment.duration("04:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
         else if (timeZone === "CST - Central Time")
           timeformat = timeformat
             .subtract(moment.duration("3:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
         else if (timeZone === "HST - Hawaiian Time")
           timeformat = timeformat
             .subtract(moment.duration("07:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
         else if (timeZone === "PHST - Philippine Time")
           timeformat = timeformat
             .subtract(moment.duration("08:00:00"))
             .format("MM-DD-YYYY  hh:mm A");
         //  console.log(timeformat);
         else timeformatMoment = moment(timeformat);

         timeformatMoment.subtract(moment.duration("05:00:00"));
       }

       var aptTime = new Date(timeformatMoment).getTime();
       console.log("aptTime " + aptTime);
       value.newtime = aptTime;
       const date = new Date(aptTime);
       const hours = date.getHours();
       const minutes = date.getMinutes();
       const ampm = hours >= 12 ? "PM" : "AM";
       const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
       const formattedTime = `${formattedHours}:${minutes
         .toString()
         .padStart(2, "0")} ${ampm}`;

       console.log(":: " + formattedTime);
       value.newtime = formattedTime;
     }
   const table = {
  headers: ["Time", "Name", "phoneNumber", "DBQList"],
  rows: [],
};
for (const [key, value] of Object.entries(users)) {
  const row = [
    value.newtime || value.time,
    value.name || (value.break ? " BREAK" : ""),
    value.phone || "",
    value.dbqList && value.dbqList[5] ? String(value.dbqList[5].value) : "",
  ];

  table.rows.push(row);
}


     const date1 = fordate;
     const newdate = date1.split(" ");
     console.log(newdate[0] + "  ndate");
     const date = new Date(newdate[0]);

     // Get the month name
     const monthNames = [
       "January",
       "February",
       "March",
       "April",
       "May",
       "June",
       "July",
       "August",
       "September",
       "October",
       "November",
       "December",
     ];
     const month = monthNames[date.getMonth()];

     // Get the day with leading zero if necessary
     const day = date.getDate().toString().padStart(2, "0");

     // Get the year
     const year = date.getFullYear();

    //  // Format the date
     const formattedDate = `${month} ${day}, ${year}`;

     const table2 = {
       headers: ["Signature", "PatientName", "ApptTime", "ID Verification"],
       rows: [],
     };
     //
     function getInitials(fullName) {
       const names = fullName.split(" ");
       const trimnames = names.filter((name) => name.trim() !== "");
       let one = trimnames[0].charAt(0);
       let two = trimnames[1].charAt(0);
       let initials = one + two;
       return initials;
     }
     //
     if (Array.isArray(users)) {
       users.forEach((user) => {
         try {
           const row = [
             "",
             user.name ? getInitials(user.name) : ` BREAK`,
             user.newtime || user.time,
           ];
           table2.rows.push(row);
         } catch (error) {
           console.error("An error occurred while processing user:", user);
         }
       });
      //  console.log(table2.rows);
     } else {
       console.error("users is not an array.");
     }

     doc
       .font("Helvetica-Bold")
       .fontSize(18)
       .text("Patient List", { align: "center", underline: true })
       .moveDown(0.5);

     doc
       .font("Helvetica-Bold")
       .fontSize(18)
       .text(formattedDate, { align: "center" })
       .moveDown(0.5);
     doc
       .font("Helvetica-Bold")
       .fontSize(18)
       .text(name, { align: "center" })
       .moveDown(0.5);

     doc.table(table);
     doc.moveDown();

     // Align title of the second table to the center
     doc.addPage();
     doc
       .font("Helvetica-Bold")
       .fontSize(18)
       .text(formattedDate, { align: "center" })
       .moveDown(0.5);

     doc
       .font("Helvetica-Bold")
       .fontSize(18)
       .text("Welcome to Platinum Medical Evaluations", { align: "center" })
       .moveDown(0.5);

     doc
       .font("Helvetica-Bold")
       .fontSize(18)
       .text(name, { align: "center" })
       .moveDown(0.5);

     //
     const startX = doc.page.margins.left;
     const startY = doc.y;
     const lineWidth = 530;
     const lineHeight = 20;

     // Rectangle 1
     doc.rect(startX, startY, lineWidth, lineHeight).fill("#FFC0CB");
     doc
       .font("Helvetica-Bold")
       .fontSize(12)
       .fillColor("#000000")
       .text(
         "Please email or text the sign in sheet at the end of your shift to:",
         startX + 5,
         startY + 5,
         { width: lineWidth - 10, align: "" }
       );

     // Rectangle 2
     const rectangle2Y = startY + lineHeight;
     doc.rect(startX, rectangle2Y, lineWidth, lineHeight).fill("#FFC0CB");
     doc
       .font("Helvetica-Bold")
       .fontSize(12)
       .fillColor("#000000")
       .text(
         "evaluations@housecallmd.com     310-853-1739",
         startX + 5,
         rectangle2Y + 5,
         { width: lineWidth - 10, align: "" }
       );

     // Rectangle 3
     const rectangle3Y = rectangle2Y + lineHeight;
     doc.rect(startX, rectangle3Y, lineWidth, lineHeight).fill("#808080");
     doc
       .font("Helvetica-Bold")
       .fontSize(12)
       .fillColor("#000000")
       .text("Please Sign In", startX, rectangle3Y + 5, {
         width: lineWidth,
         align: "center",
       });

     // Horizontal Line
     const lineY = rectangle3Y + lineHeight + 5;
     doc
       .moveTo(startX, lineY)
       .lineTo(startX + lineWidth, lineY)
       .lineWidth(1)
       .stroke();

     // Move down after the elements
     doc.moveDown(1.5);

     doc.table(table2);
     // or columnsSize
    //  const stream = fs.createWriteStream(`Sign-in Sheet.pdf`);
    const stream = fs.createWriteStream(`${fordate} ${name}`+".pdf");
     doc.pipe(stream);

     doc.end();
     await new Promise((resolve, reject) => {
       stream.on("finish", resolve);
       stream.on("error", reject);
     });

     // sendEmailWithAttachment(receiverEmail,pdfData);
   } catch (error) {
     // Handle any errors that occur during the retrieval
     console.error(error);
   }
  
}


async function sendEmailTask(data,name,fordate) {
  await getUserAppointments(data,name,fordate);

//  const adata = JSON.parse(data);
//  console.log("data: " + JSON.stringify(data));
   

  
  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.Email,
        pass: process.env.pass,
      },
    });

    // Read the PDF file as a Buffer
    // const pdfBuffer = fs.readFileSync("Sign-in Sheet.pdf");

    const pdfBuffer = await fs.promises.readFile(`${fordate} ${name}` + ".pdf");
    console.log(pdfBuffer);

    const mailOptions = {
      from: `${process.env.EMAIL_ADDRESS} `,
      to: "zuzair00@gmail.com",
      // cc: "harisramzan@octathorn.com",
      subject: ` ${fordate}  ${name} Sign-in Sheet`,
      text: `Hello,\nPlease see the sign-in sheet for ${fordate} .\nThank you,\nPlatinum Medical Evaluations \n(888) 992-7555`,
      attachments: [
        {
          filename: `${fordate} ${name}` + ".pdf",
          content: pdfBuffer,
        },
        // {
        //   filename: "Sign-in Sheet.pdf",
        //   content: pdfBuffer,
        // },
      ],
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Start the task
module.exports = sendEmailTask;
