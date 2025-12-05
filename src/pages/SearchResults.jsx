import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Row, Col, Alert } from "react-bootstrap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { query, results } = location.state || { query: "", results: [] };

  const handleResultClick = async (result) => {
    const tconst = result.tconst;
    let titleType = result.titleType;

    // If titleType is not in the result, fetch it
    if (!titleType) {
      try {
        const response = await fetch(
          `http://localhost:5079/api/Movies/${tconst}`
        );
        if (response.ok) {
          const data = await response.json();
          titleType = data.titleType || "";
        }
      } catch (err) {
        console.error("Failed to fetch title type:", err);
      }
    }

    // Route based on titleType
    if (titleType === "tvSeries" || titleType === "tvMiniSeries") {
      navigate(`/series/${tconst}`);
    } else if (titleType === "tvEpisode") {
      navigate(`/episode/${tconst}`);
    } else {
      // Default to movie
      navigate(`/movie/${tconst}`);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <Container fluid className="flex-grow-1 py-4 px-5">
        <h2 className="mb-4">Search Results for "{query}"</h2>

        {results.length === 0 ? (
          <Alert variant="info">
            No results found for "{query}". Try a different search term.
          </Alert>
        ) : (
          <>
            <p className="text-muted mb-3">
              Found {results.length} result{results.length !== 1 ? "s" : ""}
            </p>
            <Row xs={1} md={2} lg={3} className="g-3">
              {results.map((result) => (
                <Col key={result.tconst}>
                  <Card
                    className="h-100"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleResultClick(result)}
                  >
                    <Card.Body>
                      <Card.Title>{result.primaryTitle}</Card.Title>
                      {result.matchCount !== null &&
                        result.matchCount !== undefined && (
                          <Card.Text className="text-muted">
                            Match count: {result.matchCount}
                          </Card.Text>
                        )}
                      <Card.Text className="text-muted small">
                        ID: {result.tconst}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
      <Footer />
    </div>
  );
}

export default SearchResults;
