import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Form,
  FormControl,
  Table,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import axios from "axios";
import "../styles/listkosan.css";
import { useNavigate } from "react-router-dom";
import { URL } from "../components/URL";

function ListKosan() {
  const [listKosts, setListKosts] = useState([]);
  const [city, setCity] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `${URL}/houses`,

          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const { data: response2 } = await axios.get(
          `${URL}/cities`,

          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        setListKosts(response.data);
        setCity(response2.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // DROPDOWN
  const getHouseByCity = async (id) => {
    try {
      const { data: response } = await axios.get(
        `${URL}/cities/${id}/districts/houses`,

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      setListKosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // search
  const handleSearchPosts = (input) => {
    const filter = listKosts.filter((el) => {
      if (el.title.toLowerCase().indexOf(input.toLowerCase()) > -1) {
        return true;
      } else {
        return false;
      }
    });

    setFilteredPosts(filter);
  };

  const returnDataPosts = () => {
    if (searchInput.length > 0) {
      return filteredPosts;
    } else {
      return listKosts;
    }
  };

  return (
    <div>
      <div className="container pt-5">
        <div className="listkosan-row">
          <div className="col-12">
            <h4 className="my-5">List Boarding House</h4>
            <div className="d-flex gap-3">
              <ButtonGroup className="mb-3">
                <DropdownButton
                  as={ButtonGroup}
                  title="Sort by City"
                  id="bg-nested-dropdown"
                  variant="light"
                  style={{ cursor: "pointer" }}
                >
                  {city.map((el, i) => (
                    <Dropdown.Item
                      key={i}
                      onClick={() => getHouseByCity(el.id)}
                    >
                      {el.city_name}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </ButtonGroup>
              <Form>
                <FormControl
                  id="formControl"
                  type="text"
                  placeholder="Search Boarding House"
                  onChange={(e) => {
                    setSearchInput(e.target.value);

                    handleSearchPosts(e.target.value);
                  }}
                />
              </Form>
            </div>

            <Table striped bordered hover>
              <thead className="text-center">
                <tr>
                  <th>No</th>
                  <th>Boarding House</th>
                  <th>District</th>
                  <th>Owner</th>
                  <th>Contact</th>
                  <th>Transaction</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {returnDataPosts()?.map((el, i) => (
                  <tr style={{ cursor: "pointer" }} key={i}>
                    <td>{i + 1}</td>
                    <td>{el.title}</td>
                    <td>{el.district}</td>
                    <td>{el.owner_name}</td>
                    <td>{el.owner_phone}</td>
                    <td>
                      <Button
                        className="btn btn-primary"
                        onClick={() => {
                          navigate(`/list-room/${el.house_id}`);
                        }}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListKosan;
