import React, { useState } from "react";
import { Spinner, Alert, Row, Col, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useUserSearchHistory from "../../hooks/useUserSearchHistory";
import ProfilePanel from "../ProfilePanel";

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

      {history.length > 0 && (
        <Row xs={1} md={2} lg={3} className="g-3">
          {history.map(item => (
            <Col key={item.tconst}>
              <div
                className="border rounded p-3 h-100"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/movie/${item.tconst}`)}
              >
                <strong>{item.title}</strong>
                <div className="text-muted small">
                  {new Date(item.visitedAt).toLocaleString()}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}

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
