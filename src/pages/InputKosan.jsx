import React from "react";
import {
  Form,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import "../styles/inputkosan.css";

function InputKosan() {
  return (
    <div className="input-body">
      <div className="input-wrapbody">
        <div>
          <div className="input-title">
            <h3>Input Kosan</h3>
          </div>
          <div className="input-formName">
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  placeholder="Input Boarding House Name"
                />
              </Form.Group>
            </Form>
          </div>
          <div className="input-formtop">
            <Row>
              <Col xs={6}>
                <Form>
                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Control type="text" placeholder="Enter Address" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Control
                      type="text"
                      placeholder="Enter City/District"
                    />
                  </Form.Group>

                  <Form.Group
                    className="input-formgroup"
                    as={Col}
                    controlId="formGridState"
                  >
                    <Form.Select defaultValue="Choose...">
                      <option>Mix</option>
                      <option>Male</option>
                      <option>Female</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group>
                    <div className="input-price">
                      <Row>
                        <Col>
                          <Form.Control type="number" placeholder="Price" />
                        </Col>
                        <Col>
                          <Form.Control
                            type="number"
                            placeholder="Number of Rooms"
                          />
                        </Col>
                      </Row>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Control type="text" placeholder="Enter Owner Name" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Control
                      type="text"
                      placeholder="Enter Owner Phone Number"
                    />
                  </Form.Group>

                  <InputGroup className="mb-3">
                    <FormControl
                      type="file"
                      placeholder="Upload Image"
                      aria-label="Image"
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Text
                      className="input-imagebtn"
                      id="basic-addon2"
                    >
                      Upload
                    </InputGroup.Text>
                  </InputGroup>

                  <div className="input-facilities">
                    <div>
                      <h4>Facilities</h4>
                    </div>
                    <div className="input-formfacilities">
                      <Form.Group>
                        <Row>
                          <Col>
                            <Form.Control placeholder="Listrik" />
                          </Col>
                          <Col>
                            <Form.Control type="text" placeholder="Room Area" />
                          </Col>
                        </Row>
                      </Form.Group>
                    </div>
                  </div>
                </Form>
              </Col>
              <Col xs={6}>
                <div>Map</div>

                <div className="input-nearbyfacilities">
                  <div className="input-namenearbyfacilities">
                    <h4>Nearby Facilities</h4>
                  </div>
                  <div>
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Control as="textarea" rows={3} />
                      </Form.Group>
                    </Form>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="input-wrapdescription">
              <div className="input-description">
                <h4>Description</h4>
              </div>
              <div className="input-descarea">
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>
                </Form>
              </div>
            </div>
          </div>
          <div className="input-wrapbutton">
            <Button className="input-button"> add </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputKosan;
