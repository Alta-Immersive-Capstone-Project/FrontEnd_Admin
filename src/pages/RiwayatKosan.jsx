import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button, Form, FormControl, Dropdown } from "react-bootstrap";
import { URL } from "../components/URL";
import "../styles/riwayatKosan.css";
import moment from "moment";

export default function RiwayatKosan() {
  const [riwayat, setRiwayat] = useState([]);

  useEffect(() => {
    document.title = "History Transaction";
    axios.get(`${URL}/admin/transactions/kost`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }
    })
      .then(data => {
        setRiwayat(data.data.data);
      })
      .catch(err => {
        console.log(err, ' ==> error dari riwayat kosan')
      })
  }, []);

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

  const makeRupiah = (input) => {
    let txt = input.toString().split('');
    let temp = 1;
    for (let i = txt.length - 1; i > 0; i--) {
      if (temp % 3 === 0) {
        txt.splice(i, 0, '.');
      }
      temp++;
    }
    return txt.join('');
  }

  return (
    <>
      <div className="container">
        <div className="riwayatkosan-row">
          <div className="col-12">
            <h4 className="my-5">History Transactions</h4>
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
                {riwayat.map((el, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{el.booking_id}</td>
                    <td>{el.name}</td>
                    <td>{el.duration} Month</td>
                    <td>Rp{makeRupiah(el.price)}</td>
                    <td>{moment(el.created_at).format('LL')}</td>
                    <td>{el.transaction_status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
