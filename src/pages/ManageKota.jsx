import React, { useEffect, useState, useRef, useMemo } from "react";
import { Table, Button, FormControl, Dropdown, Modal } from "react-bootstrap";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "../styles/dasboardAdmin.css";
import "../styles/manageKota.css";
import axios from "axios";
import Swal from "sweetalert2";

function ManageKota() {
    const [city, setCity] = useState([]);
    const [addCity, setAddCity] = useState("");
    const [idCity, setIdCity] = useState(null);
    const [cityDropdown, setCityDropdown] = useState('City');

    const [district, setDistrict] = useState([]);
    const [addDistrict, setAddDistrict] = useState("");
    const [idDistrict, setIdDistrict] = useState(null);

    const [showCreate, setShowCreate] = useState(false);
    const handleCloseCreate = () => setShowCreate(false);
    const handleShowCreate = () => setShowCreate(true);

    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    const [showCreateDistrict, setShowCreateDistrict] = useState(false);
    const handleCloseCreateDistrict = () => setShowCreateDistrict(false);
    const handleShowCreateDistrict = () => setShowCreateDistrict(true);

    const [showUpdateDistrict, setShowUpdateDistrict] = useState(false);
    const handleCloseUpdateDistrict = () => setShowUpdateDistrict(false);
    const handleShowUpdateDistrict = () => setShowUpdateDistrict(true);

    useEffect(() => {
        axios
            .get("http://18.136.202.111:8000/cities", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then((data) => {
                setCity(data.data.data);
            })
            .catch((err) => {
                console.log(err, " => error dari cities");
            });
    }, []);

    const getDistricts = async (id) => {
        const response = await axios.get(`http://18.136.202.111:8000/cities/${id}/districts`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        response.data.data ? setDistrict(response.data.data) : setDistrict([]);
    }

    // CREATE CITY
    const handleCreateCity = () => {
        const body = {
            city_name: addCity,
        };
        axios
            .post("http://18.136.202.111:8000/cities", body, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then((data) => {
                handleCloseCreate();

                axios
                    .get("http://18.136.202.111:8000/cities", {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    })
                    .then((data) => {
                        setCity(data.data.data);
                    });

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
                    title: `${addCity} successfully added`,
                });

                setAddCity("City");
            })
            .catch((err) => {
                console.log(err, " ==> ini error create");
                handleCloseCreate();
                setAddCity("City");
            });
    };

    // UPDATE CITY
    const updateCity = () => {
        const body = {
            city_name: addCity,
        };
        axios
            .put(`http://18.136.202.111:8000/cities/${idCity}`, body, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then((data) => {
                handleCloseUpdate();

                setCityDropdown(addCity);

                axios
                    .get("http://18.136.202.111:8000/cities", {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    })
                    .then((data) => {
                        setCity(data.data.data);
                    });

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
                    title: `${addCity} successfully updated`,
                });
            })
            .catch((err) => {
                console.log(err, " ==> Ini dari update");
            });
    };

    // DELETE CITY
    const deleteCity = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`http://18.136.202.111:8000/cities/${idCity}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    })
                    .then((data) => {
                        setCityDropdown("City");
                        axios
                            .get("http://18.136.202.111:8000/cities", {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                                },
                            })
                            .then((data) => {
                                setCity(data.data.data);
                            });
                    })
                    .catch((err) => {
                        console.log(err, " ==> error delete");
                    });

                Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
        });
    };

    // CREATE DISTRICT
    const handleCreateDistrict = () => {
        const body = {
            name: addDistrict,
            latitude: position.lat,
            longitude: position.lng,
            city_id: idCity,
        };
        axios
            .post("http://18.136.202.111:8000/districts", body, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then((data) => {
                handleCloseCreateDistrict();

                getDistricts(idCity);

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
                    title: `${addDistrict} successfully added`,
                });
            })
            .catch((err) => {
                console.log(err, " ==> ini error create");
                handleCloseCreateDistrict();
            });
    };


    // UPDATE DISTRICT
    const updateDistrict = (id) => {
        const body = {
            name: addDistrict,
            latitude: position.lat,
            longitude: position.lng,
            city_id: idCity
        };

        axios.put(`http://18.136.202.111:8000/districts/${id}`, body, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
            .then(data => {
                handleCloseUpdateDistrict();

                getDistricts(idCity);

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
                    title: `${addDistrict} successfully updated`,
                });
            })
            .catch(err => {
                handleCloseUpdateDistrict();

                console.log(err, ' ==> ini dari update')
            })
    }


    // DELETE DISTRICT
    const deleteDistrict = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://18.136.202.111:8000/districts/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
                    .then((data) => {
                        getDistricts(idCity);
                    })
                    .catch((err) => {
                        console.log(err, " ==> error delete");
                    });

                Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
        });
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
            className="btn border m-0"
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

    const center = {
        lat: -6.2,
        lng: 106.816666,
    };

    // MAPS
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

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-between">
                            <h4 className="">List City</h4>
                            <Button id="btn-addmanage" className="btn-manage" onClick={handleShowCreate}>
                                Add City
                            </Button>
                            <div />
                        </div>
                        <div className="d-flex my-2 gap-2">
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" as={CustomToggle} className="w-100" >
                                    <div className="d-flex justify-content-between dropdown-size">
                                        {cityDropdown}
                                        <span className="ms-5">&#x25bc;</span>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu as={CustomMenu}>
                                    {city.sort((a, b) => a.city_name > b.city_name ? 1 : b.city_name > a.city_name ? -1 : 0).map((e, i) => (
                                        <Dropdown.Item key={i} href="#" onClick={() => {
                                            setCityDropdown(e.city_name);
                                            setAddCity(e.city_name);
                                            setIdCity(e.id);
                                            getDistricts(e.id);
                                        }} >
                                            {e.city_name}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                            <Button variant="warning" onClick={handleShowUpdate} disabled={cityDropdown === "City" ? true : false}>
                                Edit
                            </Button>
                            <Button variant="danger" onClick={() => deleteCity()} disabled={cityDropdown === "City" ? true : false}>
                                Delete
                            </Button>
                            <Button className="btn-manage" onClick={handleShowCreateDistrict} disabled={cityDropdown === "City" ? true : false}>
                                Add District
                            </Button>
                        </div>
                        <Table striped bordered hover>
                            <thead className="text-center">
                                <tr>
                                    <th>No</th>
                                    <th>Kecamatan</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {district.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0).map((el, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{el.name}</td>
                                        <td className="d-flex justify-content-center gap-2">
                                            <Button variant="warning" onClick={() => {
                                                setPosition({ lat: el.latitude, lng: el.longitude });
                                                setAddDistrict(el.name);
                                                setIdDistrict(el.dist_id);
                                                handleShowUpdateDistrict();
                                            }}>Edit</Button>
                                            <Button variant="danger" onClick={() => {
                                                deleteDistrict(el.dist_id);
                                            }}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>


                {/* Add City */}
                <Modal show={showCreate} onHide={handleCloseCreate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add City</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" className="w-100 px-2" placeholder="City Name" onChange={(e) => {
                            setAddCity(e.target.value);
                        }} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseCreate}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => handleCreateCity()}>
                            Create
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Edit City */}
                <Modal show={showUpdate} onHide={handleCloseUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit City</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" className="w-100 px-2" placeholder="City Name" value={addCity} onChange={(e) => {
                            setAddCity(e.target.value);
                        }} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseUpdate}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => updateCity()}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Add DISTRICT */}
                <Modal show={showCreateDistrict} onHide={handleCloseCreateDistrict}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add District</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" className="w-100 px-2 mb-3" placeholder="District Name" onChange={(e) => setAddDistrict(e.target.value)} />

                        <MapContainer id="map" className="mx-auto" center={position} zoom={12} scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <DraggableMarker />
                        </MapContainer>
                        <div className="d-flex justify-content-evenly">
                            <div>
                                <h6>Latitude</h6>
                                <input type="text" value={position.lat} readOnly disabled />
                            </div>
                            <div>
                                <h6>Longitude</h6>
                                <input type="text" value={position.lng} readOnly disabled />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseCreateDistrict}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={addCity === "City" ? () => console.log("error") : handleCreateDistrict}>
                            Create
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Edit District */}
                <Modal show={showUpdateDistrict} onHide={handleCloseUpdateDistrict}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit City</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" className="w-100 px-2 mb-3" placeholder="District Name" value={addDistrict} onChange={(e) => {
                            setAddDistrict(e.target.value);
                        }
                        } />

                        <MapContainer id="map" className="mx-auto" center={position} zoom={12} scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <DraggableMarker />
                        </MapContainer>
                        <div className="d-flex justify-content-evenly">
                            <div>
                                <h6>Latitude</h6>
                                <input type="text" value={position.lat} readOnly disabled />
                            </div>
                            <div>
                                <h6>Longitude</h6>
                                <input type="text" value={position.lng} readOnly disabled />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseUpdateDistrict}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => updateDistrict((idDistrict))}>Save</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}

export default ManageKota;
