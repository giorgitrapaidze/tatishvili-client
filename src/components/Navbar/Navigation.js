import { Link } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";

function Navigation() {
  // Get the value from the context
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <Navbar sticky="top">
      <Container>
        <div className="nav">
          <Link to="/">
            <img className="logo" src="../images/tatishvililogo.png" alt="" />
          </Link>
          <div className="d-flex align-items-center">
            {user && (
              <div
                className="profile-img-wrapper"
                style={{ marginRight: "20px" }}
              >
                <Link to="/profile">
                  <img
                    className="profile-img"
                    src="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"
                    alt="profile"
                  />
                </Link>
              </div>
            )}
            {isLoggedIn && (
              <>
                <Button className="auth-button" onClick={logOutUser}>
                  Logout
                </Button>
              </>
            )}
          </div>

          {!isLoggedIn && (
            <div>
              <Link to="/signup" style={{ marginRight: "20px" }}>
                <Button className="auth-button">Sign Up</Button>
              </Link>

              <Link to="/login">
                <Button className="auth-button">Login</Button>
              </Link>
            </div>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default Navigation;
