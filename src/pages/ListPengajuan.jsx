import React from "react";
import { Table, Button } from "react-bootstrap";
import "../styles/listPengajuan.css";
import user from "../images/user.png";

export default function ListPengajuan() {
  return (
    <>
      <div className="container">
        <div className="listpengajuan-row">
          <div className="col-12">
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
