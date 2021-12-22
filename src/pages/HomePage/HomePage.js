import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
function HomePage() {
  const navigate = useNavigate();

  function goToDoctors() {
    navigate("/doctors");
  }
  return (
    <div className="home-page single-height">
      <div className="home-heading">
        <h1>David Tatishvili Health Center</h1>
        <Button id="home-button" onClick={goToDoctors}>
          Our Doctors
        </Button>
      </div>
    </div>
  );
}

export default HomePage;
