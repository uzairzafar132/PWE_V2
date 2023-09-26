import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import MaterialTable from "material-table";
import axios from "axios";
import Select from "react-select";
import { ExportToCsv } from 'export-to-csv';
let empList = [

];


function ZipMaster() {

  var [convert, setConvert] = useState("Waiting for Zip Master Data...");

  const [data, setData] = useState(empList);
  const [clinicList, setClinicList] = useState();
  let loction =[];
  if(convert!==" " && data.length<=0){

 


  axios.get("http://platinummedapp.com/zipdata/all").then(function (response) {

  setConvert(" ");
  setClinicList(loction)

    setData(response.data)
  })

  axios.get("http://platinummedapp.com/clinic/all").then(function (response) {

  let start =0;
  response.data.map(val=>{
      loction[start]={value: val.clinic, label:val.clinic };
      start++;
      return null;
  });
  console.log(loction);





  })
 .catch(function (error) {
    console.log(error);
 });



}

  const columns = [
    { title: "Id", field: "_id",    hidden: true, },
    { title: "Zip", field: "zipcode" },
    { title: "County", field: "county"},
    { title: "City", field: "city"},
    { title: "State", field: "state"},
    { title: "Nearby Clinic", field: "location",  editComponent: ({ value, onChange }) =>{

   
     return <Select
        options={clinicList}
        name="selectClinic"
        onChange={(selectedOption) => {
          console.log(selectedOption.value);
          onChange(selectedOption.value)}}
        value={value ? value.value : value}
      />
        
    }},

  ];

  const csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c) => c.title),
  };

  const csvExporter = new ExportToCsv(csvOptions);


  const handleExportRows = (rows) => {
    csvExporter.generateCsv(rows.map((row) => row.original));
  };

  const handleExportData = () => {
    csvExporter.generateCsv(data);
  };

  
  return (
    <div className="text-center">
 {/* <div
            color="primary"
            //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
            onClick={handleExportData}
          
            variant="contained"
          >
            Export All Data
          </div> */}


      {convert==="Waiting for Zip Master Data..."?<h3>Waiting for Zip Master Data...</h3>:
      <MaterialTable


        title=""
        data={data}
        columns={columns}
        editable={{
          onRowAdd: newData =>{
            console.log("Add Request response");
            axios.post("http://platinummedapp.com/zipdata/add",newData).then(function (response) {
              console.log(response);
            //  setData(updatedRows)
            });
         return new Promise((resolve, reject) => {
       

            console.log(newData);
              setTimeout(() => {
                   setData([...data, newData]); 

                  resolve();
              }, 1000);
          })},
          
          onRowDelete: oldData =>{
          axios.delete("http://platinummedapp.com/zipdata/"+oldData._id).then(function (response) {
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
            axios.post("http://platinummedapp.com/zipdata/update/"+oldRow._id,updatedRow).then(function (response) {
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
      renderTopToolbarCustomActions={({ table }) => (
        <div>
          <div
            color="primary"
            //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
            onClick={handleExportData}
          
            variant="contained"
          >
            Export All Data
          </div>
          <div
            disabled={table.getPrePaginationRowModel().rows.length === 0}
            //export all rows, including from the next page, (still respects filtering and sorting)
            onClick={() =>
              handleExportRows(table.getPrePaginationRowModel().rows)
            }
          
            variant="contained"
          >
            Export All Rows
          </div>
          <div
            disabled={table.getRowModel().rows.length === 0}
            //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
            onClick={() => handleExportRows(table.getRowModel().rows)}
           
            variant="contained"
          >
            Export Page Rows
          </div>
          <div
            disabled={
              !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
            }
            //only export selected rows
            onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
       
            variant="contained"
          >
            Export Selected Rows
          </div>
        </div>
      )}
        options={{
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: '#00a0da',
            color: '#FFF',
            fontWeight:'bold',
            fontSize:'16px'
    
          },
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

export default ZipMaster;
