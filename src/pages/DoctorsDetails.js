// src/pages/ProjectListPage.js

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Icofont from "react-icofont";

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";

function DoctorsDetails() {
  const [doctor, setDoctor] = useState(null);
  const { user, isLoggedIn } = useContext(AuthContext);
  const [time, setTime] = useState("");
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [doctorname, setDoctorName] = useState(null);

  const getDoctor = async () => {
    //  <== ADD A NEW FUNCTION
    try {
      const response = await axios.get(`${API_URL}/api/doctor/${doctorId}`);
      setDoctor(response.data);
      setDoctorName(response.data.name);
    } catch (error) {
      console.log(error);
    }
  };

  function handleClick() {
    navigate("/doctors");
  }

  function handleLogin() {
    navigate("/login");
  }

  useEffect(() => {
    // <== ADD AN EFFECT
    getDoctor();
  }, []);

  const handleSubmit = async (e) => {
    // <== ADD
    try {
      e.preventDefault();

      const requestBody = { user, doctorname, time };
      const response = await axios.post(`${API_URL}/api/booking`, requestBody);

      // Reset the state
      setTime("");
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Button id="all-doctors" onClick={handleClick}>
        All doctors
      </Button>
      <Row xs="auto">
        <Col xs={6}>
          {doctor && (
            <div className="doctor-card" key={doctor._id}>
              <img className="doctor-img" src={doctor.image} alt="" />
              <h3>{doctor.name}</h3>
              <div className="doctor-category">
                <Icofont size="40" icon={doctor.icon} />
                <h4>{doctor.category}</h4>
              </div>
            </div>
          )}
        </Col>
        <Col xs={6}>
          {isLoggedIn && (
            <form className="appointment" onSubmit={handleSubmit}>
              <label>Pick Date and Time</label>
              <input
                type="datetime-local"
                name="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              <button id="all-doctors" type="submit">
                Submit
              </button>
            </form>
          )}
          {!isLoggedIn && (
            <div className="booking">
              <h5>Log in to Make a booking</h5>
              <Button id="all-doctors" onClick={handleLogin}>
                Log In
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default DoctorsDetails;
