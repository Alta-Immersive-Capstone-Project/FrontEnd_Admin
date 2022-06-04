import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import "../styles/listPengajuan.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { URL } from "../components/URL";
import { useDispatch } from "react-redux";
import { setBooking } from '../store/transaction'

export default function ListPengajuan() {
  const [listTransactions, setListTransactions] = useState([]);

  const Navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `${URL}/admin/transactions`,

          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        setListTransactions(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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
                  <th>Booking ID</th>
                  <th>Boarding House</th>
                  <th>Duration</th>
                  <th>Customer</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {listTransactions.map((el, i) => (
                  <tr style={{ cursor: "pointer" }} key={i}>
                    <td>{i + 1}</td>
                    <td>{el.booking_id}</td>
                    <td>{el.title}</td>
                    <td>{el.duration} Month</td>
                    <td>{el.name} </td>
                    <td>
                      <Button
                        className="btn btn-primary"
                        onClick={() => {
                          dispatch(setBooking(el));
                          Navigate(`/makeOffering/${el.booking_id}`);
                        }
                        }
                      >
                        Create
                      </Button>
                    </td>
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
