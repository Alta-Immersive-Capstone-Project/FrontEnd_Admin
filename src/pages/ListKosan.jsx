import React from "react";
import { Button, Form, FormControl, Table } from "react-bootstrap";
import "../styles/listkosan.css";

function ListKosan() {
  return (
    <div>
      <div className="container">
        <div className="listkosan-row">
          <div className="col-12">
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
