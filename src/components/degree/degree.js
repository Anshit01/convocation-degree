import React from "react";
import Navbar from "../navbar/navbar";
import "./degree.css";
import sampleDegree from "../../assets/sampleDegree.PNG";

const Degree = ({name, rollNo}) => {
  return (
    <>
      <Navbar color={true} />
      <div className="degree-styling">
        <div>Go Back</div>
        <section className="degree-body">
          <div>Name - {name}</div>
          <div>Roll No - {rollNo} </div>
          <div>
            <img src={sampleDegree}></img>
          </div>
        </section>
      </div>
    </>
  );
};

export default Degree;
