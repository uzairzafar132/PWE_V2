import React, { useState,useEffect } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';


function removeElementsByClass(className){
  const elements = document.getElementsByClassName(className);
  while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
  }
}

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

const SingleViewDoctor = (props)=>{

  const [LocURL,setLocURL] = useState("");
  const [startDate, setStartDate]= useState(new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate]= useState(new Date().toISOString().slice(0, 10));
  const [data, setData]= useState();
  const [dataID, setUserID]= useState();




  const handleCallback=(start, end, label)=> {
    console.log(start, end, label);
    let date = start._d.getDate();
let month = start._d.getMonth() + 1;
let year = start._d.getFullYear();

console.log(date, month, year);


    setStartDate(year+"-"+month+"-"+date);


    let date1 = end._d.getDate();
    let month1 = end._d.getMonth() + 1;
    let year1 = end._d.getFullYear();
    

   setEndDate(year1+"-"+month1+"-"+date1);

   setLocURL("http://platinummedapp.com/api/CalendarFeed?start="+year+"-"+month+"-"+date+"&end="+year1+"-"+month1+"-"+date1+"&employeeIds="+dataID+"");

  //     setStartDate(year+"-"+month+"-"+date);//yyyy-mm-dd
  // setEndDate(year+"-"+month+"-"+date);
  }

    const [dataRows, setDataRows]= useState();
    const [timeZone, setTimeZone]= useState();
    const [notes, setNotes]= useState("");
    

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

     

      axios.get("http://platinummedapp.com/notes/findalldocnotes/Drjoachim@platinumeval.com/"+moment(Date()).format("MM-DD-YYYY")).then(function (response) {

      if(response.data.length>0)
       setNotes(response.data[0].notes);
       else
       setNotes("");
  
      });

      axios.get("http://platinummedapp.com/users/findalldoc").then(function (response) {

      response.data.map(user =>{
        if(localStorage.getItem('email')===user.email){
          console.log("Found User Email");
          console.log(user.timeZone);
          setTimeZone(user.timeZone);
        }
      });

    });



console.log(props.data);
axios.post("http://platinummedapp.com/connect/token",credintials,config).then(function (response) {
    
    console.log(response.data.access_token)


    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
    accessToken=`Bearer ${response.data.access_token}`;



    console.log("LocURL");
console.log(LocURL);
console.log("Data ID");
console.log(dataID);


  
    if(LocURL===""){

      console.log("if working");


    axios.get("http://platinummedapp.com/Account",config2).then(function (response) {
      console.log("All Employies");

      console.log(response.data.employees);
        //  /api/CalendarFeed?employeeIds=3339&start=2022-08-01&end=2022-09-08
      let newEmployessFormat = [];
      let index =0;
      let last=0;
      response.data.employees.map((empl=>{


        if(last!==1){
          if( empl.email===localStorage.getItem('email')){

            console.log("User Found");
            console.log(empl.id)
            setUserID(empl.id);
const datatoday = moment(new Date());

let date = datatoday._d.getDate();
let month = datatoday._d.getMonth() + 1;
let year = datatoday._d.getFullYear();

console.log(date, month, year);



    let date1 = datatoday._d.getDate();
    let month1 = datatoday._d.getMonth() + 1;
    let year1 = datatoday._d.getFullYear();
    

  

   setLocURL("http://platinummedapp.com/api/CalendarFeed?start="+year+"-"+month+"-"+date+"&end="+year1+"-"+month1+"-"+date1+"&employeeIds="+ empl.id+"");



          }
        newEmployessFormat[index] = {
          id: empl.id,
          name: empl.name,
          email: empl.email,
          startDate:"2022-08-01",// (yyyy-mm-dd)? format
          endDate:"2022-08-30",
          employeeGuid:empl.employeeGuid
      
        };
        index++;
      }
    


      if(empl.name==="Dr. Jarchi"){
        console.log("Last");
        last=1;
      }
      }))


      setData(newEmployessFormat);
    

  });



  axios.get(LocURL,config2).then(function (response) {

    console.log("Resonce");
    console.log(response);
      let dataDetails = [];
      let index =0;

   
  
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
//doctor verification
if(item.merchantFieldId===13904){

  if(item.value!==null){

    customStatus=item.value;
  }else{
    customStatus="NotSet";
  }
    }





        });


      //   var customStatus = "";

      if(customStatus==="NotSet")
      if(response.data.customStatusId===435){
        customStatus="No Show";
    }else if(response.data.customStatusId===434){
      customStatus="Attended";
    }else{
      customStatus="-";
    }

    var abttime =  <p> {response.data.firstName+" "+response.data.lastName}<br/> <span style={{fontWeight:'bold'}}>{response.data.duration +" Min"}</span></p>;
    var timeformat=  moment(response.data.appointmentDateTime);
    console.log(response.data.timeZone);
    console.log(response.data.appointmentDateTime);
    console.log( moment(response.data.appointmentDateTime).format("MM-DD-YYYY hh:mm A"));
    console.log(new Date().getTimezoneOffset());
   
    if(new Date().getTimezoneOffset()===480 || new Date().getTimezoneOffset()===420){
       console.log("From USA")
       if(timeZone==="PST - Pacific Time")
       timeformat=timeformat.add(moment.duration("08:00:00")).format("MM-DD-YYYY hh:mm A");
       else if(timeZone==="EST - Eastern Time")
       timeformat=timeformat.add(moment.duration("09:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="MST - Mountain Time")
       timeformat=timeformat.add(moment.duration("06:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="CST - Central Time")
       timeformat=timeformat.add(moment.duration("09:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="HST - Hawaiian Time")
       timeformat=timeformat.add(moment.duration("05:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="PHST - Philippine Time")
       timeformat=timeformat.subtract(moment.duration("08:00:00")).format("MM-DD-YYYY  hh:mm A");
       else
       timeformat=timeformat.subtract(moment.duration("05:00:00")).format("MM-DD-YYYY  hh:mm A");
     }else if(new Date().getTimezoneOffset()===300){
       console.log("From EST")
       if(timeZone==="PST - Pacific Time")
       timeformat=timeformat.add(moment.duration("05:00:00")).format("MM-DD-YYYY hh:mm A");
       else if(timeZone==="EST - Eastern Time")
       timeformat=timeformat.add(moment.duration("07:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="MST - Mountain Time")
       timeformat=timeformat.add(moment.duration("04:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="CST - Central Time")
       timeformat=timeformat.add(moment.duration("07:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="HST - Hawaiian Time")
       timeformat=timeformat.add(moment.duration("03:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="PHST - Philippine Time")
       timeformat=timeformat.subtract(moment.duration("08:00:00")).format("MM-DD-YYYY  hh:mm A");
       else
       timeformat=timeformat.subtract(moment.duration("05:00:00")).format("MM-DD-YYYY  hh:mm A");
     } else if(new Date().getTimezoneOffset()===-480){
       console.log("From Phlip")
       if(timeZone==="PST - Pacific Time")
       timeformat=timeformat.subtract(moment.duration("08:00:00")).format("MM-DD-YYYY hh:mm A");
       else if(timeZone==="EST - Eastern Time")
       timeformat=timeformat.subtract(moment.duration("02:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="MST - Mountain Time")
       timeformat=timeformat.subtract(moment.duration("04:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="CST - Central Time")
       timeformat=timeformat.subtract(moment.duration("3:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="HST - Hawaiian Time")
       timeformat=timeformat.subtract(moment.duration("07:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="PHST - Philippine Time")
       timeformat=timeformat.subtract(moment.duration("08:00:00")).format("MM-DD-YYYY  hh:mm A");
       else
       timeformat=timeformat.subtract(moment.duration("05:00:00")).format("MM-DD-YYYY  hh:mm A");
     } else if(new Date().getTimezoneOffset()===360){
       console.log("From CST")
       if(timeZone==="PST - Pacific Time")
       timeformat=timeformat.add(moment.duration("06:00:00")).format("MM-DD-YYYY hh:mm A");
       else if(timeZone==="EST - Eastern Time")
       timeformat=timeformat.add(moment.duration("08:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="MST - Mountain Time")
       timeformat=timeformat.add(moment.duration("05:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="CST - Central Time")
       timeformat=timeformat.add(moment.duration("08:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="HST - Hawaiian Time")
       timeformat=timeformat.add(moment.duration("04:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="PHST - Philippine Time")
       timeformat=timeformat.subtract(moment.duration("08:00:00")).format("MM-DD-YYYY  hh:mm A");
       else
       timeformat=timeformat.subtract(moment.duration("05:00:00")).format("MM-DD-YYYY  hh:mm A");
     } else if(new Date().getTimezoneOffset()===600){
       console.log("From Hawii Time")
       if(timeZone==="PST - Pacific Time")
       timeformat=timeformat.add(moment.duration("10:00:00")).format("MM-DD-YYYY hh:mm A");
       else if(timeZone==="EST - Eastern Time")
       timeformat=timeformat.add(moment.duration("11:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="MST - Mountain Time")
       timeformat=timeformat.add(moment.duration("08:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="CST - Central Time")
       timeformat=timeformat.add(moment.duration("11:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="HST - Hawaiian Time")
       timeformat=timeformat.add(moment.duration("08:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="PHST - Philippine Time")
       timeformat=timeformat.subtract(moment.duration("08:00:00")).format("MM-DD-YYYY  hh:mm A");
       else
       timeformat=timeformat.subtract(moment.duration("05:00:00")).format("MM-DD-YYYY  hh:mm A");
     }   else{
       console.log("From Pakistan")
       if(timeZone==="PST - Pacific Time")
       timeformat=timeformat.subtract(moment.duration("05:00:00")).format("MM-DD-YYYY hh:mm A");
       else if(timeZone==="EST - Eastern Time")
       timeformat=timeformat.subtract(moment.duration("02:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="MST - Mountain Time")
       timeformat=timeformat.subtract(moment.duration("04:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="CST - Central Time")
       timeformat=timeformat.subtract(moment.duration("3:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="HST - Hawaiian Time")
       timeformat=timeformat.subtract(moment.duration("07:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="PHST - Philippine Time")
       timeformat=timeformat.subtract(moment.duration("08:00:00")).format("MM-DD-YYYY  hh:mm A");
       else
       timeformat=timeformat.subtract(moment.duration("05:00:00")).format("MM-DD-YYYY  hh:mm A");
     }
          


    var newStartDate= new Date(startDate).getTime();
    var newEndDate= new Date(endDate).getTime();
    newEndDate = 24*60*60*1000 +newEndDate;
    var aptTime =new Date(response.data.appointmentDateTime).getTime();

    if(aptTime>=newStartDate && aptTime <=newEndDate ){
      dataDetails[index]={dbq:dbqlist,time:aptTime,phone:response.data.phone.slice(0,3)+"-"+response.data.phone.slice(3,6)+"-"+response.data.phone.slice(6,10),appointmentStatus:customStatus,id:response.data.id,appointmentDateTime: timeformat,firstName:abttime, duration:response.data.duration, verificationID:verificationID,confirmationGuid:response.data.confirmationGuid,alldata:response.data};
      index++;


  
      setDataRows([...dataDetails]);

    }

        });
      });


   

     

    });

}else{

  console.log("Else working");



  axios.get(LocURL,config2).then(function (response) {

    console.log("Resonce");
    console.log(response);
      let dataDetails = [];
      let index =0;

   
  
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
//doctor verification
if(item.merchantFieldId===13904){

  if(item.value!==null){

    customStatus=item.value;
  }else{
    customStatus="NotSet";
  }
    }





        });


      //   var customStatus = "";

      if(customStatus==="NotSet")
      if(response.data.customStatusId===435){
        customStatus="No Show";
    }else if(response.data.customStatusId===434){
      customStatus="Attended";
    }else{
      customStatus="-";
    }
    var abttime =  <p> {response.data.firstName+" "+response.data.lastName}<br/> <span style={{fontWeight:'bold'}}>{response.data.duration +" Min"}</span></p>;
      var timeformat=  moment(response.data.appointmentDateTime);
      console.log(response.data.timeZone);
      console.log(response.data.appointmentDateTime);
      console.log( moment(response.data.appointmentDateTime).format("MM-DD-YYYY hh:mm A"))
   



      console.log(new Date().getTimezoneOffset());
   
      if(new Date().getTimezoneOffset()===480  || new Date().getTimezoneOffset()===420){
       console.log("From USA")
       if(timeZone==="PST - Pacific Time")
       timeformat=timeformat.add(moment.duration("08:00:00")).format("MM-DD-YYYY hh:mm A");
       else if(timeZone==="EST - Eastern Time")
       timeformat=timeformat.add(moment.duration("09:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="MST - Mountain Time")
       timeformat=timeformat.add(moment.duration("06:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="CST - Central Time")
       timeformat=timeformat.add(moment.duration("09:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="HST - Hawaiian Time")
       timeformat=timeformat.add(moment.duration("05:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="PHST - Philippine Time")
       timeformat=timeformat.subtract(moment.duration("08:00:00")).format("MM-DD-YYYY  hh:mm A");
       else
       timeformat=timeformat.subtract(moment.duration("05:00:00")).format("MM-DD-YYYY  hh:mm A");
     }else if(new Date().getTimezoneOffset()===300){
       console.log("From EST")
       if(timeZone==="PST - Pacific Time")
       timeformat=timeformat.add(moment.duration("05:00:00")).format("MM-DD-YYYY hh:mm A");
       else if(timeZone==="EST - Eastern Time")
       timeformat=timeformat.add(moment.duration("07:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="MST - Mountain Time")
       timeformat=timeformat.add(moment.duration("04:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="CST - Central Time")
       timeformat=timeformat.add(moment.duration("07:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="HST - Hawaiian Time")
       timeformat=timeformat.add(moment.duration("03:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="PHST - Philippine Time")
       timeformat=timeformat.subtract(moment.duration("08:00:00")).format("MM-DD-YYYY  hh:mm A");
       else
       timeformat=timeformat.subtract(moment.duration("05:00:00")).format("MM-DD-YYYY  hh:mm A");
     } else if(new Date().getTimezoneOffset()===-480){
       console.log("From Phlip")
       if(timeZone==="PST - Pacific Time")
       timeformat=timeformat.subtract(moment.duration("08:00:00")).format("MM-DD-YYYY hh:mm A");
       else if(timeZone==="EST - Eastern Time")
       timeformat=timeformat.subtract(moment.duration("02:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="MST - Mountain Time")
       timeformat=timeformat.subtract(moment.duration("04:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="CST - Central Time")
       timeformat=timeformat.subtract(moment.duration("3:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="HST - Hawaiian Time")
       timeformat=timeformat.subtract(moment.duration("07:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="PHST - Philippine Time")
       timeformat=timeformat.subtract(moment.duration("08:00:00")).format("MM-DD-YYYY  hh:mm A");
       else
       timeformat=timeformat.subtract(moment.duration("05:00:00")).format("MM-DD-YYYY  hh:mm A");
     } else if(new Date().getTimezoneOffset()===360){
       console.log("From CST")
       if(timeZone==="PST - Pacific Time")
       timeformat=timeformat.add(moment.duration("06:00:00")).format("MM-DD-YYYY hh:mm A");
       else if(timeZone==="EST - Eastern Time")
       timeformat=timeformat.add(moment.duration("09:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="MST - Mountain Time")
       timeformat=timeformat.add(moment.duration("05:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="CST - Central Time")
       timeformat=timeformat.add(moment.duration("08:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="HST - Hawaiian Time")
       timeformat=timeformat.add(moment.duration("04:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="PHST - Philippine Time")
       timeformat=timeformat.subtract(moment.duration("08:00:00")).format("MM-DD-YYYY  hh:mm A");
       else
       timeformat=timeformat.subtract(moment.duration("05:00:00")).format("MM-DD-YYYY  hh:mm A");
     } else if(new Date().getTimezoneOffset()===600){
       console.log("From Hawii Time")
       if(timeZone==="PST - Pacific Time")
       timeformat=timeformat.add(moment.duration("10:00:00")).format("MM-DD-YYYY hh:mm A");
       else if(timeZone==="EST - Eastern Time")
       timeformat=timeformat.add(moment.duration("11:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="MST - Mountain Time")
       timeformat=timeformat.add(moment.duration("08:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="CST - Central Time")
       timeformat=timeformat.add(moment.duration("11:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="HST - Hawaiian Time")
       timeformat=timeformat.add(moment.duration("08:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="PHST - Philippine Time")
       timeformat=timeformat.subtract(moment.duration("08:00:00")).format("MM-DD-YYYY  hh:mm A");
       else
       timeformat=timeformat.subtract(moment.duration("05:00:00")).format("MM-DD-YYYY  hh:mm A");
     }   else{
       console.log("From Pakistan")
       if(timeZone==="PST - Pacific Time")
       timeformat=timeformat.subtract(moment.duration("05:00:00")).format("MM-DD-YYYY hh:mm A");
       else if(timeZone==="EST - Eastern Time")
       timeformat=timeformat.subtract(moment.duration("02:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="MST - Mountain Time")
       timeformat=timeformat.subtract(moment.duration("04:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="CST - Central Time")
       timeformat=timeformat.subtract(moment.duration("3:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="HST - Hawaiian Time")
       timeformat=timeformat.subtract(moment.duration("07:00:00")).format("MM-DD-YYYY  hh:mm A");
       else if(timeZone==="PHST - Philippine Time")
       timeformat=timeformat.subtract(moment.duration("08:00:00")).format("MM-DD-YYYY  hh:mm A");
       else
       timeformat=timeformat.subtract(moment.duration("05:00:00")).format("MM-DD-YYYY  hh:mm A");
     }
          

  

      var newStartDate= new Date(startDate).getTime();
      var newEndDate= new Date(endDate).getTime();
      newEndDate = 24*60*60*1000 +newEndDate;
      var aptTime =new Date(response.data.appointmentDateTime).getTime();

      console.log("Dates");
      console.log(startDate);
      console.log(endDate);
      console.log(newEndDate);
      if(aptTime>=newStartDate && aptTime <=newEndDate ){
        dataDetails[index]={dbq:dbqlist,time:aptTime,phone:response.data.phone.slice(0,3)+"-"+response.data.phone.slice(3,6)+"-"+response.data.phone.slice(6,10),appointmentStatus:customStatus,id:response.data.id,appointmentDateTime: timeformat,firstName:abttime, duration:response.data.duration, verificationID:verificationID,confirmationGuid:response.data.confirmationGuid,alldata:response.data};
        index++;


    
        setDataRows([...dataDetails]);

      }

        });
      });


   

     

    });
}













});


    },[LocURL,dataID])

    


 
    
    
    
    
    
    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
      };
    
     
    


      

  
    const columns = [
      { title: "confirmationGuid", field: "confirmationGuid",    width:"0%",hidden: true, editable:'never'},
      { title: "Id", field: "_id",  width:"0%",   hidden: true, editable:'never'},
      { title: "alldata", field: "alldata",  width:"0%",   hidden: true, editable:'never'},
      { title: "Name", field: "firstName",sorting:false, cellStyle: {
        minWidth: 200,
        maxWidth: 200
      },editable:'never'},
      { title: "time", field: "time", hidden: true, width:"0%",   defaultSort:'asc', editable:'never'},
      { title: "Start Time", field: "appointmentDateTime", cellStyle: {
        minWidth: 90,
        maxWidth: 110
      },editable:'never'},
      { title: "Phone", field: "phone",sorting:false,editable:'never', cellStyle: {
        minWidth: 150,
        maxWidth: 150
      }},
      { title: "DBQ List", field: "dbq",sorting:false,editable:'never', cellStyle: {
        minWidth: 300,
        maxWidth: 300
      }},
      { title: "Verification ID", field: "verificationID",width:"10%",editable:'always'},
      { title: "Appointment Status", field: "appointmentStatus",width:"10%",editable:'never'},
      { title: 'Actions',sorting:false,width:'300px',editable: 'never', width:"10%",render: (rowData) => 
      <div>


<div  style={{margin:"2px"}} className="btn  btn-sm btn-success" onClick={(rowDatas) =>{
            console.log(rowData);
               
            const dataDetails2 = [...dataRows];
            const index = dataDetails2.indexOf(rowData);
  
            rowData.appointmentStatus="Attended";
  
            rowData.alldata.customBookingFields.map((iteam)=>{
                           
              if(iteam.merchantFieldId===13904){
                iteam.value="Attended";
              }
            });
  
            rowData.alldata.customStatusId=434;
            rowData.alldata.remindByEmail=false;
          rowData.alldata.remindBySms=false;
          delete rowData.alldata["appointmentDateTime"]
   
          axios.post("http://platinummedapp.com/updateappoitment",{accesstoken: accessToken,data: rowData.alldata}).then(function (response) {
  
          
 
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
          }}>Attended</div>

<div style={{margin:"2px"}} className="btn  btn-sm btn-danger" onClick={(rowDatas) =>{
            console.log(rowData);
               
    // Do save operation
    console.log("Data Recived from Flexbooker");
    console.log(rowData.alldata);


                        const dataDetails2 = [...dataRows];
                        const index = dataDetails2.indexOf(rowData);

                        rowData.appointmentStatus="No Show";

                        rowData.alldata.customStatusId=435;
                        rowData.alldata.customBookingFields.map((iteam)=>{
                         
                          if(iteam.merchantFieldId===13904){
                            iteam.value="No Show";
                          }
                        });

                        console.log("Data Send to Flexbooker");
    console.log(rowData.alldata);

    delete rowData.alldata["appointmentDateTime"]
    rowData.alldata.remindByEmail=false;
    rowData.alldata.remindBySms=false;
                      axios.post("http://platinummedapp.com/updateappoitment",{accesstoken: accessToken,data: rowData.alldata}).then(function (response) {

                      

                        dataDetails2[index] = rowData;
                        console.log("Responce: ");
                        console.log(response.data);
           
                      


                   
                        setDataRows([...dataDetails2]);

            
                     
     

                
                    });
          }}>No Show</div>

          <div style={{margin:"2px",fontSize:'13px'}} className="btn  btn-sm btn-primary" onClick={(rowDatas) =>{
            console.log(rowData);
               
        openInNewTab("https://a.flexbooker.com/manage#booking/"+rowData.confirmationGuid);
          }}>Open Flexbooker</div>
      </div>
  }
  
    ];
  
    return (
      <div className="text-center">
<div className="row">
<span className="col">

Appointments Date Range Filter

<DateRangePicker
         onCallback={handleCallback}
         maxDate={new Date()}
      >
         <input type="text" className="form-control" />
      </DateRangePicker>

</span>

<span className="col">  
 <div>Notes for {moment(Date()).format("MM-DD-YYYY")} <textarea value={notes} onChange={(e)=>{setNotes(e.target.value)}} onBlur={()=>{
  console.log(notes);
console.log(localStorage.getItem('email'));


axios.post("http://platinummedapp.com/notes/update/"+localStorage.getItem('email')+"/"+moment(Date()).format("MM-DD-YYYY"),{date:moment(Date()).format("MM-DD-YYYY"),notes:notes,email:localStorage.getItem('email')}).then(function (response) {
  
          console.log(response.data);
 


});


}} class="form-control" id="textAreaExample1" rows="1"></textarea>  
  </div></span>
</div>


<br/>



{removeElementsByClass("MuiToolbar-regular")}
        <MaterialTable
                 cellEditable={{
                  onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                    return new Promise((resolve, reject) => {
                        console.log('newValue: ' + newValue);
                        console.log('oldValue: ' + oldValue);
                        console.log('columnDef: ' + columnDef);
                        console.log('oldData: ' + rowData);


                        const dataDetails2 = [...dataRows];
                        const index = dataDetails2.indexOf(rowData);

                        rowData.verificationID=newValue;

                        rowData.alldata.customBookingFields.map((iteam)=>{
                         
                          if(iteam.merchantFieldId===13878){
                            iteam.value=newValue;
                          }
                        });

                        delete rowData.alldata["appointmentDateTime"]
                        rowData.alldata.remindByEmail=false;
                        rowData.alldata.remindBySms=false;
                      
                      axios.post("http://platinummedapp.com/updateappoitment",{accesstoken: accessToken,data: rowData.alldata}).then(function (response) {

                      

                        dataDetails2[index] = rowData;

                        console.log("Appointmet Responce");

                        console.log(response);

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

                        setTimeout(resolve, 4000);
                    })},
                  isCellEditable: () => true,
         
                  
                    
                }}

  
          title={<div >
          
           {/* <span style={{marginLeft: "10px"}}>Name: {props.name}</span>
           <span style={{marginLeft: "20px"}}>Email: {props.email}</span> */}
           </div>}
          data={dataRows}
          columns={columns}
      
          options={{
            headerStyle: {
              backgroundColor: '#00a0da',
              color: '#FFF',
              fontWeight:'bold',
              fontSize:'16px'
            },
            actionsColumnIndex: -1,
            addRowPosition: "first",
            paging: false,
            search:false,
            maxBodyHeight: '600px',    // make initial page size
            emptyRowsWhenPaging: false,   // To avoid of having empty rows
        
            rowStyle: (row) => {
              const rowStyling = {
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
export default SingleViewDoctor;