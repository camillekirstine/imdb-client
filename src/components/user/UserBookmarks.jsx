import React from "react";
import useUserBookmarks from "../../hooks/useUserBookmarks";
import { Spinner, Alert, Button, Card } from "react-bootstrap";
import MovieCard from "../movies/MovieCard";
import PersonCard from "../people/PersonCard";
import ProfilePanel from "../ProfilePanel";

/*
  UserBookmarksPanel
  - Shows all saved bookmarks
*/

export default function UserBookmarksPanel() {
  const { items, loading, error, removeBookmark } = useUserBookmarks();

  if (loading) return <Spinner />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  const titleBookmarks = items.filter(i => i.movie);
  const personBookmarks = items.filter(i => i.person);

  return (
    <ProfilePanel title="Bookmarks">
      {!items.length && (
        <p className="text-muted">
          You have not bookmarked anything yet.
        </p>
      )}

      {titleBookmarks.length > 0 && (
        <>
          <h6 className="mb-3">Titles</h6>

          <div className="movie-grid mb-5">
            {titleBookmarks.map(({ movie, bookmarkId }) => (
              <Card key={bookmarkId}>
                <MovieCard movie={movie} />
                <Card.Body>
                  <Button
                    size="sm"
                    variant="outline-danger"
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
          <h6 className="mb-3">People</h6>

          <div className="movie-grid">
            {personBookmarks.map(({ person, bookmarkId }) => (
              <Card key={bookmarkId}>
                <PersonCard person={person} showJobBadge />
                <Card.Body>
                  <Button
                    size="sm"
                    variant="outline-danger"
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
