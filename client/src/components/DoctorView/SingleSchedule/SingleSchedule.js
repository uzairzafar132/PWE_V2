//convert date to number and then sort

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import moment from "moment";
import "./print-styles.css";


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

const useStyles = makeStyles({
  customStyle: {
    padding: "0px !important",
  },
});

//get value of Appointment Attended Status and use that to set Appointment status
const config2 = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const config3 = {
  headers: {
    "Content-Type": "application/json",
  },
};

var accessToken = "";
let dataDetails = [];
var newTimeZone = "";

const SingleSchedule = (props) => {
  const [dataRows, setDataRows] = useState();
  const [mailResponse, setmMailResponse] = useState(false);
  const [timeZone, setTimeZone] = useState();
  const [appointments, setAppointments] = useState([]);

  // uziar

  const [user, setUser] = useState("...loading");
  //uziar

  const config = {
    timeout: 1000 * 5, // Wait for 5 seconds

    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const credintials = [
    {
      grant_type: "client_credentials",
      scope: "flexbookerApi",
      client_id: "lhppg6lr78",
      client_secret: "rt9ay86q975y4nusweced1l3uoe8w71hxzhw7lpvw0sd0wmb4x",
    },
  ];

  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

  useEffect(() => {
    axios
      .get("http://platinummedapp.com/users/findalldoc")
      .then(function (response) {
        response.data.map((user) => {
          if (props.email === user.email) {
            console.log("Found User Email" + user.name);
            setUser(user.name);

            console.log(user.timeZone);
            setTimeZone(user.timeZone);

            newTimeZone = user.timeZone;
          }
        });
        axios
          .post("http://platinummedapp.com/connect/token", credintials, config)
          .then(function (response) {
            console.log(response.data.access_token);

            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${response.data.access_token}`;
            accessToken = `Bearer ${response.data.access_token}`;

            axios.get(props.dataURL, config2).then(function (response) {
              let index = 0;

              response.data.map((item) => {
                console.log(item.url);

                var Appointment = item.url.split("/").pop();
                console.log(Appointment);

                ///https://merchant-api.flexbooker.com/Appointment/GetByGuid?confirmationGuid=1e8f779a-2535-4c71-b48c-a95f65a7b0b9
                axios
                  .get(
                    "http://platinummedapp.com/Appointment/GetByGuid?confirmationGuid=" +
                      Appointment,
                    config2
                  )
                  .then(function (response) {
                    var dbqlist = "";

                    var verificationID = "-";
                    var qbdi = 0;
                    var customStatus = "";

                    response.data.customBookingFields.map((item) => {
                      if (
                        item.merchantFieldId === 7723 ||
                        item.merchantFieldId === 7724 ||
                        item.merchantFieldId === 7725 ||
                        item.merchantFieldId === 7726 ||
                        item.merchantFieldId === 7727 ||
                        item.merchantFieldId === 7728 ||
                        item.merchantFieldId === 7729 ||
                        item.merchantFieldId === 7730
                      ) {
                        if (item.value !== null) {
                          dbqlist = (
                            <p>
                              {dbqlist}
                              {item.value}
                            </p>
                          );
                        }
                      }

                      if (item.merchantFieldId === 13878) {
                        if (item.value !== null) {
                          verificationID = item.value;
                        } else {
                          verificationID = "-";
                        }
                      }

                      //doctor verification
                      if (item.merchantFieldId === 13904) {
                        if (item.value !== null) {
                          customStatus = item.value;
                        } else {
                          customStatus = "NotSet";
                        }
                      }
                    });

                    //  var customStatus = "";
                    if (customStatus === "NotSet")
                      if (response.data.customStatusId === 435) {
                        customStatus = "No Show";
                      } else if (response.data.customStatusId === 434) {
                        customStatus = "Attended";
                      } else {
                        customStatus = "-";
                      }

                    console.log("Data");
                    console.log(response.data);

                    var abttime = (
                      <p>
                        {" "}
                        {response.data.firstName + " " + response.data.lastName}
                        <br />{" "}
                        <span style={{ fontWeight: "bold" }}>
                          {response.data.duration + " Min"}
                        </span>
                      </p>
                    );
                    var timeformat = moment(response.data.appointmentDateTime);

                    console.log(response.data.appointmentDateTime);
                    console.log(
                      moment(response.data.appointmentDateTime).format(
                        "MM-DD-YYYY hh:mm A"
                      )
                    );

                    // if(newTimeZone==="PST - Pacific Time")
                    // timeformat=timeformat.add(moment.duration("07:00:00")).format("MM-DD-YYYY hh:mm A");
                    // else if(newTimeZone==="EST - Eastern Time")
                    // timeformat=timeformat.add(moment.duration("05:00:00")).format("MM-DD-YYYY  hh:mm A");
                    // else if(newTimeZone==="MST - Mountain Time")
                    // timeformat=timeformat.add(moment.duration("06:00:00")).format("MM-DD-YYYY  hh:mm A");
                    // else if(newTimeZone==="CST - Central Time")
                    // timeformat=timeformat.add(moment.duration("05:00:00")).format("MM-DD-YYYY  hh:mm A");
                    // else if(newTimeZone==="HST - Hawaiian Time")
                    // timeformat=timeformat.add(moment.duration("09:00:00")).format("MM-DD-YYYY  hh:mm A");
                    // else if(newTimeZone==="PHST - Philippine Time")
                    // timeformat=timeformat.subtract(moment.duration("08:00:00")).format("MM-DD-YYYY  hh:mm A");
                    // else
                    // timeformat=timeformat.subtract(moment.duration("05:00:00")).format("MM-DD-YYYY  hh:mm A");
                    console.log(new Date().getTimezoneOffset());

                    if (
                      new Date().getTimezoneOffset() === 480 ||
                      new Date().getTimezoneOffset() === 420
                    ) {
                      console.log("From USA");
                      if (newTimeZone === "PST - Pacific Time")
                        timeformat = timeformat
                          .add(moment.duration("08:00:00"))
                          .format("MM-DD-YYYY hh:mm A");
                      else if (newTimeZone === "EST - Eastern Time")
                        timeformat = timeformat
                          .subtract(moment.duration("13:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                      else if (newTimeZone === "MST - Mountain Time")
                        timeformat = timeformat
                          .add(moment.duration("07:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                      else if (newTimeZone === "CST - Central Time")
                        timeformat = timeformat
                          .add(moment.duration("10:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                      else if (newTimeZone === "HST - Hawaiian Time")
                        timeformat = timeformat
                          .add(moment.duration("06:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                      else if (newTimeZone === "PHST - Philippine Time")
                        timeformat = timeformat
                          .subtract(moment.duration("08:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                      else
                        timeformat = timeformat
                          .subtract(moment.duration("05:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                    } else if (new Date().getTimezoneOffset() === 300) {
                      console.log("From EST");
                      if (newTimeZone === "PST - Pacific Time")
                        timeformat = timeformat
                          .add(moment.duration("05:00:00"))
                          .format("MM-DD-YYYY hh:mm A");
                      else if (newTimeZone === "EST - Eastern Time")
                        timeformat = timeformat
                          .add(moment.duration("07:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                      else if (newTimeZone === "MST - Mountain Time")
                        timeformat = timeformat
                          .add(moment.duration("04:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                      else if (newTimeZone === "CST - Central Time")
                        timeformat = timeformat
                          .add(moment.duration("07:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                      else if (newTimeZone === "HST - Hawaiian Time")
                        timeformat = timeformat
                          .add(moment.duration("03:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                      else if (newTimeZone === "PHST - Philippine Time")
                        timeformat = timeformat
                          .subtract(moment.duration("08:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                      else
                        timeformat = timeformat
                          .subtract(moment.duration("05:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                    } else if (new Date().getTimezoneOffset() === -480) {
                      console.log("From Phlip");
                      if (newTimeZone === "PST - Pacific Time")
                        timeformat = timeformat
                          .subtract(moment.duration("08:00:00"))
                          .format("MM-DD-YYYY hh:mm A");
                      else if (newTimeZone === "EST - Eastern Time")
                        timeformat = timeformat
                          .subtract(moment.duration("05:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                      else if (newTimeZone === "MST - Mountain Time")
                        timeformat = timeformat
                          .subtract(moment.duration("07:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                      else if (newTimeZone === "CST - Central Time")
                        timeformat = timeformat
                          .subtract(moment.duration("6:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                      else if (newTimeZone === "HST - Hawaiian Time")
                        timeformat = timeformat
                          .subtract(moment.duration("10:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                      else if (newTimeZone === "PHST - Philippine Time")
                        timeformat = timeformat
                          .subtract(moment.duration("08:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                      else
                        timeformat = timeformat
                          .subtract(moment.duration("05:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                    } else if (new Date().getTimezoneOffset() === 360) {
                      console.log("From CST");
                      if (newTimeZone === "PST - Pacific Time")
                        timeformat = timeformat
                          .add(moment.duration("06:00:00"))
                          .format("MM-DD-YYYY hh:mm A");
                      else if (newTimeZone === "EST - Eastern Time")
                        timeformat = timeformat
                          .add(moment.duration("09:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                      else if (newTimeZone === "MST - Mountain Time")
                        timeformat = timeformat
                          .add(moment.duration("05:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                      else if (newTimeZone === "CST - Central Time")
                        timeformat = timeformat
                          .add(moment.duration("08:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                      else if (newTimeZone === "HST - Hawaiian Time")
                        timeformat = timeformat
                          .add(moment.duration("04:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                      else if (newTimeZone === "PHST - Philippine Time")
                        timeformat = timeformat
                          .subtract(moment.duration("08:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                      else
                        timeformat = timeformat
                          .subtract(moment.duration("05:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                    } else if (new Date().getTimezoneOffset() === 600) {
                      console.log("From Hawii Time");
                      if (newTimeZone === "PST - Pacific Time")
                        timeformat = timeformat
                          .add(moment.duration("10:00:00"))
                          .format("MM-DD-YYYY hh:mm A");
                      else if (newTimeZone === "EST - Eastern Time")
                        timeformat = timeformat
                          .add(moment.duration("11:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                      else if (newTimeZone === "MST - Mountain Time")
                        timeformat = timeformat
                          .add(moment.duration("08:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                      else if (newTimeZone === "CST - Central Time")
                        timeformat = timeformat
                          .add(moment.duration("11:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                      else if (newTimeZone === "HST - Hawaiian Time")
                        timeformat = timeformat
                          .add(moment.duration("08:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                      else if (newTimeZone === "PHST - Philippine Time")
                        timeformat = timeformat
                          .subtract(moment.duration("08:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                      else
                        timeformat = timeformat
                          .subtract(moment.duration("05:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                    } else {
                      console.log("From Pakistan");
                      if (newTimeZone === "PST - Pacific Time")
                        timeformat = timeformat
                          .subtract(moment.duration("05:00:00"))
                          .format("MM-DD-YYYY hh:mm A");
                      else if (newTimeZone === "EST - Eastern Time")
                        timeformat = timeformat
                          .subtract(moment.duration("02:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                      else if (newTimeZone === "MST - Mountain Time")
                        timeformat = timeformat
                          .subtract(moment.duration("04:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                      else if (newTimeZone === "CST - Central Time")
                        timeformat = timeformat
                          .subtract(moment.duration("3:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                      else if (newTimeZone === "HST - Hawaiian Time")
                        timeformat = timeformat
                          .subtract(moment.duration("07:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                      else if (newTimeZone === "PHST - Philippine Time")
                        timeformat = timeformat
                          .subtract(moment.duration("08:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                      else
                        timeformat = timeformat
                          .subtract(moment.duration("05:00:00"))
                          .format("MM-DD-YYYY  hh:mm A");
                    }

                    var newStartDate = new Date(props.startDate).getTime();
                    var newEndDate = new Date(props.endDate).getTime();
                    newEndDate = 24 * 60 * 60 * 1000 + newEndDate;
                    var aptTime = new Date(
                      response.data.appointmentDateTime
                    ).getTime();

                    if (aptTime >= newStartDate && aptTime <= newEndDate) {
                      dataDetails[index] = {
                        dbq: dbqlist,
                        time: aptTime,
                        phone:
                          response.data.phone.slice(0, 3) +
                          "-" +
                          response.data.phone.slice(3, 6) +
                          "-" +
                          response.data.phone.slice(6, 10),
                        appointmentStatus: customStatus,
                        id: response.data.id,
                        appointmentDateTime: timeformat,
                        firstName: abttime,
                        duration: response.data.duration,
                        verificationID: verificationID,
                        confirmationGuid: response.data.confirmationGuid,
                        alldata: response.data,
                      };
                      index++;
                      setDataRows([...dataDetails]);
                    }
                  });
              });
            });
          });
      });
  }, [props.dataURL]);

  const onCellUpdate = () => {
    console.log("Cell updated");
  };

  // const doctorScheduling =(data)=>{

  //     console.log(data);

  //    // https://merchant-api.flexbooker.com/Appointment/GetByGuid?confirmationGuid=1e8f779a-2535-4c71-b48c-a95f65a7b0b9
  //    //862487cd-4152-4eb6-840a-3dedf94dd8cd test id

  //     axios.get("http://platinummedapp.com/Appointment/GetByGuid?confirmationGuid=862487cd-4152-4eb6-840a-3dedf94dd8cd",config2).then(function (response) {

  //     console.log(response.data);

  // });

  // }

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const columns = [
    {
      title: "confirmationGuid",
      field: "confirmationGuid",
      width: "0%",
      hidden: true,
      editable: "never",
    },
    { title: "Id", field: "_id", width: "0%", hidden: true, editable: "never" },
    {
      title: "alldata",
      field: "alldata",
      width: "0%",
      hidden: true,
      editable: "never",
    },
    {
      title: "Name",
      field: "firstName",
      sorting: false,
      cellStyle: {
        minWidth: 200,
        maxWidth: 200,
      },
      editable: "never",
    },
    {
      title: "time",
      field: "time",
      hidden: false,
      width: "0%",
      defaultSort: "asc",
      editable: "never",
    },
    {
      title: "Start Time",
      field: "appointmentDateTime",
      cellStyle: {
        minWidth: 90,
        maxWidth: 110,
      },
      editable: "never",
    },
    {
      title: "Phone",
      field: "phone",
      sorting: false,
      editable: "never",
      cellStyle: {
        minWidth: 150,
        maxWidth: 150,
      },
    },
    {
      title: "DBQ List",
      field: "dbq",
      sorting: false,
      editable: "never",
      cellStyle: {
        minWidth: 300,
        maxWidth: 300,
      },
    },
    {
      title: "Verification ID",
      field: "verificationID",
      width: "10%",
      editable: "always",
    },
    {
      title: "Appointment Status",
      field: "appointmentStatus",
      width: "10%",
      editable: "never",
    },
    {
      title: "Actions",
      sorting: false,
      width: "300px",
      editable: "never",
      width: "10%",
      render: (rowData) => (
        <div>
          <div
            style={{ margin: "2px" }}
            className="btn  btn-sm btn-success"
            onClick={(rowDatas) => {
              const dataDetails2 = [...dataRows];
              const index = dataDetails2.indexOf(rowData);

              rowData.appointmentStatus = "Attended";

              rowData.alldata.customBookingFields.map((iteam) => {
                if (iteam.merchantFieldId === 13904) {
                  iteam.value = "Attended";
                }
              });

              rowData.alldata.customStatusId = 434;

              delete rowData.alldata["appointmentDateTime"];

              rowData.alldata.remindByEmail = false;
              rowData.alldata.remindBySms = false;
              console.log("Off Notifcations");
              console.log(rowData.alldata);

              axios
                .post("http://platinummedapp.com/updateappoitment", {
                  accesstoken: accessToken,
                  data: rowData.alldata,
                })
                .then(function (response) {
                  dataDetails2[index] = rowData;

                  console.log("Responce: ");
                  console.log(response.data);

                  setDataRows([...dataDetails2]);

                  //   // dataUpdate[index] = rowData;
                  //   if(udateAllowed===1){
                  //     setUdateAllowed(0);
                  //   }else
                  //   setUdateAllowed(1);
                  // //  setDataRows(dataUpdate);
                });
            }}
          >
            Attended
          </div>

          <div
            style={{ margin: "2px" }}
            className="btn  btn-sm btn-danger"
            onClick={(rowDatas) => {
              console.log(rowData);

              // Do save operation
              console.log("Data Recived from Flexbooker");
              console.log(rowData.alldata);

              const dataDetails2 = [...dataRows];
              const index = dataDetails2.indexOf(rowData);

              rowData.appointmentStatus = "No Show";

              rowData.alldata.customStatusId = 435;
              rowData.alldata.customBookingFields.map((iteam) => {
                if (iteam.merchantFieldId === 13904) {
                  iteam.value = "No Show";
                }
              });

              delete rowData.alldata["appointmentDateTime"];
              rowData.alldata.remindByEmail = false;
              rowData.alldata.remindBySms = false;
              console.log("Data Send to Flexbooker");
              console.log(rowData.alldata);
              axios
                .post("http://platinummedapp.com/updateappoitment", {
                  accesstoken: accessToken,
                  data: rowData.alldata,
                })
                .then(function (response) {
                  dataDetails2[index] = rowData;
                  console.log("Responce: ");
                  console.log(response.data);

                  setDataRows([...dataDetails2]);
                });
            }}
          >
            No Show
          </div>

          <div
            style={{ margin: "2px", fontSize: "13px" }}
            className="btn  btn-sm btn-primary"
            onClick={(rowDatas) => {
              console.log(rowData);

              openInNewTab(
                "https://a.flexbooker.com/manage#booking/" +
                  rowData.confirmationGuid
              );
            }}
          >
            Open Flexbooker
          </div>
        </div>
      ),
    },
  ];

  const classes = useStyles();

  function getInitials(fullName) {
    const names = fullName.split(" ");
    const trimnames = names.filter((name) => name.trim() !== "");
    let one = trimnames[0].charAt(0);
    let two = trimnames[1].charAt(0);
    let initials = one + two;
    return initials;
  }

  const tableRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

  const handleClickPrint = () => {
    handlePrint();
  };

  // uzair start
  const modified = [];
  // const times = dataDetails.map((obj) => obj.appointmentDateTime)
            const abc = dataDetails;
  const sortedTimes = abc.sort((a, b) => {
    const dateA = new Date(a.appointmentDateTime);
    const dateB = new Date(b.appointmentDateTime);
    return dateA - dateB;
  });




  const updatedSortedTimes = []; // Create a new array to store the updated sortedTimes


  for (let i = 0; i < sortedTimes.length; i++) {
    const currentTime = new Date(sortedTimes[i].appointmentDateTime);

    if (i < sortedTimes.length - 1) {
      const nextTime = new Date(sortedTimes[i + 1].appointmentDateTime);
      const duration = sortedTimes[i].duration;

      const expectedNextTime = new Date(
        currentTime.getTime() + duration * 60000
      ); // Convert duration to milliseconds
      const timeval = expectedNextTime.toString().split(" ");
      const time12Hour = new Date(`2000-01-01T${timeval[4]}`).toLocaleString(
        "en-US",
        {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }
      );
    
      // sortedTimes[i].time = time12Hour;
      if (expectedNextTime.getTime() !== nextTime.getTime()) {
        const timeDifference = Math.abs(expectedNextTime - nextTime);
        const breakTime = timeDifference / 60000;
        // Add the current appointment to updatedSortedTimes
        updatedSortedTimes.push(sortedTimes[i]);
        // Add the "break" field to the new index in updatedSortedTimes
        updatedSortedTimes.push({ break: breakTime, time: time12Hour });
      } else {
        // Add the current appointment to updatedSortedTimes
        updatedSortedTimes.push(sortedTimes[i]);
      }
    } else {
      // Add the last appointment to updatedSortedTimes
      updatedSortedTimes.push(sortedTimes[i]);
    }
  }

  console.log(updatedSortedTimes);

  // const newdbq = [];
  //  updatedSortedTimes.map((obj) => {
  //   // Perform checks or apply any modifications here
  //   let val
  //   if(obj.dbq){

  //     val = obj.dbq.props.children;
  //     console.log(val[0]);
  //     newdbq.push(val[1]);
       
  //     if (val[0]!==" "){

  //       if(val[0].props.children[0]){
        
  //       }
        
  //     } 
  //   }
   
  // });

 



  // console.log(mappedArray);

  let newArray = [{}];
  let trimtime;
  if (sortedTimes) {
    newArray = updatedSortedTimes.map((obj, index) => {
      let newtime;
      if (obj.appointmentDateTime) {
        trimtime = obj.appointmentDateTime.toString().split(" ");
        console.log(trimtime[1] +" "+ trimtime[2]);
         newtime= trimtime[1] +" "+ trimtime[2]
      }

      return {
        name: obj.firstName?.props?.children[1] ?? "",
        duration: obj.firstName?.props?.children[4]?.props?.children ?? "",
        phone: obj.phone ?? "",
        dbq: obj.dbq ?? "",
        appointmentDateTime: obj.appointmentDateTime || " ",
        time: obj.time,
        newtime:newtime,
        break: obj.break ?? "",
        StartDate: props.startDate ?? "",
        Doctor: user ?? "",
      };
    });
  }

  console.log(newArray);
  var startDate = props.startDate;
  var dateComponents = startDate.split("-");
  var formattedDate = `${dateComponents[1]}-${dateComponents[2]}-${dateComponents[0]}`;
  console.log(formattedDate);

  // newArray.map((item) => {
  //   // Accessing the 'dbq' array inside each item
  //   item.dbq.map((dbqItem) => {
  //     console.log(dbqItem[1]);
  //     // Accessing the 'children' array inside each 'dbq' item
  //     dbqItem.props.children.map((childItem) => {
  //       // Accessing the 'props' object inside each 'children' item
  //       const value = childItem.props[0].value;

  //       // Perform operations with the value
  //       console.log(value);
  //     });
  //   });
  // });

  // console.log(props.email);
  

  const handleSendEmail = () => {
    // "http://localhost:5000/send-email"
    axios
      .post("http://localhost:5000/send-email", {
        receiverEmail: props.email,
        attachmentPath: "output.pdf",
        pdfData: newArray,
      })
      .then((response) => {
        console.log(response);
        console.log("Email sent successfully");
        // if(response.statusText=="OK"){
        //   setmMailResponse(true);
        // }
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  // if(mailResponse){
  //   alert("Email sent Successfully");
  //   setmMailResponse(false);
  // }
  // end

  return (
    <div className="text-center">
      <br />
      <MaterialTable
        cellEditable={{
          onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
            return new Promise((resolve, reject) => {
              console.log("newValue: " + newValue);
              console.log("oldValue: " + oldValue);
              console.log("columnDef: " + columnDef);
              console.log("oldData: " + rowData);

              const dataDetails2 = [...dataRows];
              const index = dataDetails2.indexOf(rowData);

              rowData.verificationID = newValue;

              rowData.alldata.customBookingFields.map((iteam) => {
                if (iteam.merchantFieldId === 13878) {
                  iteam.value = newValue;
                }
              });
              delete rowData.alldata["appointmentDateTime"];
              rowData.alldata.remindByEmail = false;
              rowData.alldata.remindBySms = false;

              axios
                .post("http://platinummedapp.com/updateappoitment", {
                  accesstoken: accessToken,
                  data: rowData.alldata,
                })
                .then(function (response) {
                  dataDetails2[index] = rowData;

                  console.log("Responce: ");
                  console.log(response.data);

                  setDataRows([...dataDetails2]);
                  console.log(dataDetails2);

                  //   // dataUpdate[index] = rowData;
                  //   if(udateAllowed===1){
                  //     setUdateAllowed(0);
                  //   }else
                  //   setUdateAllowed(1);
                  // //  setDataRows(dataUpdate);
                });

              setTimeout(resolve, 4000);
            });
          },
          isCellEditable: () => true,
        }}
        //    actions={[
        //     {
        //       icon: 'web',
        //       style:{
        // color:"red"
        //       },

        //       tooltip: 'View In Flexbooker',
        //       onClick: (event, rowData) => {
        //         // Do save operation

        //         openInNewTab("https://a.flexbooker.com/manage#booking/"+rowData.confirmationGuid);
        //       }
        //     },
        //     {
        //         icon: 'close',
        //         tooltip: 'No Show',
        //         onClick: (event, rowData) => {
        //           // Do save operation
        //           console.log("Data Recived from Flexbooker");
        //     console.log(rowData.alldata);

        //                         const dataDetails2 = [...dataRows];
        //                         const index = dataDetails2.indexOf(rowData);

        //                         rowData.appointmentStatus="No Show";

        //                         rowData.alldata.customStatusId=435;
        //                         rowData.alldata.customBookingFields.map((iteam)=>{

        //                           if(iteam.merchantFieldId===13904){
        //                             iteam.value="No Show";
        //                           }
        //                         });

        //                         console.log("Data Send to Flexbooker");
        //     console.log(rowData.alldata);

        //                       axios.post("http://platinummedapp.com/updateappoitment",{accesstoken: accessToken,data: rowData.alldata}).then(function (response) {

        //                         dataDetails2[index] = rowData;
        //                        if(response.data.id===rowData.id){

        //                         setDataRows([...dataDetails2]);

        //                     }

        //                     });

        //         }
        //       }
        //       ,
        //       {
        //         icon: 'doneAll',
        //         style:{
        //           backgroundColor:"red"
        //         },
        //         tooltip: 'Attended',
        //         onClick: (event, rowData) => {
        //           const dataDetails2 = [...dataRows];
        //           const index = dataDetails2.indexOf(rowData);

        //           rowData.appointmentStatus="Attended";

        //           rowData.alldata.customBookingFields.map((iteam)=>{

        //             if(iteam.merchantFieldId===13904){
        //               iteam.value="Attended";
        //             }
        //           });

        //           rowData.alldata.customStatusId=434;

        //         axios.post("http://platinummedapp.com/updateappoitment",{accesstoken: accessToken,data: rowData.alldata}).then(function (response) {

        //           dataDetails2[index] = rowData;

        //          if(response.data.id===rowData.id)
        //           setDataRows([...dataDetails2]);

        //         //   // dataUpdate[index] = rowData;
        //         //   if(udateAllowed===1){
        //         //     setUdateAllowed(0);
        //         //   }else
        //         //   setUdateAllowed(1);
        //         // //  setDataRows(dataUpdate);

        //       });
        //         }
        //       }
        //   ]}

        title={
          <div>
            <span className="mx-2" style={{ marginLeft: "10px" }}>
              Name: {props.name}
            </span>
            <span className="mx-2" style={{ marginLeft: "20px" }}>
              Email: {props.email}
            </span>
            <span
              className="mx-2"
              style={{ marginLeft: "10px", fontWeight: "bold" }}
            >
              Time Zone: {timeZone}
            </span>
            <br />
            <button
              style={{ float: "left" }}
              className="btn btn-primary m-2"
              onClick={handlePrint}
            >
              Print/Save Report
            </button>
            <button
              style={{ float: "left" }}
              className="btn btn-primary m-2"
              onClick={handleSendEmail}
            >
              Send Report Email
            </button>
          </div>
        }
        data={dataRows}
        columns={columns}
        options={{
          headerStyle: {
            backgroundColor: "#00a0da",
            color: "#FFF",
            fontWeight: "bold",
            fontSize: "16px",
          },
          actionsColumnIndex: -1,
          addRowPosition: "first",
          paging: true,
          pageSize: 50,
          pageSizeOptions: [30, 50, 100],
          maxBodyHeight: "600px", // make initial page size
          emptyRowsWhenPaging: false, // To avoid of having empty rows

          rowStyle: (row) => {
            const rowStyling = {
              borderStyle: "dotted dashed solid double",
            };

            return rowStyling;
          },
          // rows selection options
        }}
      />

      {/* {<SingleSchedulePrint dataRows={dataRows} user={user} />}  */}
      <div style={{ display: "none" }}>
        <Button variant="contained" onClick={handleClickPrint}>
          Print
        </Button>
        <div ref={tableRef} className="print-content ">
          <TableContainer component={Paper}>
            <div style={{ margin: "5px" }}>
              <Typography variant="h5" align="center" gutterBottom>
                Patient List
              </Typography>
              <Typography variant="h5" align="center" gutterBottom>
                {formattedDate}
              </Typography>
              <Typography variant="h5" align="center" gutterBottom>
                {user}
              </Typography>
            </div>
            <div style={{ margin: "30px" }}>
              <Table
                style={{
                  border: "1px solid black",
                  paddingBottom: "50px",
                  paddingTop: "20px",
                  marginBottom: "20px",
                }}
              >
                <TableHead
                  sx={{ border: "1px solid black", fontFamily: "Arial" }}
                  
                >
                  <TableRow>
                    <TableCell style={{ border: "1px solid black" }}>
                      <b> Name </b>
                    </TableCell>
                    <TableCell
                      style={{ width: "80px", border: "1px solid black" }}
                    >
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

                <tbody style={{ padding: "5px" }}>
                  {Array.isArray(newArray) &&
                    newArray.map((appointment, index) => (
                      <tr style={{ border: "1px solid black" }} key={index}>
                        <td style={{ border: "1px solid black" }}>
                          {appointment.name || " "}
                        </td>
                        <td
                          style={
                            appointment.Patient === ""
                              ? { borderLeft: "none", borderRight: "none" }
                              : { border: "1px solid black" }
                          }
                        >
                          {appointment.newtime || appointment.time}
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
                            border: appointment.break
                              ? "none"
                              : "1px solid black",
                            fontWeight: appointment.dbqList ? "normal" : "bold",
                          }}
                        >
                          {appointment.dbq ||
                            (appointment.break && <b>Break</b>)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </TableContainer>

          <TableContainer component={Paper}>
            <div className="print-content2" style={{pageBreakBefore:"always"}}>
              <Typography variant="h5" align="center" gutterBottom>
                {formattedDate}
              </Typography>
              <Typography variant="h5" align="center" gutterBottom>
                Welcome to Platinum Medical Evaluations
              </Typography>
              <Typography variant="h5" align="center" gutterBottom>
                {user}
              </Typography>

              <Table
                style={{
                  margin: "auto",
                  width: "70%",
                  border: "1px solid black",
                }}
              >
                <TableHead sx={{ fontFamily: "Arial" }}>
                  <TableRow
                    style={{
                      backgroundColor: "pink",
                      border: "1px solid black",
                    }}
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
                    <TableCell
                      colSpan={2}
                      style={{ border: "1px solid black" }}
                    >
                      evaluations@housecallmd.com
                    </TableCell>
                  </TableRow>

                  <TableRow
                    style={{
                      backgroundColor: "pink",
                      border: "1px solid black",
                    }}
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
                      style={{
                        backgroundColor: "gray",
                        border: "1px solid black",
                      }}
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
                  {Array.isArray(newArray) &&
                    newArray.map((appointment, index) => (
                      <tr style={{ border: "1px solid black" }} key={index}>
                        <td style={{ border: "1px solid black" }}></td>
                        <td style={{ border: "1px solid black" }}>
                          <b>
                            {/* {getInitials(appointment.firstName?.props?.children[1])??""} */}
                            {appointment.name
                              ? getInitials(appointment.name)
                              : " Break"}
                          </b>
                        </td>
                        <td
                          style={
                            appointment.Patient === ""
                              ? { borderLeft: "none", borderRight: "none" }
                              : { border: "1px solid black" }
                          }
                        >
                          {appointment.appointmentDateTime !== " "
                            ? appointment.newtime
                            : appointment.time}
                        </td>
                        <td></td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </TableContainer>
        </div>
        <button onClick={handleSendEmail}>Send Email</button>
      </div>

      {/*  */}
    </div>
  );
};
export default SingleSchedule;
