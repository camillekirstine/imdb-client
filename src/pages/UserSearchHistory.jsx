import { useState, useEffect } from "react";
import { Card, Row, Col, Spinner, Alert, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../utils/authFetch";

function UserSearchHistory() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    fetchSearchHistory();
  }, [page]);

  const fetchSearchHistory = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/user/login");
      return;
    }

    try {
      const response = await authFetch(
        `http://localhost:5079/api/SearchHistory?page=${page}&pageSize=${pageSize}`
      );

      if (response.ok) {
        const result = await response.json();
        setHistory(result.data || []);
        setTotalPages(Math.ceil((result.total || 0) / pageSize));
      } else {
        throw new Error("Failed to fetch search history");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = async (item) => {
    const tconst = item.tconst;

    // Fetch title details to determine type
    try {
      const response = await fetch(
        `http://localhost:5079/api/Movies/${tconst}`
      );
      if (response.ok) {
        const data = await response.json();
        const titleType = data.titleType || "";

        if (titleType === "tvSeries" || titleType === "tvMiniSeries") {
          navigate(`/series/${tconst}`);
        } else if (titleType === "tvEpisode") {
          navigate(`/episode/${tconst}`);
        } else {
          navigate(`/movie/${tconst}`);
        }
      } else {
        navigate(`/movie/${tconst}`);
      }
    } catch (err) {
      console.error("Failed to fetch title type:", err);
      navigate(`/movie/${tconst}`);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  return (
    <Card>
      <Card.Body>
        <h4 className="mb-3">Search History</h4>
        {history.length === 0 ? (
          <p className="text-muted">Your search history will appear here.</p>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-3">
            {history.map((item, index) => (
              <Col key={index}>
                <Card
                  className="h-100"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleItemClick(item)}
                >
                  <Card.Body>
                    <Card.Title style={{ fontSize: "1rem" }}>
                      {item.title}
                    </Card.Title>
                    <Card.Text className="text-muted small mb-1">
                      ID: {item.tconst}
                    </Card.Text>
                    <Card.Text className="text-muted small">
                      Searched: {formatDate(item.visitedAt)}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <Pagination>
              <Pagination.First
                onClick={() => setPage(1)}
                disabled={page === 1}
              />
              <Pagination.Prev
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              />

              {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                // Show first page, last page, current page, and pages around current
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= page - 2 && pageNum <= page + 2)
                ) {
                  return (
                    <Pagination.Item
                      key={pageNum}
                      active={pageNum === page}
                      onClick={() => setPage(pageNum)}
                    >
                      {pageNum}
                    </Pagination.Item>
                  );
                } else if (pageNum === page - 3 || pageNum === page + 3) {
                  return <Pagination.Ellipsis key={pageNum} disabled />;
                }
                return null;
              })}

              <Pagination.Next
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
              />
              <Pagination.Last
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages}
              />
            </Pagination>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserSearchHistory;
