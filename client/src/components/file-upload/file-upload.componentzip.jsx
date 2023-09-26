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

const FileUploadZip = ({
  label,
  updateFilesCb,
  start,
  end,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  ...otherProps
}) => {
  const fileInputField = useRef(null);
  const [files, setFiles] = useState({});
  let viewdata = [
    {

    },
  ];

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
    let index =0;

   // console.log("At Handle!");
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);

     
        const files = e.target.files;
  

    
        if (files) {
  
          Papa.parse(files[0], {
            complete: function(results) {

              // console.log("results.data");
              // console.log(results.data);

     
              viewdata=    results.data.splice(0,2)

              results.data.map((dataRow)=>{
              //  console.log(dataRow);
                if(dataRow.length>1){
                  if(dataRow[1]!=='name'){
            
             
            
                  
            if(index>=start && index<=end){
            //5 to 6
            //13 14
             // console.log("Data to add");
             // console.log(viewdata[index]);
    
             viewdata[index]= { id: index, zipcode: dataRow[0], location: dataRow[4],county: dataRow[1], city:dataRow[2],state:dataRow[3]};
       
                  index++;
            
              }
            
            
            
                  }
            
                }
            
              });
            


              dispatch({
                type:"SaveData",
                payload:results.data
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

export default FileUploadZip;
