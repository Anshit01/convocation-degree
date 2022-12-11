import React, {useState} from "react";
import "./admin.css";
import Navbar from "../navbar/navbar";
import branches from "../../assets/branches.json";
import parser from "papaparse";
import {createCanvas, loadImage} from "canvas";

const fileTypes = ["CSV"];

const Admin = () => {

  const [imgBuffer, setImgBuffer] = useState(undefined);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [hashes, setHashes] = useState({});

  async function generateDegree({name, fatherName, rollNo, cgpi, branch, date}) {
    const degree = await loadImage("/degree.jpg");
    const canvas = createCanvas(degree.width, degree.height);
	  const ctx = canvas.getContext('2d');
    ctx.drawImage(degree, 0, 0);
    ctx.font = '26px Roboto';
    ctx.fillStyle = '#000';
    ctx.lineWidth = 2;
    
    // Set name
    const nameDimen = ctx.measureText(name);
    ctx.fillText(name, degree.width / 2 - nameDimen.width / 2 + 140, 620);

    // Set Father's name
    const fatherNameDimen = ctx.measureText(fatherName);
    ctx.fillText(fatherName, degree.width / 2 - fatherNameDimen.width / 2 + 140, 677);

    // Set Roll No
    const rollNoDimen = ctx.measureText(rollNo);
    ctx.fillText(rollNo, degree.width / 2 - rollNoDimen.width / 2 - 260, 734);

    // Set Branch
    const branchDimen = ctx.measureText(branch);
    ctx.fillText(branch, degree.width / 2 - branchDimen.width / 2, 845);

    // Set CGPI
    const cgpiDimen = ctx.measureText(cgpi);
    ctx.fillText(cgpi, degree.width / 2 - cgpiDimen.width / 2 + 24, 905);

    // Set Date
    const dateDimen = ctx.measureText(date);
    ctx.fillText(date, degree.width / 2 - dateDimen.width / 2 - 310, 1287);

    const base64String = canvas.toDataURL("image/jpeg")
    setImgBuffer(base64String);

	  return base64String;
  }

  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const handleChange = (e) => {
    console.log("Handling file selection")
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
    console.log("Handling drop event")
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

  async function generateDegrees(studentData, date, branch) {
    setTotal(studentData.length);
    setCount(0)
    setImgBuffer(undefined)
    setHashes([])
    studentData.forEach(async (student) => {
      const base64Image = await generateDegree({...student, date, branch});
      const res = await fetch("https://us-central1-memecast-2913f.cloudfunctions.net/pinToIPFS-default", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          "data": {
            "base64Image": base64Image,
            "name": "Degree",
            "description": "Degree issues by NITH",
            "category": "Digital Certificate",
            "password": "degree123&?/qsdrfg"
          }
        })
      })
      setCount((count) => count + 1)
      const data = await res.json()
      setHashes((hashes) => ({...hashes, metadata: data.result.metadata}))
    })
  }

  async function mint() {
    if (Object.keys(hashes).length === 0) {
      alert("Generate degrees first")
      return
    }
    // TODO: Mint NFTs here using hashes array

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
            <input type="submit" value="Generate Degrees" />
          </form>
          <div className="admin-progress">
            <p>Progress: {count}/{total}</p>
          </div>
          <button className="mint-button" onClick={mint}><b>Create Degrees on the blockchain</b></button>
        </div>
        <div className="admin-right">
          <img src={imgBuffer? imgBuffer: "/degree.jpg"} height="700px" alt=""/>
        </div>
      </div>
    </>
  );
};

export default Admin;
