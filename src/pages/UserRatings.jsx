import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../utils/authFetch";
import { Card, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { Trash, StarFill } from "react-bootstrap-icons";

function UserRatings() {
  const navigate = useNavigate();
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/user/login");
      return;
    }

    try {
      const response = await authFetch(
        "http://localhost:5079/api/Ratings/user"
      );

      if (response.ok) {
        const result = await response.json();
        setRatings(Array.isArray(result) ? result : []);
      } else {
        throw new Error("Failed to fetch ratings");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRating = async (ratingId) => {
    if (!window.confirm("Are you sure you want to delete this rating?")) {
      return;
    }

    try {
      const response = await authFetch(
        `http://localhost:5079/api/Ratings/${ratingId}`,
        { method: "DELETE" }
      );

      if (response.status === 204 || response.ok) {
        // Remove from local state
        setRatings(ratings.filter((r) => r.ratingId !== ratingId));
      } else {
        throw new Error("Failed to delete rating");
      }
    } catch (err) {
      console.error("Error deleting rating:", err);
      alert("Failed to delete rating");
    }
  };

  const handleNavigate = (rating) => {
    if (!rating.tconst) return;

    const isSeries =
      rating.titleType === "tvSeries" || rating.titleType === "tvMiniSeries";
    const isEpisode = rating.titleType === "tvEpisode";
    const route = isEpisode ? "episode" : isSeries ? "series" : "movie";

    navigate(`/${route}/${rating.tconst}`, {
      state: {
        from: {
          label: "My Ratings",
          path: "/user/ratings",
        },
      },
    });
  };

  if (loading) {
    return (
      <Card>
        <Card.Body>
          <div className="text-center py-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </Card.Body>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <Card.Body>
          <Alert variant="danger">{error}</Alert>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Body>
        <h4 className="mb-3">My Ratings</h4>
        {ratings.length === 0 ? (
          <p className="text-muted">You haven't rated any titles yet.</p>
        ) : (
          <Row xs={2} md={3} lg={4} xl={5} className="g-3">
            {ratings.map((rating) => (
              <Col key={rating.ratingId}>
                <Card className="h-100">
                  {rating.posterUrl && rating.posterUrl !== "N/A" ? (
                    <Card.Img
                      variant="top"
                      src={rating.posterUrl}
                      alt={rating.title}
                      style={{
                        height: "300px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() => handleNavigate(rating)}
                    />
                  ) : (
                    <div
                      style={{
                        backgroundColor: "#e0e0e0",
                        height: "300px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => handleNavigate(rating)}
                    >
                      <span className="text-muted">No Poster</span>
                    </div>
                  )}
                  <Card.Body className="d-flex flex-column">
                    <Card.Title
                      style={{
                        fontSize: "0.9rem",
                        cursor: "pointer",
                        flex: 1,
                      }}
                      onClick={() => handleNavigate(rating)}
                    >
                      {rating.title || "Unknown Title"}
                    </Card.Title>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <div className="text-warning">
                        <StarFill className="me-1" />
                        <strong>{rating.rating}/10</strong>
                      </div>
                      <small className="text-muted">
                        {new Date(rating.ratedAt).toLocaleDateString()}
                      </small>
                    </div>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteRating(rating.ratingId)}
                    >
                      <Trash className="me-1" />
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserRatings;
