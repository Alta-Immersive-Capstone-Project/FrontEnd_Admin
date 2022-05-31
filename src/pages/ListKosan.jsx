import React from "react";
import user from "../images/user.png";
import { Button, Form, FormControl, Table } from "react-bootstrap";
import "../styles/listkosan.css";

function ListKosan() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-4 border-end">
            <div className="mt-5 d-flex gap-4">
              <img src={user} alt="User" className="w-50" />
              <div className="mt-5">
                <h4>Name</h4>
                <Button className="btnPrint">
                  <h5>Supervisor</h5>
                </Button>
              </div>
            </div>

            <div className="mt-5">
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
            <div className="list-wraptitle">
              <div className="list-title">
                <h4 className="my-5">List Boarding House</h4>
              </div>
              <div className="list-search">
                <div id="list-search2" className="d-flex gap-3 mb-4">
                  <Form className="d-flex gap-3">
                    <FormControl
                      id="formControl"
                      type="search"
                      aria-label="Search"
                    />
                    <Button className="btnSearch">Search</Button>
                  </Form>
                </div>
              </div>
            </div>

            <Table striped bordered hover>
              <thead className="text-center">
                <tr>
                  <th>No</th>
                  <th>ID</th>
                  <th>Boarding House</th>
                  <th>City</th>
                  <th>District</th>
                  <th>Owner</th>
                  <th>Contact</th>
                  <th>Transaction</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr>
                  <td>1</td>
                  <td>KST 123</td>
                  <td>Panorama</td>
                  <td>Jakarta Selatan</td>
                  <td>Setiabudi</td>
                  <td>Budi</td>
                  <td>0812311923</td>
                  <td>
                    <Button className="btnSearch">View</Button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListKosan;
