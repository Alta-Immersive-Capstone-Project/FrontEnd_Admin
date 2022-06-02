import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Dropdown
} from "react-bootstrap";
import { MapContainer, TileLayer, Popup, Marker, useMap } from "react-leaflet";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/inputkosan.css";
import {URL} from '../components/URL';

function InputKosan() {
  const [title, setTitle] = useState(''); // title (string)
  const [address, setAddress] = useState(''); // address (string)
  const [districtData, setDistrictData] = useState(0); // dist_id (int)
  const [gender, setGender] = useState(null); // type (string)
  const [slotRoom, setSlotRoom] = useState(0); // slot_room (int)
  const [available, setAvailable] = useState(0); // available (int)
  const [owner, setOwner] = useState(''); // owner_name (string)
  const [ownerPhone, setOwnerPhone] = useState(''); // owner_phone (string)
  const [description, setDescription] = useState(''); // brief (string)
  // const [latitude, setLatitude] = useState(''); // latitude (float)
  // const [longitude, setLongitude] = useState(''); // longitude (float)

  const [city, setCity] = useState([]);
  const [cityDropdown, setCityDropdown] = useState('City');

  const [district, setDistrict] = useState([]);
  const [districtDropdown, setDistrictDropdown] = useState('District');

  const [isLoading, setIsLoading] = useState(false);

  const Navigate = useNavigate();

  useEffect(() => {
    axios.get(`${URL}/cities/`)
      .then(data => {
        setCity(data.data.data);
      })
      .catch(err => {
        console.log(err, ' ==> ini error city');
      })
  }, []);

  const clickBack = () => {
    Navigate("/");
  };

  const getDistricts = async (id) => {
    const response = await axios.get(`${URL}/cities/${id}/districts`, {
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
  const [cityIsActive, setCityIsActive] = useState(true);
  const CustomToggleCity = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href="/#"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className={cityIsActive ? "btn border m-0 w-100" : "btn border border-danger m-0 w-100"}
    >
      {children}
    </a>
  ));

  const [districtIsActive, setDistrictIsActive] = useState(true);
  const CustomToggleDistrict = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href="/#"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className={districtIsActive ? "btn border m-0 w-100" : "btn border border-danger m-0 w-100"}
    >
      {children}
    </a>
  ));

  const [genderIsActive, setGenderIsActive] = useState(true);
  const CustomToggleGender = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href="/#"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className={genderIsActive ? "btn border m-0 w-100" : "btn border border-danger m-0 w-100"}
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
          <input
            autoFocus
            className="border rounded p-2 mx-3 my-2 w-auto"
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

  // SUBMIT
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    if (form.checkValidity()) {
      const body = {
        title,
        address,
        district_id: districtData,
        type: gender,
        slot_room: parseInt(slotRoom),
        available: parseInt(available),
        owner_name: owner,
        owner_phone: ownerPhone,
        brief: description,
        latitude: position.lat,
        longitude: position.lng
      }

      setIsLoading(true);
      axios.post(`${URL}/houses`, body, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then(data => {
          setTimeout(clickBack(), 1500);
        })
        .catch(err => {
          console.log(err, ' ==> error submit')
        })
        .finally(() => {
          setIsLoading(false);
        })
    };

  }

  return (
    <div className="input-body">
      <div className="input-wrapbody">
        <Form noValidate validated={validated} onSubmit={handleSubmit} >
          <div className="input-title">
            <h3 onClick={clickBack}>Input Kosan</h3>
          </div>
          <div className="input-formName">
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Control
                required
                type="text"
                placeholder="Input Boarding House Name"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="input-formtop">
            <Row>
              <Col xs={6}>
                <Form.Group className="mb-3" controlId="validationCustom02">
                  <Form.Control required type="text" placeholder="Enter Address" onChange={(e) => setAddress(e.target.value)} />
                </Form.Group>

                <div className="input-price">
                  <Row>
                    <Col>
                      <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" as={CustomToggleCity}>
                          <div className="d-flex justify-content-between">
                            {cityDropdown}
                            <span className="ms-5">&#x25bc;</span>
                          </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu as={CustomMenu}>
                          {city.sort((a, b) => a.city_name > b.city_name ? 1 : b.city_name > a.city_name ? -1 : 0).map((e, i) => (
                            <Dropdown.Item key={i} href="#" onClick={() => {
                              setCityDropdown(e.city_name);
                              setCityIsActive(true);
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
                        <Dropdown.Toggle id="dropdown-basic" as={CustomToggleDistrict} className="w-100" >
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
                              setDistrictData(e.dist_id);
                              setDistrictIsActive(true);
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
                  <Dropdown.Toggle id="dropdown-basic" as={CustomToggleGender} >
                    <div className="d-flex justify-content-between">
                      {gender !== null ? gender : 'Gender'}
                      <span className="ms-5">&#x25bc;</span>
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => {
                      setGender('Female');
                      setGenderIsActive(true);
                    }}>Female</Dropdown.Item>
                    <Dropdown.Item onClick={() => {
                      setGender('Male');
                      setGenderIsActive(true);
                    }}>Male</Dropdown.Item>
                    <Dropdown.Item onClick={() => {
                      setGender('Mix');
                      setGenderIsActive(true);
                    }}>Mix</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Form.Group>
                  <div className="input-price">
                    <Row>
                      <Col>
                        <Form.Control
                          required
                          type="number"
                          placeholder="Number of Rooms"
                          onChange={(e) => setSlotRoom(e.target.value)}
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          required
                          type="number"
                          placeholder="Available"
                          onChange={(e) => setAvailable(e.target.value)}
                        />
                      </Col>
                    </Row>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Enter Owner Name" onChange={(e) => setOwner(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter Owner Phone Number"
                    onChange={(e) => setOwnerPhone(e.target.value)}
                  />
                </Form.Group>

                {/* <InputGroup className="mb-3">
                  <FormControl
                    type="file"
                    placeholder="Upload Image"
                    aria-label="Image"
                    aria-describedby="basic-addon2"
                  />
                </InputGroup> */}
              </Col>

              <Col xs={6}>
                <div>
                  <MapContainer id="map-input" center={position} zoom={13} scrollWheelZoom={false}>
                    <ChangeView center={position} />
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <DraggableMarker />
                  </MapContainer>
                </div>

                {/* <div className="input-nearbyfacilities">
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
                </div> */}
              </Col>
            </Row>
            <div className="input-wrapdescription">
              <div className="input-description">
                <h4>Description</h4>
              </div>
              <div className="input-descarea">
                <Form.Group
                  className="mb-3"
                  onChange={(e) => setDescription(e.target.value)}
                >
                  <Form.Control as="textarea" rows={3} required />
                </Form.Group>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <Button className="btn btn-primary" type="submit" disabled={isLoading ? true : false} onClick={() => {
              if (cityDropdown === 'City' || districtDropdown === 'District' || gender === null) {
                if (cityDropdown === 'City') {
                  setCityIsActive(false);
                }
                if (districtDropdown === 'District') {
                  setDistrictIsActive(false);
                }
                if (gender === null) {
                  setGenderIsActive(false);
                }
              }
            }} >{isLoading ? 'Submitting' : 'Submit'}</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default InputKosan;
