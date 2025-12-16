import React, { useState } from "react";
import { Spinner, Alert, Row, Col, Pagination, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useUserSearchHistory from "../../hooks/useUserSearchHistory";
import ProfilePanel from "../ProfilePanel";

/*
  UserSearchHistoryPanel
  - Simple, log-like presentation
  - Clickable rows
  - Pagination kept minimal
*/

const PAGE_SIZE = 20;

export default function UserSearchHistoryPanel() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { history, total, loading, error } =
    useUserSearchHistory({ page, pageSize: PAGE_SIZE });

  const totalPages = Math.ceil(total / PAGE_SIZE);

  if (loading) return <Spinner />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <ProfilePanel title="Search history">
      {!history.length && (
        <p className="text-muted">
          Your search history will appear here.
        </p>
      )}

      <Row xs={1} md={2} className="g-3">
        {history.map(item => (
          <Col key={item.tconst}>
            <Card
              role="button"
              className="h-100"
              onClick={() =>
                navigate(`/movie/${item.tconst}`)
              }
            >
              <Card.Body>
                <strong>{item.title}</strong>
                <div className="text-muted small mt-1">
                  {new Date(item.visitedAt).toLocaleString()}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.Prev
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
            />
            <Pagination.Next
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
            />
          </Pagination>
        </div>
      )}
    </ProfilePanel>
  );
}
