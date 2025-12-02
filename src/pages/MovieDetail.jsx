import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5079/api/Movies/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        return response.json();
      })
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Navbar pageName="Movie Details" />
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

  if (error) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Navbar pageName="Movie Details" />
        <Container fluid className="flex-grow-1 py-4 px-5">
          <Alert variant="danger">Error: {error}</Alert>
          <Button onClick={() => navigate(-1)}>Back to Browse</Button>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar pageName="Movie Details" />
      <Container fluid className="flex-grow-1 py-4 px-5">
        <Button
          variant="secondary"
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          ← Back to Browse
        </Button>

        <Row>
          <Col md={4}>
            <div
              style={{
                backgroundColor: "#e0e0e0",
                height: "500px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span className="text-muted">No Poster</span>
            </div>
          </Col>
          <Col md={8}>
            <h1>{movie.title || movie.primaryTitle}</h1>
            <Card className="mt-3">
              <Card.Body>
                <h5>Movie Information</h5>
                <p>
                  <strong>Type:</strong> Movie
                </p>
                <p>
                  <strong>ID:</strong> {movie.id || movie.tconst}
                </p>
                {movie.releaseYear && (
                  <p>
                    <strong>Release Year:</strong> {movie.releaseYear}
                  </p>
                )}
                {movie.runtime && (
                  <p>
                    <strong>Runtime:</strong> {movie.runtime} minutes
                  </p>
                )}
                {movie.genres && (
                  <p>
                    <strong>Genres:</strong> {movie.genres}
                  </p>
                )}
                {movie.rating && (
                  <p>
                    <strong>Rating:</strong> {movie.rating}/10
                  </p>
                )}
                {movie.plot && (
                  <>
                    <h5 className="mt-4">Plot</h5>
                    <p>{movie.plot}</p>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default MovieDetail;
