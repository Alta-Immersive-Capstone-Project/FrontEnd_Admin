import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/makeOffering.css";
import moment from "moment";
import axios from "axios";
import { URL } from "../components/URL";
import Swal from "sweetalert2";

export default function MakeOffering() {
  const bookingDetail = useSelector(state => state.booking.booking);
  const [price, setPrice] = useState(bookingDetail.price);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (bookingDetail.length === 0) {
      navigate('/listpengajuan');
    }
  }, [bookingDetail, id, navigate]);

  const handleSubmit = () => {
    const body = {
      price: parseInt(price)
    };

    axios.put(`${URL}/admin/transactions/${id}`, body, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }
    })
      .then(data => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: `${bookingDetail.booking_id} successfully updated`,
        });

        setTimeout(() => {
          navigate("/listPengajuan");
        }, 2000);
      })
      .catch(err => {
        console.log(err);
      })
  }

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
        <div className="makeoffering-row">
          <div className="col-12">
            <h4 className="my-5">Create Offer</h4>
            <h5>ID Booking</h5>
            <p>{bookingDetail.booking_id}</p>
            <h5 className="mt-4">Boarding House</h5>
            <p>{bookingDetail.title}</p>
            <h5>Check In</h5>
            <p>{moment(bookingDetail.check_in).format('dddd')}, {moment(bookingDetail.check_in).format('LL')}</p>
            <div className="d-flex gap-5 mt-4 mb-5">
              <div>
                <h5>Rental Durations</h5>
                <p>{bookingDetail.duration} Month</p>
              </div>
              <div>
                <h5>Cost</h5>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
            </div>
            <h5 className="mt-5">User Details</h5>
            <div className="d-flex gap-5">
              <div>
                <p>Name</p>
                <p>Phone Number</p>
              </div>
              <div>
                <p>{bookingDetail.name}</p>
                <p>{bookingDetail.phone}</p>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-5">
              <h4>Total Payment</h4>
              <h4>Rp{makeRupiah(price * bookingDetail.duration)}</h4>
            </div>
            <div className="d-grid mt-3">
              <Button className="btn btn-primary" onClick={() => handleSubmit()}>
                <h5>Generate Offer</h5>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
