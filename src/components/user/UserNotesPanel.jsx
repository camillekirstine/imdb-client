import { Spinner, Card, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserNotesWithMedia from "../../hooks/useUserNotesWithMedia";
import MovieCard from "../movies/MovieCard";
import PersonCard from "../people/PersonCard";
import ProfilePanel from "../ProfilePanel";

/*
  UserNotesPanel
  - Notes are always tied to media
  - Editing is inline and non-destructive
*/

const CARD_HEIGHT = 420;

export default function UserNotesPanel() {
  const { items, loading, update, remove } =
    useUserNotesWithMedia();

  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState("");
  const navigate = useNavigate();

  if (loading) return <Spinner />;

  if (!items.length) {
    return (
      <ProfilePanel title="Notes">
        <p className="text-muted">
          You have not written any notes yet.
        </p>
      </ProfilePanel>
    );
  }

  async function save(noteId) {
    if (!draft.trim()) return;
    await update(noteId, draft);
    cancelEdit();
  }

  function startEdit(note) {
    setEditingId(note.noteId);
    setDraft(note.content);
  }

  function cancelEdit() {
    setEditingId(null);
    setDraft("");
  }

  return (
    <ProfilePanel title="Notes">
      <div className="movie-grid">
        {items.map(({ note, media, type }) => {
          const isEditing = editingId === note.noteId;

          return (
            <Card
              key={note.noteId}
              style={{ height: CARD_HEIGHT }}
            >
              {type === "title" ? (
                <MovieCard
                  movie={media}
                  onClick={() =>
                    navigate(`/movie/${media.tconst}`)
                  }
                />
              ) : (
                <PersonCard person={media} />
              )}

              <Card.Body className="d-flex flex-column">
                {isEditing ? (
                  <>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      className="mb-2"
                      autoFocus
                    />

                    <div className="mt-auto">
                      <Button
                        size="sm"
                        className="w-100 mb-2"
                        onClick={() => save(note.noteId)}
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        className="w-100"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="small clamp-3 mb-3">
                      {note.content}
                    </p>

                    <div className="mt-auto">
                      <Button
                        size="sm"
                        variant="outline-primary"
                        className="w-100 mb-2"
                        onClick={() => startEdit(note)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        className="w-100"
                        onClick={() => remove(note.noteId)}
                      >
                        Delete
                      </Button>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </ProfilePanel>
  );
}
