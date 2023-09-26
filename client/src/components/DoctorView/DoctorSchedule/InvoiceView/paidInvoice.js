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

const PaidInvoice = (props)=>{

    const [dataRows, setDataRows]= useState();

    const [invoiceRows, setInvoiceRows]= useState([]);
    var result = [];
    var attendedapt=0;
    var noshow=0;


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

      console.log(props.email);
      
      axios.get("http://platinummedapp.com/invoice/findalldoc/"+props.email+"/"+moment(props.startDate).format("MM-DD-YYYY")+"/"+moment(props.endDate).format("MM-DD-YYYY")).then(function (response) {

    console.log(response.data);
var newindex=0; 
var testData =[];
if(response.data.length>0){
  response.data.map((data,i)=>{
    testData[i]=data.data;
    console.log(i);
    console.log(data);

  
    setDataRows([...testData]);
    setInvoiceRows(testData);
});
}



    });



    },[props.startDate,props.endDate])

    
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
        minWidth: 150,
        maxWidth: 150
      },editable:'never'},
      // { title: "time", field: "time", hidden: true, width:"0%",   defaultSort:'asc', editable:'never'},
      { title: "# of Patient Scheduled", field: "dateapt", cellStyle: {
        minWidth: 90,
        maxWidth: 90
      },editable:'never'},
      { title: "# of Patient Seen", field: "attendedapt",sorting:false,editable:'never', cellStyle: {
        minWidth: 90,
        maxWidth: 90
      }},
      { title: "# of No Shows", field: "noshow",sorting:false,editable:'never', cellStyle: {
        minWidth: 90,
        maxWidth: 90
      }},
   
      { title: "FB Start Time", field: "fbstarttime",sorting:false,editable:'never', cellStyle: {
        minWidth: 120,
        maxWidth: 120
      }},
      { title: "FB End Time", field: "fbendtime",sorting:false,editable:'never', cellStyle: {
        minWidth: 120,
        maxWidth: 120
      }},
      { title: "Total Hours", field: "totalhours",sorting:false,editable:'never', cellStyle: {
        minWidth: 120,
        maxWidth: 120
      }},

      { title: "Additional Payment", field: "additionalpayment",sorting:false,editable:'never', cellStyle: {
        minWidth: 120,
        maxWidth: 120
      }},

      { title: "Total Doctor Receives", field: "amountfordoctor",sorting:false,editable:'never', cellStyle: {
        minWidth: 120,
        maxWidth: 120
      }},

      { title: "Time Sheet Approval Date", field: "approvedate",sorting:false,editable:'never', cellStyle: {
        minWidth: 120,
        maxWidth: 120
      }},

      { title: "Doctor Paid Date", field: "paiddate",sorting:false,editable:'never', cellStyle: {
        minWidth: 120,
        maxWidth: 120
      }},


      { title: "Method of Payment", field: "paymentmethod",sorting:false,editable:'never', cellStyle: {
        minWidth: 120,
        maxWidth: 120
      }},
      { title: "Notes", field: "notes",sorting:false,editable:'never', cellStyle: {
        minWidth: 300,
        maxWidth: 300
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
                          rowData.amountfordoctor=(parseInt(rowData.amountfordoctor)+parseInt(newValue)).toFixed(2);
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
         Saved Invoice View
          
           <span style={{marginLeft: "20px"}}>Email: {props.email}</span>
   
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
export default PaidInvoice;