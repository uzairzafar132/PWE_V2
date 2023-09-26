import React, { useState } from "react";
import FileUpload from "./file-upload/file-upload.component";
import 'bootstrap/dist/css/bootstrap.min.css';
import DataGridFun from './datagrid';
import DataGridConverted from './datagridconverted';
import 'bootstrap/dist/js/bootstrap.bundle.min';



function MainView(props) {

  const [newVBGcsv, setNewVBGcsv] = useState({
    VBGcsv: []
  });






  const updateUploadedFiles = (files) =>
    setNewVBGcsv({ ...newVBGcsv, VBGcsv: files });



  return (

    <div className="text-center">

   
    <form >
   
    {props.viewConverted?
        <FileUpload
          accept=".csv"
          label=" "
          updateFilesCb={updateUploadedFiles}
        />:""
      }
              
       
      </form>

   
    {props.viewConverted? <DataGridFun/>: <DataGridConverted/>}
  

     
     

 
    </div>

  );
}

export default MainView;