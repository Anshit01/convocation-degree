import React from "react";
import "./admin.css";
import Navbar from "../navbar/navbar";

const Admin = () => {
  return (
    <>
      <Navbar color={true} />
      <div className="admin-main">
        <div className="admin-left">
            <h2 className="admin-head">Generate Degree</h2>
            <form className="admin-form">
                <label>
                    <input type="text" name="name" />
                </label>
                <select>
                    <option value="grapefruit">Grapefruit</option>
                    <option value="lime">Lime</option>
                    <option selected value="coconut">Coconut</option>
                    <option value="mango">Mango</option>
                </select>
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
