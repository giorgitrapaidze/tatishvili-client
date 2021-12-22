// src/pages/ProjectListPage.js

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Icofont from "react-icofont";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
const API_URL = "http://localhost:5005";

function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const [searchInput, setInput] = useState("");

  const getAllDoctors = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/doctors`);
      console.log(response.data);
      setDoctors(response.data);
      setAllDoctors(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (event) => {
    setInput(event.target.value);
    let filteredDoctors = allDoctors.filter((doctor) => {
      let doctorName = "";
      if (doctor.name) {
        doctorName = doctor.name.toLowerCase();
      }
      return doctorName.includes(event.target.value.toLowerCase());
    });
    setDoctors(filteredDoctors);
  };

  const handleFilter = (event) => {
    let categoryDoctors = allDoctors.filter((doctor) => {
      return doctor.category === event;
    });
    setDoctors(categoryDoctors);
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllDoctors();
  }, []);

  return (
    <div className="home-page">
      <Col xs={3}>
        <div className="sidebar">
          <Form.Label>Search by Name</Form.Label>
          <Form.Control
            value={searchInput}
            onChange={handleInput}
            type="text"
            placeholder="Search"
            style={{ marginTop: "140px" }}
          />
          <div className="categories">
            <Button onClick={getAllDoctors}>
              <Icofont icon="ui-add" />
              All Doctors
            </Button>
            <Button
              value="Gynaecology"
              onClick={(e) => handleFilter(e.target.value)}
            >
              <Icofont icon="female" />
              Gineaceology
            </Button>
            <Button
              value="Gastroenterology"
              onClick={(e) => handleFilter(e.target.value)}
            >
              <Icofont icon="capsule" />
              Gastroenterology
            </Button>
            <Button
              value="Dermatology"
              onClick={(e) => handleFilter(e.target.value)}
            >
              <Icofont icon="herbal" />
              Dermatology
            </Button>
            <Button
              value="Cardiology"
              onClick={(e) => handleFilter(e.target.value)}
            >
              <Icofont icon="heart-beat-alt" />
              Cardiology
            </Button>
            <Button
              value="Laboratory"
              onClick={(e) => handleFilter(e.target.value)}
            >
              <Icofont icon="laboratory" />
              Laboratory
            </Button>
            <Button
              value="Neurology"
              onClick={(e) => handleFilter(e.target.value)}
            >
              <Icofont icon="brain-alt" />
              Neurology
            </Button>
            <Button
              value="Pediatry"
              onClick={(e) => handleFilter(e.target.value)}
            >
              <Icofont icon="children-care" />
              Pediatry
            </Button>
            <Button
              value="Radiology"
              onClick={(e) => handleFilter(e.target.value)}
            >
              <Icofont icon="xray" />
              Radiology
            </Button>
            <Button
              value="Physical therapy"
              onClick={(e) => handleFilter(e.target.value)}
            >
              <Icofont icon="stretcher" />
              Physical therapy
            </Button>
            <Button
              value="Rheumatology"
              onClick={(e) => handleFilter(e.target.value)}
            >
              <Icofont icon="crutches" />
              Rheumatology
            </Button>
            <Button
              value="Traumatology"
              onClick={(e) => handleFilter(e.target.value)}
            >
              <Icofont icon="icu" />
              Traumatology
            </Button>
            <Button
              value="Maxillofacial Surgery"
              onClick={(e) => handleFilter(e.target.value)}
            >
              <Icofont icon="surgeon" />
              Surgery
            </Button>
            <Button
              value="Hepatology"
              onClick={(e) => handleFilter(e.target.value)}
            >
              <Icofont icon="drug" />
              Hepatology
            </Button>
          </div>
        </div>
      </Col>
      <Col xs={9}>
        {" "}
        <div className="doctors-list">
          {doctors.map((doctor) => {
            return (
              <div className="doctor-card" key={doctor._id}>
                <img className="doctor-img" src={doctor.image} alt="" />
                <h3>{doctor.name}</h3>
                <div className="doctor-category">
                  <Icofont size="40" icon={doctor.icon} />
                  <h4>{doctor.category}</h4>
                </div>
                <Link className="doctor-book" to={`/doctors/${doctor._id}`}>
                  <Button>Book Appointment</Button>
                </Link>
              </div>
            );
          })}
        </div>
      </Col>
    </div>
  );
}

export default DoctorsPage;
