import "../../styles/search.css";
import React, { useState,useEffect } from "react";
import { Form, Dropdown, Button } from "react-bootstrap";
import { FaSearch, FaUser } from "react-icons/fa";
import "../../styles/search.css";

const SearchBar = ({onSearch} ) => {
    const [selectedDoctor, setSelectedDoctor] = useState("All doctors");
    const [query, setQuery] = useState("");
  const [departments, setDepartments] = useState([]);
const [selectedDepartment, setSelectedDepartment] = useState(null);
const [search, setSearch] = useState("");
const [doctors, setDoctors] = useState([]);

   useEffect(() => {
    fetch("http://127.0.0.1:8000/api/departments") 
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        query: query,
        department: selectedDepartment,
      });
    }
  };
    return (
        <div className="search-container">
            <div className="search-box">
                <FaSearch className="search-icon" />
                <Form.Control
                    type="text"
                    placeholder="Search for a doctor"
                    className="search-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Dropdown className="doctor-select">
                    <Dropdown.Toggle
                        id="dropdown-basic"
                        className="dropdown-btn"
                    >
                        <FaUser className="me-2" />
                        <span>{selectedDoctor}</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                    {departments.map((dep) => (
          <Dropdown.Item
            key={dep.id}
            onClick={() =>{         
                   setSelectedDoctor(dep.name);
                    setSelectedDepartment(dep.id)}}
          >
            {dep.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
                <Button className="search-btn" onClick={handleSearch}>Search</Button>
            </div>
        </div>
    );
};

export default SearchBar;
