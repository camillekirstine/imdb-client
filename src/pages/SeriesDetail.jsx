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
  ListGroup,
} from "react-bootstrap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function SeriesDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [series, setSeries] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    // Fetch both series details and cast in parallel
    Promise.all([
      fetch(`http://localhost:5079/api/Movies/${id}`),
      fetch(`http://localhost:5079/api/Movies/${id}/cast`),
    ])
      .then(([seriesRes, castRes]) => {
        if (!seriesRes.ok) {
          throw new Error("Failed to fetch series details");
        }
        if (!castRes.ok) {
          throw new Error("Failed to fetch cast");
        }
        return Promise.all([seriesRes.json(), castRes.json()]);
      })
      .then(([seriesData, castData]) => {
        setSeries(seriesData);
        const rawCast = Array.isArray(castData)
          ? castData
          : castData.cast || castData.data || [];

        // Consolidate cast by nconst
        const castMap = new Map();
        rawCast.forEach((member) => {
          const key = member.nconst;
          if (castMap.has(key)) {
            const existing = castMap.get(key);
            // Collect all character names
            if (member.characterName && member.characterName.trim()) {
              existing.characterNames.push(member.characterName);
            }
            // Collect all jobs
            if (member.job && member.job.trim()) {
              existing.jobs.add(member.job.trim());
            }
          } else {
            castMap.set(key, {
              nconst: member.nconst,
              name: member.name,
              primaryName: member.primaryName,
              characterNames:
                member.characterName && member.characterName.trim()
                  ? [member.characterName]
                  : [],
              jobs: new Set(
                member.job && member.job.trim() ? [member.job.trim()] : []
              ),
              category: member.category,
            });
          }
        });

        // Convert to array and process character names
        const consolidatedCast = Array.from(castMap.values()).map((member) => ({
          ...member,
          allCharacters: member.characterNames
            .map((char) =>
              char
                .replace(/^\[|\]$/g, "")
                .replace(/'/g, "")
                .split(",")
                .map((c) => c.trim())
                .filter((c) => c)
            )
            .flat()
            .filter((char, idx, arr) => arr.indexOf(char) === idx) // Remove duplicates
            .join(", "),
          allJobs: Array.from(member.jobs).join(", "),
        }));

        setCast(consolidatedCast);
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
        <Navbar pageName="Series Details" />
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
        <Navbar pageName="Series Details" />
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
      <Navbar pageName="Series Details" />
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
            <h1>{series.title || series.primaryTitle}</h1>
            <Card className="mt-3">
              <Card.Body>
                <h5>Series Information</h5>
                <p>
                  <strong>Type:</strong> Series
                </p>
                <p>
                  <strong>ID:</strong> {series.id || series.tconst}
                </p>
                {series.startYear && (
                  <p>
                    <strong>Start Year:</strong> {series.startYear}
                  </p>
                )}
                {series.endYear && (
                  <p>
                    <strong>End Year:</strong> {series.endYear}
                  </p>
                )}
                {series.genres && (
                  <p>
                    <strong>Genres:</strong> {series.genres}
                  </p>
                )}
                {series.rating && (
                  <p>
                    <strong>Rating:</strong> {series.rating}/10
                  </p>
                )}
                {series.plot && (
                  <>
                    <h5 className="mt-4">Plot</h5>
                    <p>{series.plot}</p>
                  </>
                )}
              </Card.Body>
            </Card>

            {series.seasons && (
              <Card className="mt-3">
                <Card.Body>
                  <h5>Seasons</h5>
                  <ListGroup variant="flush">
                    {series.seasons.map((season) => (
                      <ListGroup.Item key={season.id}>
                        Season {season.number} - {season.episodeCount} episodes
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>

        {cast.length > 0 && (
          <Row className="mt-4">
            <Col>
              <h4 className="mb-3">Cast</h4>
              <Row xs={2} md={3} lg={6} className="g-3">
                {cast.slice(0, 12).map((member, index) => (
                  <Col key={index}>
                    <Card className="h-100">
                      <div
                        style={{
                          backgroundColor: "#e0e0e0",
                          height: "180px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span className="text-muted">No Photo</span>
                      </div>
                      <Card.Body className="p-2">
                        <Card.Title
                          style={{
                            fontSize: "0.9rem",
                            marginBottom: "0.25rem",
                          }}
                        >
                          {member.primaryName || member.name}
                        </Card.Title>
                        <Card.Text
                          style={{ fontSize: "0.8rem" }}
                          className="text-muted mb-0"
                        >
                          {member.allCharacters && (
                            <div>
                              <strong>Roles:</strong> {member.allCharacters}
                            </div>
                          )}
                          {member.allJobs && (
                            <div>
                              <strong>Job:</strong> {member.allJobs}
                            </div>
                          )}
                          {!member.allCharacters &&
                            !member.allJobs &&
                            member.category && <div>{member.category}</div>}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        )}
      </Container>
      <Footer />
    </div>
  );
}

export default SeriesDetail;
