import React from "react";
import { Container, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useMoviesList from "../hooks/useMoviesList";
import MovieCard from "../components/movies/MovieCard";
import { getCardPath } from "./listPageHelpers";

/*
  Home
*/

/* ---------------------------
   Shared constants
---------------------------- */
const CARD_WIDTH = 180;
const CARD_HEIGHT = 300;

/* ---------------------------
   Helpers
---------------------------- */
const getPoster = (item) =>
  item.posterUrl || item.tmdbPoster || item.poster_path || null;

/* ---------------------------
   Skeleton placeholder
---------------------------- */
function SkeletonCard() {
  return (
    <div
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: "var(--radius-md)",
        backgroundColor: "var(--bg-surface-muted)",
      }}
    />
  );
}

/* ---------------------------
   Horizontal section row
---------------------------- */
function SectionRow({ title, params, seeMoreLink }) {
  const navigate = useNavigate();

  const { list, loading } = useMoviesList({
    ...params,
    type: "movie",
  });

  return (
    <section className="mb-5">
      {/* Section header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">{title}</h4>

        {seeMoreLink && (
          <span
            role="button"
            className="text-muted"
            onClick={() => navigate(seeMoreLink)}
          >
            See more →
          </span>
        )}
      </div>

      {/* Horizontal scroll row */}
      <div className="movie-row hide-scrollbar">
        {loading &&
          Array.from({ length: params.pageSize || 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}

        {!loading &&
          list.map((item) => {
            const path = getCardPath(item);

            return (
              <div
                key={item.tconst}
                onClick={() =>
                  navigate(path, {
                    state: { from: { label: "Home", path: "/" } },
                  })
                }
              >
                <MovieCard movie={item} />
              </div>
            );
          })}
      </div>
    </section>
  );
}

/* ---------------------------
   Featured carousel
---------------------------- */
function FeaturedCarousel() {
  const navigate = useNavigate();

  const { list, loading } = useMoviesList({
    sort: "top-rated",
    type: "movie",
    pageSize: 8,
  });

  const itemsWithImages = list.filter((i) => getPoster(i));

  return (
    <div style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}>
      <Carousel fade controls indicators className="mb-5">
        {loading && (
          <Carousel.Item>
            <div
              style={{
                height: "60vh",
                minHeight: 420,
                backgroundColor: "var(--bg-surface-muted)",
              }}
            />
          </Carousel.Item>
        )}

        {!loading &&
          itemsWithImages.map((item) => {
            const path = getCardPath(item);
            const image = getPoster(item);

            return (
              <Carousel.Item
                key={item.tconst}
                onClick={() =>
                  navigate(path, {
                    state: { from: { label: "Home", path: "/" } },
                  })
                }
                style={{ cursor: "pointer" }}
              >
                <div
                  style={{
                    height: "60vh",
                    minHeight: 420,
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                {/* Overlay for text readability */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0))",
                  }}
                />

                <Carousel.Caption className="text-start text-white">
                  <h2 className="fw-bold">
                    {item.primaryTitle}
                  </h2>
                  {item.startYear && (
                    <p className="mb-0">
                      {item.startYear}
                    </p>
                  )}
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
      </Carousel>
    </div>
  );
}

/* ---------------------------
   Page component
---------------------------- */
export default function Home() {
  return (
    <>
      <FeaturedCarousel />

      <Container fluid className="px-4 px-lg-5">
        <SectionRow
          title="Top Action Movies"
          params={{ genre: "Action", sort: "top-rated", pageSize: 6 }}
          seeMoreLink="/browse?type=movie&genre=Action&sort=top-rated"
        />

        <SectionRow
          title="Top Drama Movies"
          params={{ genre: "Drama", sort: "top-rated", pageSize: 6 }}
          seeMoreLink="/browse?type=movie&genre=Drama&sort=top-rated"
        />

        <SectionRow
          title="Top Comedy Movies"
          params={{ genre: "Comedy", sort: "top-rated", pageSize: 6 }}
          seeMoreLink="/browse?type=movie&genre=Comedy&sort=top-rated"
        />

        <SectionRow
          title="Top Documentary Movies"
          params={{ genre: "Documentary", sort: "top-rated", pageSize: 6 }}
          seeMoreLink="/browse?type=movie&genre=Documentary&sort=top-rated"
        />
      </Container>
    </>
  );
}
