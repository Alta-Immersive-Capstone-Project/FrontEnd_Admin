import React from "react";
import { Button } from "react-bootstrap";
import "../styles/makeOffering.css";

export default function MakeOffering() {
  return (
    <>
      <div className="container">
        <div className="makeoffering-row">
          <div className="col-10">
            <h4 className="my-5">Create Offer</h4>
            <h5>Id Booking</h5>
            <p>RDF 1000293742</p>
            <h5 className="mt-4">Id Boarding House</h5>
            <p>RDF 1000293742</p>
            <div className="d-flex gap-5 mt-4 mb-5">
              <div>
                <h5>Rental Durations</h5>
                <p>6 Month</p>
              </div>
              <div>
                <h5>Cost</h5>
                <p>Rp. 5.400.000</p>
              </div>
            </div>
            <h5 className="mt-5">User Details</h5>
            <div className="d-flex gap-5">
              <div>
                <p>Name</p>
                <p>Phone Number</p>
              </div>
              <div>
                <p>Fajar Dwi</p>
                <p>0812345678</p>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-5">
              <h4>Total Payment</h4>
              <h4>Rp.5.400.000</h4>
            </div>
            <div className="d-grid mt-3">
              <Button className="btnGenerate">
                <h5>Generate Offer</h5>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
