import React from "react";
import { Container, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useMoviesList from "../hooks/useMoviesList";
import MovieCard from "../components/movies/MovieCard";

/* ---------------------------
   Helpers
---------------------------- */
const getPoster = (item) =>
  item.posterUrl || item.tmdbPoster || item.poster_path || null;

/* ---------------------------
   Skeleton Card
---------------------------- */
function SkeletonCard() {
  return (
    <div
      style={{
        width: 180,
        height: 300,
        background: "#e5e5e5",
        borderRadius: 6,
        flex: "0 0 auto",
      }}
    />
  );
}

/* ---------------------------
   Horizontal Section Row
---------------------------- */
function SectionRow({ title, params, seeMoreLink }) {
  const navigate = useNavigate();
  const { list, loading } = useMoviesList(params);

  return (
    <section className="mb-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">
        <h4 className="mb-0">{title}</h4>

        {seeMoreLink && (
          <span
            role="button"
            className="text-primary ms-auto"
            style={{ fontSize: "0.9rem" }}
            onClick={() => navigate(seeMoreLink)}
          >
            See more →
          </span>
        )}
      </div>

      {/* Cards */}
      <div className="d-flex gap-3 overflow-auto pb-2 hide-scrollbar">
        {loading &&
          Array.from({ length: params.pageSize || 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}

        {!loading &&
          list.map((item) => {
            const id = item.tconst ?? item.id;
            const type =
              item.titleType === "tvSeries" ? "series" : "movie";

            return (
              <div
                key={id}
                onClick={() => navigate(`/${type}/${id}`)}
                style={{
                  width: 180,
                  height: 300,
                  flex: "0 0 auto",
                  cursor: "pointer",
                  display: "flex",
                }}
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
   Featured Carousel
---------------------------- */
function FeaturedCarousel() {
  const navigate = useNavigate();
  const { list, loading } = useMoviesList({
    sort: "top-rated",
    type: "movie",
    pageSize: 5,
  });

  return (
    <div style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}>
      <Carousel fade controls indicators className="mb-5">
        {loading && (
          <Carousel.Item>
            <div
              style={{
                height: "60vh",
                minHeight: 420,
                maxHeight: 620,
                background: "#e5e5e5",
              }}
            />
          </Carousel.Item>
        )}

        {!loading &&
          list
            .map((item) => ({
              item,
              image: getPoster(item),
            }))
            .filter(({ image }) => image)
            .map(({ item, image }) => {
              const id = item.tconst ?? item.id;

              return (
                <Carousel.Item
                  key={id}
                  onClick={() => navigate(`/movie/${id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    style={{
                      height: "60vh",
                      minHeight: 420,
                      maxHeight: 620,
                      backgroundImage: `url(${image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0))",
                    }}
                  />

                  <Carousel.Caption className="text-start">
                    <h2 className="fw-bold">{item.primaryTitle}</h2>
                    {item.startYear && <p>{item.startYear}</p>}
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
      </Carousel>
    </div>
  );
}

/* ---------------------------
   Home Page
---------------------------- */
export default function Home() {
  return (
    <>
      <FeaturedCarousel />

      <Container fluid className="py-4 px-5">
        <SectionRow
          title="Top Action"
          params={{ genre: "Action", sort: "top-rated", pageSize: 6 }}
          seeMoreLink="/browse?genre=Action&sort=top-rated"
        />

        <SectionRow
          title="Top Drama"
          params={{ genre: "Drama", sort: "top-rated", pageSize: 6 }}
          seeMoreLink="/browse?genre=Drama&sort=top-rated"
        />

        <SectionRow
          title="Top Comedy"
          params={{ genre: "Comedy", sort: "top-rated", pageSize: 6 }}
          seeMoreLink="/browse?genre=Comedy&sort=top-rated"
        />

        <SectionRow
          title="Top Documentary"
          params={{ genre: "Documentary", sort: "top-rated", pageSize: 6 }}
          seeMoreLink="/browse?genre=Documentary&sort=top-rated"
        />
      </Container>
    </>
  );
}
