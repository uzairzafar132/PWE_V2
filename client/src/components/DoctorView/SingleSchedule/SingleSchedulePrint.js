import React, { useRef, useState, useEffect } from "react";

import axios from "axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { useReactToPrint } from "react-to-print";
import makeStyles from "@emotion/styled";
import { Link } from "react-router-dom";
import Schedule from "../DoctorSchedule/Schedule";

const useStyles = makeStyles({
  customStyle: {
    padding: "0px !important",
  },
});

function SingleSchedulePrint(props) {
  const classes = useStyles();
  const [appointments, setAppointments] = useState([]);
  const [dataName, setDataName] = useState("..loading");

 


  function getInitials(fullName) {
    const names = fullName.split(" ");
    const initials = names.map((name) => name.charAt(0)).join("");
    return initials;
  }

console.log(props.dataRows);
console.log(props.user);



  const handleSendEmail = () => {
    axios
      .post("http://localhost:8080/send-email", {
        receiverEmail: "zuzair00@gmail.com",
        attachmentPath: "output.pdf",
      })
      .then((response) => {
        console.log("Email sent successfully");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  const tableRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

  const handleClickPrint = () => {
  handlePrint();
};

  return (
    <div>
      <Button variant="contained" onClick={handleClickPrint}>
        Print
      </Button>
      <TableContainer component={Paper} ref={tableRef}>
        <div style={{ margin: "5px" }}>
          <Typography variant="h5" align="center" gutterBottom>
            Patient List
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            May 03, 2023
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            {/* {props.user.name} */}
          </Typography>
        </div>
        <div style={{ margin: "px" }}>
          <Table style={{ border: "1px solid black" }}>
            <TableHead sx={{ fontFamily: "Arial" }}>
              <TableRow>
                <TableCell style={{ border: "1px solid black" }}>
                  <b> Name </b>
                </TableCell>
                <TableCell style={{ border: "1px solid black" }}>
                  <b> StartTime </b>
                </TableCell>

                <TableCell style={{ border: "1px solid black" }}>
                  <b> Phone Number </b>
                </TableCell>
                <TableCell style={{ border: "1px solid black" }}>
                  <b> DBQ </b>
                </TableCell>
              </TableRow>
            </TableHead>

            <tbody>
              {Array.isArray(props.dataRows) &&
                props.dataRows.map((appointment, index) => (
                  <tr style={{ border: "1px solid black" }} key={index}>
                    <td style={{ border: "1px solid black" }}>
                      {appointment.firstName || appointment.breakStartTime}
                    </td>
                    <td
                      style={
                        appointment.Patient === ""
                          ? { borderLeft: "none", borderRight: "none" }
                          : { border: "1px solid black" }
                      }
                    >
                      {new Date(appointment.time).toLocaleString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </td>
                    <td
                      style={
                        appointment.Patient === "break"
                          ? { borderLeft: "none", borderRight: "none" }
                          : { border: "1px solid black" }
                      }
                    >
                      {appointment.phone}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        fontWeight: appointment.dbqList ? "normal" : "bold",
                      }}
                    >
                      {appointment.dbq ||
                        (appointment.break && <b> MINUTE BREAK</b>)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
        <div style={{ margin: "50px" }}>
          <Typography variant="h5" align="center" gutterBottom>
            May 03, 2023
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            Welcome to Platinum Medical Evaluations
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            {props.user}
          </Typography>
          <Table
            style={{ margin: "auto", width: "70%", border: "1px solid black" }}
          >
            <TableHead sx={{ fontFamily: "Arial" }}>
              <TableRow
                style={{ backgroundColor: "pink", border: "1px solid black" }}
              >
                <TableCell
                  className={classes.customStyle}
                  rowSpan={2}
                  colSpan={2}
                  style={{
                    marginRight: "10px",
                    textAlign: "right",
                    border: "1px solid black",
                  }}
                >
                  <span>
                    Please email or text the sign in <br />
                    sheet at the end of your shift to:
                  </span>
                </TableCell>
                <TableCell colSpan={2} style={{ border: "1px solid black" }}>
                  evaluations@housecallmd.com
                </TableCell>
              </TableRow>

              <TableRow
                style={{ backgroundColor: "pink", border: "1px solid black" }}
              >
                <TableCell
                  colSpan={2}
                  className={classes.customStyle}
                  style={{ border: "1px solid black" }}
                >
                  310-853-1739
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  colSpan={4}
                  className={classes.customStyle}
                  style={{ backgroundColor: "gray", border: "1px solid black" }}
                >
                  <Typography
                    style={{ padding: "0px" }}
                    variant="h5"
                    align="center"
                    gutterBottom
                  >
                    Please sign In
                  </Typography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ border: "1px solid black" }}>
                  <b> Signature </b>
                </TableCell>
                <TableCell style={{ border: "1px solid black" }}>
                  <b> Name </b>
                </TableCell>
                <TableCell style={{ border: "1px solid black" }}>
                  <b> Time </b>
                </TableCell>
                <TableCell style={{ border: "1px solid black" }}>
                  <b> ID Verification </b>
                </TableCell>
              </TableRow>
            </TableHead>
            <tbody>
              {Array.isArray(props.dataRows) &&
                props.dataRows.map((appointment, index) => (
                  <tr style={{ border: "1px solid black" }} key={index}>
                    <td style={{ border: "1px solid black" }}></td>
                    <td style={{ border: "1px solid black" }}>
                      <b>
                        {" "}
                        {getInitials(appointment.firstName.props.children[1])}
                        {/* {appointment.Patient && appointment.Patient.charAt(0)}
                      {!appointment.Patient && !appointment.Name && "break"}
                      {appointment.Name && appointment.Name.charAt(0)} */}
                      </b>
                    </td>
                    <td
                      style={
                        appointment.Patient === ""
                          ? { borderLeft: "none", borderRight: "none" }
                          : { border: "1px solid black" }
                      }
                    >
                      {new Date(appointment.time).toLocaleString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </td>
                    <td></td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </TableContainer>
      <button onClick={handleSendEmail}>Send Email</button>
      <Link to="/appoint">Create Appoint </Link>
      <Schedule onClickFunction={handleClickPrint} />
    </div>
  );
}

export default SingleSchedulePrint;
