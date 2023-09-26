import React,{useState}from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import moment from 'moment';
import axios from "axios";
import { FormControlUnstyledContext } from "@mui/base";

const initSelect = (data) => {
  return data.map((item) => ({
      ...item,
      selected: false       
  }));
 }

const config = {
  timeout: 1000 * 5, // Wait for 5 seconds

  headers: {
    "Content-Type": "multipart/form-data",
  }
};

export default function DataGridConverted() {

  var nearbyClinics=[];

  var [convert, setConvert] = useState("Waiting for Zip Master Data...");

  const [viewDataAll, setViewDataAll] = useState([{id:1}]);

  const [foundData, setFoundData] = useState([{id:1}]);

  const [dataGet, setDataGet] = useState(0);

  const myState= useSelector((state)=>state.saveTheData)

  const [index3, setIndex3] = useState(0);

  const [selectedRows, setselectedRows] = useState([{id:99999}]);
 


  var states = {
    'AL':'AL',
    'AK':'AK',
    'AS':'AS',
    'AZ':'AZ',

    'AR':'AR',
    'CO':'CO',
    'CT':'CT',
    'DE':'DE',

    'DC':'DC',
    'FM':'FM',
    'FL':'FL',
    'GA':'GA',

    'GU':'GU',
    'HI':'HI',
    'ID':'ID',
    'IL':'IL',

    'IN':'IN',
    'IA':'IA',
    'KS':'KS',
    'KY':'KY',

    'LA':'LA',
    'ME':'ME',
    'MH':'MH',
    'MD':'MD',


    'MT':'MT',
    'NE':'NE',
    'NV':'NV',
    'NH':'NH',

    'NJ':'NJ',
    'NM':'NM',
    'NY':'NY',
    'NC':'NC',

    'ND':'ND',
    'MP':'MP',
    'OH':'OH',
    'OK':'OK',

    'OR':'OR',
    'PW':'PW',
    'PA':'PA',
    'PR':'PR',


    'RI':'RI',
    'SC':'SC',
    'SD':'SD',
    'TN':'TN',

    'TX':'TX',
    'UT':'UT',
    'VT':'VT',
    'VA':'VA',
    'WA':'WA',

    'WV':'WV',

    'WI':'WI',

    'WY':'WY',

    'Alabama': 'AL',
    'Alaska': 'AK',
    'American Samoa': 'AS',
    'Arizona': 'AZ',
    'Arkansas': 'AR',
    'Colorado': 'CO',
    'Connecticut': 'CT',
    'Delaware': 'DE',
    'District Of Columbia': 'DC',
    'Federated States Of Micronesia': 'FM',
    'Florida': 'FL',
    'Georgia': 'GA',
    'Guam': 'GU',
    'Hawaii': 'HI',
    'Idaho': 'ID',
    'Illinois': 'IL',
    'Indiana': 'IN',
    'Iowa': 'IA',
    'Kansas': 'KS',
    'Kentucky': 'KY',
    'Louisiana': 'LA',
    'Maine': 'ME',
    'Marshall Islands': 'MH',
    'Maryland': 'MD',
    'Massachusetts': 'MA',
    'Michigan': 'MI',
    'Minnesota': 'MN',
    'Mississippi': 'MS',
    'Missouri': 'MO',
    'Montana': 'MT',
    'Nebraska': 'NE',
    'Nevada': 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    'Northern Mariana Islands': 'MP',
    'Ohio': 'OH',
    'Oklahoma': 'OK',
    'Oregon': 'OR',
    'Palau': 'PW',
    'Pennsylvania': 'PA',
    'Puerto Rico': 'PR',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    'Tennessee': 'TN',
    'Texas': 'TX',
    'Utah': 'UT',
    'Vermont': 'VT',
    'Virgin Islands': 'VI',
    'Virginia': 'VA',
    'Washington': 'WA',
    'West Virginia': 'WV',
    'Wisconsin': 'WI',
    'Wyoming': 'WY'
  }



  let viewdata =initSelect([]);
  var index=0;


  let founddataall =initSelect([]);
  var index2=0;
  
if(dataGet===0){
 // setConvert("Waiting for Zip Code Data");
  
  axios.get("http://platinummedapp.com/zipdata/all").then(function (response) {
    nearbyClinics=response.data;
    console.log("setNearbyClinics");
    console.log(response.data);



if(nearbyClinics.length>=2 && dataGet===0 && viewDataAll.length==1  && foundData.length==1){
  setDataGet(1);
  const credintials=[{
    grant_type:'client_credentials',
    scope:'flexbookerApi',
    client_id:'lhppg6lr78',
    client_secret:'rt9ay86q975y4nusweced1l3uoe8w71hxzhw7lpvw0sd0wmb4x',
  },
 

]





  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

 

  axios.post("http://platinummedapp.com/connect/token",credintials,config).then(function (response) {

    console.log(response.data.access_token)


    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;


    const config2 = {
      headers: {
        "Content-Type": "multipart/form-data",
       
      }
    };

    let notfound=0;
    let arrayofnotfound=[[],[]];







    let i=0;
    let y=0; 

    myState.map((dataRow)=>{

      
   

      if(dataRow.name!=='name' && dataRow.id!=''){

        let email = dataRow.email;

        console.log("Searching:   " + i +"  "+ email);
        i++;
        axios.get("http://platinummedapp.com/api/Customers?searchTerm="+email,config2).then(function (response) {


          console.log("Responce Number:   " + y +"  "+ email);
          y++;
          console.log(response);
          

          if(response.data.customers.length>0){

     
if(dataRow.name!=='name'){

  //console.log("Applying Algo");


  var formateddate = moment(dataRow.date_added).format('MM/DD/YYYY');
  console.log("formateddate");
  console.log(formateddate);
  var datesplit =[];
  if(dataRow.birthdate!==undefined){
  
   datesplit= dataRow.birthdate.split('-');
  }


  var dateofbirth=dataRow.birthdate;
  if(datesplit.length>2){
    dateofbirth=datesplit[1]+"/"+datesplit[2]+"/"+datesplit[0];
  }

  var addedDate = moment(new Date()).format('MM/DD/YYYY');


  var npID =[];
  if(dataRow.netSuiteID!== undefined){

    npID=dataRow.netSuiteID.split(',');
    npID=npID[0].split('-');
    npID=npID[0].split('.');
    npID=npID[0].split('’');
    
  

  npID=npID[0].trim();
  }

  if(dataRow.name!=='name'){

    

      const myArray = dataRow.name.split(" ");

     // console.log("Name");
     // console.log(myArray);
     // console.log(myArray[2]);
      let firstname ="";
      var lastname="";

      let lastnamedual="";

      var nearby="";

     // console.log("Nearby Clinics");

      nearbyClinics.map( record => {
    
        if(record.zipcode === dataRow.zipcode){
          nearby=record.location;
        }
      
      
      });

     // console.log(nearby);





     

      if(myArray.length===1){
             
        firstname =myArray[0];
        lastname="";

       }else if(myArray.length===2){

        firstname =myArray[0];
        lastname =myArray[1];

       }else if(myArray.length===3){
           firstname =myArray[0];
           lastname =myArray[1]+" "+myArray[2];

       }else if(myArray.length===4){
        firstname =myArray[0];
        lastname =myArray[1]+" "+myArray[2]+" "+myArray[3];

    }else{
      firstname =myArray[0];
      lastname =myArray[1]+" "+myArray[2]+" "+myArray[3]+" "+myArray[5];
    }
      
       var chart ="’";
       lastname.replace(chart,"'");

     

      if(states[dataRow.state]){
        lastname=lastname+" - " +states[dataRow.state];
  

      }else{
        lastname=lastname;
    
      }

      lastnamedual=lastname;

      var apt_type="";
      

      if(dataRow.apptTypeNeeded.toUpperCase()==="MENTAL" | dataRow.apptTypeNeeded.toUpperCase()==="PTSD"){
        lastname=lastname+" - PSYCH";
        apt_type="Mental Evaluation"
      }
     else if(dataRow.apptTypeNeeded.toUpperCase()==="DUAL"){

        lastname=lastname+" - PSYCH";
        apt_type="Mental Evaluation"
      
       }

      const dbqs = dataRow.disabilities.split(";");
      let dpb1="",dpb2="",dpb3="",dpb4="",dpb5="",dpb6="",dpb7="",dpb8="",dpb9="",
      dpb10="";
      console.log("dbqs");
      console.log(dbqs);

      if(dpb1.startsWith("PTSD") |dpb2.startsWith("PTSD") |dpb3.startsWith("PTSD") |dpb4.startsWith("PTSD") |dpb5.startsWith("PTSD") |dpb6.startsWith("PTSD") |dpb7.startsWith("PTSD") |dpb8.startsWith("PTSD") |dpb9.startsWith("PTSD") |dpb10.startsWith("PTSD") ){
        lastname=lastname+" - PSYCH";
        apt_type="Mental Evaluation"
        dpb1="PTSD";
      }

      if(dbqs.length===1){
        if(apt_type!=="Mental Evaluation"){
          apt_type="DBQ Evaluation"
        }
        
          dpb1=dbqs[0].trim();
      }else if(dbqs.length==2){

   if(apt_type!=="Mental Evaluation"){
          apt_type="DBQ Evaluation"
        }
        
          dpb1=dbqs[0].trim();
          dpb2=dbqs[1].trim();

      }else if(dbqs.length===3){
        if(apt_type!=="Mental Evaluation"){
          apt_type="DBQ Evaluation"
        }
        
          dpb1=dbqs[0].trim();
          dpb2=dbqs[1].trim();
          dpb3=dbqs[2].trim();
       

      }else if(dbqs.length===4){
        if(apt_type!=="Mental Evaluation"){
          apt_type="DBQ Evaluation"
        }
        
          dpb1=dbqs[0].trim();
          dpb2=dbqs[1].trim();
          dpb3=dbqs[2].trim();
          dpb4=dbqs[3].trim();

      }else if(dbqs.length===5){

        if(apt_type!=="Mental Evaluation"){
          apt_type="DBQ Medical Evaluation"
        }
        
          dpb1=dbqs[0].trim();
          dpb2=dbqs[1].trim();
          dpb3=dbqs[2].trim();
          dpb4=dbqs[3].trim();
          dpb5=dbqs[4].trim();

      }else if(dbqs.length===6){
        if(apt_type!=="Mental Evaluation"){
          apt_type="DBQ Medical Evaluation"
        }
          dpb1=dbqs[0].trim();
          dpb2=dbqs[1].trim();
          dpb3=dbqs[2].trim();
          dpb4=dbqs[3].trim();
          dpb5=dbqs[4].trim();
          dpb6=dbqs[5].trim();

      }else if(dbqs.length===7){
        if(apt_type!=="Mental Evaluation"){
          apt_type="DBQ Evaluation Prolonged"
        }
          dpb1=dbqs[0].trim();
          dpb2=dbqs[1].trim();
          dpb3=dbqs[2].trim();
          dpb4=dbqs[3].trim();
          dpb5=dbqs[4].trim();
          dpb6=dbqs[5].trim();
          dpb7=dbqs[6].trim();

      }else if(dbqs.length===8){
        if(apt_type!=="Mental Evaluation"){
          apt_type="DBQ Evaluation Prolonged"
        }
          dpb1=dbqs[0].trim();
          dpb2=dbqs[1].trim();
          dpb3=dbqs[2].trim();
          dpb4=dbqs[3].trim();
          dpb5=dbqs[4].trim();
          dpb6=dbqs[5].trim();
          dpb7=dbqs[6].trim();
          dpb8=dbqs[7].trim();

      }else if(dbqs.length===9){
        if(apt_type!=="Mental Evaluation"){
          apt_type="DBQ Evaluation Prolonged"
        }
          dpb1=dbqs[0].trim();
          dpb2=dbqs[1].trim();
          dpb3=dbqs[2].trim();
          dpb4=dbqs[3].trim();
          dpb5=dbqs[4].trim();
          dpb6=dbqs[5].trim();
          dpb7=dbqs[6].trim();
          dpb8=dbqs[7].trim();
          dpb9=dbqs[8].trim();

      }else if(dbqs.length===10){
        if(apt_type!=="Mental Evaluation"){
          apt_type="DBQ Evaluation Prolonged"
        }
          dpb1=dbqs[0].trim();
          dpb2=dbqs[1].trim();
          dpb3=dbqs[2].trim();
          dpb4=dbqs[3].trim();
          dpb5=dbqs[4].trim();
          dpb6=dbqs[5].trim();
          dpb7=dbqs[6].trim();
          dpb8=dbqs[7].trim();
          dpb9=dbqs[8].trim();
          dpb10=dbqs[9].trim();

      }else if(dbqs.length===11){
        if(apt_type!=="Mental Evaluation"){
          apt_type="DBQ Evaluation Prolonged"
        }
          dpb1=dbqs[0].trim();
          dpb2=dbqs[1].trim();
          dpb3=dbqs[2].trim();
          dpb4=dbqs[3].trim();
          dpb5=dbqs[4].trim();
          dpb6=dbqs[5].trim();
          dpb7=dbqs[6].trim();
          dpb8=dbqs[7].trim();
          dpb9=dbqs[8].trim();
          dpb10=dbqs[9].trim() +";"+dbqs[10].trim();

      }else if(dbqs.length===12){
        if(apt_type!=="Mental Evaluation"){
          apt_type="DBQ Evaluation Prolonged"
        }
          dpb1=dbqs[0].trim();
          dpb2=dbqs[1].trim();
          dpb3=dbqs[2].trim();
          dpb4=dbqs[3].trim();
          dpb5=dbqs[4].trim();
          dpb6=dbqs[5].trim();
          dpb7=dbqs[6].trim();
          dpb8=dbqs[7].trim();
          dpb9=dbqs[8].trim();
          dpb10=dbqs[9].trim() +";"+dbqs[10].trim()+";"+dbqs[11].trim();

      }



      

     
//remove space from list of DBQs
//Oâ€™Rourke
//O'Rourke




if(dataRow.apptTypeNeeded.toUpperCase()==="DUAL"){

  if(dpb1.startsWith("PTSD") |dpb2.startsWith("PTSD") |dpb3.startsWith("PTSD") |dpb4.startsWith("PTSD") |dpb5.startsWith("PTSD") |dpb6.startsWith("PTSD") |dpb7.startsWith("PTSD") |dpb8.startsWith("PTSD") |dpb9.startsWith("PTSD") |dpb10.startsWith("PTSD")){
    dpb1='PTSD';
    dpb2='';
    dpb3='';
    dpb4='';
    dpb5='';
    dpb6='';
    dpb7='';
    dpb8='';
    dpb9='';
    dpb10='';
  }else{
    dpb1='Mental';
    dpb2='';
    dpb3='';
    dpb4='';
    dpb5='';
    dpb6='';
    dpb7='';
    dpb8='';
    dpb9='';
    dpb10='';
  }

  var aptdatetime = response.data.customers[0].numberOfBookings>0?moment(response.data.customers[0].lastBookingDate).format("MM-DD-YYYY hh:mm A"):"NO Past APT";


console.log(moment(response.data.customers[0].lastBookingDate).format("MM-DD-YYYY hh:mm A"))

founddataall= [...founddataall,{id:index2,lastapttime:aptdatetime, closestclinic:nearby,dateadded:addedDate,createdAt:formateddate.toString(),upid:dataRow.netSuiteID,appointmenttype:apt_type,bdq1:dpb1,bdq2:dpb2,bdq3:dpb3,bdq4:dpb4,bdq5:dpb5,bdq6:dpb6,bdq7:dpb7,bdq9:dpb9,bdq8:dpb8,bdq10:dpb10, firstname: firstname, lastname: lastname, netsuitid: npID,phone:dataRow.cell_phone,email:dataRow.email,gender:dataRow.gender,birthdate:dateofbirth,city:dataRow.city,state:dataRow.state,zipcode:dataRow.zipcode,dateNP:formateddate,apptTypeNeeded:dataRow.apptTypeNeeded,disabilities:dataRow.disabilities}];
index2++;



}else{

  // if(dpb1==="PTSD"){
  //   dpb1=dpb2;
  //   dpb2=dpb3;
  //   dpb3=dpb4;
  //   dpb4=dpb5;
  //   dpb5=dpb6;
  //   dpb6=dpb7;
  //   dpb7=dpb8;
  //   dpb8=dpb9;
  //   dpb9=dpb10;
  // }else if(dpb2==="PTSD"){

  //   dpb2=dpb3;
  //   dpb3=dpb4;
  //   dpb4=dpb5;
  //   dpb5=dpb6;
  //   dpb6=dpb7;
  //   dpb7=dpb8;
  //   dpb8=dpb9;
  //   dpb9=dpb10;
  // }else if(dpb3==="PTSD"){

  //   dpb3=dpb4;
  //   dpb4=dpb5;
  //   dpb5=dpb6;
  //   dpb6=dpb7;
  //   dpb7=dpb8;
  //   dpb8=dpb9;
  //   dpb9=dpb10;
  // }else if(dpb4==="PTSD"){

  //   dpb4=dpb5;
  //   dpb5=dpb6;
  //   dpb6=dpb7;
  //   dpb7=dpb8;
  //   dpb8=dpb9;
  //   dpb9=dpb10;
  // }else if(dpb5==="PTSD"){
  //   dpb5=dpb6;
  //   dpb6=dpb7;
  //   dpb7=dpb8;
  //   dpb8=dpb9;
  //   dpb9=dpb10;
  // }else if(dpb6==="PTSD"){
  //   dpb6=dpb7;
  //   dpb7=dpb8;
  //   dpb8=dpb9;
  //   dpb9=dpb10;
  // }else if(dpb7==="PTSD"){
  //   dpb7=dpb8;
  //   dpb8=dpb9;
  //   dpb9=dpb10;
  // }else if(dpb8==="PTSD"){
  //   dpb8=dpb9;
  //   dpb9=dpb10;
  // }else if(dpb9==="PTSD"){
  //   dpb9=dpb10;
  // }
  
console.log(moment(response.data.customers[0].lastBookingDate).format("MM-DD-YYYY hh:mm A"))
var aptdatetime = response.data.customers[0].numberOfBookings>0?moment(response.data.customers[0].lastBookingDate).format("MM-DD-YYYY hh:mm A"):"NO Past APT";

  founddataall=[...founddataall,{id:index2, lastapttime:aptdatetime,closestclinic:nearby,dateadded:addedDate,createdAt:formateddate.toString(),upid:dataRow.netSuiteID,appointmenttype:apt_type,bdq1:dpb1,bdq2:dpb2,bdq3:dpb3,bdq4:dpb4,bdq5:dpb5,bdq6:dpb6,bdq7:dpb7,bdq9:dpb9,bdq8:dpb8,bdq10:dpb10, firstname: firstname, lastname: lastname, netsuitid: npID,phone:dataRow.cell_phone,email:dataRow.email,gender:dataRow.gender,birthdate:dateofbirth,city:dataRow.city,state:dataRow.state,zipcode:dataRow.zipcode,dateNP:formateddate,apptTypeNeeded:dataRow.apptTypeNeeded,disabilities:dataRow.disabilities}];
  index2++;

}




  if(dataRow.apptTypeNeeded.toUpperCase()==="DUAL"){
    apt_type="Physical";
    lastname = lastnamedual;


    var filtered = dbqs.filter(function(value, index, arr){ 
      return (!value.startsWith(' Mental') && !value.startsWith('PTSD'));
  });

console.log("filtered");
  console.log(filtered);


  var filtered2 = filtered.filter(function(value, index, arr){ 
   
    return (!value.startsWith(' Mental') && !value.startsWith('PTSD'));
  
});


console.log(filtered2);

    if(filtered2.length===1){
      if(apt_type!=="Mental Evaluation"){
        apt_type="DBQ Evaluation"
      }
      
        dpb1=filtered2[0].trim();
    }else if(filtered2.length==2){

 if(apt_type!=="Mental Evaluation"){
        apt_type="DBQ Evaluation"
      }
      
        dpb1=filtered2[0].trim();
        dpb2=filtered2[1].trim();

    }else if(filtered2.length===3){
      if(apt_type!=="Mental Evaluation"){
        apt_type="DBQ Evaluation"
      }
      
        dpb1=filtered2[0].trim();
        dpb2=filtered2[1].trim();
        dpb3=filtered2[2].trim();
     

    }else if(filtered2.length===4){
      if(apt_type!=="Mental Evaluation"){
        apt_type="DBQ Evaluation"
      }
      
        dpb1=filtered2[0].trim();
        dpb2=filtered2[1].trim();
        dpb3=filtered2[2].trim();
        dpb4=filtered2[3].trim();

    }else if(filtered2.length===5){

      if(apt_type!=="Mental Evaluation"){
        apt_type="DBQ Medical Evaluation"
      }
      
        dpb1=filtered2[0].trim();
        dpb2=filtered2[1].trim();
        dpb3=filtered2[2].trim();
        dpb4=filtered2[3].trim();
        dpb5=filtered2[4].trim();

    }else if(filtered2.length===6){
      if(apt_type!=="Mental Evaluation"){
        apt_type="DBQ Medical Evaluation"
      }
        dpb1=filtered2[0].trim();
        dpb2=filtered2[1].trim();
        dpb3=filtered2[2].trim();
        dpb4=filtered2[3].trim();
        dpb5=filtered2[4].trim();
        dpb6=filtered2[5].trim();

    }else if(filtered2.length===7){
      if(apt_type!=="Mental Evaluation"){
        apt_type="DBQ Evaluation Prolonged"
      }
        dpb1=filtered2[0].trim();
        dpb2=filtered2[1].trim();
        dpb3=filtered2[2].trim();
        dpb4=filtered2[3].trim();
        dpb5=filtered2[4].trim();
        dpb6=filtered2[5].trim();
        dpb7=filtered2[6].trim();

    }else if(filtered2.length===8){
      if(apt_type!=="Mental Evaluation"){
        apt_type="DBQ Evaluation Prolonged"
      }
        dpb1=filtered2[0].trim();
        dpb2=filtered2[1].trim();
        dpb3=filtered2[2].trim();
        dpb4=filtered2[3].trim();
        dpb5=filtered2[4].trim();
        dpb6=filtered2[5].trim();
        dpb7=filtered2[6].trim();
        dpb8=filtered2[7].trim();

    }else if(filtered2.length===9){
      if(apt_type!=="Mental Evaluation"){
        apt_type="DBQ Evaluation Prolonged"
      }
        dpb1=filtered2[0].trim();
        dpb2=filtered2[1].trim();
        dpb3=filtered2[2].trim();
        dpb4=filtered2[3].trim();
        dpb5=filtered2[4].trim();
        dpb6=filtered2[5].trim();
        dpb7=filtered2[6].trim();
        dpb8=filtered2[7].trim();
        dpb9=filtered2[8].trim();

    }else if(filtered2.length===10){
      if(apt_type!=="Mental Evaluation"){
        apt_type="DBQ Evaluation Prolonged"
      }
        dpb1=filtered2[0].trim();
        dpb2=filtered2[1].trim();
        dpb3=filtered2[2].trim();
        dpb4=filtered2[3].trim();
        dpb5=filtered2[4].trim();
        dpb6=filtered2[5].trim();
        dpb7=filtered2[6].trim();
        dpb8=filtered2[7].trim();
        dpb9=filtered2[8].trim();
        dpb10=filtered2[9].trim();

    }
    if(dpb1.startsWith("PTSD") & dpb2!==""){
      dpb1=dpb2;
      dpb2=dpb3;
      dpb3=dpb4;
      dpb4=dpb5;
      dpb5=dpb6;
      dpb6=dpb7;
      dpb7=dpb8;
      dpb8=dpb9;
      dpb9=dpb10;
    }else if(dpb2.startsWith("PTSD")){
  
      dpb2=dpb3;
      dpb3=dpb4;
      dpb4=dpb5;
      dpb5=dpb6;
      dpb6=dpb7;
      dpb7=dpb8;
      dpb8=dpb9;
      dpb9=dpb10;
    }else if(dpb3.startsWith("PTSD")){
  
      dpb3=dpb4;
      dpb4=dpb5;
      dpb5=dpb6;
      dpb6=dpb7;
      dpb7=dpb8;
      dpb8=dpb9;
      dpb9=dpb10;
    }else if(dpb4.startsWith("PTSD")){
  
      dpb4=dpb5;
      dpb5=dpb6;
      dpb6=dpb7;
      dpb7=dpb8;
      dpb8=dpb9;
      dpb9=dpb10;
    }else if(dpb5.startsWith("PTSD")){
      dpb5=dpb6;
      dpb6=dpb7;
      dpb7=dpb8;
      dpb8=dpb9;
      dpb9=dpb10;
    }else if(dpb6.startsWith("PTSD")){
      dpb6=dpb7;
      dpb7=dpb8;
      dpb8=dpb9;
      dpb9=dpb10;
    }else if(dpb7.startsWith("PTSD")){
      dpb7=dpb8;
      dpb8=dpb9;
      dpb9=dpb10;
    }else if(dpb8.startsWith("PTSD")){
      dpb8=dpb9;
      dpb9=dpb10;
    }else if(dpb9.startsWith("PTSD")){
      dpb9=dpb10;
    }
  
console.log(moment(response.data.customers[0].lastBookingDate).format("MM-DD-YYYY hh:mm A"))
var aptdatetime = response.data.customers[0].numberOfBookings>0?moment(response.data.customers[0].lastBookingDate).format("MM-DD-YYYY hh:mm A"):"NO Past APT";

    founddataall[index2]= {id:index2,lastapttime:aptdatetime, closestclinic:nearby,dateadded:addedDate,createdAt:dataRow.date_added,upid:dataRow.netSuiteID,appointmenttype:apt_type,bdq1:dpb1,bdq2:dpb2,bdq3:dpb3,bdq4:dpb4,bdq5:dpb5,bdq6:dpb6,bdq7:dpb7,bdq9:dpb9,bdq8:dpb8,bdq10:dpb10,id: index2, firstname: firstname, lastname: lastname, netsuitid: npID,phone:dataRow.phone,email:dataRow.email,gender:dataRow.gender,birthdate:dateofbirth,city:dataRow.city,state:dataRow.state,zipcode:dataRow.zipcode,dateNP:formateddate.toString(),apptTypeNeeded:dataRow.apptTypeNeeded,disabilities:dataRow.disabilities};
    index2++;
   }

  }
}




if(i===y){
  setConvert("Finalizing...");
}



//console.log("founddataall");
//console.log(founddataall);
setFoundData(founddataall);

















          }else{




            axios.get("/api/Customers?searchTerm="+dataRow.cell_phone,config2).then(function (response) {

              if(i===y){
                setConvert("Done");
              }

              if(response.data.customers.length>0){

             //   console.log("Phone Number foune");








           //     console.log("Applying Algo");




                if(dataRow.name!=='name'){
                
              //    console.log("Applying Algo");
                
                
                  var formateddate = moment(dataRow.date_added).format('MM/DD/YYYY');
                  var datesplit =[];
                  if(dataRow.birthdate!==undefined){
                  
                   datesplit= dataRow.birthdate.split('/');
                  }
                
                
                  var dateofbirth=dataRow.birthdate;
                  if(datesplit.length>2){
                    dateofbirth=datesplit[1]+"/"+datesplit[2]+"/"+datesplit[0];
                  }
                
                  var addedDate = moment(new Date()).format('MM/DD/YYYY');
                
                
                  var npID =[];
                  if(dataRow.netSuiteID!== undefined){
                
                    npID=dataRow.netSuiteID.split(',');
                    npID=npID[0].split('-');
                    npID=npID[0].split('.');
                    npID=npID[0].split('’');
                    
                  
                
                  npID=npID[0].trim();
                  }
                
                  if(dataRow.name!=='name'){
                
                    
                
                      const myArray = dataRow.name.split(" ");
                
                     // console.log("Name");
                     // console.log(myArray);
                     // console.log(myArray[2]);
                      let firstname ="";
                      var lastname="";
                
                      let lastnamedual="";
                
                      var nearby="";
                
                    //  console.log("Nearby Clinics");
                
                      nearbyClinics.map( record => {
                    
                        if(record.zipcode === dataRow.zipcode){
                          nearby=record.location;
                        }
                      
                      
                      });
                
                     // console.log(nearby);
                
                
                
                
                
                     
                
                      if(myArray.length===1){
                             
                        firstname =myArray[0];
                        lastname="";
                
                       }else if(myArray.length===2){
                
                        firstname =myArray[0];
                        lastname =myArray[1];
                
                       }else if(myArray.length===3){
                           firstname =myArray[0];
                           lastname =myArray[1]+" "+myArray[2];
                
                       }else if(myArray.length===4){
                        firstname =myArray[0];
                        lastname =myArray[1]+" "+myArray[2]+" "+myArray[3];
                
                    }else{
                      firstname =myArray[0];
                      lastname =myArray[1]+" "+myArray[2]+" "+myArray[3]+" "+myArray[5];
                    }
                      
                       var chart ="’";
                       lastname.replace(chart,"'");
                
                     
                
                      if(states[dataRow.state]){
                        lastname=lastname+" - " +states[dataRow.state];
                  
                
                      }else{
                        lastname=lastname;
                    
                      }
                
                      lastnamedual=lastname;
                
                      var apt_type="";
                      
                
                      if(dataRow.apptTypeNeeded.toUpperCase()==="MENTAL"| dataRow.apptTypeNeeded.toUpperCase()==="PTSD"){
                        lastname=lastname+" - PSYCH";
                        apt_type="Mental Evaluation"
                      }
                     else if(dataRow.apptTypeNeeded.toUpperCase()==="DUAL"){
                
                        lastname=lastname+" - PSYCH";
                        apt_type="Mental Evaluation"
                      
                       }
                
                      const dbqs = dataRow.disabilities.split(";");
                      let dpb1,dpb2,dpb3,dpb4,dpb5,dpb6,dpb7,dpb8,dpb9,
                      dpb10="";

                      console.log("dbqs");
                      console.log(dbqs);
                     
                      if(dpb1.startsWith("PTSD") |dpb2.startsWith("PTSD") |dpb3.startsWith("PTSD") |dpb4.startsWith("PTSD") |dpb5.startsWith("PTSD") |dpb6.startsWith("PTSD") |dpb7.startsWith("PTSD") |dpb8.startsWith("PTSD") |dpb9.startsWith("PTSD") |dpb10.startsWith("PTSD") ){
                        lastname=lastname+" - PSYCH";
                        apt_type="Mental Evaluation"
                      }
                
                
                      if(dbqs.length===1){
                        if(apt_type!=="Mental Evaluation"){
                          apt_type="DBQ Evaluation"
                        }
                        
                          dpb1=dbqs[0].trim();
                      }else if(dbqs.length==2){
                
                   if(apt_type!=="Mental Evaluation"){
                          apt_type="DBQ Evaluation"
                        }
                        
                          dpb1=dbqs[0].trim();
                          dpb2=dbqs[1].trim();
                
                      }else if(dbqs.length===3){
                        if(apt_type!=="Mental Evaluation"){
                          apt_type="DBQ Evaluation"
                        }
                        
                          dpb1=dbqs[0].trim();
                          dpb2=dbqs[1].trim();
                          dpb3=dbqs[2].trim();
                       
                
                      }else if(dbqs.length===4){
                        if(apt_type!=="Mental Evaluation"){
                          apt_type="DBQ Evaluation"
                        }
                        
                          dpb1=dbqs[0].trim();
                          dpb2=dbqs[1].trim();
                          dpb3=dbqs[2].trim();
                          dpb4=dbqs[3].trim();
                
                      }else if(dbqs.length===5){
                
                        if(apt_type!=="Mental Evaluation"){
                          apt_type="DBQ Medical Evaluation"
                        }
                        
                          dpb1=dbqs[0].trim();
                          dpb2=dbqs[1].trim();
                          dpb3=dbqs[2].trim();
                          dpb4=dbqs[3].trim();
                          dpb5=dbqs[4].trim();
                
                      }else if(dbqs.length===6){
                        if(apt_type!=="Mental Evaluation"){
                          apt_type="DBQ Medical Evaluation"
                        }
                          dpb1=dbqs[0].trim();
                          dpb2=dbqs[1].trim();
                          dpb3=dbqs[2].trim();
                          dpb4=dbqs[3].trim();
                          dpb5=dbqs[4].trim();
                          dpb6=dbqs[5].trim();
                
                      }else if(dbqs.length===7){
                        if(apt_type!=="Mental Evaluation"){
                          apt_type="DBQ Evaluation Prolonged"
                        }
                          dpb1=dbqs[0].trim();
                          dpb2=dbqs[1].trim();
                          dpb3=dbqs[2].trim();
                          dpb4=dbqs[3].trim();
                          dpb5=dbqs[4].trim();
                          dpb6=dbqs[5].trim();
                          dpb7=dbqs[6].trim();
                
                      }else if(dbqs.length===8){
                        if(apt_type!=="Mental Evaluation"){
                          apt_type="DBQ Evaluation Prolonged"
                        }
                          dpb1=dbqs[0].trim();
                          dpb2=dbqs[1].trim();
                          dpb3=dbqs[2].trim();
                          dpb4=dbqs[3].trim();
                          dpb5=dbqs[4].trim();
                          dpb6=dbqs[5].trim();
                          dpb7=dbqs[6].trim();
                          dpb8=dbqs[7].trim();
                
                      }else if(dbqs.length===9){
                        if(apt_type!=="Mental Evaluation"){
                          apt_type="DBQ Evaluation Prolonged"
                        }
                          dpb1=dbqs[0].trim();
                          dpb2=dbqs[1].trim();
                          dpb3=dbqs[2].trim();
                          dpb4=dbqs[3].trim();
                          dpb5=dbqs[4].trim();
                          dpb6=dbqs[5].trim();
                          dpb7=dbqs[6].trim();
                          dpb8=dbqs[7].trim();
                          dpb9=dbqs[8].trim();
                
                      }else if(dbqs.length===10){
                        if(apt_type!=="Mental Evaluation"){
                          apt_type="DBQ Evaluation Prolonged"
                        }
                          dpb1=dbqs[0].trim();
                          dpb2=dbqs[1].trim();
                          dpb3=dbqs[2].trim();
                          dpb4=dbqs[3].trim();
                          dpb5=dbqs[4].trim();
                          dpb6=dbqs[5].trim();
                          dpb7=dbqs[6].trim();
                          dpb8=dbqs[7].trim();
                          dpb9=dbqs[8].trim();
                          dpb10=dbqs[9].trim();
                
                      }else if(dbqs.length===11){
                        if(apt_type!=="Mental Evaluation"){
                          apt_type="DBQ Evaluation Prolonged"
                        }
                          dpb1=dbqs[0].trim();
                          dpb2=dbqs[1].trim();
                          dpb3=dbqs[2].trim();
                          dpb4=dbqs[3].trim();
                          dpb5=dbqs[4].trim();
                          dpb6=dbqs[5].trim();
                          dpb7=dbqs[6].trim();
                          dpb8=dbqs[7].trim();
                          dpb9=dbqs[8].trim();
                          dpb10=dbqs[9].trim() +";"+dbqs[10].trim();
                
                      }else if(dbqs.length===12){
                        if(apt_type!=="Mental Evaluation"){
                          apt_type="DBQ Evaluation Prolonged"
                        }
                          dpb1=dbqs[0].trim();
                          dpb2=dbqs[1].trim();
                          dpb3=dbqs[2].trim();
                          dpb4=dbqs[3].trim();
                          dpb5=dbqs[4].trim();
                          dpb6=dbqs[5].trim();
                          dpb7=dbqs[6].trim();
                          dpb8=dbqs[7].trim();
                          dpb9=dbqs[8].trim();
                          dpb10=dbqs[9].trim() +";"+dbqs[10].trim()+";"+dbqs[11].trim();
                
                      }
                
                
                      
                
                     
                //remove space from list of DBQs
                //Oâ€™Rourke
                //O'Rourke

                
                if(dataRow.apptTypeNeeded.toUpperCase()==="DUAL"){
                
                  if(dpb1.startsWith("PTSD") |dpb2.startsWith("PTSD") |dpb3.startsWith("PTSD") |dpb4.startsWith("PTSD") |dpb5.startsWith("PTSD") |dpb6.startsWith("PTSD") |dpb7.startsWith("PTSD") |dpb8.startsWith("PTSD") |dpb9.startsWith("PTSD") |dpb10.startsWith("PTSD") ){
                    dpb1='PTSD';
                    dpb2='';
                    dpb3='';
                    dpb4='';
                    dpb5='';
                    dpb6='';
                    dpb7='';
                    dpb8='';
                    dpb9='';
                    dpb10='';
                  }else{
                    dpb1='Mental';
                    dpb2='';
                    dpb3='';
                    dpb4='';
                    dpb5='';
                    dpb6='';
                    dpb7='';
                    dpb8='';
                    dpb9='';
                    dpb10='';
                  }
                
                
                  if(dpb1.startsWith("PTSD") & dpb2!==""){
                    dpb1=dpb2;
                    dpb2=dpb3;
                    dpb3=dpb4;
                    dpb4=dpb5;
                    dpb5=dpb6;
                    dpb6=dpb7;
                    dpb7=dpb8;
                    dpb8=dpb9;
                    dpb9=dpb10;
                  }else if(dpb2.startsWith("PTSD")){
                
                    dpb2=dpb3;
                    dpb3=dpb4;
                    dpb4=dpb5;
                    dpb5=dpb6;
                    dpb6=dpb7;
                    dpb7=dpb8;
                    dpb8=dpb9;
                    dpb9=dpb10;
                  }else if(dpb3.startsWith("PTSD")){
                
                    dpb3=dpb4;
                    dpb4=dpb5;
                    dpb5=dpb6;
                    dpb6=dpb7;
                    dpb7=dpb8;
                    dpb8=dpb9;
                    dpb9=dpb10;
                  }else if(dpb4.startsWith("PTSD")){
                
                    dpb4=dpb5;
                    dpb5=dpb6;
                    dpb6=dpb7;
                    dpb7=dpb8;
                    dpb8=dpb9;
                    dpb9=dpb10;
                  }else if(dpb5.startsWith("PTSD")){
                    dpb5=dpb6;
                    dpb6=dpb7;
                    dpb7=dpb8;
                    dpb8=dpb9;
                    dpb9=dpb10;
                  }else if(dpb6.startsWith("PTSD")){
                    dpb6=dpb7;
                    dpb7=dpb8;
                    dpb8=dpb9;
                    dpb9=dpb10;
                  }else if(dpb7.startsWith("PTSD")){
                    dpb7=dpb8;
                    dpb8=dpb9;
                    dpb9=dpb10;
                  }else if(dpb8.startsWith("PTSD")){
                    dpb8=dpb9;
                    dpb9=dpb10;
                  }else if(dpb9.startsWith("PTSD")){
                    dpb9=dpb10;
                  }
                
console.log(moment(response.data.customers[0].lastBookingDate).format("MM-DD-YYYY hh:mm A"))
var aptdatetime = response.data.customers[0].numberOfBookings>0?moment(response.data.customers[0].lastBookingDate).format("MM-DD-YYYY hh:mm A"):"NO Past APT";

                founddataall= [...founddataall,{id:index2,lastapttime:aptdatetime, closestclinic:nearby,dateadded:addedDate,createdAt:formateddate.toString(),upid:dataRow.netSuiteID,appointmenttype:apt_type,bdq1:dpb1,bdq2:dpb2,bdq3:dpb3,bdq4:dpb4,bdq5:dpb5,bdq6:dpb6,bdq7:dpb7,bdq9:dpb9,bdq8:dpb8,bdq10:dpb10,firstname: firstname, lastname: lastname, netsuitid: npID,phone:dataRow.cell_phone,email:dataRow.email,gender:dataRow.gender,birthdate:dateofbirth,city:dataRow.city,state:dataRow.state,zipcode:dataRow.zipcode,dateNP:formateddate,apptTypeNeeded:dataRow.apptTypeNeeded,disabilities:dataRow.disabilities}];
                index2++;
                
                
                
                }else{
                  // if(dpb1==="PTSD"  & dpb2!==""){
                  //   dpb1=dpb2;
                  //   dpb2=dpb3;
                  //   dpb3=dpb4;
                  //   dpb4=dpb5;
                  //   dpb5=dpb6;
                  //   dpb6=dpb7;
                  //   dpb7=dpb8;
                  //   dpb8=dpb9;
                  //   dpb9=dpb10;
                  // }else if(dpb2==="PTSD"){
                
                  //   dpb2=dpb3;
                  //   dpb3=dpb4;
                  //   dpb4=dpb5;
                  //   dpb5=dpb6;
                  //   dpb6=dpb7;
                  //   dpb7=dpb8;
                  //   dpb8=dpb9;
                  //   dpb9=dpb10;
                  // }else if(dpb3==="PTSD"){
                
                  //   dpb3=dpb4;
                  //   dpb4=dpb5;
                  //   dpb5=dpb6;
                  //   dpb6=dpb7;
                  //   dpb7=dpb8;
                  //   dpb8=dpb9;
                  //   dpb9=dpb10;
                  // }else if(dpb4==="PTSD"){
                
                  //   dpb4=dpb5;
                  //   dpb5=dpb6;
                  //   dpb6=dpb7;
                  //   dpb7=dpb8;
                  //   dpb8=dpb9;
                  //   dpb9=dpb10;
                  // }else if(dpb5==="PTSD"){
                  //   dpb5=dpb6;
                  //   dpb6=dpb7;
                  //   dpb7=dpb8;
                  //   dpb8=dpb9;
                  //   dpb9=dpb10;
                  // }else if(dpb6==="PTSD"){
                  //   dpb6=dpb7;
                  //   dpb7=dpb8;
                  //   dpb8=dpb9;
                  //   dpb9=dpb10;
                  // }else if(dpb7==="PTSD"){
                  //   dpb7=dpb8;
                  //   dpb8=dpb9;
                  //   dpb9=dpb10;
                  // }else if(dpb8==="PTSD"){
                  //   dpb8=dpb9;
                  //   dpb9=dpb10;
                  // }else if(dpb9==="PTSD"){
                  //   dpb9=dpb10;
                 // }
                  
console.log(moment(response.data.customers[0].lastBookingDate).format("MM-DD-YYYY hh:mm A"))
var aptdatetime = response.data.customers[0].numberOfBookings>0?moment(response.data.customers[0].lastBookingDate).format("MM-DD-YYYY hh:mm A"):"NO Past APT";

                  founddataall=[...founddataall,{id:index2, lastapttime:aptdatetime,closestclinic:nearby,dateadded:addedDate,createdAt:formateddate.toString(),upid:dataRow.netSuiteID,appointmenttype:apt_type,bdq1:dpb1,bdq2:dpb2,bdq3:dpb3,bdq4:dpb4,bdq5:dpb5,bdq6:dpb6,bdq7:dpb7,bdq9:dpb9,bdq8:dpb8,bdq10:dpb10, firstname: firstname, lastname: lastname, netsuitid: npID,phone:dataRow.cell_phone,email:dataRow.email,gender:dataRow.gender,birthdate:dateofbirth,city:dataRow.city,state:dataRow.state,zipcode:dataRow.zipcode,dateNP:formateddate,apptTypeNeeded:dataRow.apptTypeNeeded,disabilities:dataRow.disabilities}];
                  index2++;
                
                }
                
                
                
                
                  if(dataRow.apptTypeNeeded.toUpperCase()==="DUAL"){
                    apt_type="Physical";
                    lastname = lastnamedual;
                
                
                    var filtered = dbqs.filter(function(value, index, arr){ 
                      return (!value.startsWith(' Mental') && !value.startsWith('PTSD'));
                  });
                
                
                  var filtered2 = filtered.filter(function(value, index, arr){ 
                    return (!value.startsWith(' Mental') && !value.startsWith('PTSD'));
                });
                
                
                
                
                    if(filtered2.length===1){
                      if(apt_type!=="Mental Evaluation"){
                        apt_type="DBQ Evaluation"
                      }
                      
                        dpb1=filtered2[0].trim();
                    }else if(filtered2.length==2){
                
                 if(apt_type!=="Mental Evaluation"){
                        apt_type="DBQ Evaluation"
                      }
                      
                        dpb1=filtered2[0].trim();
                        dpb2=filtered2[1].trim();
                
                    }else if(filtered2.length===3){
                      if(apt_type!=="Mental Evaluation"){
                        apt_type="DBQ Evaluation"
                      }
                      
                        dpb1=filtered2[0].trim();
                        dpb2=filtered2[1].trim();
                        dpb3=filtered2[2].trim();
                     
                
                    }else if(filtered2.length===4){
                      if(apt_type!=="Mental Evaluation"){
                        apt_type="DBQ Evaluation"
                      }
                      
                        dpb1=filtered2[0].trim();
                        dpb2=filtered2[1].trim();
                        dpb3=filtered2[2].trim();
                        dpb4=filtered2[3].trim();
                
                    }else if(filtered2.length===5){
                
                      if(apt_type!=="Mental Evaluation"){
                        apt_type="DBQ Medical Evaluation"
                      }
                      
                        dpb1=filtered2[0].trim();
                        dpb2=filtered2[1].trim();
                        dpb3=filtered2[2].trim();
                        dpb4=filtered2[3].trim();
                        dpb5=filtered2[4].trim();
                
                    }else if(filtered2.length===6){
                      if(apt_type!=="Mental Evaluation"){
                        apt_type="DBQ Medical Evaluation"
                      }
                        dpb1=filtered2[0].trim();
                        dpb2=filtered2[1].trim();
                        dpb3=filtered2[2].trim();
                        dpb4=filtered2[3].trim();
                        dpb5=filtered2[4].trim();
                        dpb6=filtered2[5].trim();
                
                    }else if(filtered2.length===7){
                      if(apt_type!=="Mental Evaluation"){
                        apt_type="DBQ Evaluation Prolonged"
                      }
                        dpb1=filtered2[0].trim();
                        dpb2=filtered2[1].trim();
                        dpb3=filtered2[2].trim();
                        dpb4=filtered2[3].trim();
                        dpb5=filtered2[4].trim();
                        dpb6=filtered2[5].trim();
                        dpb7=filtered2[6].trim();
                
                    }else if(filtered2.length===8){
                      if(apt_type!=="Mental Evaluation"){
                        apt_type="DBQ Evaluation Prolonged"
                      }
                        dpb1=filtered2[0].trim();
                        dpb2=filtered2[1].trim();
                        dpb3=filtered2[2].trim();
                        dpb4=filtered2[3].trim();
                        dpb5=filtered2[4].trim();
                        dpb6=filtered2[5].trim();
                        dpb7=filtered2[6].trim();
                        dpb8=filtered2[7].trim();
                
                    }else if(filtered2.length===9){
                      if(apt_type!=="Mental Evaluation"){
                        apt_type="DBQ Evaluation Prolonged"
                      }
                        dpb1=filtered2[0].trim();
                        dpb2=filtered2[1].trim();
                        dpb3=filtered2[2].trim();
                        dpb4=filtered2[3].trim();
                        dpb5=filtered2[4].trim();
                        dpb6=filtered2[5].trim();
                        dpb7=filtered2[6].trim();
                        dpb8=filtered2[7].trim();
                        dpb9=filtered2[8].trim();
                
                    }else if(filtered2.length===10){
                      if(apt_type!=="Mental Evaluation"){
                        apt_type="DBQ Evaluation Prolonged"
                      }
                        dpb1=filtered2[0].trim();
                        dpb2=filtered2[1].trim();
                        dpb3=filtered2[2].trim();
                        dpb4=filtered2[3].trim();
                        dpb5=filtered2[4].trim();
                        dpb6=filtered2[5].trim();
                        dpb7=filtered2[6].trim();
                        dpb8=filtered2[7].trim();
                        dpb9=filtered2[8].trim();
                        dpb10=filtered2[9].trim();
                
                    }
                    if(dpb1.startsWith("PTSD")  & dpb2!==""){
                      dpb1=dpb2;
                      dpb2=dpb3;
                      dpb3=dpb4;
                      dpb4=dpb5;
                      dpb5=dpb6;
                      dpb6=dpb7;
                      dpb7=dpb8;
                      dpb8=dpb9;
                      dpb9=dpb10;
                    }else if(dpb2.startsWith("PTSD")){
                  
                      dpb2=dpb3;
                      dpb3=dpb4;
                      dpb4=dpb5;
                      dpb5=dpb6;
                      dpb6=dpb7;
                      dpb7=dpb8;
                      dpb8=dpb9;
                      dpb9=dpb10;
                    }else if(dpb3.startsWith("PTSD")){
                  
                      dpb3=dpb4;
                      dpb4=dpb5;
                      dpb5=dpb6;
                      dpb6=dpb7;
                      dpb7=dpb8;
                      dpb8=dpb9;
                      dpb9=dpb10;
                    }else if(dpb4.startsWith("PTSD")){
                  
                      dpb4=dpb5;
                      dpb5=dpb6;
                      dpb6=dpb7;
                      dpb7=dpb8;
                      dpb8=dpb9;
                      dpb9=dpb10;
                    }else if(dpb5.startsWith("PTSD")){
                      dpb5=dpb6;
                      dpb6=dpb7;
                      dpb7=dpb8;
                      dpb8=dpb9;
                      dpb9=dpb10;
                    }else if(dpb6.startsWith("PTSD")){
                      dpb6=dpb7;
                      dpb7=dpb8;
                      dpb8=dpb9;
                      dpb9=dpb10;
                    }else if(dpb7.startsWith("PTSD")){
                      dpb7=dpb8;
                      dpb8=dpb9;
                      dpb9=dpb10;
                    }else if(dpb8.startsWith("PTSD")){
                      dpb8=dpb9;
                      dpb9=dpb10;
                    }else if(dpb9.startsWith("PTSD")){
                      dpb9=dpb10;
                    }
                  
var aptdatetime = response.data.customers[0].numberOfBookings>0?moment(response.data.customers[0].lastBookingDate).format("MM-DD-YYYY hh:mm A"):"NO Past APT";

                    founddataall[index2]= {id:index2,lastapttime:aptdatetime, closestclinic:nearby,dateadded:addedDate,createdAt:dataRow.date_added,upid:dataRow.netSuiteID,appointmenttype:apt_type,bdq1:dpb1,bdq2:dpb2,bdq3:dpb3,bdq4:dpb4,bdq5:dpb5,bdq6:dpb6,bdq7:dpb7,bdq9:dpb9,bdq8:dpb8,bdq10:dpb10,id: index2, firstname: firstname, lastname: lastname, netsuitid: npID,phone:dataRow.cell_phone,email:dataRow.email,gender:dataRow.gender,birthdate:dateofbirth,city:dataRow.city,state:dataRow.state,zipcode:dataRow.zipcode,dateNP:formateddate.toString(),apptTypeNeeded:dataRow.apptTypeNeeded,disabilities:dataRow.disabilities};
                    index2++;
                   }
                
                  }
                }
                
                
                
                
                
                
                
                
              //  console.log("founddataall");
              //  console.log(founddataall);
                setFoundData(founddataall);
                
                











              }else{




                arrayofnotfound[notfound]=[dataRow[0],dataRow.name,dataRow[2],dataRow[3],dataRow[4],dataRow[5],dataRow[6],dataRow[7],dataRow[8],dataRow[9],dataRow[10],dataRow[11],dataRow[12]];
                notfound++;
             
               // console.log("Not found Users in flexbooker:                                                 Not Found");
               // console.log(arrayofnotfound);
                
             //   setNotFoundUsers(arrayofnotfound);
    


        



                //console.log("Applying Algo");




                if(dataRow.name!=='name'){
    
                 // console.log("Applying Algo");
    
    
                  var formateddate = moment(dataRow.date_added).format('MM/DD/YYYY');
                  var datesplit =[];
                  if(dataRow.birthdate!==undefined){
                  
                   datesplit= dataRow.birthdate.split('-');
                  }
              
              
                  var dateofbirth=dataRow.birthdate;
                  if(datesplit.length>2){
                    dateofbirth=datesplit[1]+"/"+datesplit[2]+"/"+datesplit[0];
                  }
              
                  var addedDate = moment(new Date()).format('MM/DD/YYYY');
               
              
                  var npID =[];
                  if(dataRow.netSuiteID!== undefined){
              
                    npID=dataRow.netSuiteID.split(',');
                    npID=npID[0].split('-');
                    npID=npID[0].split('.');
                    npID=npID[0].split('’');
                    
                  
              
                  npID=npID[0].trim();
                  }
              
                  if(dataRow.name!=='name'){
              
                    
              
                      const myArray = dataRow.name.split(" ");
              
                     // console.log("Name");
                     // console.log(myArray);
                     // console.log(myArray[2]);
                      let firstname ="";
                      var lastname="";
              
                      let lastnamedual="";
              
                      var nearby="";
    
                     // console.log("Nearby Clinics");
              
                      nearbyClinics.map( record => {
                    
                        if(record.zipcode === dataRow.zipcode){
                          nearby=record.location;
                        }
                      
                      
                      });
    
                     // console.log(nearby);
              
    
    
              
              
                     
              
                      if(myArray.length===1){
                             
                        firstname =myArray[0];
                        lastname="";
               
                       }else if(myArray.length===2){
               
                        firstname =myArray[0];
                        lastname =myArray[1];
               
                       }else if(myArray.length===3){
                           firstname =myArray[0];
                           lastname =myArray[1]+" "+myArray[2];
               
                       }else if(myArray.length===4){
                        firstname =myArray[0];
                        lastname =myArray[1]+" "+myArray[2]+" "+myArray[3];
              
                    }else{
                      firstname =myArray[0];
                      lastname =myArray[1]+" "+myArray[2]+" "+myArray[3]+" "+myArray[5];
                    }
                      
                       var chart ="’";
                       lastname.replace(chart,"'");
              
                     
              
                      if(states[dataRow.state]){
                        lastname=lastname+" - " +states[dataRow.state];
                  
              
                      }else{
                        lastname=lastname;
                    
                      }
              
                      lastnamedual=lastname;
              
                      var apt_type="";
                      
              
                      if(dataRow.apptTypeNeeded.toUpperCase()==="MENTAL"){
                        lastname=lastname+" - PSYCH";
                        apt_type="Mental Evaluation"
                      }
                     else if(dataRow.apptTypeNeeded.toUpperCase()==="DUAL"){
              
                        lastname=lastname+" - PSYCH";
                        apt_type="Mental Evaluation"
                      
                       }
              
                      const dbqs = dataRow.disabilities.split(";");
                      let dpb1,dpb2,dpb3,dpb4,dpb5,dpb6,dpb7,dpb8,dpb9,
                      dpb10="";
                      if(dpb1.startsWith("PTSD") |dpb2.startsWith("PTSD") |dpb3.startsWith("PTSD") |dpb4.startsWith("PTSD") |dpb5.startsWith("PTSD") |dpb6.startsWith("PTSD") |dpb7.startsWith("PTSD") |dpb8.startsWith("PTSD") |dpb9.startsWith("PTSD") |dpb10.startsWith("PTSD") ){
                        lastname=lastname+" - PSYCH";
                        apt_type="Mental Evaluation"
                      }
                      if(dbqs.length===1){
                        if(apt_type!=="Mental Evaluation"){
                          apt_type="DBQ Evaluation"
                        }
                        
                          dpb1=dbqs[0].trim();
                      }else if(dbqs.length==2){
              
                   if(apt_type!=="Mental Evaluation"){
                          apt_type="DBQ Evaluation"
                        }
                        
                          dpb1=dbqs[0].trim();
                          dpb2=dbqs[1].trim();
              
                      }else if(dbqs.length===3){
                        if(apt_type!=="Mental Evaluation"){
                          apt_type="DBQ Evaluation"
                        }
                        
                          dpb1=dbqs[0].trim();
                          dpb2=dbqs[1].trim();
                          dpb3=dbqs[2].trim();
                       
              
                      }else if(dbqs.length===4){
                        if(apt_type!=="Mental Evaluation"){
                          apt_type="DBQ Evaluation"
                        }
                        
                          dpb1=dbqs[0].trim();
                          dpb2=dbqs[1].trim();
                          dpb3=dbqs[2].trim();
                          dpb4=dbqs[3].trim();
              
                      }else if(dbqs.length===5){
              
                        if(apt_type!=="Mental Evaluation"){
                          apt_type="DBQ Medical Evaluation"
                        }
                        
                          dpb1=dbqs[0].trim();
                          dpb2=dbqs[1].trim();
                          dpb3=dbqs[2].trim();
                          dpb4=dbqs[3].trim();
                          dpb5=dbqs[4].trim();
              
                      }else if(dbqs.length===6){
                        if(apt_type!=="Mental Evaluation"){
                          apt_type="DBQ Medical Evaluation"
                        }
                          dpb1=dbqs[0].trim();
                          dpb2=dbqs[1].trim();
                          dpb3=dbqs[2].trim();
                          dpb4=dbqs[3].trim();
                          dpb5=dbqs[4].trim();
                          dpb6=dbqs[5].trim();
              
                      }else if(dbqs.length===7){
                        if(apt_type!=="Mental Evaluation"){
                          apt_type="DBQ Evaluation Prolonged"
                        }
                          dpb1=dbqs[0].trim();
                          dpb2=dbqs[1].trim();
                          dpb3=dbqs[2].trim();
                          dpb4=dbqs[3].trim();
                          dpb5=dbqs[4].trim();
                          dpb6=dbqs[5].trim();
                          dpb7=dbqs[6].trim();
              
                      }else if(dbqs.length===8){
                        if(apt_type!=="Mental Evaluation"){
                          apt_type="DBQ Evaluation Prolonged"
                        }
                          dpb1=dbqs[0].trim();
                          dpb2=dbqs[1].trim();
                          dpb3=dbqs[2].trim();
                          dpb4=dbqs[3].trim();
                          dpb5=dbqs[4].trim();
                          dpb6=dbqs[5].trim();
                          dpb7=dbqs[6].trim();
                          dpb8=dbqs[7].trim();
              
                      }else if(dbqs.length===9){
                        if(apt_type!=="Mental Evaluation"){
                          apt_type="DBQ Evaluation Prolonged"
                        }
                          dpb1=dbqs[0].trim();
                          dpb2=dbqs[1].trim();
                          dpb3=dbqs[2].trim();
                          dpb4=dbqs[3].trim();
                          dpb5=dbqs[4].trim();
                          dpb6=dbqs[5].trim();
                          dpb7=dbqs[6].trim();
                          dpb8=dbqs[7].trim();
                          dpb9=dbqs[8].trim();
              
                      }else if(dbqs.length===10){
                        if(apt_type!=="Mental Evaluation"){
                          apt_type="DBQ Evaluation Prolonged"
                        }
                          dpb1=dbqs[0].trim();
                          dpb2=dbqs[1].trim();
                          dpb3=dbqs[2].trim();
                          dpb4=dbqs[3].trim();
                          dpb5=dbqs[4].trim();
                          dpb6=dbqs[5].trim();
                          dpb7=dbqs[6].trim();
                          dpb8=dbqs[7].trim();
                          dpb9=dbqs[8].trim();
                          dpb10=dbqs[9].trim();
              
                      }else if(dbqs.length===11){
                        if(apt_type!=="Mental Evaluation"){
                          apt_type="DBQ Evaluation Prolonged"
                        }
                          dpb1=dbqs[0].trim();
                          dpb2=dbqs[1].trim();
                          dpb3=dbqs[2].trim();
                          dpb4=dbqs[3].trim();
                          dpb5=dbqs[4].trim();
                          dpb6=dbqs[5].trim();
                          dpb7=dbqs[6].trim();
                          dpb8=dbqs[7].trim();
                          dpb9=dbqs[8].trim();
                          dpb10=dbqs[9].trim() +";"+dbqs[10].trim();
                
                      }else if(dbqs.length===12){
                        if(apt_type!=="Mental Evaluation"){
                          apt_type="DBQ Evaluation Prolonged"
                        }
                          dpb1=dbqs[0].trim();
                          dpb2=dbqs[1].trim();
                          dpb3=dbqs[2].trim();
                          dpb4=dbqs[3].trim();
                          dpb5=dbqs[4].trim();
                          dpb6=dbqs[5].trim();
                          dpb7=dbqs[6].trim();
                          dpb8=dbqs[7].trim();
                          dpb9=dbqs[8].trim();
                          dpb10=dbqs[9].trim() +";"+dbqs[10].trim()+";"+dbqs[11].trim();
                
                      }
              
              
                      
                
                     
              //remove space from list of DBQs
              //Oâ€™Rourke
              //O'Rourke
              
              
              if(dataRow.apptTypeNeeded.toUpperCase()==="DUAL"){
              
                if(dpb1.startsWith("PTSD") |dpb2.startsWith("PTSD") |dpb3.startsWith("PTSD") |dpb4.startsWith("PTSD") |dpb5.startsWith("PTSD") |dpb6.startsWith("PTSD") |dpb7.startsWith("PTSD") |dpb8.startsWith("PTSD") |dpb9.startsWith("PTSD") |dpb10.startsWith("PTSD") ){
                  dpb1='PTSD';
                  dpb2='';
                  dpb3='';
                  dpb4='';
                  dpb5='';
                  dpb6='';
                  dpb7='';
                  dpb8='';
                  dpb9='';
                  dpb10='';
                }else{
                  dpb1='Mental';
                  dpb2='';
                  dpb3='';
                  dpb4='';
                  dpb5='';
                  dpb6='';
                  dpb7='';
                  dpb8='';
                  dpb9='';
                  dpb10='';
                }
              
              
                if(dpb1.startsWith("PTSD") & dpb2!==""){
                  dpb1=dpb2;
                  dpb2=dpb3;
                  dpb3=dpb4;
                  dpb4=dpb5;
                  dpb5=dpb6;
                  dpb6=dpb7;
                  dpb7=dpb8;
                  dpb8=dpb9;
                  dpb9=dpb10;
                }else if(dpb2.startsWith("PTSD")){
              
                  dpb2=dpb3;
                  dpb3=dpb4;
                  dpb4=dpb5;
                  dpb5=dpb6;
                  dpb6=dpb7;
                  dpb7=dpb8;
                  dpb8=dpb9;
                  dpb9=dpb10;
                }else if(dpb3.startsWith("PTSD")){
              
                  dpb3=dpb4;
                  dpb4=dpb5;
                  dpb5=dpb6;
                  dpb6=dpb7;
                  dpb7=dpb8;
                  dpb8=dpb9;
                  dpb9=dpb10;
                }else if(dpb4.startsWith("PTSD")){
              
                  dpb4=dpb5;
                  dpb5=dpb6;
                  dpb6=dpb7;
                  dpb7=dpb8;
                  dpb8=dpb9;
                  dpb9=dpb10;
                }else if(dpb5.startsWith("PTSD")){
                  dpb5=dpb6;
                  dpb6=dpb7;
                  dpb7=dpb8;
                  dpb8=dpb9;
                  dpb9=dpb10;
                }else if(dpb6.startsWith("PTSD")){
                  dpb6=dpb7;
                  dpb7=dpb8;
                  dpb8=dpb9;
                  dpb9=dpb10;
                }else if(dpb7.startsWith("PTSD")){
                  dpb7=dpb8;
                  dpb8=dpb9;
                  dpb9=dpb10;
                }else if(dpb8.startsWith("PTSD")){
                  dpb8=dpb9;
                  dpb9=dpb10;
                }else if(dpb9.startsWith("PTSD")){
                  dpb9=dpb10;
                }
                
                  viewdata= [...viewdata,{id:index, closestclinic:nearby,dateadded:addedDate,createdAt:formateddate.toString(),upid:dataRow.netSuiteID,appointmenttype:apt_type,bdq1:dpb1,bdq2:dpb2,bdq3:dpb3,bdq4:dpb4,bdq5:dpb5,bdq6:dpb6,bdq7:dpb7,bdq9:dpb9,bdq8:dpb8,bdq10:dpb10, firstname: firstname, lastname: lastname, netsuitid: npID,phone:dataRow.cell_phone,email:dataRow.email,gender:dataRow.gender,birthdate:dateofbirth,city:dataRow.city,state:dataRow.state,zipcode:dataRow.zipcode,dateNP:formateddate,apptTypeNeeded:dataRow.apptTypeNeeded,disabilities:dataRow.disabilities}];
                  index++;
              
              }else{
                
              if(dataRow.apptTypeNeeded.toUpperCase()==="DUAL"){
                if(dpb1.startsWith("PTSD")  & dpb2!==""){
                  dpb1=dpb2;
                  dpb2=dpb3;
                  dpb3=dpb4;
                  dpb4=dpb5;
                  dpb5=dpb6;
                  dpb6=dpb7;
                  dpb7=dpb8;
                  dpb8=dpb9;
                  dpb9=dpb10;
                }else if(dpb2.startsWith("PTSD")){
              
                  dpb2=dpb3;
                  dpb3=dpb4;
                  dpb4=dpb5;
                  dpb5=dpb6;
                  dpb6=dpb7;
                  dpb7=dpb8;
                  dpb8=dpb9;
                  dpb9=dpb10;
                }else if(dpb3.startsWith("PTSD")){
              
                  dpb3=dpb4;
                  dpb4=dpb5;
                  dpb5=dpb6;
                  dpb6=dpb7;
                  dpb7=dpb8;
                  dpb8=dpb9;
                  dpb9=dpb10;
                }else if(dpb4.startsWith("PTSD")){
              
                  dpb4=dpb5;
                  dpb5=dpb6;
                  dpb6=dpb7;
                  dpb7=dpb8;
                  dpb8=dpb9;
                  dpb9=dpb10;
                }else if(dpb5.startsWith("PTSD")){
                  dpb5=dpb6;
                  dpb6=dpb7;
                  dpb7=dpb8;
                  dpb8=dpb9;
                  dpb9=dpb10;
                }else if(dpb6.startsWith("PTSD")){
                  dpb6=dpb7;
                  dpb7=dpb8;
                  dpb8=dpb9;
                  dpb9=dpb10;
                }else if(dpb7.startsWith("PTSD")){
                  dpb7=dpb8;
                  dpb8=dpb9;
                  dpb9=dpb10;
                }else if(dpb8.startsWith("PTSD")){
                  dpb8=dpb9;
                  dpb9=dpb10;
                }else if(dpb9.startsWith("PTSD")){
                  dpb9=dpb10;
                }
              }

    console.log("In Else");
    viewdata= [...viewdata,{ id:index,closestclinic:nearby,dateadded:addedDate,createdAt:formateddate.toString(),upid:dataRow.netSuiteID,appointmenttype:apt_type,bdq1:dpb1,bdq2:dpb2,bdq3:dpb3,bdq4:dpb4,bdq5:dpb5,bdq6:dpb6,bdq7:dpb7,bdq9:dpb9,bdq8:dpb8,bdq10:dpb10, firstname: firstname, lastname: lastname, netsuitid: npID,phone:dataRow.cell_phone,email:dataRow.email,gender:dataRow.gender,birthdate:dateofbirth,city:dataRow.city,state:dataRow.state,zipcode:dataRow.zipcode,dateNP:formateddate,apptTypeNeeded:dataRow.apptTypeNeeded,disabilities:dataRow.disabilities}];
      
    index++; 
                    
   


 
              
              }
              
              
              
              
                  if(dataRow.apptTypeNeeded.toUpperCase()==="DUAL"){
                    apt_type="Physical";
                    lastname = lastnamedual;
              
              
                    var filtered = dbqs.filter(function(value, index, arr){ 
                      return (value.startsWith(' Mental') && value.startsWith('PTSD'));
                  });
              
              
                  var filtered2 = filtered.filter(function(value, index, arr){ 
                    return (value.startsWith('Mental') && value.startsWith('PTSD'));
                });
              
              
                
              
                    if(filtered2.length===1){
                      if(apt_type!=="Mental Evaluation"){
                        apt_type="DBQ Evaluation"
                      }
                      
                        dpb1=filtered2[0].trim();
                    }else if(filtered2.length==2){
              
                 if(apt_type!=="Mental Evaluation"){
                        apt_type="DBQ Evaluation"
                      }
                      
                        dpb1=filtered2[0].trim();
                        dpb2=filtered2[1].trim();
              
                    }else if(filtered2.length===3){
                      if(apt_type!=="Mental Evaluation"){
                        apt_type="DBQ Evaluation"
                      }
                      
                        dpb1=filtered2[0].trim();
                        dpb2=filtered2[1].trim();
                        dpb3=filtered2[2].trim();
                     
              
                    }else if(filtered2.length===4){
                      if(apt_type!=="Mental Evaluation"){
                        apt_type="DBQ Evaluation"
                      }
                      
                        dpb1=filtered2[0].trim();
                        dpb2=filtered2[1].trim();
                        dpb3=filtered2[2].trim();
                        dpb4=filtered2[3].trim();
              
                    }else if(filtered2.length===5){
              
                      if(apt_type!=="Mental Evaluation"){
                        apt_type="DBQ Medical Evaluation"
                      }
                      
                        dpb1=filtered2[0].trim();
                        dpb2=filtered2[1].trim();
                        dpb3=filtered2[2].trim();
                        dpb4=filtered2[3].trim();
                        dpb5=filtered2[4].trim();
              
                    }else if(filtered2.length===6){
                      if(apt_type!=="Mental Evaluation"){
                        apt_type="DBQ Medical Evaluation"
                      }
                        dpb1=filtered2[0].trim();
                        dpb2=filtered2[1].trim();
                        dpb3=filtered2[2].trim();
                        dpb4=filtered2[3].trim();
                        dpb5=filtered2[4].trim();
                        dpb6=filtered2[5].trim();
              
                    }else if(filtered2.length===7){
                      if(apt_type!=="Mental Evaluation"){
                        apt_type="DBQ Evaluation Prolonged"
                      }
                        dpb1=filtered2[0].trim();
                        dpb2=filtered2[1].trim();
                        dpb3=filtered2[2].trim();
                        dpb4=filtered2[3].trim();
                        dpb5=filtered2[4].trim();
                        dpb6=filtered2[5].trim();
                        dpb7=filtered2[6].trim();
              
                    }else if(filtered2.length===8){
                      if(apt_type!=="Mental Evaluation"){
                        apt_type="DBQ Evaluation Prolonged"
                      }
                        dpb1=filtered2[0].trim();
                        dpb2=filtered2[1].trim();
                        dpb3=filtered2[2].trim();
                        dpb4=filtered2[3].trim();
                        dpb5=filtered2[4].trim();
                        dpb6=filtered2[5].trim();
                        dpb7=filtered2[6].trim();
                        dpb8=filtered2[7].trim();
              
                    }else if(filtered2.length===9){
                      if(apt_type!=="Mental Evaluation"){
                        apt_type="DBQ Evaluation Prolonged"
                      }
                        dpb1=filtered2[0].trim();
                        dpb2=filtered2[1].trim();
                        dpb3=filtered2[2].trim();
                        dpb4=filtered2[3].trim();
                        dpb5=filtered2[4].trim();
                        dpb6=filtered2[5].trim();
                        dpb7=filtered2[6].trim();
                        dpb8=filtered2[7].trim();
                        dpb9=filtered2[8].trim();
              
                    }else if(filtered2.length===10){
                      if(apt_type!=="Mental Evaluation"){
                        apt_type="DBQ Evaluation Prolonged"
                      }
                        dpb1=filtered2[0].trim();
                        dpb2=filtered2[1].trim();
                        dpb3=filtered2[2].trim();
                        dpb4=filtered2[3].trim();
                        dpb5=filtered2[4].trim();
                        dpb6=filtered2[5].trim();
                        dpb7=filtered2[6].trim();
                        dpb8=filtered2[7].trim();
                        dpb9=filtered2[8].trim();
                        dpb10=filtered2[9].trim();
              
                    }

                    if(dataRow.apptTypeNeeded.toUpperCase()==="DUAL"){
                      if(dpb1.startsWith("PTSD")  & dpb2!==""){
                        dpb1=dpb2;
                        dpb2=dpb3;
                        dpb3=dpb4;
                        dpb4=dpb5;
                        dpb5=dpb6;
                        dpb6=dpb7;
                        dpb7=dpb8;
                        dpb8=dpb9;
                        dpb9=dpb10;
                      }else if(dpb2.startsWith("PTSD")){
                    
                        dpb2=dpb3;
                        dpb3=dpb4;
                        dpb4=dpb5;
                        dpb5=dpb6;
                        dpb6=dpb7;
                        dpb7=dpb8;
                        dpb8=dpb9;
                        dpb9=dpb10;
                      }else if(dpb3.startsWith("PTSD")){
                    
                        dpb3=dpb4;
                        dpb4=dpb5;
                        dpb5=dpb6;
                        dpb6=dpb7;
                        dpb7=dpb8;
                        dpb8=dpb9;
                        dpb9=dpb10;
                      }else if(dpb4.startsWith("PTSD")){
                    
                        dpb4=dpb5;
                        dpb5=dpb6;
                        dpb6=dpb7;
                        dpb7=dpb8;
                        dpb8=dpb9;
                        dpb9=dpb10;
                      }else if(dpb5.startsWith("PTSD")){
                        dpb5=dpb6;
                        dpb6=dpb7;
                        dpb7=dpb8;
                        dpb8=dpb9;
                        dpb9=dpb10;
                      }else if(dpb6.startsWith("PTSD")){
                        dpb6=dpb7;
                        dpb7=dpb8;
                        dpb8=dpb9;
                        dpb9=dpb10;
                      }else if(dpb7.startsWith("PTSD")){
                        dpb7=dpb8;
                        dpb8=dpb9;
                        dpb9=dpb10;
                      }else if(dpb8.startsWith("PTSD")){
                        dpb8=dpb9;
                        dpb9=dpb10;
                      }else if(dpb9.startsWith("PTSD")){
                        dpb9=dpb10;
                      }
                    }

                    
                  
                    viewdata[index]= {id:index,closestclinic:nearby,dateadded:addedDate,createdAt:dataRow.date_added,upid:dataRow.netSuiteID,appointmenttype:apt_type,bdq1:dpb1,bdq2:dpb2,bdq3:dpb3,bdq4:dpb4,bdq5:dpb5,bdq6:dpb6,bdq7:dpb7,bdq9:dpb9,bdq8:dpb8,bdq10:dpb10,id: index, firstname: firstname, lastname: lastname, netsuitid: npID,phone:dataRow.cell_phone,email:dataRow.email,gender:dataRow.gender,birthdate:dateofbirth,city:dataRow.city,state:dataRow.state,zipcode:dataRow.zipcode,dateNP:formateddate.toString(),apptTypeNeeded:dataRow.apptTypeNeeded,disabilities:dataRow.disabilities};
                    index++;




                   }
              
                  }
                }
    
    
    
    
    
    
    
    
    
                console.log("viewdata");
    console.log(viewdata);
    setViewDataAll(viewdata);
    









              }


            });
       


       

        
          }
    
    
    
    
    setConvert("Executing: " + parseFloat((parseInt(y)/parseInt(i)*100)).toFixed(2) +"% Done, Please Wait...");
    
        });


      }

     



    });
  


  






    
   




    











  




  });
}


});

}



















//   console.log("Not Found User");
// console.log(notFoundUsers);
  
// notFoundUsers.map((dataRow)=>{

 
//   });







  
  
  const col = [
 
    { field: "firstname", headerClassName:"backcolordefine",  width: 120,headerName: "First Name", editable: true },
    {
      field: "lastname",
      headerClassName:"backcolordefine", 
      headerName: "Last Name",
      width: 120,
      editable: true,
    },
    { field: "email", headerClassName:"backcolordefine", headerName: "Email", width: 120, editable: true },
    { field: "phone", headerClassName:"backcolordefine", headerName: "Phone", width: 120, editable: true },   
    { field: "closestclinic",headerClassName:"backcolordefine",  headerName: " Closest Clinic", width: 120, editable: true },
    {
      field: "appointmenttype",
      headerClassName:"backcolordefine", 
      headerName: "Appointment Type",
      width: 120,
      editable: true,
    },
    {
      field: "state",
      headerClassName:"backcolordefine", 
      headerName: "State",
      width: 120,
      editable: true,
    },
    {
      field: "city",
      headerClassName:"backcolordefine", 
      headerName: "City",
      width: 120,
      editable: true,
    },
    { field: "zipcode",headerClassName:"backcolordefine",  headerName: "Zip Code", width: 120, editable: true },

  


    { field: "bdq1",headerClassName:"backcolordefine",  headerName: "DBQ 1", width: 120, editable: true },
    { field: "bdq2",headerClassName:"backcolordefine",  headerName: "DBQ 2", width: 120, editable: true },
    { field: "bdq3",headerClassName:"backcolordefine",  headerName: "DBQ 3", width: 120, editable: true },
    { field: "bdq4",headerClassName:"backcolordefine",  headerName: "DBQ 4", width: 120, editable: true },
    { field: "bdq5",headerClassName:"backcolordefine",  headerName: "DBQ 5", width: 120, editable: true },
    { field: "bdq6",headerClassName:"backcolordefine",  headerName: "DBQ 6", width: 120, editable: true },
    { field: "bdq7",headerClassName:"backcolordefine",  headerName: "DBQ 7", width: 120, editable: true },
    { field: "bdq8",headerClassName:"backcolordefine",  headerName: "DBQ 8", width: 120, editable: true },
    { field: "bdq9",headerClassName:"backcolordefine",  headerName: "DBQ 9", width: 120, editable: true },
    { field: "bdq10",headerClassName:"backcolordefine",  headerName: "DBQ 10", width: 120, editable: true },
    {
      field: "dateNP",
      headerName: "Date Added to NP",headerClassName:"backcolordefine", 
      width: 120,
      editable: true,
    },
    {
      field: "dateadded",
      headerName: "Date Customer Added to FB",headerClassName:"backcolordefine", 
      width: 120,
      editable: true,
    },
    {
      field: "internalnotes",headerClassName:"backcolordefine", 
      headerName: "Internal Notes",
      width: 120,
      editable: true,
    },
    {
        field: "netsuitid",headerClassName:"backcolordefine", 
        headerName: "NetSuite Account ID",
        width: 120,
        editable: true,
      },
      {
        field: "birthdate",headerClassName:"backcolordefine", 
        headerName: "Birthdate",
        width: 120,
        editable: true,
      },

      {
        field: "upid",headerClassName:"backcolordefine", 
        headerName: "Unique Patient ID",
        width: 120,
        editable: true,
      },
   
   
  
  ];



    
  
  const col2 = [
    { field: "lastapttime", headerClassName:"backcolordefine",  width: 120,headerName: "Booking Time", editable: true },
   
    { field: "firstname", headerClassName:"backcolordefine",  width: 120,headerName: "First Name", editable: true },
    {
      field: "lastname",
      headerClassName:"backcolordefine", 
      headerName: "Last Name",
      width: 120,
      editable: true,
    },
    { field: "email", headerClassName:"backcolordefine", headerName: "Email", width: 120, editable: true },
    { field: "phone", headerClassName:"backcolordefine", headerName: "Phone", width: 120, editable: true },   
    { field: "closestclinic",headerClassName:"backcolordefine",  headerName: " Closest Clinic", width: 120, editable: true },
    {
      field: "appointmenttype",
      headerClassName:"backcolordefine", 
      headerName: "Appointment Type",
      width: 120,
      editable: true,
    },
    {
      field: "state",
      headerClassName:"backcolordefine", 
      headerName: "State",
      width: 120,
      editable: true,
    },
    {
      field: "city",
      headerClassName:"backcolordefine", 
      headerName: "City",
      width: 120,
      editable: true,
    },
    { field: "zipcode",headerClassName:"backcolordefine",  headerName: "Zip Code", width: 120, editable: true },

  


    { field: "bdq1",headerClassName:"backcolordefine",  headerName: "DBQ 1", width: 120, editable: true },
    { field: "bdq2",headerClassName:"backcolordefine",  headerName: "DBQ 2", width: 120, editable: true },
    { field: "bdq3",headerClassName:"backcolordefine",  headerName: "DBQ 3", width: 120, editable: true },
    { field: "bdq4",headerClassName:"backcolordefine",  headerName: "DBQ 4", width: 120, editable: true },
    { field: "bdq5",headerClassName:"backcolordefine",  headerName: "DBQ 5", width: 120, editable: true },
    { field: "bdq6",headerClassName:"backcolordefine",  headerName: "DBQ 6", width: 120, editable: true },
    { field: "bdq7",headerClassName:"backcolordefine",  headerName: "DBQ 7", width: 120, editable: true },
    { field: "bdq8",headerClassName:"backcolordefine",  headerName: "DBQ 8", width: 120, editable: true },
    { field: "bdq9",headerClassName:"backcolordefine",  headerName: "DBQ 9", width: 120, editable: true },
    { field: "bdq10",headerClassName:"backcolordefine",  headerName: "DBQ 10", width: 120, editable: true },
    {
      field: "dateNP",
      headerName: "Date Added to NP",headerClassName:"backcolordefine", 
      width: 120,
      editable: true,
    },
    {
      field: "dateadded",
      headerName: "Date Customer Added to FB",headerClassName:"backcolordefine", 
      width: 120,
      editable: true,
    },
    {
      field: "internalnotes",headerClassName:"backcolordefine", 
      headerName: "Internal Notes",
      width: 120,
      editable: true,
    },
    {
        field: "netsuitid",headerClassName:"backcolordefine", 
        headerName: "NetSuite Account ID",
        width: 120,
        editable: true,
      },
      {
        field: "birthdate",headerClassName:"backcolordefine", 
        headerName: "Birthdate",
        width: 120,
        editable: true,
      },

      {
        field: "upid",headerClassName:"backcolordefine", 
        headerName: "Unique Patient ID",
        width: 120,
        editable: true,
      },
   
   
  
  ];




  return (
    <div style={{ height: 700, width: "98%", margin: "1%" }}>
      <h4>{myState.length>=1?convert:"No File Uploaded"}</h4>
      <DataGrid  key="R1" rows={viewDataAll} columns={col} disableSelectionOnClick='false' rowHeight={30} checkboxSelection='true'  components={{Toolbar: GridToolbar}} />
    <h1>Already Existing Patient List</h1>
    {index3>0?   <button className="btn btn-outline-primary" onClick={()=>{

console.log("View Rows 6666");
console.log(viewDataAll);
console.log("Selected Rows 6666");
console.log(selectedRows);

var datanewlist = [];
var newlistmake=0;

const entries = Object.values(selectedRows);

console.log(entries);


// viewDataAll.map((row)=>{
//   datanewlist[newlistmake]=row;
//   newlistmake++;
// });

// selectedRows.map((row)=>{
//   datanewlist[newlistmake]=row;
//   newlistmake++;
// });

      setViewDataAll([...viewDataAll,...entries]);
      alert("Added To New Patient List");
      console.log(newlistmake);
    }}>
                      
                       <span>Add To New Patient List</span>
                       </button>:""}
      <DataGrid key="R2" onSelectionModelChange={(ids) => {


setIndex3(0);
var countstart=0;
setselectedRows({}); 
        
  const selectedIDs = new Set(ids);
  const selectedRowData = foundData.filter((row) =>
{
 

  ids.map((id)=>{
    
    if(id===row.id){
     
      selectedRows[countstart]=row;
      countstart++;
     
      setselectedRows(selectedRows);
  }

  });

  console.log("Ids");
  console.log(ids);

  console.log("selectedRows");
  console.log(selectedRows);
  console.log("selectedRows length");
  setIndex3(countstart);
  console.log(countstart);

}
  );

}} rows={foundData} columns={col2} disableSelectionOnClick='false' rowHeight={30} checkboxSelection='true'  components={{Toolbar: GridToolbar}} />
   
    </div>
  );
}
