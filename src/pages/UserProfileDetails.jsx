import { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PersonCircle } from "react-bootstrap-icons";

function UserProfileDetails() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <Row>
      <Col md={3} className="text-center">
        <PersonCircle size={150} className="mb-3" />
        <p className="text-muted">Profile Picture</p>
      </Col>

      <Col md={9}>
        <Card>
          <Card.Body>
            <h4 className="mb-4">Profile Details</h4>

            <Row className="mb-3">
              <Col sm={3}>
                <strong>Username:</strong>
              </Col>
              <Col sm={9}>{user?.username || "N/A"}</Col>
            </Row>

            <Row className="mb-3">
              <Col sm={3}>
                <strong>Email:</strong>
              </Col>
              <Col sm={9}>{user?.email || "N/A"}</Col>
            </Row>

            <Row className="mb-3">
              <Col sm={3}>
                <strong>Password:</strong>
              </Col>
              <Col sm={9}>********</Col>
            </Row>

            <Button
              variant="primary"
              className="mt-3"
              onClick={() => navigate("/user/edit")}
            >
              Edit Profile
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default UserProfileDetails;
