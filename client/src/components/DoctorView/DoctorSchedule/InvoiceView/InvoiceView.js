//convert date to number and then sort

import React, { useState,useEffect } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import moment from 'moment';

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

const InvoiceView = (props)=>{

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

    const config = {
        timeout: 1000 * 5, // Wait for 5 seconds
      
        headers: {
          "Content-Type": "multipart/form-data",
        }
      };


    const credintials=[{
        grant_type:'client_credentials',
        scope:'flexbookerApi',
        client_id:'lhppg6lr78',
        client_secret:'rt9ay86q975y4nusweced1l3uoe8w71hxzhw7lpvw0sd0wmb4x',
      }]

         
      axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

    useEffect(() => {

      console.log(moment(props.startDate).format("MM-DD-YYYY"));
      console.log(props.endDate);
      
      axios.get("http://platinummedapp.com/notes/notesrange/"+props.email+"/"+moment(props.startDate).format("MM-DD-YYYY")+"/"+moment(props.endDate).format("MM-DD-YYYY")).then(function (response) {
console.log("Comments");
console.log(moment(props.startDate).format("MM-DD-YYYY"));
console.log(props.startDate);
      console.log(props.endDate);
    console.log(response.data);
    setCommentsList(response.data);
    allcomments=response.data;

    });


      axios.get("http://platinummedapp.com/users/findalldoc").then(function (response) {

      response.data.map(user =>{
        if(props.email===user.email){
          console.log("Found User Email");
          console.log(user.timeZone);
          setTimeZone(user.timeZone);
          setHourlyrate(user.hourlyrate);
          setPerpatientrate(user.perpatientrate);
          setPatientype(user.paidtype);

           hourlyfinal =user.hourlyrate;
           perpatientfinal=user.perpatientrate;
          paidTypefinal=user.paidtype;

          newTimeZone=user.timeZone;
        }
      });

 
   
console.log(props.data);
axios.post("http://platinummedapp.com/connect/token",credintials,config).then(function (response) {
    
    console.log(response.data.access_token)


    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
    accessToken=`Bearer ${response.data.access_token}`;

    axios.get(props.dataURL,config2).then(function (response) {

      let dataDetails = [];
      let index =0;
      let indexinvoice=0; 

      response.data.map((item)=>{

        console.log(item.url);

      
        var Appointment = item.url.split("/").pop();
        console.log(Appointment);

        ///https://merchant-api.flexbooker.com/Appointment/GetByGuid?confirmationGuid=1e8f779a-2535-4c71-b48c-a95f65a7b0b9


        

        axios.get("http://platinummedapp.com/Appointment/GetByGuid?confirmationGuid="+Appointment,config2).then(function (response) {



        var dbqlist ="";

        

          



        var verificationID="-";
        var qbdi=0;
        var customStatus = "";

        response.data.customBookingFields.map((item)=>{

         

          if(item.merchantFieldId===7723 ||item.merchantFieldId===7724 ||item.merchantFieldId===7725 ||item.merchantFieldId===7726 ||item.merchantFieldId===7727 ||item.merchantFieldId===7728 ||item.merchantFieldId===7729 ||item.merchantFieldId===7730 ){
            
            if(item.value!==null){
           
              dbqlist= <p>{dbqlist}{item.value}</p>;
            }
           

          }

          if(item.merchantFieldId===13878){

        if(item.value!==null){

            verificationID=item.value;
        }else{
          verificationID="-";
        }
          }

//doctor verification
          if(item.merchantFieldId===13904){

            if(item.value!==null){
    
              customStatus=item.value;
            }else{
              customStatus="NotSet";
            }
              }




        });


      //  var customStatus = "";
      if(customStatus==="NotSet")
        if(response.data.customStatusId===435){
          customStatus="No Show";
      }else if(response.data.customStatusId===434){
        customStatus="Attended";
      }else{
        customStatus="-";
      }

      console.log("Data");
      console.log(response.data);

      var abttime =  <p> {response.data.firstName+" "+response.data.lastName}<br/> <span style={{fontWeight:'bold'}}>{response.data.duration +" Min"}</span></p>;
      var timeformat=  moment(response.data.appointmentDateTime);
    
      console.log(response.data.appointmentDateTime);
      console.log( moment(response.data.appointmentDateTime).format("MM-DD-YYYY hh:mm A"))


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
   
     
 if(new Date().getTimezoneOffset()===480  || new Date().getTimezoneOffset()===420){
  console.log("From USA")
  if(newTimeZone==="PST - Pacific Time")
  timeformat=timeformat.add(moment.duration("08:00:00")).format("MM-DD-YYYY hh:mm A");
  else if(newTimeZone==="EST - Eastern Time")
  timeformat=timeformat.subtract(moment.duration("13:00:00")).format("MM-DD-YYYY  hh:mm A");
  else if(newTimeZone==="MST - Mountain Time")
  timeformat=timeformat.add(moment.duration("07:00:00")).format("MM-DD-YYYY  hh:mm A");
  else if(newTimeZone==="CST - Central Time")
  timeformat=timeformat.add(moment.duration("10:00:00")).format("MM-DD-YYYY  hh:mm A");
  else if(newTimeZone==="HST - Hawaiian Time")
  timeformat=timeformat.add(moment.duration("06:00:00")).format("MM-DD-YYYY  hh:mm A");
  else if(newTimeZone==="PHST - Philippine Time")
  timeformat=timeformat.subtract(moment.duration("08:00:00")).format("MM-DD-YYYY  hh:mm A");
  else
  timeformat=timeformat.subtract(moment.duration("05:00:00")).format("MM-DD-YYYY  hh:mm A");
}else if(new Date().getTimezoneOffset()===300){
  console.log("From EST")
  if(newTimeZone==="PST - Pacific Time")
  timeformat=timeformat.add(moment.duration("05:00:00")).format("MM-DD-YYYY hh:mm A");
  else if(newTimeZone==="EST - Eastern Time")
  timeformat=timeformat.add(moment.duration("07:00:00")).format("MM-DD-YYYY  hh:mm A");
  else if(newTimeZone==="MST - Mountain Time")
  timeformat=timeformat.add(moment.duration("04:00:00")).format("MM-DD-YYYY  hh:mm A");
  else if(newTimeZone==="CST - Central Time")
  timeformat=timeformat.add(moment.duration("07:00:00")).format("MM-DD-YYYY  hh:mm A");
  else if(newTimeZone==="HST - Hawaiian Time")
  timeformat=timeformat.add(moment.duration("03:00:00")).format("MM-DD-YYYY  hh:mm A");
  else if(newTimeZone==="PHST - Philippine Time")
  timeformat=timeformat.subtract(moment.duration("08:00:00")).format("MM-DD-YYYY  hh:mm A");
  else
  timeformat=timeformat.subtract(moment.duration("05:00:00")).format("MM-DD-YYYY  hh:mm A");
} else if(new Date().getTimezoneOffset()===-480){
  console.log("From Phlip")
  if(newTimeZone==="PST - Pacific Time")
  timeformat=timeformat.subtract(moment.duration("08:00:00")).format("MM-DD-YYYY hh:mm A");
  else if(newTimeZone==="EST - Eastern Time")
  timeformat=timeformat.subtract(moment.duration("05:00:00")).format("MM-DD-YYYY  hh:mm A");
  else if(newTimeZone==="MST - Mountain Time")
  timeformat=timeformat.subtract(moment.duration("07:00:00")).format("MM-DD-YYYY  hh:mm A");
  else if(newTimeZone==="CST - Central Time")
  timeformat=timeformat.subtract(moment.duration("6:00:00")).format("MM-DD-YYYY  hh:mm A");
  else if(newTimeZone==="HST - Hawaiian Time")
  timeformat=timeformat.subtract(moment.duration("10:00:00")).format("MM-DD-YYYY  hh:mm A");
  else if(newTimeZone==="PHST - Philippine Time")
  timeformat=timeformat.subtract(moment.duration("08:00:00")).format("MM-DD-YYYY  hh:mm A");
  else
  timeformat=timeformat.subtract(moment.duration("05:00:00")).format("MM-DD-YYYY  hh:mm A");
} else if(new Date().getTimezoneOffset()===360){
  console.log("From CST")
  if(newTimeZone==="PST - Pacific Time")
  timeformat=timeformat.add(moment.duration("06:00:00")).format("MM-DD-YYYY hh:mm A");
  else if(newTimeZone==="EST - Eastern Time")
  timeformat=timeformat.add(moment.duration("09:00:00")).format("MM-DD-YYYY  hh:mm A");
  else if(newTimeZone==="MST - Mountain Time")
  timeformat=timeformat.add(moment.duration("05:00:00")).format("MM-DD-YYYY  hh:mm A");
  else if(newTimeZone==="CST - Central Time")
  timeformat=timeformat.add(moment.duration("08:00:00")).format("MM-DD-YYYY  hh:mm A");
  else if(newTimeZone==="HST - Hawaiian Time")
  timeformat=timeformat.add(moment.duration("04:00:00")).format("MM-DD-YYYY  hh:mm A");
  else if(newTimeZone==="PHST - Philippine Time")
  timeformat=timeformat.subtract(moment.duration("08:00:00")).format("MM-DD-YYYY  hh:mm A");
  else
  timeformat=timeformat.subtract(moment.duration("05:00:00")).format("MM-DD-YYYY  hh:mm A");
} else if(new Date().getTimezoneOffset()===600){
  console.log("From Hawii Time")
  if(newTimeZone==="PST - Pacific Time")
  timeformat=timeformat.add(moment.duration("10:00:00")).format("MM-DD-YYYY hh:mm A");
  else if(newTimeZone==="EST - Eastern Time")
  timeformat=timeformat.add(moment.duration("11:00:00")).format("MM-DD-YYYY  hh:mm A");
  else if(newTimeZone==="MST - Mountain Time")
  timeformat=timeformat.add(moment.duration("08:00:00")).format("MM-DD-YYYY  hh:mm A");
  else if(newTimeZone==="CST - Central Time")
  timeformat=timeformat.add(moment.duration("11:00:00")).format("MM-DD-YYYY  hh:mm A");
  else if(newTimeZone==="HST - Hawaiian Time")
  timeformat=timeformat.add(moment.duration("08:00:00")).format("MM-DD-YYYY  hh:mm A");
  else if(newTimeZone==="PHST - Philippine Time")
  timeformat=timeformat.subtract(moment.duration("08:00:00")).format("MM-DD-YYYY  hh:mm A");
  else
  timeformat=timeformat.subtract(moment.duration("05:00:00")).format("MM-DD-YYYY  hh:mm A");
}   else{
  console.log("From Pakistan")
  if(newTimeZone==="PST - Pacific Time")
  timeformat=timeformat.subtract(moment.duration("05:00:00")).format("MM-DD-YYYY hh:mm A");
  else if(newTimeZone==="EST - Eastern Time")
  timeformat=timeformat.subtract(moment.duration("02:00:00")).format("MM-DD-YYYY  hh:mm A");
  else if(newTimeZone==="MST - Mountain Time")
  timeformat=timeformat.subtract(moment.duration("04:00:00")).format("MM-DD-YYYY  hh:mm A");
  else if(newTimeZone==="CST - Central Time")
  timeformat=timeformat.subtract(moment.duration("3:00:00")).format("MM-DD-YYYY  hh:mm A");
  else if(newTimeZone==="HST - Hawaiian Time")
  timeformat=timeformat.subtract(moment.duration("07:00:00")).format("MM-DD-YYYY  hh:mm A");
  else if(newTimeZone==="PHST - Philippine Time")
  timeformat=timeformat.subtract(moment.duration("08:00:00")).format("MM-DD-YYYY  hh:mm A");
  else
  timeformat=timeformat.subtract(moment.duration("05:00:00")).format("MM-DD-YYYY  hh:mm A");
}
     

           



      var newStartDate= new Date(props.startDate).getTime();
      var newEndDate= new Date(props.endDate).getTime();
      newEndDate = 24*60*60*1000 +newEndDate;
      var aptTime =new Date(response.data.appointmentDateTime).getTime();

      if(aptTime>=newStartDate && aptTime <=newEndDate ){
        dataDetails[index]={dbq:dbqlist,time:aptTime,phone:response.data.phone.slice(0,3)+"-"+response.data.phone.slice(3,6)+"-"+response.data.phone.slice(6,10),appointmentStatus:customStatus,id:response.data.id,appointmentDateTime: timeformat,firstName:abttime, duration:response.data.duration, verificationID:verificationID,confirmationGuid:response.data.confirmationGuid,alldata:response.data};
        index++;
        setDataRows([...dataDetails]);
        console.log("Data Details");
        console.log(dataDetails);

console.log(response.data.appointmentDateTime);
         var newdate= moment(response.data.appointmentDateTime).format("MM-DD-YYYY");
         console.log(newdate);
let founddate=0;
         for(var indexloc=0; indexloc<result.length; indexloc++){
          if(result[indexloc].aptdate===newdate){
            founddate=1;
            break;
          }else{
            founddate=0;
          }
         };
         if(founddate===1){

          for(var indexloc=0; indexloc<result.length; indexloc++){
            if(result[indexloc].aptdate===newdate){

              console.log("compare TIme");


              let currentDateNow = new Date().toJSON().slice(0, 10) +" "+ result[indexloc].fbstarttime;
              let currentDateend = new Date().toJSON().slice(0, 10) +" "+ result[indexloc].fbendtime;
              let currentDate = new Date().toJSON().slice(0, 10) +" "+ moment(timeformat).format("hh:mm A");

              console.log(currentDateNow);
              console.log(currentDate);

            var timecheck= new Date(currentDateNow).getTime();
            var timecheck2=new Date(currentDate).getTime();
            var timecheck3=new Date(currentDateend).getTime();
        

              
              if(new Date(currentDateNow).getTime()>new Date(currentDate).getTime()){
                console.log("here 1");
                result[indexloc].fbstarttime=moment(timeformat).format("hh:mm A");
                var start_time = moment('1/1/1970 '+result[indexloc].fbstarttime).format("HH:mm");  //Convert Time from A/PM to time
                var end_time =  moment('1/1/1970 '+result[indexloc].fbendtime).format("HH:mm");  //Convert Time from A/PM to time

                var day = '1/1/2023 '; 
                console.log(end_time);
                console.log(start_time);
              
               var diff_in_min = ( Date.parse(day + end_time) - Date.parse(day + start_time) ) / 1000 / 60;
                console.log((diff_in_min/60).toFixed(2) + ' hours');
                result[indexloc].totalworkinghours=(diff_in_min/60).toFixed(2);
              }
              if(new Date(currentDateend).getTime()<new Date(currentDate).getTime()){
                console.log("here 2");
                var dateAdd= moment(timeformat).add(response.data.duration, 'm');
                result[indexloc].fbendtime=moment(dateAdd).format("hh:mm A");
                var start_time = moment('1/1/1970 '+result[indexloc].fbstarttime).format("HH:mm");  //Convert Time from A/PM to time
                var end_time =  moment('1/1/1970 '+result[indexloc].fbendtime).format("HH:mm");  //Convert Time from A/PM to time

                var day = '1/1/2023 '; 
                console.log(end_time);
                console.log(start_time);
              
               var diff_in_min = ( Date.parse(day + end_time) - Date.parse(day + start_time) ) / 1000 / 60;
                console.log((diff_in_min/60).toFixed(2) + ' hours');
                result[indexloc].totalworkinghours=(diff_in_min/60).toFixed(2);


            
              }
         


            result[indexloc].dateapt=result[indexloc].dateapt+1;

            if(dataDetails[index-1].appointmentStatus==="Attended"){
              result[indexloc].attendedapt=result[indexloc].attendedapt+1;
              
       


              if(paidTypefinal==="Hourly"){
                result[indexloc].totalhours= Math.round(((result[indexloc].totalhours+(response.data.duration/60)) + Number.EPSILON) * 100) / 100;
               // result[indexloc].amountfordoctor=  (result[indexloc].totalhours*hourlyfinal).toFixed(2);

               result[indexloc].amountfordoctor=  (result[indexloc].totalworkinghours*hourlyfinal).toFixed(2);
               }else{
                result[indexloc].totalhours= Math.round(((result[indexloc].totalhours+(response.data.duration/60)) + Number.EPSILON) * 100) / 100;
                result[indexloc].amountfordoctor=  (result[indexloc].attendedapt*perpatientfinal).toFixed(2);
               }

              
        



             

       
       


            }else if(dataDetails[index-1].appointmentStatus==="No Show")
            {
              result[indexloc].noshow=result[indexloc].noshow+1;
    
            }

            }

      
           };
   
         }else
         {
         attendedapt=0;
         var apttimedata=0;
         noshow=0;
          if(dataDetails[index-1].appointmentStatus==="Attended"){
            attendedapt=1;
            apttimedata=response.data.duration/60;
          }else if(dataDetails[index-1].appointmentStatus==="No Show")
          {
            noshow=1;
          }

          var comments="";

          console.log("Looking for comments");
          console.log(commentsList)
          console.log(allcomments)
          
          if(allcomments.length>0){
            allcomments.map((row)=>{
              console.log(row.date);
              console.log(row.notes);
                          if(row.date===newdate){
                            comments=row.notes;
                          }
              
                        })

          }

          var ptrate=0.0;

       if(paidTypefinal==="Hourly"){
        ptrate=  (apttimedata*hourlyfinal).toFixed(2);

       }else{
        ptrate= (attendedapt*perpatientfinal).toFixed(2);
       }

          


          result.push({totalworkinghours:"-",amountfordoctor:ptrate,aptdate: newdate,paymentmethod:"-",approvedate:"-",paiddate:"-", additionalpayment:"-",dateapt:1, noshow: noshow, attendedapt: attendedapt, notes: comments,fbstarttime: moment(timeformat).format("hh:mm A"),fbendtime: moment(timeformat).format("hh:mm A"), totalhours:(apttimedata) });
          // invoiceRows[indexinvoice]=  {aptdate: newdate, dateapt:1, noshow: noshow, attendedapt: attendedapt}
          // indexinvoice++;
          
         }
      
console.log("After algo");

console.log(result);
console.log("invoiceRows");
console.log(invoiceRows);
  
        setInvoiceRows([...result]);
      }

 
        });


      });

     

    });

});
});

    },[props.dataURL])

    
    const onCellUpdate = ()=>{
      console.log("Cell updated");
    }



    // const doctorScheduling =(data)=>{

    //     console.log(data);

    //    // https://merchant-api.flexbooker.com/Appointment/GetByGuid?confirmationGuid=1e8f779a-2535-4c71-b48c-a95f65a7b0b9
    //    //862487cd-4152-4eb6-840a-3dedf94dd8cd test id

    //     axios.get("http://platinummedapp.com/Appointment/GetByGuid?confirmationGuid=862487cd-4152-4eb6-840a-3dedf94dd8cd",config2).then(function (response) {

    //     console.log(response.data);

    // });

    // }


    
    
    
    
    
    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
      };
    
     
    


      

  
    const columns = [
      { title: "Id", field: "_id",  width:"0%",   hidden: true, editable:'never'},
    
      { title: "Dates Worked", field: "aptdate",sorting:true,defaultSort:'asc', cellStyle: {
        minWidth: 100,
        maxWidth: 100
      },editable:'never'},
      // { title: "time", field: "time", hidden: true, width:"0%",   defaultSort:'asc', editable:'never'},
      { title: "# of Patient Scheduled", field: "dateapt", cellStyle: {
        minWidth: 80,
        maxWidth: 80
      },editable:'never'},
      { title: "# of Patient Seen", field: "attendedapt",sorting:false,editable:'never', cellStyle: {
        minWidth: 80,
        maxWidth: 80
      }},
      { title: "# of No Shows", field: "noshow",sorting:false,editable:'never', cellStyle: {
        minWidth: 90,
        maxWidth: 90
      }},
   
      { title: "FB Start Time", field: "fbstarttime",sorting:false,editable:'never', cellStyle: {
        minWidth: 80,
        maxWidth: 80
      }},
      { title: "FB End Time", field: "fbendtime",sorting:false,editable:'never', cellStyle: {
        minWidth: 80,
        maxWidth: 80
      }},
      { title: "Total Working Hours", field: "totalworkinghours",sorting:false,editable:'always', cellStyle: {
        minWidth: 100,
        maxWidth: 100
      }},
      { title: "Total Appointments Hours", field: "totalhours",sorting:false,editable:'always', cellStyle: {
        minWidth: 100,
        maxWidth: 100
      }},
      
      { title: "Additional Payment", field: "additionalpayment",sorting:false,editable:'always', cellStyle: {
        minWidth: 100,
        maxWidth: 100
      }},

      { title: "Total Doctor Receives", field: "amountfordoctor",sorting:false,editable:'always', cellStyle: {
        minWidth: 100,
        maxWidth: 100
      }},

      { title: "Time Sheet Approval Date", field: "approvedate",sorting:false,editable:'always', cellStyle: {
        minWidth: 100,
        maxWidth: 100
      }},

      { title: "Doctor Paid Date", field: "paiddate",sorting:false,editable:'always', cellStyle: {
        minWidth: 100,
        maxWidth: 100
      }},


      { title: "Method of Payment", field: "paymentmethod",sorting:false,editable:'always', cellStyle: {
        minWidth: 100,
        maxWidth: 100
      }},
      { title: "Notes", field: "notes",sorting:false,editable:'never', cellStyle: {
        minWidth: 200,
        maxWidth: 200
      }},
      // { title: "# of No Shows", field: "verificationID",width:"10%",editable:'always'},
      // { title: "Hourly Rate", field: "appointmentStatus",width:"10%",editable:'never'},
      // { title: "Per Patient Rate", field: "appointmentStatus",width:"10%",editable:'never'},
      // { title: "FB Start Time", field: "appointmentStatus",width:"10%",editable:'never'},
      // { title: "FB End Time", field: "appointmentStatus",width:"10%",editable:'never'},
      // { title: "Hours to be Paid", field: "appointmentStatus",width:"10%",editable:'never'},
      // { title: "Additional Payment", field: "appointmentStatus",width:"10%",editable:'never'},
      // { title: "Total Doctor Receives", field: "appointmentStatus",width:"10%",editable:'never'},
      // { title: "Time Sheet Approve", field: "appointmentStatus",width:"10%",editable:'never'},
      // { title: "Dr. Invoice Number", field: "appointmentStatus",width:"10%",editable:'never'},
      // { title: "Dr. Invoice Date", field: "appointmentStatus",width:"10%",editable:'never'},
      // { title: "Dr. Paid Date", field: "appointmentStatus",width:"10%",editable:'never'},
      // { title: "Method of Payment", field: "appointmentStatus",width:"10%",editable:'never'},
      // { title: "Doctor's Note", field: "appointmentStatus",width:"10%",editable:'never'},
      { title: 'Actions',sorting:false,width:'300px',editable: 'never', width:"10%",render: (rowData) => 
  

<div  style={{margin:"2px"}} className="btn  btn-sm btn-success" onClick={(rowDatas) =>{
         
         console.log("rowDatas");    
         const index = invoiceRows.indexOf(rowData);  
         console.log(index);
         const dataDetails2 = [...dataRows];
        
  console.log(rowData.approvedate==="-");

  if(rowData.approvedate==="-"){
    rowData.approvedate=moment(new Date()).format("MM-DD-YYYY");
    invoiceRows[index]=rowData;
    dataDetails2[index] = rowData;
    setDataRows([...dataDetails2]);
  }
       

       
          axios.post("http://platinummedapp.com/invoice/add",{doctoremail: props.email,data: rowData,date: rowData.aptdate}).then(function (response) {
  
       //   console.log(response.data);
 
        alert(response.data);
         
          //   // dataUpdate[index] = rowData;
          //   if(udateAllowed===1){
          //     setUdateAllowed(0);
          //   }else
          //   setUdateAllowed(1);
          // //  setDataRows(dataUpdate);
  
    
        });
          }}>Save Invoice</div>
        }
  
  
    ];
  
    return (
      <div className="text-center">

  <br/>
        <MaterialTable
                 cellEditable={{
                  onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                    return new Promise((resolve, reject) => {
                        console.log('newValue: ' + newValue);
                        console.log('oldValue: ' + oldValue);
                        console.log('columnDef: ' + Object.values(columnDef)[1]);
                        console.log('oldData: ' + rowData);


                 

                        const dataDetails2 = [...dataRows];
                        const index = invoiceRows.indexOf(rowData);
                        console.log(index);

                        var objloc =Object.values(columnDef)[1];
                        console.log("data: "+ rowData[objloc]);
                        rowData[objloc]=newValue;
                        console.log("data: "+ rowData[objloc]);



                        if(Object.values(columnDef)[1]==="additionalpayment"){
                          rowData.amountfordoctor=(parseFloat(rowData.amountfordoctor)+parseFloat(newValue)).toFixed(2);
                        }

                        if(Object.values(columnDef)[1]==="totalhours"){
                          if(paidTypefinal==="Hourly"){
                          rowData.totalhours=newValue;
                          if(rowData.additionalpayment!=="-")
                          rowData.amountfordoctor=((parseFloat(hourlyfinal)*parseFloat(newValue))+parseFloat(rowData.additionalpayment)).toFixed(2);
                          else
                          rowData.amountfordoctor=(parseFloat(hourlyfinal)*parseFloat(newValue)).toFixed(2);
                        }else{
                          rowData.totalhours=newValue;
                        }
                      }

                        if(Object.values(columnDef)[1]==="totalworkinghours"){
                          if(paidTypefinal==="Hourly"){
                          rowData.totalworkinghours=newValue;
                          if(rowData.additionalpayment!=="-")
                          rowData.amountfordoctor=((parseFloat(hourlyfinal)*parseFloat(newValue))+parseFloat(rowData.additionalpayment)).toFixed(2);
                          else
                          rowData.amountfordoctor=(parseFloat(hourlyfinal)*parseFloat(newValue)).toFixed(2);
                        }else{
                          rowData.totalworkinghours=newValue;
                        }
                      }


                        dataDetails2[index] = rowData;
                        invoiceRows[index]=rowData;
                        setDataRows([...dataDetails2]);



                      
                     
                    //   axios.post("http://platinummedapp.com/updateappoitment",{accesstoken: accessToken,data: rowData.alldata}).then(function (response) {

                      

                    //     dataDetails2[index] = rowData;

                    //     console.log("Responce: ");
                    //     console.log(response.data);
                
                 
                    //     setDataRows([...dataDetails2]);
                     
                    //   //   // dataUpdate[index] = rowData;
                    //   //   if(udateAllowed===1){
                    //   //     setUdateAllowed(0);
                    //   //   }else
                    //   //   setUdateAllowed(1);
                    //   // //  setDataRows(dataUpdate);

                
                    // });

                        setTimeout(resolve, 4000);
                    })},
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
  
          title={<div >
          Invoice View
           <span style={{marginLeft: "10px"}}>Name: {props.name}</span>
           <span style={{marginLeft: "20px"}}>Email: {props.email}</span>
          <span style={{marginLeft: "10px",fontWeight:"bold",}}>Payment Type: {patientype}</span>
          {patientype==="Per Patient"?
           <span style={{marginLeft: "10px",fontWeight:"bold"}}>Hourly Rate: {hourlyrate}</span>: <span style={{marginLeft: "10px",fontWeight:"bold", backgroundColor:"lightgreen"}}>Hourly Rate: {hourlyrate}</span>}
          {patientype==="Per Patient"?
           <span style={{marginLeft: "10px",fontWeight:"bold",backgroundColor:"yellow"}}>Per Patient Rate: {perpatientrate}</span>:<span style={{marginLeft: "10px",fontWeight:"bold"}}>Per Patient Rate: {perpatientrate}</span>}
           </div>}
          data={invoiceRows}
          columns={columns}
      
          options={{

            headerStyle: {
              backgroundColor: '#00a0da',
              color: '#FFF',
              fontWeight:'bold',
              fontSize:'14px',
              height:80,
              padding:5,

      
            },
            actionsColumnIndex: -1,
            addRowPosition: "first",
            paging: true,
            pageSize:50,
            pageSizeOptions:[30,50,100],
            maxBodyHeight: '600px',    // make initial page size
            emptyRowsWhenPaging: false,   // To avoid of having empty rows
        
            rowStyle: (row) => {
              const rowStyling = {
                height:20,
                borderStyle: "dotted dashed solid double"
              };
         
              return rowStyling;
            },
            // rows selection options
          }}
        />

      </div>
    );




}
export default InvoiceView;