import React from "react";
import { Table, Button, Dropdown, Form, FormControl } from "react-bootstrap";
import "../styles/riwayatKosan.css";

export default function RiwayatKosan() {
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
        <div className="riwayatkosan-row">
          <div className="col-12">
            <h4 className="my-5">History Boarding_House_Name</h4>
            <div className="d-flex gap-3 mb-4">
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

              <Form className="d-flex gap-3">
                {["checkbox"].map((type) => (
                  <div key={type} className="d-flex gap-3">
                    <Form.Check type={type} id={`${type}`}>
                      <Form.Check.Input type={type} isValid />
                      <Form.Check.Label>{`Success`}</Form.Check.Label>
                    </Form.Check>
                    <Form.Check type={type} id={`${type}`}>
                      <Form.Check.Input type={type} isValid />
                      <Form.Check.Label>{`Unpaid`}</Form.Check.Label>
                    </Form.Check>
                  </div>
                ))}
                <FormControl
                  id="formControl"
                  type="search"
                  aria-label="Search"
                />
                <Button className="btnSearch">Search</Button>
              </Form>
            </div>

            <Table striped bordered hover>
              <thead className="text-center">
                <tr>
                  <th>No</th>
                  <th>ID Order</th>
                  <th>Tenant</th>
                  <th>Duration</th>
                  <th>Payment</th>
                  <th>Create at</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr>
                  <td>1</td>
                  <td>Rdf 1000923742</td>
                  <td>Jerry Young</td>
                  <td>1 Month</td>
                  <td>600,000</td>
                  <td>24 Juni 2021</td>
                  <td>success</td>
                </tr>
                <tr>
                  <td>2</td>
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
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
