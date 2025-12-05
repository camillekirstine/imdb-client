import { useState, useEffect } from "react";
import { Container, Spinner, Form } from "react-bootstrap";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function UserProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const getCurrentTab = () => {
    if (location.pathname.includes("/ratings")) return "ratings";
    if (location.pathname.includes("/bookmarks")) return "bookmarks";
    if (location.pathname.includes("/history")) return "history";
    return "profile";
  };

  const handleTabChange = (value) => {
    switch (value) {
      case "profile":
        navigate("/user");
        break;
      case "ratings":
        navigate("/user/ratings");
        break;
      case "bookmarks":
        navigate("/user/bookmarks");
        break;
      case "history":
        navigate("/user/history");
        break;
      default:
        navigate("/user");
    }
  };

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("authToken");

    if (!token) {
      // Redirect to login if not authenticated
      navigate("/user/login");
      return;
    }

    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <Container fluid className="flex-grow-1 py-4 px-5">
          <div className="text-center py-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <Container fluid className="flex-grow-1 py-4 px-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">My Profile</h2>
          <Form.Select
            style={{ width: "200px" }}
            value={getCurrentTab()}
            onChange={(e) => handleTabChange(e.target.value)}
          >
            <option value="profile">Profile Details</option>
            <option value="ratings">Ratings</option>
            <option value="bookmarks">Bookmarks</option>
            <option value="history">Search History</option>
          </Form.Select>
        </div>

        <Outlet />
      </Container>
      <Footer />
    </div>
  );
}

export default UserProfile;
