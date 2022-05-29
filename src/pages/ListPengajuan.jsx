import React from "react";
import { Table, Button } from "react-bootstrap";
import "../styles/listPengajuan.css";
import user from "../images/user.png";

export default function ListPengajuan() {
  return (
    <>
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
            <h4 className="my-5">List</h4>
            <Table striped bordered hover>
              <thead className="text-center">
                <tr>
                  <th>No</th>
                  <th>ID</th>
                  <th>Duration</th>
                  <th>Custom</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr>
                  <td>1</td>
                  <td>Rdf 1000923742</td>
                  <td>6 Month</td>
                  <td>Jerry Young</td>
                  <td>
                    <Button className="btnCreate">Create</Button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
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
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
