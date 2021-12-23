import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
const API_URL = process.env.REACT_APP_SERVER_URL;

function ProfilePage() {
  const [bookings, setBookings] = useState([]);
  const { logInUser, user } = useContext(AuthContext);
  const [visibility, showEdit] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const getAllBookings = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/bookings/${user._id}`);
      setBookings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (event) => {
    //  <== ADD
    try {
      // Make a DELETE request to delete the project
      await axios.delete(`${API_URL}/api/booking/${event}`);
      getAllBookings();
      // Once the delete request is resolved successfully
      // navigate back to the list of projects.
    } catch (error) {
      console.log(error);
    }
  };

  const toggleEdit = () => {
    showEdit(!visibility);
  };

  const handleName = (event) => setName(event.target.value);
  const handleEmail = (event) => setEmail(event.target.value);

  const handleSubmit = async (e) => {
    // <== ADD
    try {
      e.preventDefault();

      const requestBody = { email, name };
      const authToken = localStorage.getItem("authToken");
      const response = await axios.put(
        `${API_URL}/api/users/current`,
        requestBody,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      const token = response.data.authToken;
      logInUser(token);

      navigate("/profile");
      setUsername(response.data.name);

      // Reset the state
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  return (
    <div className="main">
      {user && <h1 id="user-greeting">Hello {user.name || username}</h1>}
      <Button onClick={toggleEdit}>
        {visibility ? "Hide Edit" : "Edit Profile"}
      </Button>
      {visibility && (
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            required
            placeholder={user.name}
            type="text"
            onChange={handleName}
          />
          <label>Email</label>
          <input
            required
            placeholder={user.email}
            type="text"
            onChange={handleEmail}
          />
          <Button type="submit">Save</Button>
        </form>
      )}
      <Container>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Doctor</th>
              <th>Time</th>
              <th>Booked at</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {bookings &&
              bookings.map((booking, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{booking.doctorname}</td>
                    <td>{booking.time}</td>
                    <td>{booking.createdAt}</td>
                    <td>
                      <Button
                        class="myclass"
                        value="Delete"
                        onClick={() => handleDelete(booking._id.toString())}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default ProfilePage;
