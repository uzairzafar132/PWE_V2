import React, { useRef, useState } from "react";
import {
  FileUploadContainer,
  FormField,
  DragDropText,
  UploadFileBtn,
  FilePreviewContainer,
  ImagePreview,
  PreviewContainer,
  PreviewList,
  FileMetaData,
  RemoveFileIcon,
  InputLabel
} from "./file-upload.styles";
import Papa from "papaparse";
import {useDispatch } from "react-redux";

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;







const convertNestedObjectToArray = (nestedObj) =>
  Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUpload = ({
  label,
  updateFilesCb,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  ...otherProps
}) => {
  const fileInputField = useRef(null);
  const [files, setFiles] = useState({});

  const handleUploadBtnClick = () => {
    fileInputField.current.click();
  };

  const addNewFiles = (newFiles) => {
    for (let file of newFiles) {
      if (file.size <= maxFileSizeInBytes) {
        if (!otherProps.multiple) {
          return { file };
        }
        files[file.name] = file;
      }
    }
    return { ...files };
  };

  const callUpdateFilesCb = (files) => {
    const filesAsArray = convertNestedObjectToArray(files);
    updateFilesCb(filesAsArray);
  };

  const dispatch = useDispatch();

  const handleNewFileUpload = (e) => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);

     
        const files = e.target.files;
        let viewdata = [
          {
      
          },
        ];
        let index = 0;
    
        if (files) {
  
          Papa.parse(files[0], {
            complete: function(results) {

              // console.log("results.data");
              // console.log(results.data);

     
              results.data.splice(0,2)

              results.data.map( dataRow =>{
                // console.log("dataRow");
                // console.log(dataRow);
                // console.log(" results.data");
                // console.log( results.data);
              let foundAlready = viewdata.find(el => el.netSuiteID===dataRow[3]);
              // console.log("el.netSuiteID");
              // console.log(foundAlready);
   
              if(foundAlready===undefined){
              viewdata[index] = {
                id: index,
                name: dataRow[1]+" "+dataRow[2],
                netSuiteID: dataRow[3],
                cell_phone: dataRow[6],
                email: dataRow[5],
                gender: "Male",
                birthdate: dataRow[4],
                city: dataRow[7],
                state: dataRow[8],
                zipcode: dataRow[9],
                date_added: dataRow[0],
                apptTypeNeeded: dataRow[10],
                disabilities: dataRow[11]+" - "+dataRow[12],
              };
              index++;
            }else{
              //aready found
              // console.log(foundAlready.netSuiteID)
              // console.log(foundAlready.DisabilityCategory)
              for (var i = 0; i < viewdata.length; i++){
                // look for the entry with a matching `code` value
                if (viewdata[i].netSuiteID === dataRow[3]){
                   // we found it
                   viewdata[i].disabilities=viewdata[i].disabilities+";"+dataRow[11]+" - "+dataRow[12];
                   if(dataRow[11].startsWith("Mental")|dataRow[11].startsWith("PTSD")){
                    viewdata[i].apptTypeNeeded="Dual";
                   }
                  // obj[i].name is the matched result
                }
              }
            }
          });
          console.log("viewdata");
          console.log(viewdata);

              dispatch({
                type:"SaveData",
                payload:viewdata
        
            });
           
            }}
          )
        }

    }
  };

  const removeFile = (fileName) => {
    delete files[fileName];
    setFiles({ ...files });
    callUpdateFilesCb({ ...files });
  };

 

  return (
    <>
      <FileUploadContainer>
        <InputLabel>{label}</InputLabel>
        <UploadFileBtn type="button" onClick={handleUploadBtnClick}>
          <i className="fas fa-file-upload" />
          <span> Upload {otherProps.multiple ? "files" : "a file"}</span>
        </UploadFileBtn>
        <DragDropText></DragDropText>
     
        <FormField
          type="file"
          ref={fileInputField}
          onChange={handleNewFileUpload}
          title=""
          value=""
          {...otherProps}
        />
      </FileUploadContainer>
      <FilePreviewContainer>
        {/* <span>Uploaded File Name: </span> */}
        <PreviewList>
          {Object.keys(files).map((fileName, index) => {
            let file = files[fileName];
            let isImageFile = file.type.split("/")[0] === "image";
            return (
              <PreviewContainer key={fileName}>
                <div>
                  {isImageFile && (
                    <ImagePreview
                      src={URL.createObjectURL(file)}
                      alt={`file preview ${index}`}
                    />
                  )}
                  <FileMetaData isImageFile={isImageFile}>
                    <span>{"File Name: "+file.name}</span>
                    <aside>
                      <span>{convertBytesToKB(file.size)} kb</span>
                      <RemoveFileIcon
                        className="fas fa-trash-alt"
                        onClick={() => removeFile(fileName)}
                      />
                    </aside>
                  </FileMetaData>
                </div>
              </PreviewContainer>
            );
          })}
        </PreviewList>
      </FilePreviewContainer>
    </>
  );
};

export default FileUpload;
