import React, { useState,useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import FileUploadZip from "./file-upload/file-upload.componentzip";
import axios from "axios";


export default function UploadZip() {


  const myState= useSelector((state)=>state.saveTheData)

  const [newVBGcsv, setNewVBGcsv] = useState({
    VBGcsv: []
  });
  const [start, setStart] = useState(501);
  const [end, setEnd] = useState(1000);
  const [end2, setEnd2] = useState(1000);
  let index=0;










  const updateUploadedFiles = (files) =>{
    setNewVBGcsv({ ...newVBGcsv, VBGcsv: files });

  
    console.log(myState);

    
    let viewdata =[{id: "", zipcode:"", location: "",county:"",state:""}];
    myState.map((dataRow)=>{

      if(dataRow.length>1){

        if(dataRow[1]!=='name'){
  
    
  
  if(index>=start && index<=end){
  //5 to 6
  //13 14
  console.log("Here");

  
   console.log("Data");
   console.log(index);

   
   
  
        axios.post("/zipdata/add",{ id: index, zipcode: dataRow[0], location: dataRow[4],county: dataRow[1], city:dataRow[2],state:dataRow[3]}).then(function (response) {
          console.log(response);
        //  setData(response.data)
        })
      
     
  
    }
  
    index++;
  
        }
  
      }
  
    });


  }






 // console.log("Slice");
 // console.log(viewdata);


  
  
  const col = [
    { field: "zipcode", headerName: "Zip",    width: 160,editable: true },
    { field: "county", headerName: "County", width: 120, editable: true },
    { field: "city", headerName: "City", width: 120, editable: true },
    { field: "state", headerName: "State", width: 120, editable: true },

    { field: "location", headerName: "Clinic", width: 120, editable: true },

  ];




  return (
    <div style={{ height: 500, width: "98%", margin: "1%" }}>
              
                <div className="form-group">
    <label for="exampleFormControlInput1">Start Index</label>
    <input value={start} type="number"  name="email" onChange={e => {setStart(e.target.value)}} className="form-control" id="exampleFormControlInput1" placeholder="Start Index"/>
  </div>
  <br/>
  <div className="form-group">
    <label for="exampleFormControlInput1">End Index</label>
    <input value={end2} type="number" name="password" onChange={e=>setEnd2(e.target.value)} onBlur={e => setEnd(e.target.value)} className="form-control" id="exampleFormControlInput1" placeholder="End Index"/>
  </div>

 Runing Index: 
{index}

<FileUploadZip
          accept=".csv"
          label=" "
          updateFilesCb={updateUploadedFiles}
          start={start}
          end={end}
        />


    </div>
  );
}
