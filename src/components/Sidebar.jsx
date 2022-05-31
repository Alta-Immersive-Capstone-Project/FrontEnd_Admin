import React, { useState } from "react";
import user from "../images/user.png";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../styles/sidebar.css";

function Sidebar() {
  const Navigate = useNavigate();

  const clickDashboard = () => {
    Navigate("/dashboard");
  };

  const clickManage = () => {
    Navigate("/");
  };

  const clickBoardingList = () => {
    Navigate("/riwayatkosan");
  };

  const clickStatus = () => {
    Navigate("/listpengajuan");
  };

  const clickBoardingHouse = () => {
    Navigate("/listkosan");
  };

  const clickAdd = () => {
    Navigate("/inputkosan");
  };

  const clickLogout = () => {
    localStorage.clear();
    Navigate("/");
  };

  return (
    <div className="body-sidebar">
      <div className="wrap-sidebar">
        <div className="container-sidebar">
          <div className="row-sidebar">
            <div id="column-sidebar" className="col-4 ">
              <div className="image-wrap">
                <div>
                  <div className="mt-5 d-flex gap-4">
                    <img src={user} alt="User" className="image-user" />
                    <div className="mt-5">
                      <h4>Name</h4>
                      <Button className="btn-sidebar">
                        <h6>Supervisor</h6>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="title-sidebar">
                <h4 onClick={clickDashboard}>Dasboard</h4>
                <h4 onClick={clickManage}>Manage Boarding House</h4>
                <h4 onClick={clickBoardingList}>Boarding House List</h4>
                <h4 onClick={clickStatus}>Transaction History by Status</h4>
                <h4 onClick={clickBoardingHouse}>
                  Transaction History by Boarding House
                </h4>
                <h4 onClick={clickAdd}>Add Boarding House</h4>
                <h4 onClick={clickLogout}>Log Out</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
