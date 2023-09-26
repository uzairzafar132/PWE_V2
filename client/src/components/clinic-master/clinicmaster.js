import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import MaterialTable from "material-table";
import axios from "axios";
let empList = [
  
];


function ClinicMaster() {



  const [data, setData] = useState(empList);
 // console.log(empList.length)
  if(data.length<=0){

  axios.get("http://platinummedapp.com/clinic/all").then(function (response) {
   // console.log(response.data);
    setData(response.data)
  })
 .catch(function (error) {
    console.log(error);
 });

}

  const columns = [
    { title: "Id", field: "_id",  hidden: true,  },
    { title: "Clinic", field: "clinic" }
  ];

  return (
    <div className="text-center">

      <MaterialTable
      localization={{ body:{ emptyDataSourceMessage:<h3>Loading...</h3> } }}
        title=""
        data={data}
        columns={columns}
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              const updatedRows = [
                ...data,
                { id: Math.floor(Math.random() * 100), ...newRow },
              ];
              axios.post("http://platinummedapp.com/clinic/add",newRow).then(function (response) {
                console.log(response);
              //  setData(response.data)
              }) .catch(err => {
                window.alert("Clinic Already Exists");
                window.location ='/clinicmaster';
              });


              setTimeout(() => {
                setData(updatedRows);
                resolve();
              }, 2000);

            }),
          // onRowDelete: (selectedRow) =>
          //   new Promise((resolve, reject) => {
          //     const index = selectedRow.tableData.id;
          //     const updatedRows = [...data];
          //     updatedRows.splice(index, 1);
          //     axios.delete("http://platinummedapp.com/clinic/"+selectedRow._id).then(function (response) {
          //       console.log(response);
          //     //  setData(response.data)
          //     })
          //     setTimeout(() => {
          //       setData(updatedRows);
          //       resolve();
          //     }, 2000);
            

          
          //   }),
          // onRowUpdate: (updatedRow, oldRow) =>
          //   new Promise((resolve, reject) => {
          //     const index = oldRow.tableData.id;
          //     const updatedRows = [...data];
          //     updatedRows[index] = updatedRow;
          //     axios.post("http://platinummedapp.com/clinic/update/"+oldRow._id,updatedRow).then(function (response) {
          //       console.log(response);
          //   });
          //     setTimeout(() => {
          //       setData(updatedRows);
          //       resolve();
          //     }, 2000);



        

              
          //   }),
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
          paging:true,
          pageSize:50,  
          maxBodyHeight:'600px' ,    // make initial page size
          emptyRowsWhenPaging: false,   // To avoid of having empty rows
          pageSizeOptions:[10,50,100],    // rows selection options
        }}
      />
    </div>
  );
}

export default ClinicMaster;
