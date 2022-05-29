import React from "react";
import { Card, Dropdown, Button } from "react-bootstrap";
import "../styles/dasboardAdmin.css";
import user from "../images/user.png";

export default function DasboardAdmin() {
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="btn border"
    >
      {children}
    </div>
  ));

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-4 border-end">
            <img src={user} alt="User" className="mt-5 w-50" />
            <div className="mt-3">
              <h4>Dasboard</h4>
              <h4>Manage Boarding House</h4>
              <h4>Submission List</h4>
              <h4>Boarding House List</h4>
              <h4>Transaction History by Status</h4>
              <h4>Transaction History by Boarding House</h4>
              <h4>Profile</h4>
              <h4>Log Out</h4>
            </div>
          </div>

          <div className="col-8">
            <div className="d-flex justify-content-center gap-5 pt-5  mt-5">
              <Card className="text-center p-4">
                <Card.Title>
                  <h4>31</h4>
                </Card.Title>
                <Card.Text>
                  <h5>New Submission</h5>
                </Card.Text>
              </Card>
              <Card className="text-center p-4">
                <Card.Title>
                  <h4>12</h4>
                </Card.Title>
                <Card.Text>
                  <h5>Sales of the Month</h5>
                </Card.Text>
              </Card>
            </div>

            <div className="mt-5">
              <h5>Rent Payment Report</h5>
              <div className="d-flex gap-3 mt-3">
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic" as={CustomToggle}>
                    1 Month
                    <span className="ms-5">&#x25bc;</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">3 Month</Dropdown.Item>
                    <Dropdown.Item href="#">6 Month</Dropdown.Item>
                    <Dropdown.Item href="#">All Month</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic" as={CustomToggle}>
                    .cvs
                    <span className="ms-5">&#x25bc;</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">pdf</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Button className="btnPrint">Print</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
