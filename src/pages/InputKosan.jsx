import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Dropdown
} from "react-bootstrap";
import { MapContainer, TileLayer, Popup, Marker, useMap } from "react-leaflet";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/inputkosan.css";

function InputKosan() {
  const [fields, setFields] = useState({
    name: '', // title (string)
    address: '', // address (string)
    district: '', // districtID (int)
    gender: '',
    slotRoom: '', // slot room (int)
    available: '', // available (int)
    owner: '', // owner name (string)
    ownerPhone: '', // owner phone (string)
    description: '', // brief (string)
    latitude: '', // float
    longitude: '' // float
  });
  const [city, setCity] = useState([]);
  const [cityDropdown, setCityDropdown] = useState('City');

  const [district, setDistrict] = useState([]);
  const [districtDropdown, setDistrictDropdown] = useState('District');

  const [genderDropdown, setGenderDropdown] = useState(false);

  const Navigate = useNavigate();

  useEffect(() => {
    axios.get('http://18.136.202.111:8000/cities/')
      .then(data => {
        setCity(data.data.data);
      })
      .catch(err => {
        console.log(err, ' ==> ini error city');
      })
  }, []);

  const getDistricts = async (id) => {
    const response = await axios.get(`http://18.136.202.111:8000/cities/${id}/districts`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    response.data.data ? setDistrict(response.data.data) : setDistrict([]);
  }

  // MAPS
  const center = {
    lat: -6.2,
    lng: 106.816666,
  };

  const [position, setPosition] = useState(center);
  function DraggableMarker() {
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            setPosition(marker.getLatLng());
          }
        },
      }),
      []
    );

    return (
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
      >
        <Popup minWidth={90}>
          <span>Drag Marker</span>
        </Popup>
      </Marker>
    );
  }

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  // DROPDOWN
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href="/#"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="btn border m-0 w-100"
    >
      {children}
    </a>
  ));

  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const [value, setValue] = useState("");

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );
  // END DROPDOWN

  const clickBack = () => {
    Navigate("/dashboard");
  };

  return (
    <div className="input-body">
      <div className="input-wrapbody">
        <Form>
          <div className="input-title">
            <h3 onClick={clickBack}>Input Kosan</h3>
          </div>
          <div className="input-formName">
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
                type="text"
                placeholder="Input Boarding House Name"
              />
            </Form.Group>
          </div>
          <div className="input-formtop">
            <Row>
              <Col xs={6}>
                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Enter Address" />
                </Form.Group>

                <div className="input-price">
                  <Row>
                    <Col>
                      <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" as={CustomToggle} className="w-100" >
                          <div className="d-flex justify-content-between">
                            {cityDropdown}
                            <span className="ms-5">&#x25bc;</span>
                          </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu as={CustomMenu}>
                          {city.sort((a, b) => a.city_name > b.city_name ? 1 : b.city_name > a.city_name ? -1 : 0).map((e, i) => (
                            <Dropdown.Item key={i} href="#" onClick={() => {
                              setCityDropdown(e.city_name);
                              getDistricts(e.id);
                            }}>
                              {e.city_name}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                    <Col>
                      <Dropdown >
                        <Dropdown.Toggle id="dropdown-basic" as={CustomToggle} className="w-100" >
                          <div className="d-flex justify-content-between">
                            {districtDropdown}
                            <span className="ms-5">&#x25bc;</span>
                          </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu as={CustomMenu} >
                          {district.sort((a, b) => a.name > b.name ? 1 : b.name > a.ame ? -1 : 0).map((e, i) => (
                            <Dropdown.Item key={i} href="#" onClick={() => {
                              setDistrictDropdown(e.name);
                              setPosition({ lat: e.latitude, lng: e.longitude });
                            }}>
                              {e.name}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                  </Row>
                </div>

                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic" as={CustomToggle} >
                    <div className="d-flex justify-content-between">
                      Gender
                      <span className="ms-5">&#x25bc;</span>
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Female</Dropdown.Item>
                    <Dropdown.Item>Male</Dropdown.Item>
                    <Dropdown.Item>Mix</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Form.Group>
                  <div className="input-price">
                    <Row>
                      <Col>
                        <Form.Control
                          type="number"
                          placeholder="Number of Rooms"
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          type="number"
                          placeholder="Available"
                        />
                      </Col>
                    </Row>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Enter Owner Name" />
                </Form.Group>

                <Form.Group className="mb-3">
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
              </Col>

              <Col xs={6}>
                <div>
                  <MapContainer id="map-input" center={position} zoom={13} scrollWheelZoom={false}>
                    <ChangeView center={position} zoom={13} />
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <DraggableMarker />
                  </MapContainer>
                </div>

                <div className="input-nearbyfacilities">
                  <div className="input-namenearbyfacilities">
                    <h4>Nearby Facilities</h4>
                  </div>
                  <div>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="input-wrapdescription">
              <div className="input-description">
                <h4>Description</h4>
              </div>
              <div className="input-descarea">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              </div>
            </div>
          </div>
          <div className="input-wrapbutton">
            <Button className="input-button">Add</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default InputKosan;
