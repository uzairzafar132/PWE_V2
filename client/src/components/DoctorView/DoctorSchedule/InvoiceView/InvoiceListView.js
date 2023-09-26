//convert date to number and then sort

import React, { useState,useEffect } from "react";
import moment from 'moment';
import MaterialTable from "material-table";
import axios from "axios";
import PaidInvoice from "./paidInvoice";
import InvoiceView from "./InvoiceView";
//get value of Appointment Attended Status and use that to set Appointment status
const config2 = {
    headers: {
      "Content-Type": "multipart/form-data",
     
    }
  };

  const config3 = {
    headers: {
      "Content-Type": "application/json",
    }
  };

  var accessToken = "";

  var newTimeZone = "";
  var allcomments =[];

  var hourlyfinal =0;
  var perpatientfinal=0;
  var paidTypefinal="";



  

const InvoiceListView = (props)=>{

    const [dataRows, setDataRows]= useState();

    const [invoiceRows, setInvoiceRows]= useState([]);
    var result = [];
    var attendedapt=0;
    var noshow=0;

    const [timeZone, setTimeZone]= useState();
    const [hourlyrate, setHourlyrate]= useState(0);
    const [perpatientrate, setPerpatientrate]= useState(0);
    const [patientype, setPatientype]= useState();

    const [commentsList, setCommentsList]= useState([]);



    useEffect(() => {

      console.log(moment(props.startDate).format("MM-DD-YYYY"));
      console.log(props.endDate);
      console.log(props.data);

    },[props.dataURL])



 

    for (var i = 0; i < props.data.length; i++) {
      result.push(<InvoiceView name={props.data[i].name} timeZone={props.data[i].timeZone} email={props.data[i].email} startDate={props.startDate} endDate={props.endDate} dataURL={"http://platinummedapp.com/api/CalendarFeed?start="+props.startDate+"&end="+props.endDate+"&employeeIds="+props.data[i].id+""} />);
    }

      


    return (
      <div className="text-center">




<div>{result}</div>;
 

      </div>
    );




}
export default InvoiceListView;