import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
const API_URL = process.env.REACT_APP_SERVER_URL;

function ProfilePage() {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(AuthContext);

  const getAllBookings = async (user) => {
    try {
      const response = await axios.get(`${API_URL}/api/bookings/${user._id}`);
      setBookings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, [user]);

  return (
    <div className="main">
      {user && <h1 id="user-greeting">Hello {user.name}</h1>}
      <Container>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Doctor</th>
              <th>Time</th>
              <th>Booked at</th>
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
