import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import SingleSchedule from "../SingleSchedule/SingleSchedule";
import 'bootstrap-daterangepicker/daterangepicker.css';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import InvoiceView from "./InvoiceView/InvoiceView";
import PaidInvoice from "./InvoiceView/paidInvoice";
import InvoiceListView from "./InvoiceView/InvoiceListView";
import SingleSchedulePrint from "../SingleSchedule/SingleSchedulePrint";
import ReactToPrint from "react-to-print";



const config2 = {
    headers: {
      "Content-Type": "multipart/form-data",
     
    }
  };

const Schedule = () => {
  const [data, setData] = useState();
  const [locURL, setLocURL] = useState("");
  const [viewSingle, setViewSingle] = useState(false);
  const [invoiceView, setInvoiceView] = useState(false);
  const [invoiceListView, setInvoiceListView] = useState(false);
  const [invoiceDoctorList, setInvoiceDoctorList] = useState([]);
  const [savedInvoiceView, setSavedInvoiceView] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [name, setName] = useState("");
  const [userID, setUserID] = useState("");
  const [eamil, setEmail] = useState("");

  // uzair start
 


  // uziar end

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
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    setStartDate(year + "-" + month + "-" + date); //yyyy-mm-dd
    setEndDate(year + "-" + month + "-" + date);

    //setLocURL("http://platinummedapp.com/api/CalendarFeed?start="+startDate+"&end="+endDate+"&employeeIds="+0+"");

    axios
      .post("http://platinummedapp.com/connect/token", credintials, config)
      .then(function (response) {
        console.log(response.data.access_token);

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.access_token}`;

        axios
          .get("http://platinummedapp.com/Account", config2)
          .then(function (response) {
            console.log("All Employies");

            console.log(response.data.employees);
            //  /api/CalendarFeed?employeeIds=3339&start=2022-08-01&end=2022-09-08
            let newEmployessFormat = [];
            let index = 0;
            let last = 0;
            response.data.employees.map((empl) => {
              if (last !== 1) {
                newEmployessFormat[index] = {
                  id: empl.id,
                  name: empl.name,
                  timeZone: empl.timeZone,
                  email: empl.email,
                  startDate: "2022-08-01", // (yyyy-mm-dd)? format
                  endDate: "2022-08-30",
                  employeeGuid: empl.employeeGuid,
                };
                index++;
              }
              if (empl.name === "Dr. Jarchi") {
                console.log("Last");
                last = 1;
              }
            });

            setData(newEmployessFormat);
          });
      });
  }, []);

  useEffect(() => {
    console.log("locURL URL Changed");

    console.log(locURL);
  }, [locURL]);

  const setback = () => {
    setViewSingle(false);
  };

   const handleSendEmail = () => {
     axios
       .post("http://localhost:8080/send-email", {
         receiverEmail: "zuzair00@mail.com",
         // eamil
         attachmentPath: "output.pdf",
       })
       .then((response) => {
         console.log("Email sent successfully");
       })
       .catch((error) => {
         console.error("Error sending email:", error);
       });
   };

   
  const doctorScheduling = (data) => {
    setName(data.name);
    setEmail(data.email);
    setTimeZone(data.timeZone);
    setUserID(data.id);

    //  /api/CalendarFeed?employeeIds=3339&start=2022-08-01&end=2022-09-08
    setLocURL(
      "http://platinummedapp.com/api/CalendarFeed?start=" +
        startDate +
        "&end=" +
        endDate +
        "&employeeIds=" +
        data.id +
        ""
    );

    //singledataData(response.data);
    setViewSingle(true);
  };
  

  const doctorInvoice = (data) => {
    setName(data.name);
    setEmail(data.email);
    setTimeZone(data.timeZone);
    setUserID(data.id);

    //  /api/CalendarFeed?employeeIds=3339&start=2022-08-01&end=2022-09-08
    setLocURL(
      "http://platinummedapp.com/api/CalendarFeed?start=" +
        startDate +
        "&end=" +
        endDate +
        "&employeeIds=" +
        data.id +
        ""
    );

    //singledataData(response.data);
    setInvoiceView(true);
  };

  const doctorListInvoice = (data) => {
    // setName(data.name);
    // setEmail(data.email);
    // setTimeZone(data.timeZone);
    // setUserID(data.id);

    // //  /api/CalendarFeed?employeeIds=3339&start=2022-08-01&end=2022-09-08
    // setLocURL("http://platinummedapp.com/api/CalendarFeed?start="+startDate+"&end="+endDate+"&employeeIds="+data.id+"");
    setInvoiceDoctorList(data);

    //singledataData(response.data);
    setInvoiceListView(true);
  };

  const doctorSavedInvoice = (data) => {
    setName(data.name);
    setEmail(data.email);
    setTimeZone(data.timeZone);
    setUserID(data.id);

    //  /api/CalendarFeed?employeeIds=3339&start=2022-08-01&end=2022-09-08
    setLocURL(
      "http://platinummedapp.com/api/CalendarFeed?start=" +
        startDate +
        "&end=" +
        endDate +
        "&employeeIds=" +
        data.id +
        ""
    );

    //singledataData(response.data);
    setSavedInvoiceView(true);
  };

  const onCellUpdate = () => {
    console.log("Cell updated");
  };

  const handleCallback = (start, end, label) => {
    console.log("testing Call Back");
    console.log(start, end, userID);

    let date = start._d.getDate();
    let month = start._d.getMonth() + 1;
    let year = start._d.getFullYear();

    console.log(date, month, year);

    setStartDate(year + "-" + month + "-" + date);

    let date1 = end._d.getDate();
    let month1 = end._d.getMonth() + 1;
    let year1 = end._d.getFullYear();

    setEndDate(year1 + "-" + month1 + "-" + date1);
    console.log(date1, month1, year1);
    setLocURL(
      "http://platinummedapp.com/api/CalendarFeed?start=" +
        year +
        "-" +
        month +
        "-" +
        date +
        "&end=" +
        year1 +
        "-" +
        month1 +
        "-" +
        date1 +
        "&employeeIds=" +
        userID +
        ""
    );

    //       setStartDate(year+"-"+month+"-"+date);//yyyy-mm-dd
    // setEndDate(year+"-"+month+"-"+date);
  };

  const columns = [
    { title: "Id", field: "_id", hidden: true, editable: "never" },
    {
      title: "employeeGuid",
      field: "employeeGuid",
      hidden: true,
      editable: "never",
    },
    { title: "Employee Name", field: "name", editable: "never" },
    { title: "Email", field: "email", editable: "never" },
  ];

  return (
    <div className="text-center">
      {viewSingle ? (
        <div>
          <button className="btn btn-primary m-1" onClick={setback}>
            View All Doctors
          </button>
          {/* <button className="btn btn-primary m-1" onClick={handleSendEmail}>
            Send Report Email
          </button> */}
        </div>
      ) : (
        ""
      )}
      <br />
      Appointments Date Range Filter
      <DateRangePicker onCallback={handleCallback} maxDate={new Date()}>
        <input type="text" className="form-control" />
      </DateRangePicker>
      {savedInvoiceView ? (
        <PaidInvoice
          name={name}
          timeZone={timeZone}
          email={eamil}
          startDate={startDate}
          endDate={endDate}
          dataURL={locURL}
        />
      ) : viewSingle ? (
        <div>
          {" "}
          <SingleSchedule
            name={name}
            timeZone={timeZone}
            email={eamil}
            startDate={startDate}
            endDate={endDate}
            dataURL={locURL}
          />
        </div>
      ) : invoiceView ? (
        <InvoiceView
          name={name}
          timeZone={timeZone}
          email={eamil}
          startDate={startDate}
          endDate={endDate}
          dataURL={locURL}
        />
      ) : invoiceListView ? (
        <InvoiceListView
          startDate={startDate}
          endDate={endDate}
          data={invoiceDoctorList}
        />
      ) : (
        <div>
          <br />

          <MaterialTable
            localization={{ header: { actions: "Calendar" } }}
            actions={[
              {
                icon: "event",
                tooltip: "View Appointments",
                position: "row",
                rowStyle: { fontSize: "10px" },
                cellStyle: {
                  minWidth: 100,
                  maxWidth: 200,
                },
                onClick: (event, rowData) => {
                  // Do save operation
                  doctorScheduling(rowData);
                },
              },

              {
                icon: "receipt",
                tooltip: "Invoice",

                rowStyle: { fontSize: "10px" },
                cellStyle: {
                  minWidth: 100,
                  maxWidth: 200,
                },
                onClick: (event, rowData) => {
                  // Do save operation
                  console.log(rowData);
                  doctorListInvoice(rowData);
                },
              },

              {
                icon: "receipt",
                tooltip: "Invoice",
                position: "row",
                rowStyle: { fontSize: "10px" },
                cellStyle: {
                  minWidth: 100,
                  maxWidth: 200,
                },
                onClick: (event, rowData) => {
                  // Do save operation

                  doctorInvoice(rowData);
                },
              },
              {
                icon: "money",
                tooltip: "Saved Invoice",
                position: "row",
                rowStyle: { fontSize: "10px" },
                cellStyle: {
                  minWidth: 100,
                  maxWidth: 200,
                },
                onClick: (event, rowData) => {
                  // Do save operation
                  doctorSavedInvoice(rowData);
                },
              },
            ]}
            title="Doctors"
            data={data}
            columns={columns}
            cellEditable={{
              onCellEditApproved: onCellUpdate,
              isCellEditable: (rowData, columnDef) =>
                columnDef.field === "name",
            }}
            options={{
              headerStyle: {
                backgroundColor: "#00a0da",
                color: "#FFF",
                fontWeight: "bold",
                fontSize: "16px",
              },

              rowStyle: {
                height: "-11px",
              },

              actionsColumnIndex: 0,
              addRowPosition: "first",
              paging: true,
              selection: true,

              pageSize: 50,
              pageSizeOptions: [30, 50, 100],
              maxBodyHeight: "600px", // make initial page size
              emptyRowsWhenPaging: false, // To avoid of having empty rows
              // rows selection options
            }}
          />
        </div>
      )}
    </div>
  );
};
export default Schedule;