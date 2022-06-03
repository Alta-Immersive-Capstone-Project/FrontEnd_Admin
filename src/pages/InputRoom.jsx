import React, { useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { URL as url } from "../components/URL";
import { useParams } from "react-router-dom";

export default function InputRoom() {
  const params = useParams();

  const [files, setFiles] = useState({
    file: [],
    filepreview: null,
  });
  const [type, setType] = useState();
  const [price, setPrice] = useState();
  const [additional_description, setAdditional_description] = useState();

  const handleInputChange = (event) => {
    setFiles({
      ...files,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };

  const [isSucces, setSuccess] = useState(null);

  const submit = async () => {
    const formdata = new FormData();
    formdata.append("house_id", params.id);
    formdata.append("type", type);
    formdata.append("price", price);
    formdata.append("additional_description", additional_description);
    formdata.append("files", files.file);

    for (var pair of formdata.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    axios
      .post(`${url}/room`, formdata, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => {
        console.log(data);
        if (data.data.data === 1) {
          setSuccess("files upload successfully");
        }
      });
  };

  return (
    <div className="input-body">
      <div className="input-wrapbody">
        <Form>
          <div className="input-title mb-3">
            <h3>Input Room</h3>
          </div>
          {isSucces !== null ? <h4> {isSucces} </h4> : null}
          <div className="input-formName">
            <div className="d-flex gap-3">
              <Form.Group className="mb-3" controlId="validationCustom01">
                <Form.Control
                  required
                  type="text"
                  placeholder="type size"
                  onChange={(e) => setType(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="validationCustom02">
                <Form.Control
                  required
                  type="text"
                  placeholder="price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
            </div>
            <Form.Group className="mb-3" controlId="validationCustom03">
              <Form.Control
                required
                type="text"
                placeholder="additional description"
                onChange={(e) => setAdditional_description(e.target.value)}
              />
            </Form.Group>
            <div>
              <label>
                <h5>select file</h5>
              </label>
              <input
                type="file"
                className="form-control"
                name="upload_file"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </Form>
        <div className="form-row my-3">
          <button
            type="submit"
            className="btn btn-dark"
            onClick={() => submit()}
          >
            Save
          </button>
        </div>
        {files.filepreview !== null ? (
          <img
            className="previewimg"
            src={files.filepreview}
            alt="Uploadfiles"
          />
        ) : null}
      </div>
    </div>
  );
}
