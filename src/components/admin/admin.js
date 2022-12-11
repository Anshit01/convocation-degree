import React, {useState} from "react";
import "./admin.css";
import Navbar from "../navbar/navbar";
import branches from "../../assets/branches.json";
import parser from "papaparse";
import {createCanvas, loadImage} from "canvas";
import {getActiveAccount, getMinterContract} from "../../utils/tezos"
import {char2Bytes} from "@taquito/utils"
import ProgressBar from '@ramonak/react-progress-bar';

const fileTypes = ["CSV"];

const Admin = () => {

  const [imgBuffer, setImgBuffer] = useState(undefined);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [hashes, setHashes] = useState({});
  const [isMinting, setIsMinting] = useState(false);

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
    clearState()
    setTotal(studentData.length)
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
      setHashes((hashes) => ({...hashes, [student.rollNo]: data.result.metadata}))
    })
  }

  async function mint() {
    if (Object.keys(hashes).length === 0 && false) {
      alert("Generate degrees first")
      return
    }
    console.log(hashes)
    setIsMinting(true)
    try {
      const acc = await getActiveAccount(true);
      const minter = await getMinterContract()
      const payload = []
      for (let rollno in hashes) {
        payload.push({
          metadata: char2Bytes(hashes[rollno]),
          rollno: rollno,
          to_: acc.address
        })
      }
      const op = await minter.methods.mint(payload).send()
      await op.confirmation(1)
      alert("Degree(s) created on the blockchain!")
    } catch (e) {
      alert("Error ", e)
      console.log(e)
    }
    clearState()
  }

  function clearState() {
    setTotal(0);
    setCount(0)
    setImgBuffer(undefined)
    setHashes([])
    setIsMinting(false)
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
            <select name="branch" className="branch">
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
            <input type="submit" className="submit-btn" value="Submit" />
          </form>
          <div className="admin-progress">
            <ProgressBar className="progress-bar" completed={(count/total) * 100} isLabelVisible={false} bgColor="#57C43C" height="15px" borderRadius="2px"/>
            <p className="progress-text">{count} out of {total} degrees generated</p>
          </div>
          <button className="mint-button" onClick={mint} disabled={isMinting}><b>{isMinting? "Minting.." : "Mint"}</b></button>
        </div>
        
        <div className="admin-right">
          <img src={imgBuffer? imgBuffer: "/degree.jpg"} height="700px" alt=""/>
        </div>
      </div>
    </>
  );
};

export default Admin;
