import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import MaterialTable from "material-table";
import axios from "axios";
import Select from "react-select";
let empList = [

];


function UsersAll() {

  var [convert, setConvert] = useState("Waiting for Zip Master Data...");

  const [data, setData] = useState(empList);
  const [clinicList, setClinicList] = useState([{value: "Admin", label:"Admin" },{value: "User", label:"User" },{value: "Doctor", label:"Doctor" }]);

  const [timezoneList, settimezoneList] = useState([{value: "PST - Pacific Time", label:"PST - Pacific Time" },{value: "MST - Mountain Time", label:"MST - Mountain Time"},{value: "CST - Central Time", label:"CST - Central Time"},{value: "EST - Eastern Time", label:"EST - Eastern Time"},{value: "HST - Hawaiian Time", label:"HST - Hawaiian Time"},{value: "PHST - Philippine Time", label:"PHST - Philippine Time"}]);


  const [paymenttype, setPaymenttype] = useState([{value: "Hourly", label:"Hourly" },{value: "Per Patient", label:"Per Patient" }]);







  if(convert!==" " && data.length<=0){


  axios.get("http://platinummedapp.com/users/all").then(function (response) {


 console.log("clinicList");
 console.log(response.data);

  setConvert(" ");

  setData(response.data)
  
})

 .catch(function (error) {
    console.log(error);
 });



}

  const columns = [
    { title: "Id", field: "_id",    hidden: true, },
    { title: "Username", field: "name"},
    { title: "Email", field: "email"},
    { title: "Phone Number", field: "phone"},
    { title: "Hourly Rate", field: "hourlyrate"},
    { title: "Per Patient Rate", field: "perpatientrate"},
    { title: "Payment Type", field: "paidtype", editComponent: ({ value, onChange }) =>{

   
      return <Select
         options={paymenttype}
         name="role"
         onChange={(selectedOption) => {
           console.log(clinicList);
           onChange(selectedOption.value)}}
         value={value ? value.value : value}
       />
         
     }},
    { title: "Time Zone", field: "timeZone",editComponent: ({ value, onChange }) =>{

   
      return <Select
         options={timezoneList}
         name="role"
         onChange={(selectedOption) => {
           console.log(timezoneList);
           onChange(selectedOption.value)}}
         value={value ? value.value : value}
       />
         
     }},
    { title: "Password", field: "password"},
    { title: "Role", field: "role",  editComponent: ({ value, onChange }) =>{

   
     return <Select
        options={clinicList}
        name="role"
        onChange={(selectedOption) => {
          console.log(clinicList);
          onChange(selectedOption.value)}}
        value={value ? value.value : value}
      />
        
    }},

  ];

  return (
    <div className="text-center">



      {convert==="Waiting for Zip Master Data..."?<h3>Waiting for User Data...</h3>:
      <MaterialTable


        title=""
        data={data}
        columns={columns}
        editable={{
          onRowAdd: newData =>{
            console.log("Add Request response");
            console.log(newData);
            axios.post("http://platinummedapp.com/users/add",newData).then(function (response) {
              console.log(response);
              setData([...data, response.data]); 
            //  setData(updatedRows)
            });
         return new Promise((resolve, reject) => {
       

            console.log(newData);
              setTimeout(() => {
                   

                  resolve();
              }, 3000);
          })},
          
          onRowDelete: oldData =>{
          axios.delete("http://platinummedapp.com/users/"+oldData._id).then(function (response) {
            console.log(response);
        
            
        });
         return new Promise((resolve, reject) => {
              setTimeout(() => {
                  const dataDelete = [...data];
                  const index = oldData.tableData.id;
               
                  dataDelete.splice(index, 1);
                  setData([...dataDelete]);

                  resolve();
              }, 1000);
          })},
          
       
          onRowUpdate: (updatedRow, oldRow) =>{
            console.log(oldRow);
            axios.post("http://platinummedapp.com/users/update/"+oldRow._id,updatedRow).then(function (response) {
              console.log(response);
            
          });
           return new Promise((resolve, reject) => {
              const index = oldRow.tableData.id;
              const updatedRows = [...data];
              updatedRows[index] = updatedRow;
             
        

            setTimeout(() => {
              setData(updatedRows);
              resolve();
            }, 1000);



        

              
            })},
      
      }}
        options={{
          headerStyle: {
            backgroundColor: '#00a0da',
            color: '#FFF',
            fontWeight:'bold',
            fontSize:'16px'
    
          },
          actionsColumnIndex: -1,
          addRowPosition: "first",
          maxBodyHeight:'600px',
          paging:true,
          pageSize:50,       // make initial page size
          emptyRowsWhenPaging: false,   // To avoid of having empty rows
          pageSizeOptions:[30,50,100],    // rows selection options
        }}
      />
}
    </div>
  );
}

export default UsersAll;
