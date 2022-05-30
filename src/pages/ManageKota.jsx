import React, { useEffect, useState } from 'react';
import { Table, Button, FormControl, Dropdown, Modal } from "react-bootstrap";
import "../styles/dasboardAdmin.css";
import '../styles/manageKota.css';
import user from "../images/user.png";
import axios from 'axios';
import Swal from 'sweetalert2';

function ManageKota() {
    const [city, setCity] = useState([]);
    const [addCity, setAddCity] = useState('City');

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        axios.get('http://18.136.202.111:8000/cities', {
            headers: {
                token: localStorage.getItem("token")
            }
        })
            .then(data => {
                setCity(data.data.data);
            })
            .catch(err => {
                console.log(err, ' => error dari');
            })
    }, []);

    const handleCreateCity = () => {
        const body = {
            city_name: addCity
        }
        axios.post('http://18.136.202.111:8000/cities', body, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(data => {
                handleClose();

                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'success',
                    title: `${addCity} successfully added`
                })
            })
            .catch(err => {
                console.log(err, " ==> ini error create")
            })
    }

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className="btn border"
        >
            {children}

        </a>
    ));

    const CustomMenu = React.forwardRef(
        ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
            const [value, setValue] = useState('');

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
                                !value || child.props.children.toLowerCase().startsWith(value),
                        )}
                    </ul>
                </div>
            );
        },
    );

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-4 border-end">
                        <div className="mt-5 d-flex gap-4">
                            <img src={user} alt="User" className="w-50" />
                            <div className="mt-5">
                                <h4>Name</h4>
                                <Button className="btnPrint">
                                    <h5>Supervisor</h5>
                                </Button>
                            </div>
                        </div>
                        <div className="mt-5">
                            <h4>Dasboard</h4>
                            <h4>Manage Boarding House</h4>
                            <h4>Submission List</h4>
                            <h4>Boarding House List</h4>
                            <h4>Transaction History by Status</h4>
                            <h4>Transaction History by Boarding House</h4>
                            <h4>Profile</h4>
                            <h4>Log Out</h4>
                        </div>
                    </div>

                    <div className="col-8">
                        <div className="d-flex justify-content-between">
                            <h4 className="">List City</h4>
                            <Button variant='primary' onClick={handleShow}>Add City</Button>
                            <div />
                        </div>
                        <div className="d-flex my-2 gap-2">
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" as={CustomToggle} className='w-100'>
                                    <div className='d-flex justify-content-between dropdown-size'>
                                        {addCity}
                                        <span className='ms-5'>&#x25bc;</span>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu as={CustomMenu}>
                                    {city.map((e, i) => (
                                        <Dropdown.Item key={i} href="#" onClick={() => setAddCity(e.city_name)}>{e.city_name}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                            <Button variant='warning'>Edit</Button>
                            <Button variant='danger'>Delete</Button>
                            <Button variant='primary'>Add District</Button>
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
                                <tr>
                                    <td>1</td>
                                    <td>Bojongsoang</td>
                                    <td>
                                        <Button variant='warning'>Edit</Button>
                                        <Button variant='danger'>Delete</Button>
                                    </td>

                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td></td>
                                    <td></td>

                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>


                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add City</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" className='w-100 px-2' placeholder='City Name' value={addCity} onChange={(e) => {
                            setAddCity(e.target.value);
                        }} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => handleCreateCity()}>
                            Create
                        </Button>
                    </Modal.Footer>
                </Modal>


            </div>
        </>
    )
}

export default ManageKota