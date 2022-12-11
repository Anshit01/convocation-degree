import React, { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import "./degree.css";
import sampleDegree from "../../assets/degree.jpg";
import { useParams } from "react-router-dom";
import BackBtn from "./back.svg"
import { Link } from "react-router-dom";
import {bytes2Char} from "@taquito/utils"

const Degree = ({name, rollNo}) => {

  const [fetched, setFetched] = useState(false);
  const [degree, setDegree] = useState("../../assets/degree.jpg");

  console.log(degree)

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`https://api.ghostnet.tzkt.io/v1/contracts/KT1Aa9amSPeHNN24A83hyuhb49gtTN2JP6vm/bigmaps/token_index/keys/${rollno}`)
        const data = await res.json()
        const res2 = await fetch(`https://api.ghostnet.tzkt.io/v1/contracts/KT1Aa9amSPeHNN24A83hyuhb49gtTN2JP6vm/bigmaps/token_metadata/keys/${data.value}`)
        const data2 = await res2.json()
        console.log(data2.value)
        const res3 = await fetch("https://ipfs.tezotopia.com/ipfs/" + bytes2Char(data2.value.token_info[""]).slice(7))
        const metadata = await res3.json()
        setDegree("https://ipfs.tezotopia.com/ipfs/" + metadata.displayUri.slice(7))
        setFetched(true)
      } catch (e) {
        alert("Invalid roll number")
      }
      
    })()
  }, [])

  const { rollno } = useParams();

  return (
    <>
      <Navbar color={true} />
      <div className="degree-styling">
        <Link to="/">
          <div className="go-back">
            <img src={BackBtn} className="back-icon" alt="back-icon"/>
            <span className="back-btn"> Go Back </span>
          </div>
        </Link>
        <section className="degree-body">
          <div className="roll">Roll No - {rollno} </div>
          <div>
            {
              fetched ?
              <img className="degree-display" src={degree} alt="Degree"></img> :
              <h1 className="loader">Loading...</h1>
            }
            
          </div>
        </section>
      </div>
    </>
  );
};

export default Degree;
