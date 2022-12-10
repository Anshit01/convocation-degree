import React, {useState} from "react";
import "./admin.css";
import Navbar from "../navbar/navbar";
import branches from "../../assets/branches.json";
import parser from "papaparse";

const fileTypes = ["CSV"];

const Admin = () => {

  function generateDegree({name, fatherName, rollNo, cgpi, branch, date}) {
    
  }

  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const handleChange = (e) => {
    console.log("handling file selection")
    e.preventDefault();
    e.stopPropagation();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("handling drop event")
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const filename = e.dataTransfer.files[0].name;
      if (fileTypes.includes(filename.split(".").pop().toUpperCase())) {
        setFile(e.dataTransfer.files[0]);
      }
    }
  }

  
  
  function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      data.file = reader.result;
      console.log(data);
      const parsedData = parser.parse(data.file, {header: true});
      console.log("Parsed Data", parsedData);
      generateDegrees(parsedData.data, data.date, data.branch);

    }
  }

  function generateDegrees(studentData, date, branch) {
    studentData.forEach((student) => {
      generateDegree({...student, date, branch});
    })
  }

  return (
    <>
      <Navbar color={true} />
      <div className="admin-main">
        <div className="admin-left">
          <h2 className="admin-head">Generate Degree</h2>
          <form className="admin-form" onSubmit={handleFormSubmit} onDrop={handleDrop}>
            <label className="date-picker">
              <span>Select date:</span>
              <input type="date" name="date" required/>
            </label>
            <select name="branch">
              {branches.map((branch) => 
                <option key={branch} value={branch}>{branch}</option>
              )}
            </select>
            <label
              className="file-selector"
              // className={style.uploadImage}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {!file || !file.name ? (
                <>
                  {/* <AiOutlineCloudUpload /> */}
                  <p>{dragActive? "Drop the file here": "Drag and drop or click here to upload file"}</p>
                </>
              ) : (
                <>{file?.name}</>
              )}

              <input
                accept=".csv"
                onChange={handleChange}
                type="file"
                name="file"
                required
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className="admin-right">
          
        </div>
      </div>
    </>
  );
};

export default Admin;
