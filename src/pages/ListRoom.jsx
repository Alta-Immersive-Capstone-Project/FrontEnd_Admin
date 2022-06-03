import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { URL } from "../components/URL";
import { useNavigate } from "react-router-dom";

function ListRoom() {
  const [house, setHouse] = useState();
  const [room, setRoom] = useState([]);

  const Navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    axios
      .get(`${URL}/houses/${params.id}/room`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((data) => {
        setRoom(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${URL}/houses/${params.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((data) => {
        setHouse(data.data.data.title);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params]);

  return (
    <div className="container">
      <div className="d-flex justify-content-between mb-3">
        <h2>{house}</h2>
        <Button onClick={() => Navigate(`/inputroom/${params.id}`)}>
          Add Room
        </Button>
      </div>
      <Table striped bordered hover>
        <thead className="text-center">
          <tr>
            <th>Room</th>
            <th>Type</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {room.map((el, i) => (
            <tr key={i}>
              <td>Room {i + 1}</td>
              <td>{el.type}</td>
              <td>{el.price}</td>
              <td className="d-flex justify-content-center gap-2">
                <Button variant="warning">Edit</Button>
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ListRoom;
