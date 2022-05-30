import React, { useState } from 'react';
import { Table, Button, FormControl, Dropdown } from "react-bootstrap";
import "../styles/dasboardAdmin.css";
import user from "../images/user.png";

function ManageKota() {

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
                            <Button variant='primary'>Add City</Button>
                            <div />
                        </div>
                        <div className="d-flex my-2 gap-2">
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" as={CustomToggle}>
                                    City
                                    <span className='ms-5'>&#x25bc;</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu as={CustomMenu}>
                                    <Dropdown.Item href="#">Bandung</Dropdown.Item>
                                    <Dropdown.Item href="#">Jakarta</Dropdown.Item>
                                    <Dropdown.Item href="#">Yogyakarta</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" as={CustomToggle}>
                                    District
                                    <span className='ms-5'>&#x25bc;</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu as={CustomMenu}>
                                    <Dropdown.Item href="#">Bandung</Dropdown.Item>
                                    <Dropdown.Item href="#">Jakarta</Dropdown.Item>
                                    <Dropdown.Item href="#">Yogyakarta</Dropdown.Item>
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
            </div>
        </>
    )
}

export default ManageKota