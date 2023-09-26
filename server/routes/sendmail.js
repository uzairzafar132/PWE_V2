const nodemailer = require("nodemailer");
const fs = require("fs");
const router = require("express").Router();
const PDFDocument = require("pdfkit-table");
const doc = new PDFDocument({ margin: 30, size: "A4" });

async function getUserAppointments(receiverEmail, pdfData) {
  try {
    const users = pdfData;
    
    console.log(JSON.stringify(users[1].dbq));
    // console.log(users); .props.children[0].props.children[1]+ " "+ users[1].dbq.props.children[1]

    const table = {
      headers: ["Time", "Name", "phoneNumber", "DBQList"],
      rows: users.map((user) => [
        user.newtime || user.time,
        user.name || (user.break ? " BREAK" : ""),
        user.phone || "",
        JSON.stringify(user.dbq)
      ]),
    };

    const newdate = users[0].appointmentDateTime.split(" ");
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

    // Format the date
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
    console.log(table2.rows);

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
      .text(users[0].Doctor, { align: "center" })
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
      .text(users[0].Doctor, { align: "center" })
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
    const stream = fs.createWriteStream("Sign-in Sheet.pdf");
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



async function sendEmailWithAttachment(pdfData ) {

  
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

    const pdfBuffer = await fs.promises.readFile('Sign-in Sheet.pdf');
    console.log(pdfBuffer);

    const mailOptions = {
      from: `${process.env.EMAIL_ADDRESS} `,
      to: "zuzair00@gmail.com",
      // cc: "harisramzan@octathorn.com",
      subject: ` ${pdfData[1].StartDate}  ${pdfData[1].Doctor} Sign-in Sheet`,
      text: `Hello,\nPlease see the sign-in sheet for ${pdfData[1].StartDate}.\nThank you,\nPlatinum Medical Evaluations \n(888) 992-7555`,
      attachments: [
        {
          filename: "Sign-in Sheet.pdf",
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

router.post("/", async (req, res) => {
  try {
    // 
    await getUserAppointments(req.body.receiverEmail, req.body.pdfData);
    await sendEmailWithAttachment(req.body.pdfData);
    res.send("Report generated and email sent successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

module.exports = router;
