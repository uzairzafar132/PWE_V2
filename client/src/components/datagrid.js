import { React, useState,useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


export default function DataGridFun() {
  const myState = useSelector((state) => state.saveTheData);
  const dispatch = useDispatch();
  console.log("myState")
console.log(myState)
  // let viewdata = [
  //   {
  //     id: "",
  //     name: "",
  //     netSuiteID: "",
  //     cell_phone: "",
  //     email: "",
  //     gender: "",
  //     birthdate: "",
  //     city: "",
  //     state: "",
  //     zipcode: "",
  //     date_added: "",
  //     apptTypeNeeded: "",
  //     disabilities: "",
  //   },
  // ];
  // let index = 0;
  // if(myState.length>2){
  //   console.log("Test");
  //   console.log(viewdata);
  //   console.log(myState);
  //   viewdata=myState;
  // }
//viewdata=myState;

 
//  if(myState.length>2){
//   myState.map((dataRow) => {

//     // if (dataRow.length > 2) {
//     //   if (dataRow[1] !== "name") {
       
      
 

//     //     let foundAlready = viewdata.find(el => el.netSuiteID ===dataRow[3]);
   
//     //     if(foundAlready===undefined){
//         viewdata[index] = {
//           id: index,
//           name: dataRow[1]+" "+dataRow[2],
//           netSuiteID: dataRow[3],
//           cell_phone: dataRow[6],
//           email: dataRow[5],
//           gender: "Male",
//           birthdate: dataRow[4],
//           city: dataRow[7],
//           state: dataRow[8],
//           zipcode: dataRow[9],
//           date_added: dataRow[0],
//           apptTypeNeeded: dataRow[10],
//           disabilities: dataRow[11]+" - "+dataRow[12],
//         };
//         index++;
//       // }else{
//       //   //aready found
//       //   //console.log(foundAlready.netSuiteID)
//       //   //console.log(foundAlready.DisabilityCategory)
//       //   for (var i = 0; i < viewdata.length; i++){
//       //     // look for the entry with a matching `code` value
//       //     if (viewdata[i].netSuiteID === dataRow[3]){
//       //        // we found it
//       //        viewdata[i].disabilities=viewdata[i].disabilities+";"+dataRow[11]+" - "+dataRow[12];
//       //       // obj[i].name is the matched result
//       //     }
//       //   }
//       // }
//       //}
//    // }

    
   
//   });

//   // dispatch({
//   //   type:"SaveData",
//   //   payload:viewdata
  
//   // });
// }

  const col = [
    { field: "id",
    headerClassName:"backcolordefine", 
    headerName: "ID",
    width: 90,
    hide: true},
    { field: "name",headerClassName:"backcolordefine",  headerName: "Name", width: 160, editable: true },
    {
      field: "netSuiteID",
      headerClassName:"backcolordefine", 
      headerName: "Net Suite ID",
      width: 90,
      editable: true,
    },
    {
      field: "cell_phone",
      headerClassName:"backcolordefine", 
      headerName: "Cell Phone",
      width: 120,
      editable: true,
    },
    { field: "email", headerClassName:"backcolordefine", headerName: "Email", width: 120, editable: true },
    // { field: "gender",headerClassName:"backcolordefine",  headerName: "Gender", width: 60, editable: true },
    { field: "birthdate", headerClassName:"backcolordefine", headerName: "Birthdate", width: 120, editable: true },
    { field: "city",headerClassName:"backcolordefine",  headerName: "City", width: 120, editable: true },
    { field: "state", headerClassName:"backcolordefine", headerName: "State", width: 120, editable: true },
    { field: "zipcode",headerClassName:"backcolordefine",  headerName: "Zipcode", width: 80, editable: true },
    {
      field: "date_added",
      headerClassName:"backcolordefine", 
      headerName: "Date Added",
      width: 120,
      editable: true,
    },
    {
      field: "apptTypeNeeded",
      headerClassName:"backcolordefine", 
      headerName: "Appt Type Needed",
      width: 120,
      editable: true,
    },
    {
      field: "disabilities",
      headerClassName:"backcolordefine", 
      headerName: "Disabilities",
      width: 180,
      editable: true,
    },
  ];

  return (
    <div style={{ height: 500, width: "98%", margin: "1%" }}>
      <DataGrid
        rows={myState}
        columns={col}
        disableSelectionOnClick="false"
        rowHeight={30}
       
        checkboxSelection="true"
        onCellEditCommit={(GridCellEditCommitParams) => {
          const array = myState.map((r) => {
            if (r.id === GridCellEditCommitParams.id) {
              return {
                ...r,
                [GridCellEditCommitParams.field]:
                  GridCellEditCommitParams.value,
              };
            } else {
              return { ...r };
            }
          });

          console.log("array");
          console.log(array);


          const newarray = array.map((r, i) => {
            return {id: r.id,name:r.name,netSuiteID:r.netSuiteID,cell_phone:r.cell_phone,email:r.email,gender:r.gender,birthdate:r.birthdate,city:r.city,state:r.state,zipcode:r.zipcode,date_added:r.date_added,apptTypeNeeded:r.apptTypeNeeded,disabilities:r.disabilities}
        });


          console.log("newarray");

          console.log(newarray);
         

          // setModify(1);
          dispatch({
            type:"SaveData",
            payload:newarray
          });
        }}
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
}
