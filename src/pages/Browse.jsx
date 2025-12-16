import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useMoviesList from "../hooks/useMoviesList";

import {
  Container,
  Spinner,
  Alert,
  Pagination,
  Button,
  Form,
  ButtonGroup,
  Card,
} from "react-bootstrap";

import MovieCard from "../components/movies/MovieCard";
import { buildPageButtons } from "./ListPageHelpers";

/*
  Browse
  - Main discovery page
*/

const GENRES = [
  "All", "Fantasy", "Game-Show", "Adventure", "Documentary", "Family",
  "Action", "Animation", "Music", "Reality-TV", "Sport", "Comedy",
  "Western", "Short", "Crime", "Horror", "War", "Adult", "News",
  "Talk-Show", "Musical", "Romance", "Biography", "Thriller",
  "History", "Drama", "Mystery", "Sci-Fi",
];

export default function Browse({ defaultType = "all" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const search = new URLSearchParams(location.search);

  const [page, setPage] = useState(
    () => parseInt(search.get("page") || "1", 10)
  );
  const [contentType, setContentType] = useState(
    search.get("type") || defaultType
  );
  const [genre, setGenre] = useState(
    search.get("genre") || "All"
  );
  const [sort, setSort] = useState(
    search.get("sort") || "default"
  );

  const params = {
    page,
    pageSize: 18,
    type: contentType === "all" ? undefined : contentType,
    genre: genre !== "All" ? genre : undefined,
    sort: sort !== "default" ? sort : undefined,
  };

  const { list, loading, totalPages, total } =
    useMoviesList(params);

  /* ---------------------------
     Sync filters to URL
  ---------------------------- */
  useEffect(() => {
    const qs = new URLSearchParams();
    qs.set("page", String(page));
    qs.set("type", contentType);
    if (genre !== "All") qs.set("genre", genre);
    if (sort !== "default") qs.set("sort", sort);

    navigate({ search: `?${qs.toString()}` }, { replace: true });
  }, [page, contentType, genre, sort, navigate]);

  useEffect(() => {
    setPage(1);
  }, [contentType, genre, sort]);

  const title =
    contentType === "movie"
      ? "Movies"
      : contentType === "series"
      ? "Series"
      : "All titles";

  return (
    <Container fluid className="px-4 px-lg-5 py-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="mb-1">{title}</h2>
        {!loading && (
          <div className="text-muted">
            Showing {list.length} of {total ?? "unknown"}
          </div>
        )}
      </div>

      {/* Filters */}
      <Card className="mb-4">
        <Card.Body className="d-flex flex-wrap gap-4 align-items-end">
        <Form.Group className="d-flex flex-column">
  <Form.Label>Type</Form.Label>

  <ButtonGroup>
    <Button
      variant={contentType === "all" ? "primary" : "outline-primary"}
      onClick={() => setContentType("all")}
    >
      All
    </Button>
    <Button
      variant={contentType === "movie" ? "primary" : "outline-primary"}
      onClick={() => setContentType("movie")}
    >
      Movies
    </Button>
    <Button
      variant={contentType === "series" ? "primary" : "outline-primary"}
      onClick={() => setContentType("series")}
    >
      Series
    </Button>
  </ButtonGroup>
</Form.Group>

          

          <Form.Group>
            <Form.Label>Genre</Form.Label>
            <Form.Select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              {GENRES.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Sort</Form.Label>
            <Form.Select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="top-rated">Top rated</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </Form.Select>
          </Form.Group>
        </Card.Body>
      </Card>

      {/* Results */}
      {loading && (
        <div className="text-center py-5">
          <Spinner />
        </div>
      )}

      {!loading && list.length === 0 && (
        <Alert variant="info">
          No results found.
        </Alert>
      )}

      {!loading && list.length > 0 && (
        <>
          <div className="movie-grid">
            {list.map((item) => (
              <MovieCard
                key={item.tconst ?? item.id}
                movie={item}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                <Pagination.Prev
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                />

                {buildPageButtons(page, totalPages).map((p, i) =>
                  p === "ellipsis" ? (
                    <Pagination.Ellipsis key={i} disabled />
                  ) : (
                    <Pagination.Item
                      key={p}
                      active={p === page}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </Pagination.Item>
                  )
                )}

                <Pagination.Next
                  disabled={page >= totalPages}
                  onClick={() => setPage(page + 1)}
                />
              </Pagination>
            </div>
          )}
        </>
      )}
    </Container>
  );
}
