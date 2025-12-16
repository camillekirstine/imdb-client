import React from "react";
import useUserBookmarks from "../../hooks/useUserBookmarks";
import { Spinner, Alert, Button, Card } from "react-bootstrap";
import MovieCard from "../movies/MovieCard";
import PersonCard from "../people/PersonCard";
import ProfilePanel from "../ProfilePanel";

export default function UserBookmarksPanel() {
  const { items, loading, error, removeBookmark } = useUserBookmarks();

  if (loading) return <Spinner />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  const titleBookmarks = items.filter(i => i.movie);
  const personBookmarks = items.filter(i => i.person);

  return (
    <ProfilePanel title="Bookmarks">
      {!items.length && (
        <p className="text-muted">No bookmarks yet.</p>
      )}

      {titleBookmarks.length > 0 && (
        <>
          <h6 className="mb-2">Titles</h6>
          <div className="d-flex flex-wrap gap-3 mb-4">
            {titleBookmarks.map(({ movie, bookmarkId }) => (
              <Card key={bookmarkId} style={{ width: 220 }}>
                <MovieCard movie={movie} />
                <Card.Body className="pt-2">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="w-100"
                    onClick={() => removeBookmark(bookmarkId)}
                  >
                    Remove bookmark
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </>
      )}

      {personBookmarks.length > 0 && (
        <>
          <h6 className="mb-2">People</h6>
          <div className="d-flex flex-wrap gap-3">
            {personBookmarks.map(({ person, bookmarkId }) => (
              <Card key={bookmarkId} style={{ width: 220 }}>
                <PersonCard person={person} showJobBadge />
                <Card.Body className="pt-2">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="w-100"
                    onClick={() => removeBookmark(bookmarkId)}
                  >
                    Remove bookmark
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </>
      )}
    </ProfilePanel>
  );
}
